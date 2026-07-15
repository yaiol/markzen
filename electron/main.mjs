// app-icon tag for icons-cockpit (do not remove): data-icon="yaiol:markzen" -> res/icons/custom/apps/markzen.svg
process.noDeprecation = true; // suppress punycode/other third-party deprecation noise
import { app, BrowserWindow, Menu, dialog, shell } from "electron";
import path from "path";
import fs from "fs";
import os from "os";
import net from "net";
import express from "express";
import { execFile } from "child_process";
import { watch } from "chokidar";
import { fileURLToPath } from "node:url";
import pkg from "../package.json" with { type: "json" };

// ESM has no __dirname - derive it from import.meta.url.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDev = !app.isPackaged;
const DEV_PORT = pkg.devPort;
const APP_NAME  = pkg.productName;
const CLI_NAME  = pkg.cliName;
// CLI instances get a unique temp userData dir so they don't conflict with a running
// app instance's locked disk cache. Cleaned up on exit via app.on('quit').
const rawArgsCli = process.argv.slice(!app.isPackaged ? 2 : 1);
const isCLIearly = rawArgsCli.some(a => /\.(md|markdown|adoc|asciidoc|asc|rst|rest|org|textile|dj|wiki|mediawiki)$/i.test(a)) && rawArgsCli.includes('-o');
if (isCLIearly) {
  app.setPath('userData', path.join(os.tmpdir(), `markzen-cli-${process.pid}`));
} else {
  app.setPath('userData', path.join(app.getPath('appData'), 'yaiol', isDev ? `${APP_NAME} (Dev)` : APP_NAME));
}

app.commandLine.appendSwitch('enable-print-preview');

// ⚠ CLAUDE: Always use this module-level mainWindow for all dialog calls.
// Never use BrowserWindow.fromWebContents(event.sender) - it silently breaks in packaged .exe.
// See root CLAUDE.md "Electron Dialog Windows".
let mainWindow = null;
let SERVER_PORT = 4000;

// File passed via double-click / file association - argv[1] in packaged, argv[2]+ in dev
const rawArgs = process.argv.slice(isDev ? 2 : 1);
const startFile = rawArgs.find(a => /\.(md|markdown|adoc|asciidoc|asc|rst|rest|org|textile|dj|wiki|mediawiki)$/i.test(a) && fs.existsSync(a)) || null;

// CLI mode: markzen.exe source.md -o output.pdf  (format inferred from extension)
const oIdx      = rawArgs.indexOf('-o');
const cliOut    = (oIdx >= 0 && oIdx + 1 < rawArgs.length) ? path.resolve(rawArgs[oIdx + 1]) : null;
const cliFormat = cliOut ? (/\.pdf$/i.test(cliOut) ? 'pdf' : /\.html?$/i.test(cliOut) ? 'html' : null) : null;
const isCLI     = !!(startFile && cliFormat);

if (isCLI) {
  console.log(`[${CLI_NAME}] ${path.basename(startFile)} > ${path.basename(cliOut)}`);
}

const pendingFiles = [];

// Single-instance lock only in GUI mode - CLI runs as an independent headless process
if (!isCLI) {
  const gotLock = app.requestSingleInstanceLock();
  if (!gotLock) { app.quit(); }

  app.on('second-instance', (_event, argv) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
    const fp = argv.slice(isDev ? 2 : 1)
      .find(a => /\.(md|markdown|adoc|asciidoc|asc|rst|rest|org|textile|dj|wiki|mediawiki)$/i.test(a) && fs.existsSync(a));
    if (fp) pendingFiles.push(fp);
  });
}

