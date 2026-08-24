#!/usr/bin/env node
// check-compat.mjs — audits the hand-written compatibility tables against the source.
//
// The tables in README.md (and the mirror in the published help) are written by hand: the Notes
// column is judgement, not something a script can derive. But everything BESIDE the notes is
// derivable — file extensions, TOC support, which extensions each format loads, and every engine
// version — and those are exactly the columns that rot silently. Nine wrong versions and nine
// `latest` placeholders sat unnoticed in this project's docs before anyone looked.
//
// So this script derives those columns from the source and compares them to what the tables claim.
// It WRITES NOTHING. It is a gate, not a generator: the prose stays hand-authored, the drift
// becomes loud.
//
//   node scripts/check-compat.mjs        # exits 1 on any mismatch
//
// ⚠ Everything it reads lives inside main/ — this file ships in the repo and must never reach
// outside it (a `../../.common/…` path resolves to nothing on a CI runner).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const problems = [];
const fail = (where, msg) => problems.push(`${where}: ${msg}`);

// ─── Derive from source ───────────────────────────────────────────────────────

// Every extension module that exists — the universe the per-format sets are compared against.
const allExtensions = new Set(
  fs.readdirSync(path.join(ROOT, 'src/formats/extensions'))
    .filter(f => f.endsWith('.js'))
    .map(f => f.replace(/\.js$/, '')));

// Each adapter declares its own file extensions, TOC support and extension list. They are ES
// modules importing browser-only libraries, so they are parsed rather than imported.
function readAdapter(dir) {
  const src = read(`src/formats/${dir}/index.js`);

  const idOf = new Map();                       // local binding -> extension module id
  for (const m of src.matchAll(/^import\s+(\w+)(?:\s*,\s*\{[^}]*\})?\s+from\s+'\.\.\/extensions\/([\w-]+)'/gm))
    idOf.set(m[1], m[2]);

  const arr = /const extensions = \[([\s\S]*?)\];/.exec(src);
  const names = arr ? arr[1].split(',').map(s => s.trim()).filter(Boolean) : [];
  const ids = new Set(names.map(n => idOf.get(n)).filter(Boolean));
  if (names.length !== ids.size)
    fail(dir, `extensions array has ${names.length} entries but only ${ids.size} resolve to a module`);

  const exts = [...(/fileExtensions:\s*\[([^\]]*)\]/.exec(src)?.[1] ?? '')
    .matchAll(/'([^']+)'/g)].map(m => m[1]);

  return {
    exts,
    toc: /supportsToc:\s*true/.test(src),
    ids: arr ? ids : new Set(),                 // no array at all = declares none
  };
}

const FORMATS = {
  'Markdown':         'markdown',
  'AsciiDoc':         'asciidoc',
  'reStructuredText': 'rst',
  'Org':              'org',
  'Textile':          'textile',
  'Djot':             'djot',
  'MediaWiki':        'mediawiki',
  'BBCode':           'bbcode',
};
const adapters = Object.fromEntries(
  Object.entries(FORMATS).map(([label, dir]) => [label, readAdapter(dir)]));

const installed = (pkg) => {
  try { return JSON.parse(read(`node_modules/${pkg}/package.json`)).version; }
  catch { return null; }
};

// ─── Read the tables back out of the docs ─────────────────────────────────────

function block(doc, name, file) {
  const m = new RegExp(`<!-- compat:${name} -->([\\s\\S]*?)<!-- /compat:${name} -->`).exec(doc);
  if (!m) { fail(file, `missing <!-- compat:${name} --> markers`); return []; }
  return m[1].split('\n')
    .filter(l => l.trim().startsWith('|') && !/^\|[\s\-|]+\|$/.test(l.trim()))
    .slice(1)                                   // drop the header row
    .map(l => l.split('|').slice(1, -1).map(c => c.trim()));
}

const readme = read('README.md');

// ─── 1. The per-format table ──────────────────────────────────────────────────

