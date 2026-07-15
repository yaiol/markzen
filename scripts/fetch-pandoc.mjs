#!/usr/bin/env node
// Fetch the pandoc binary THIS build needs into vendor/pandoc/<platform>/ — so the ~230 MB
// binaries never live in git. electron-builder then bundles the right one via
// build.<os>.extraResources. Run once per CI matrix OS as `npm run ci:prepare`; a no-op locally
// when the binary is already present (your local vendor/ copy stays on disk).
//
// ⚠ Keep PANDOC_VERSION in sync with the version the app is validated against. The build's
// extraResources reads exactly these three dirs: win (x64), mac-x64, linux (mac-arm64 is unused).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const PANDOC_VERSION = '3.10';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');            // main/
const VENDOR = path.join(ROOT, 'vendor', 'pandoc');

// process.platform → { the vendor subfolder the build reads, the binary name, the release asset }.
const TARGETS = {
  win32:  { dir: 'win',     exe: 'pandoc.exe', asset: `pandoc-${PANDOC_VERSION}-windows-x86_64.zip` },
  darwin: { dir: 'mac-x64', exe: 'pandoc',     asset: `pandoc-${PANDOC_VERSION}-x86_64-macOS.zip` },
  linux:  { dir: 'linux',   exe: 'pandoc',     asset: `pandoc-${PANDOC_VERSION}-linux-amd64.tar.gz` },
};

const t = TARGETS[process.platform];
if (!t) { console.error(`[fetch-pandoc] unsupported platform: ${process.platform}`); process.exit(1); }

const destDir = path.join(VENDOR, t.dir);
const destExe = path.join(destDir, t.exe);
if (fs.existsSync(destExe)) {
  console.log(`[fetch-pandoc] ${path.relative(ROOT, destExe)} already present — skipping download`);
  process.exit(0);
}

const url = `https://github.com/jgm/pandoc/releases/download/${PANDOC_VERSION}/${t.asset}`;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pandoc-'));
const archive = path.join(tmp, t.asset);
try {
  console.log(`[fetch-pandoc] downloading ${url}`);
  execFileSync('curl', ['-fL', '--retry', '3', '-o', archive, url], { stdio: 'inherit' });
  // bsdtar (Windows/macOS) unpacks .zip; GNU tar (Linux) auto-detects .tar.gz — one command covers all.
  console.log('[fetch-pandoc] extracting');
  execFileSync('tar', ['-xf', archive, '-C', tmp], { stdio: 'inherit' });

  // The binary sits at a platform-specific depth inside the archive — find it by name.
  const find = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { const f = find(p); if (f) return f; }
      else if (e.name === t.exe) return p;
    }
    return null;
  };
  const found = find(tmp);
  if (!found) { console.error(`[fetch-pandoc] ${t.exe} not found in ${t.asset}`); process.exit(1); }

  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(found, destExe);
  if (process.platform !== 'win32') fs.chmodSync(destExe, 0o755);
  console.log(`[fetch-pandoc] installed pandoc ${PANDOC_VERSION} → ${path.relative(ROOT, destExe)}`);
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