function startServer(callback) {

  function findFreePort(port, cb) {
    const tester = net.createServer();
    tester.once("error", () => findFreePort(port + 1, cb));
    tester.once("listening", () => { tester.close(() => cb(port)); });
    tester.listen(port);
  }

  const api = express();
  api.use(express.json({ limit: "10mb" }));
  api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") { res.sendStatus(204); return; }
    next();
  });

  api.get("/version", (req, res) => {
    res.json({ version: app.getVersion() });
  });

  // Read a file by path - used for file-association startup open
  api.get("/read-file", (req, res) => {
    const filePath = Buffer.from(req.query.path || "", "base64").toString();
    try {
      const text = fs.readFileSync(filePath, "utf8");
      res.json({ filePath, text });
    } catch (e) {
      res.status(404).json({ error: String(e) });
    }
  });

  // ─── External file-change watcher (chokidar) ───────────────────────────────
  // Watchers per absolute filePath. The renderer registers each open tab's path
  // and polls /file-changes for events; openFileInNewTab() reuses its existing
  // clean-vs-unsaved logic to refresh or prompt reload.
  const watchers       = new Map(); // filePath -> FSWatcher
  const pendingChanges = [];        // queue: { filePath, text }
  const recentSelfSaves = new Map(); // filePath -> timestamp; suppress our own writes
  const SELF_SAVE_WINDOW_MS = 1500;

  function markSelfSave(filePath) {
    recentSelfSaves.set(filePath, Date.now());
  }
  function isSelfSave(filePath) {
    const t = recentSelfSaves.get(filePath);
    if (!t) return false;
    if (Date.now() - t > SELF_SAVE_WINDOW_MS) { recentSelfSaves.delete(filePath); return false; }
    return true;
  }

  api.post("/watch-file", (req, res) => {
    const { filePath } = req.body || {};
    if (!filePath || watchers.has(filePath)) { res.json({ ok: true }); return; }
    try {
      const w = watch(filePath, {
        ignoreInitial: true,
        awaitWriteFinish: { stabilityThreshold: 150, pollInterval: 50 },
      });
      w.on("change", () => {
        if (isSelfSave(filePath)) return;
        try {
          const text = fs.readFileSync(filePath, "utf8");
          pendingChanges.push({ filePath, text });
        } catch { /* file vanished mid-event - ignore */ }
      });
      watchers.set(filePath, w);
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  });

  api.post("/unwatch-file", (req, res) => {
    const { filePath } = req.body || {};
    const w = watchers.get(filePath);
    if (w) { w.close(); watchers.delete(filePath); }
    res.json({ ok: true });
  });

  api.get("/file-changes", (req, res) => {
    const out = pendingChanges.splice(0, pendingChanges.length);
    res.json(out);
  });

  api.post("/save-md", async (req, res) => {
    const { filePath, text } = req.body;
    try {
      markSelfSave(filePath);
      fs.writeFileSync(filePath, text, "utf8");
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  });

  // Build a defaultPath rooted in the source .md's folder when provided, so Save-As / Export
  // dialogs open next to the original file instead of the OS default location.
  function exportDefaultPath(sourceFilePath, suggestedName) {
    if (sourceFilePath) {
      try { return path.join(path.dirname(sourceFilePath), suggestedName); }
      catch { /* fall through */ }
    }
    return suggestedName;
  }

  api.post("/save-md-as", async (req, res) => {
    const { text, fileName, sourceFilePath, title } = req.body;
    const suggested = (fileName || "document").replace(/\.[^.]+$/, "") + ".md";
    const result = await dialog.showSaveDialog(mainWindow, {
      title,
      defaultPath: exportDefaultPath(sourceFilePath, suggested),
      filters: [{ name: "Markdown", extensions: ["md", "markdown"] }, { name: "All Files", extensions: ["*"] }],
    });
    if (result.canceled || !result.filePath) { res.json(null); return; }
    try {
      markSelfSave(result.filePath);
      fs.writeFileSync(result.filePath, text, "utf8");
      res.json({ ok: true, filePath: result.filePath });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  });

  api.get("/pending-file", (req, res) => {
    const fp = pendingFiles.shift() || null;
    if (!fp) { res.json(null); return; }
    try {
      const text = fs.readFileSync(fp, "utf8");
      res.json({ filePath: fp, text });
    } catch (e) { res.json(null); }
  });

  api.post("/open-file", async (req, res) => {
    const { title, filters } = req.body || {};
    const result = await dialog.showOpenDialog(mainWindow, {
      title,
      filters: filters || [
        { name: "Text Files", extensions: ["md", "markdown", "adoc", "asciidoc", "asc", "rst", "rest", "org", "textile", "dj", "wiki", "mediawiki"] },
        { name: "All Files", extensions: ["*"] }
      ],
      properties: ["openFile"]
    });
    if (result.canceled || !result.filePaths.length) { res.json(null); return; }
    const filePath = result.filePaths[0];
    try {
      const text = fs.readFileSync(filePath, "utf8");
      res.json({ filePath, text });
    } catch (e) {
      res.json(null);
    }
  });

  api.post('/open-image', async (req, res) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Select Image',
      filters: [
        { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp', 'ico'] },
        { name: 'All Files', extensions: ['*'] },
      ],
      properties: ['openFile'],
    });
    if (result.canceled || !result.filePaths.length) { res.json(null); return; }
    res.json({ filePath: result.filePaths[0] });
  });

  // Serve local image files to the renderer - file:// is blocked by Electron security policy
  api.get('/local-image', (req, res) => {
    const filePath = decodeURIComponent(req.query.path || '');
    try {
      const ext  = path.extname(filePath).toLowerCase().slice(1);
      const mime = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif',
                     svg: 'image/svg+xml', webp: 'image/webp', bmp: 'image/bmp', ico: 'image/x-icon' }[ext] || 'application/octet-stream';
      res.setHeader('Content-Type', mime);
      res.send(fs.readFileSync(filePath));
    } catch { res.status(404).end(); }
  });

  // Legacy alias for /open-md - forwards to /open-file with Markdown-only filters
  api.post("/open-md", async (req, res) => {
    const { title } = req.body || {};
    const result = await dialog.showOpenDialog(mainWindow, {
      title,
      filters: [{ name: "Markdown Files", extensions: ["md", "markdown"] }, { name: "All Files", extensions: ["*"] }],
      properties: ["openFile"]
    });
    if (result.canceled || !result.filePaths.length) { res.json(null); return; }
    const filePath = result.filePaths[0];
    try { res.json({ filePath, text: fs.readFileSync(filePath, "utf8") }); } catch { res.json(null); }
  });

  function buildPrintHtml(html, css = '') {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.40/dist/katex.min.css">${css ? `<style>${css}</style>` : ''}<style>
      /* Export overrides - undo app-layout constraints from buildCss() */
      html, body, #root { height: auto !important; overflow: visible !important; }
      body { max-width: 860px; margin: 0 auto; padding: 20px 40px; }
      img { max-width: 100%; border-radius: 6px; }
    </style></head><body>${html}</body></html>`;
  }

  const SEEDS_DIR = path.join(__dirname, '..', 'seeds');

  // Serve font files from seeds/ - used by getExportCss() to embed as data URIs
  api.get('/fonts/:name', (req, res) => {
    const allowed = ['bravura.woff2', 'academico.woff2'];
    if (!allowed.includes(req.params.name)) { res.status(404).end(); return; }
    const file = path.join(SEEDS_DIR, req.params.name);
    if (!fs.existsSync(file)) { res.status(404).end(); return; }
    res.setHeader('Content-Type', 'font/woff2');
    res.sendFile(file);
  });

  // ⚠ CLAUDE: PDF temp file is in os.tmpdir() - file:// same-origin policy blocks cross-directory
  // image loading. Rewrite local image srcs to http://localhost:PORT/local-image so Chromium fetches
  // them as normal web resources. This matters specifically for .webp: when embedded as base64 data:
  // URLs (the old approach), Chromium's printToPDF treats webp as potentially-lossless and embeds it
  // as PNG/Flate instead of JPEG - a 14-image webp doc ballooned to 27MB. Served over http, the
  // print pipeline JPEG-re-encodes normally (~600KB for the same doc).
  function rewriteLocalImages(html) {
    return html.replace(/(<img\b[^>]*?\bsrc=")([^"]+)(")/gi, (match, pre, src, post) => {
      let filePath;
      if (src.startsWith('file:///')) {
        filePath = decodeURIComponent(src.slice(8)).replace(/\//g, '\\');
      } else if (!/^https?:\/\/|^data:/i.test(src)) {
        filePath = decodeURIComponent(src).replace(/\//g, '\\');
      } else {
        return match;
      }
      return `${pre}http://localhost:${SERVER_PORT}/local-image?path=${encodeURIComponent(filePath)}${post}`;
    });
  }

  async function generatePdf(html, css = '') {
    const fullHtml = rewriteLocalImages(buildPrintHtml(html, css));
    const tmpHtml = path.join(os.tmpdir(), `mdv-print-${Date.now()}.html`);
    fs.writeFileSync(tmpHtml, fullHtml, "utf8");
    const printWin = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: false, contextIsolation: true } });
    await printWin.loadFile(tmpHtml);
    // Wait for all @font-face fonts to finish loading before printing
    await printWin.webContents.executeJavaScript('document.fonts.ready');
    // ⚠ CLAUDE: Chromium's printToPDF embeds .webp as lossless PNG/Flate (a 14-image webp doc → 27MB).
    // Transcode every <img> to JPEG via canvas before printing so the PDF embeds JPEG bytes (~600KB).
    // Must run in the print window itself - Chromium decides format from the live <img>, not the URL.
    await printWin.webContents.executeJavaScript(`(async () => {
      const imgs = Array.from(document.images);
      await Promise.all(imgs.map(img => img.complete ? Promise.resolve()
        : new Promise(r => { img.onload = img.onerror = r; })));
      for (const img of imgs) {
        const src = img.currentSrc || img.src;
        if (!src || src.startsWith('data:image/jpeg')) continue;
        try {
          const w = img.naturalWidth, h = img.naturalHeight;
          if (!w || !h) continue;
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0);
          img.src = canvas.toDataURL('image/jpeg', 0.85);
          await new Promise(r => { img.onload = img.onerror = r; });
        } catch {}
      }
    })()`);
    const pdfData = await printWin.webContents.printToPDF({ printBackground: false, pageSize: "A4", margins: { marginType: "default" } });
    printWin.close();
    fs.unlinkSync(tmpHtml);
    return pdfData;
  }

  api.post("/print", async (req, res) => {
    try {
      const fullHtml = rewriteLocalImages(buildPrintHtml(req.body.html, req.body.css || ''));
      const tmpHtml = path.join(os.tmpdir(), `mdv-print-${Date.now()}.html`);
      fs.writeFileSync(tmpHtml, fullHtml, "utf8");
      const printWin = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: false, contextIsolation: true } });
      await printWin.loadFile(tmpHtml);
      await new Promise(r => setTimeout(r, 300));
      printWin.webContents.print({ silent: false, printBackground: false }, () => {
        printWin.close();
        fs.unlink(tmpHtml, () => {});
      });
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  });

  api.post("/save-pdf", async (req, res) => {
    const { html, css, fileName, sourceFilePath, title } = req.body;
    const suggested = (fileName || "document").replace(/\.[^.]+$/, "") + ".pdf";
    const result = await dialog.showSaveDialog(mainWindow, {
      title,
      defaultPath: exportDefaultPath(sourceFilePath, suggested),
      filters: [{ name: "PDF", extensions: ["pdf"] }],
    });
    if (result.canceled || !result.filePath) { res.json(null); return; }
    try {
      const pdfData = await generatePdf(req.body.html, css);
      fs.writeFileSync(result.filePath, pdfData);
      res.json({ ok: true, filePath: result.filePath });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  });

  api.post("/save-html", async (req, res) => {
    const { html, css, fileName, sourceFilePath, title } = req.body;
    const suggested = (fileName || "document").replace(/\.[^.]+$/, "") + ".html";
    const result = await dialog.showSaveDialog(mainWindow, {
      title,
      defaultPath: exportDefaultPath(sourceFilePath, suggested),
      filters: [{ name: "HTML", extensions: ["html"] }],
    });
    if (result.canceled || !result.filePath) { res.json(null); return; }
    try {
      fs.writeFileSync(result.filePath, buildPrintHtml(html, css), "utf8");
      res.json({ ok: true, filePath: result.filePath });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    }
  });

  // CLI endpoints - write directly to a path, no dialog
  api.post("/cli-write-pdf", async (req, res) => {
    try {
      const pdfData = await generatePdf(req.body.html, req.body.css || '');
      fs.writeFileSync(req.body.outPath, pdfData);
      console.log(`[${CLI_NAME}] PDF written: ${req.body.outPath}`);
      res.json({ ok: true });
    } catch (e) { res.status(500).json({ error: String(e) }); }
  });

  api.post("/cli-write-html", (req, res) => {
    try {
      fs.writeFileSync(req.body.outPath, buildPrintHtml(req.body.html, req.body.css || ''), "utf8");
      console.log(`[${CLI_NAME}] HTML written: ${req.body.outPath}`);
      res.json({ ok: true });
    } catch (e) { res.status(500).json({ error: String(e) }); }
  });

  // ─── Pandoc format conversion ─────────────────────────────────────────────
  // Maps Markzen format IDs to Pandoc format names
  const PANDOC_FORMAT_MAP = {
    markdown:     'markdown',
    asciidoc:     'asciidoc',
    rst:          'rst',
    org:          'org',
    textile:      'textile',
    djot:         'djot',
    epub3:        'epub3',
    fb2:          'fb2',
    latex:        'latex',
    pptx:         'pptx',
    revealjs:     'revealjs',
    mediawiki:    'mediawiki',
    typst:        'typst',
    icml:         'icml',
    ipynb:        'ipynb',
    opml:         'opml',
    docx:         'docx',
    rtf:          'rtf',
    odt:          'odt',
    docbook:      'docbook5',
    jats:         'jats',
    tei:          'tei',
    opendocument: 'opendocument',
  };

  function getPandocPath() {
    let platform;
    if (process.platform === 'win32')       platform = 'win';
    else if (process.platform === 'darwin') platform = process.arch === 'arm64' ? 'mac-arm64' : 'mac-x64';
    else                                    platform = 'linux';
    const exe = process.platform === 'win32' ? 'pandoc.exe' : 'pandoc';
    // ⚠ CLAUDE: dev keeps all platforms under vendor/pandoc/<platform>/; the packaged build
    // ships only one via extraResources (from: vendor/pandoc/<platform>, to: pandoc), which
    // FLATTENS the binary to resources/pandoc/<exe> - no platform subfolder in production.
    return isDev
      ? path.join(__dirname, '..', 'vendor', 'pandoc', platform, exe)
      : path.join(process.resourcesPath, 'pandoc', exe);
  }

  api.post('/convert-format', async (req, res) => {
    const { text, fromFormat, toFormat, fileName, sourceFilePath, title } = req.body;
    const from = PANDOC_FORMAT_MAP[fromFormat];
    const to   = PANDOC_FORMAT_MAP[toFormat];
    if (!from || !to) { res.status(400).json({ error: 'Unsupported format' }); return; }

    const extMap = { markdown: 'md', asciidoc: 'adoc', rst: 'rst', org: 'org', textile: 'textile', djot: 'dj', epub3: 'epub', fb2: 'fb2', latex: 'tex', pptx: 'pptx', revealjs: 'html', mediawiki: 'wiki', typst: 'typ', icml: 'icml', ipynb: 'ipynb', opml: 'opml', docx: 'docx', rtf: 'rtf', odt: 'odt', docbook: 'xml', jats: 'xml', tei: 'xml', opendocument: 'xml' };
    const ext  = extMap[toFormat] || toFormat;
    const base = (fileName || 'document').replace(/\.[^.]+$/, '');

    const result = await dialog.showSaveDialog(mainWindow, {
      title,
      defaultPath: exportDefaultPath(sourceFilePath, `${base}.${ext}`),
      filters: [{ name: ext.toUpperCase(), extensions: [ext] }, { name: 'All Files', extensions: ['*'] }],
    });
    if (result.canceled || !result.filePath) { res.json(null); return; }

    const pandocPath = getPandocPath();
    if (!fs.existsSync(pandocPath)) {
      res.status(500).json({ error: `Pandoc binary not found: ${pandocPath}` });
      return;
    }

    const tmpIn = path.join(os.tmpdir(), `mzn-conv-${Date.now()}.${fromFormat}`);
    fs.writeFileSync(tmpIn, text, 'utf8');

    execFile(pandocPath, ['-f', from, '-t', to, tmpIn, '-o', result.filePath], { timeout: 30000 }, (err, _stdout, stderr) => {
      fs.unlink(tmpIn, () => {});
      if (err) { res.status(500).json({ error: stderr || String(err) }); return; }
      res.json({ ok: true, filePath: result.filePath });
    });
  });

  // Render arbitrary HTML in a hidden BrowserWindow and return a PNG data URL.
  // Used to rasterize SVGs containing <foreignObject> (mermaid flowcharts) and HTML-based
  // extension blocks (AsciiMath/KaTeX, ChordPro) that cannot be converted via canvas.
  // This approach is reliable and has no viewport / scroll dependencies.
  api.post('/render-html-to-png', async (req, res) => {
    const { html, width, height } = req.body;
    const w = Math.max(10, Math.round(width));
    const h = Math.max(10, Math.round(height));
    const tmpFile = path.join(os.tmpdir(), `mzn-render-${Date.now()}.html`);
    const BW = BrowserWindow;
    const win = new BW({
      width: w, height: h, show: false, frame: false,
      backgroundColor: '#ffffff',
      webPreferences: { nodeIntegration: false, contextIsolation: true },
    });
    try {
      fs.writeFileSync(tmpFile, html, 'utf8');
      await win.loadFile(tmpFile);
      const img = await win.webContents.capturePage();
      res.json({ dataUrl: img.toDataURL() });
    } catch (e) { res.status(500).json({ error: String(e) }); }
    finally {
      win.destroy();
      try { fs.unlinkSync(tmpFile); } catch {}
    }
  });

  api.post('/export-native', async (req, res) => {
    const { html, css, format, fileName, sourceFilePath, title } = req.body;
    // Maps Markzen native export IDs to pandoc format names (same as file extensions for these formats)
    const fmtMap = { epub3: 'epub', docx: 'docx', odt: 'odt', pptx: 'pptx', rtf: 'rtf' };
    const pandocFmt = fmtMap[format];
    const ext       = fmtMap[format];
    if (!pandocFmt) { res.status(400).json({ error: `Unsupported native export format: ${format}` }); return; }

    const base = (fileName || 'document').replace(/\.[^.]+$/, '');
    const result = await dialog.showSaveDialog(mainWindow, {
      title,
      defaultPath: exportDefaultPath(sourceFilePath, `${base}.${ext}`),
      filters: [{ name: ext.toUpperCase(), extensions: [ext] }, { name: 'All Files', extensions: ['*'] }],
    });
    if (result.canceled || !result.filePath) { res.json(null); return; }

    const pandocPath = getPandocPath();
    if (!fs.existsSync(pandocPath)) { res.status(500).json({ error: `Pandoc binary not found: ${pandocPath}` }); return; }

    // Create a temp dir for this export - holds index.html + extracted image files
    const tmpDir = path.join(os.tmpdir(), `mzn-exp-${Date.now()}`);
    fs.mkdirSync(tmpDir, { recursive: true });

    try {
      // Extract base64 data: URIs from the flattened HTML and write as real .png files.
      // Pandoc does not embed data: URIs reliably - real file paths are required.
      let processedHtml = html;
      const dataUriRx = /src="data:image\/[^;]+;base64,([^"]+)"/g;
      let imgIdx = 0;
      const replacements = [];
      let m;
      while ((m = dataUriRx.exec(html)) !== null) {
        const imgName = `img-${imgIdx++}.png`;
        replacements.push({ placeholder: m[0], b64: m[1], name: imgName });
      }
      for (const { placeholder, b64, name } of replacements) {
        fs.writeFileSync(path.join(tmpDir, name), Buffer.from(b64, 'base64'));
        processedHtml = processedHtml.replace(placeholder, `src="./${name}"`);
      }

      const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>${css}</style></head><body>${processedHtml}</body></html>`;
      const tmpIn = path.join(tmpDir, 'index.html');
      fs.writeFileSync(tmpIn, fullHtml, 'utf8');

      await new Promise((resolve, reject) => {
        // ⚠ CLAUDE: -s (--standalone) is required for RTF/EPUB/ODT/DOCX/PPTX to produce valid documents
        // with proper format headers (e.g. RTF must start with {\rtf1, ODT needs the XML preamble, etc.)
        execFile(pandocPath, ['-f', 'html', '-s', tmpIn, '-t', pandocFmt, '-o', result.filePath], { timeout: 60000, cwd: tmpDir }, (err, _stdout, stderr) => {
          if (err) reject(new Error(stderr || String(err))); else resolve();
        });
      });

      res.json({ ok: true, filePath: result.filePath });
    } catch (e) {
      res.status(500).json({ error: String(e) });
    } finally {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
    }

  });

  api.post("/cli-done", (_req, res) => {
    res.json({ ok: true });
    setTimeout(() => {
      if (isCLIearly) {
        try { fs.rmSync(app.getPath('userData'), { recursive: true, force: true }); } catch {}
      }
      app.quit();
    }, 200);
  });

  findFreePort(4000, (port) => {
    SERVER_PORT = port;
    api.listen(port, () => {
      if (!isCLI) console.log(`${APP_NAME} API on http://localhost:${port}`);
      if (callback) callback(port);
    });
  });
}