const seenFormats = new Set();
for (const row of block(readme, 'formats', 'README.md')) {
  const [label, extCell, figuresCell, tocCell] = row;
  const a = adapters[label];
  if (!a) { fail('README.md', `unknown markup language "${label}"`); continue; }
  seenFormats.add(label);

  const claimed = [...extCell.matchAll(/`\.([\w]+)`/g)].map(m => '.' + m[1]);
  if (claimed.join(' ') !== a.exts.join(' '))
    fail(label, `file extensions say ${claimed.join(' ') || '(none)'} — source says ${a.exts.join(' ')}`);

  const tocClaimed = /^yes$/i.test(tocCell);
  if (tocClaimed !== a.toc)
    fail(label, `TOC says ${tocCell} — source says supportsToc: ${a.toc}`);

  const missing = [...allExtensions].filter(id => !a.ids.has(id));
  const expected = missing.length === 0 ? 'all'
    : `all but ${missing.map(m => '`' + m + '`').join(', ')}`;
  if (figuresCell !== expected)
    fail(label, `live figures say "${figuresCell}" — source says "${expected}"`);
}
for (const label of Object.keys(FORMATS))
  if (!seenFormats.has(label)) fail('README.md', `${label} is missing from the formats table`);

// ─── 2. The extensions table ──────────────────────────────────────────────────

const seenTags = new Set();
for (const row of block(readme, 'extensions', 'README.md')) {
  const [, name, tagCell, engineCell] = row;
  const tag = /`([^`]+)`/.exec(tagCell)?.[1];
  if (!tag) { fail('README.md', `row "${name}" has no block tag`); continue; }
  if (!allExtensions.has(tag)) { fail('README.md', `block tag \`${tag}\` has no module in src/formats/extensions/`); continue; }
  seenTags.add(tag);

  // "mermaid 11.17.0" / "@hpcc-js/wasm 2.35.0" — anything else (built-in, a URL) is prose.
  const m = /^(@?[\w.@/-]+)\s+([\d][\w.\-+]*)$/.exec(engineCell);
  if (!m) continue;
  const [, pkg, claimed] = m;
  const real = installed(pkg);
  if (!real) fail(name, `engine names "${pkg}", which is not installed`);
  else if (real !== claimed) fail(name, `engine says ${pkg} ${claimed} — installed is ${real}`);
}
for (const id of allExtensions)
  if (!seenTags.has(id)) fail('README.md', `extension \`${id}\` exists in src/ but is missing from the table`);

// ─── 3. The help must agree with the README ───────────────────────────────────
// Two copies of the same facts is exactly the drift this whole audit exists for.

const HELP = '../pub/work/site/en/help.md';
if (fs.existsSync(path.join(ROOT, HELP))) {
  const help = read(HELP);
  for (const [label, a] of Object.entries(adapters)) {
    const row = new RegExp(`^\\| ${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\|(.*)$`, 'm').exec(help);
    if (!row) { fail('help.md', `${label} is missing from the compatibility table`); continue; }
    const claimed = [...row[1].matchAll(/`\.([\w]+)`/g)].map(m => '.' + m[1]);
    if (claimed.join(' ') !== a.exts.join(' '))
      fail(`help.md / ${label}`, `file extensions say ${claimed.join(' ') || '(none)'} — source says ${a.exts.join(' ')}`);
  }
  for (const id of allExtensions) {
    if (id === 'katex') continue;               // written as `$…$` prose, not a bare tag
    if (!new RegExp('`' + id.replace(/[-]/g, '\\-') + '`').test(help))
      fail('help.md', `extension \`${id}\` is not mentioned`);
  }
}

// ─── Report ───────────────────────────────────────────────────────────────────

if (problems.length) {
  console.error(`\n✗ compatibility tables disagree with the source (${problems.length}):\n`);
  for (const p of problems) console.error('  - ' + p);
  console.error('\nFix the table, or the source — whichever is wrong.\n');
  process.exit(1);
}
console.log(`✓ compatibility tables match the source — ${Object.keys(FORMATS).length} formats, ${allExtensions.size} extensions, versions current`);
