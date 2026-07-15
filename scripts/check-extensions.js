#!/usr/bin/env node
/**
 * check-extensions.js
 * Checks whether Markzen rendering extension packages have updates available on npm.
 * Run: npm run check:extensions
 *
 * Extension list is derived automatically from package.json dependencies by
 * excluding known core packages. When you add a new extension and install its
 * npm package, it appears here with no manual update needed.
 */

'use strict';

const https = require('https');
const pkg   = require('../package.json');

// ⚠ CLAUDE: do NOT maintain a manual EXTENSIONS list - the list is auto-derived
// from package.json devDependencies minus this exclusion set.
// Extension packages live in devDependencies (Vite bundles them; they don't belong in dependencies).
// When adding a new extension npm package, it appears automatically.
// Only touch CORE_PACKAGES if you add a new non-extension devDependency to package.json.
const CORE_PACKAGES = new Set([
  // React / Vite
  'react', 'react-dom', 'react-scripts', 'vite', '@vitejs/plugin-react',
  // Electron
  'electron', 'electron-builder', 'electron-is-dev',
  // Editor (CodeMirror)
  'codemirror', '@codemirror/lang-markdown', '@codemirror/theme-one-dark',
  // Markdown core
  'showdown',
  // Utilities (non-extension)
  'dompurify', 'lucide-react', 'node-emoji', 'pako',
  // Export
  'jspdf',
  // Dev / concurrency
  'concurrently', 'cross-env', 'wait-on',
]);

const EXTENSIONS = Object.keys(pkg.devDependencies || {})
  .filter(name => !CORE_PACKAGES.has(name))
  .sort()
  .map(name => ({ label: name, pkg: name }));

function fetchLatest(pkgName) {
  return new Promise((resolve, reject) => {
    const encoded = pkgName.startsWith('@')
      ? pkgName.replace('/', '%2F')
      : pkgName;
    const url = `https://registry.npmjs.org/${encoded}/latest`;
    https.get(url, { headers: { Accept: 'application/json' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).version ?? null);
        } catch {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

function stripCaret(v) {
  return v ? v.replace(/^[\^~]/, '') : '?';
}

async function main() {
  console.log('\nMarkzen - Extension version check\n');

  const results = await Promise.all(
    EXTENSIONS.map(async ext => {
      const installed = stripCaret((pkg.devDependencies || {})[ext.pkg]);
      let latest = '?';
      try {
        latest = (await fetchLatest(ext.pkg)) ?? '?';
      } catch {
        latest = 'ERROR';
      }
      const outdated = latest !== '?' && latest !== 'ERROR' && installed !== '?' && installed !== latest;
      return { ...ext, installed, latest, outdated };
    })
  );

  const labelW  = Math.max(...results.map(r => r.label.length), 'Package'.length);
  const instW   = Math.max(...results.map(r => r.installed.length), 'Installed'.length);
  const latestW = Math.max(...results.map(r => r.latest.length),    'Latest'.length);

  const row = (label, inst, lat, status) =>
    `  ${label.padEnd(labelW)}  ${inst.padEnd(instW)}  ${lat.padEnd(latestW)}  ${status}`;

  console.log(row('Package', 'Installed', 'Latest', 'Status'));
  console.log('  ' + '-'.repeat(labelW + instW + latestW + 3 * 2 + 20));

  let hasUpdates = false;
  for (const r of results) {
    const status = r.latest === 'ERROR' ? '⚠  fetch error'
                 : r.outdated           ? '🔺 UPDATE AVAILABLE'
                 :                        '✓  up to date';
    if (r.outdated) hasUpdates = true;
    console.log(row(r.label, r.installed, r.latest, status));
  }

  console.log('');

  if (hasUpdates) {
    console.log('  Some extensions have updates. Review changelogs before upgrading.');
    console.log('  npm install <package>@latest   then rebuild.\n');
    process.exit(1);
  } else {
    console.log('  All extensions are up to date.\n');
  }
}

main().catch(err => {
  console.error('check-extensions failed:', err.message);
  process.exit(1);
});