function createWindow(port) {
  mainWindow = new BrowserWindow({
    title: APP_NAME,
    width: 1100,
    height: 720,
    minWidth: 700,
    minHeight: 500,
    frame: true,
    show: !isCLI,  // hidden in CLI mode - no UI needed
    icon: path.join(__dirname, isDev ? '../public/app.ico' : '../dist/app.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startFileEncoded = startFile ? Buffer.from(startFile).toString("base64") : "";
  const query = { apiPort: String(port) };
  if (startFileEncoded) query.startFile = startFileEncoded;
  if (isCLI) {
    query.cliOut    = Buffer.from(cliOut).toString("base64");
    query.cliFormat = cliFormat;
  }

  if (isDev) {
    const qs = new URLSearchParams(query).toString();
    mainWindow.loadURL(`http://localhost:${DEV_PORT}?${qs}`);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"), { query });
  }
  mainWindow.webContents.on('did-finish-load', () => mainWindow.setTitle(isDev ? `${APP_NAME} (Dev)` : APP_NAME));
  // ⚠ CLAUDE: Ctrl+Shift+I is dead because Menu.setApplicationMenu(null) removes the default shortcut.
  // This restores it in dev only - do NOT remove.
  if (isDev) {
    mainWindow.webContents.on('before-input-event', (event, input) => {
      if (input.control && input.shift && input.key === 'I') {
        mainWindow.webContents.toggleDevTools();
        event.preventDefault();
      }
    });
  }

  // ⚠ CLAUDE: block EVERY in-window navigation. Relative links in a rendered doc
  // (e.g. electron/CLAUDE-i18n.md) resolve to the app's own origin, so a same-origin
  // check lets them through - they replace the React app with a blank page. The renderer
  // catches local file links and opens them in a tab before navigation starts; anything
  // that still reaches here is sent to the system browser, never to the app window.
  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    if (/^https?:|^mailto:/i.test(url)) shell.openExternal(url);
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  startServer((port) => createWindow(port));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow(SERVER_PORT);
});
