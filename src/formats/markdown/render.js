import { Converter } from 'showdown';
import { parse as parseYaml } from 'yaml';
import { protectMath } from '../extensions/katex';

// ─── Showdown converter - singleton ──────────────────────────────────────────
export const converter = new Converter({
  tables: true,
  strikethrough: true,
  tasklists: true,
  ghCodeBlocks: true,
  smoothLivePreview: true,
  ghCompatibleHeaderId: true,
  requireSpaceBeforeHeadingText: true,
  simplifiedAutoLink: true,
  excludeTrailingPunctuationFromURLs: true,
  literalMidWordUnderscores: true,
});

// ─── GitHub emoji map - fetched once, cached in localStorage ─────────────────
let githubEmojiMap = JSON.parse(localStorage.getItem('mzn-github-emojis') || '{}');
(async () => {
  try {
    const data = await fetch('https://api.github.com/emojis').then(r => r.json());
    const map = {};
    for (const [name, url] of Object.entries(data)) {
      const m = url.match(/\/unicode\/([0-9a-f-]+)\.png/);
      if (m) map[name] = String.fromCodePoint(...m[1].split('-').map(c => parseInt(c, 16)));
    }
    githubEmojiMap = map;
    localStorage.setItem('mzn-github-emojis', JSON.stringify(map));
  } catch (_) { /* offline - use cached map */ }
})();

export function emojify(text) {
  return text.replace(/(```[\s\S]*?```|`[^`]+`)|:([a-zA-Z0-9_+-]+):/g, (match, code, name) =>
    code ? code : (githubEmojiMap[name] || match)
  );
}

// ─── Markdown → HTML ─────────────────────────────────────────────────────────
// protectMath runs BEFORE showdown (saves $...$ expressions to mathStore[])
// Extensions inject their placeholders into the HTML after showdown conversion
// katex.inject() runs last to restore MATHPLACEHOLDER tokens as KaTeX HTML
// Showdown rejects Windows absolute paths (C:\... or C:/...) as invalid URL schemes.
// Convert image syntax to raw <img> HTML which showdown passes through unchanged.
function normalizeWinPaths(md) {
  return md.replace(/!\[([^\]]*)\]\(([A-Za-z]:[/\\][^)]*)\)/g,
    (_, alt, p) => `<img src="${p.replace(/\\/g, '/')}" alt="${alt}">`);
}

// ⚠ CLAUDE: showdown.makeHtml is ~O(n²) - a single large document (e.g. a 3 MB
// Claude Code transcript exported by claude-code-helper) drives the renderer
// heap past its limit and the window goes blank (the process is OOM-killed, so
// it isn't a catchable error). Do NOT "simplify" this back to one makeHtml call.
// Splitting the already-preprocessed source at blank-line boundaries that sit
// OUTSIDE fenced code blocks, then converting chunk-by-chunk, keeps the cost
// near-linear and memory bounded. Block-level HTML concatenates losslessly; the
// only cosmetic risk is a loose list straddling a cut, which is acceptable.
const CHUNK_THRESHOLD = 100_000; // leave normal documents untouched
const CHUNK_TARGET    = 50_000;  // aim for chunks around this many chars

function makeHtmlChunked(src) {
  if (src.length <= CHUNK_THRESHOLD) return converter.makeHtml(src);

  const lines  = src.split('\n');
  const chunks = [];
  let buf = [], bufLen = 0;
  let fence = null; // { char, len } while inside a ``` / ~~~ fenced block
  const fenceRe = /^ {0,3}(`{3,}|~{3,})/;

  for (const line of lines) {
    const m = line.match(fenceRe);
    if (m) {
      const run = m[1], ch = run[0];
      if (fence === null) {
        fence = { char: ch, len: run.length };                 // open
      } else if (ch === fence.char && run.length >= fence.len   // close (CommonMark)
                 && line.slice(m[0].length).trim() === '') {
        fence = null;
      }
    }
    buf.push(line);
    bufLen += line.length + 1;
    // Only cut on a blank line between blocks, never inside a code fence.
    if (fence === null && line.trim() === '' && bufLen >= CHUNK_TARGET) {
      chunks.push(buf.join('\n'));
      buf = []; bufLen = 0;
    }
  }
  if (buf.length) chunks.push(buf.join('\n'));

  return chunks.map(c => converter.makeHtml(c)).join('\n');
}

// ─── YAML front matter → metadata card ───────────────────────────────────────
// ⚠ CLAUDE: front matter (--- key:val --- at the very top) is standard markdown metadata
// (Jekyll/Hugo/Obsidian, our SKILL.md + memory files). Showdown has NO front-matter support,
// so the CLOSING --- sits directly under the last key and Showdown reads it as a SETEXT
// heading underline - mangling the preview. Strip it BEFORE Showdown and render it as a
// metadata card. Conservative: only treat the block as front matter when its first non-empty
// line is a `key:` (so a document that merely starts with a ---wrapped PROSE block - e.g. two
// horizontal rules around text - is left untouched for Showdown to render as before).
const FRONT_MATTER_RE = /^﻿?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

function escHtml(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
function fmValue(v) {
  if (v == null) return '';
  if (Array.isArray(v)) return v.map(fmValue).join(', ');
  if (typeof v === 'object') return Object.entries(v).map(([k, x]) => `${escHtml(k)}: ${fmValue(x)}`).join('; ');
  return escHtml(String(v).trim());
}
function extractFrontMatter(md) {
  const m = FRONT_MATTER_RE.exec(md);
  if (!m) return { card: '', body: md };
  const firstLine = m[1].split(/\r?\n/).find(l => l.trim());
  if (!firstLine || !/^[\w.$-]+[ \t]*:/.test(firstLine)) return { card: '', body: md }; // prose, not metadata
  let data;
  try { data = parseYaml(m[1]); } catch { return { card: '', body: md }; }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return { card: '', body: md };
  // ⚠ CLAUDE: build the card from DIVs, not a <table> - markzen's postRender wraps every
  // <table> in a .table-wrap + copy button and the generic .md-body table CSS adds cell
  // borders/margins, which would decorate this metadata card like a content table.
  const rows = Object.entries(data)
    .map(([k, v]) => `<div class="mzn-fm-row"><span class="mzn-fm-key">${escHtml(k)}</span><span class="mzn-fm-val">${fmValue(v)}</span></div>`).join('');
  return { card: `<div class="mzn-frontmatter">${rows}</div>`, body: md.slice(m[0].length) };
}

export function markdownToHtml(md) {
  const { card, body } = extractFrontMatter(md);
  return card + makeHtmlChunked(protectMath(emojify(normalizeWinPaths(body))));
}
