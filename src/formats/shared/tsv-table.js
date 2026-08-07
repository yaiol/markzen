// ─── TSV → table formatters ──────────────────────────────────────────────────
// Used by the editor paste handler: when the clipboard contains tab-separated
// text (Excel, Sheets, web tables…), each adapter calls one of these to emit
// a native table in its own syntax.
//
// Input shape (produced by parseTsvTable in App.jsx):
//   { header: string[], rows: string[][] }   // rows may be empty (header-only)
//
// Each formatter returns a single string - no leading/trailing newlines beyond
// what the format itself needs to terminate the block.

// ─── Pipe-table family (Markdown, Djot) ──────────────────────────────────────
function escapePipeCell(s) {
  return String(s ?? '').replace(/\r?\n/g, ' ').replace(/\|/g, '\\|');
}

export function formatPipeTable({ header, rows }) {
  const cells = header.map(escapePipeCell);
  const out = [];
  out.push(`| ${cells.join(' | ')} |`);
  out.push(`|${cells.map(() => '---').join('|')}|`);
  for (const row of rows) {
    out.push(`| ${row.map(escapePipeCell).join(' | ')} |`);
  }
  return out.join('\n');
}

// ─── AsciiDoc ────────────────────────────────────────────────────────────────
function escapeAsciidocCell(s) {
  return String(s ?? '').replace(/\r?\n/g, ' ').replace(/\|/g, '\\|');
}

export function formatAsciidocTable({ header, rows }) {
  const out = [];
  out.push(`[cols="${header.map(() => '1').join(',')}"]`);
  out.push('|===');
  out.push(header.map(c => `| ${escapeAsciidocCell(c)}`).join(' '));
  out.push('');
  for (const row of rows) {
    out.push(row.map(c => `| ${escapeAsciidocCell(c)}`).join(' '));
  }
  out.push('|===');
  return out.join('\n');
}

// ─── Org-Mode ────────────────────────────────────────────────────────────────
// Org has no documented pipe-escape; \vert{} is the convention. Newlines in
// cells collapse to a space - Org tables are single-line per row.
function escapeOrgCell(s) {
  return String(s ?? '').replace(/\r?\n/g, ' ').replace(/\|/g, '\\vert{}');
}

export function formatOrgTable({ header, rows }) {
  const cells = header.map(escapeOrgCell);
  const out = [];
  out.push(`| ${cells.join(' | ')} |`);
  out.push(`|${cells.map(() => '---').join('+')}|`);
  for (const row of rows) {
    out.push(`| ${row.map(escapeOrgCell).join(' | ')} |`);
  }
  return out.join('\n');
}

// ─── Textile ─────────────────────────────────────────────────────────────────
function escapeTextileCell(s) {
  return String(s ?? '').replace(/\r?\n/g, ' ').replace(/\|/g, '&#124;');
}

export function formatTextileTable({ header, rows }) {
  const out = [];
  out.push(`|${header.map(c => `_. ${escapeTextileCell(c)}`).join('|')}|`);
  for (const row of rows) {
    out.push(`|${row.map(c => ` ${escapeTextileCell(c)} `).join('|')}|`);
  }
  return out.join('\n');
}

// ─── MediaWiki ───────────────────────────────────────────────────────────────
function escapeWikiCell(s) {
  return String(s ?? '').replace(/\r?\n/g, ' ').replace(/\|/g, '&#124;');
}

export function formatMediaWikiTable({ header, rows }) {
  const out = [];
  out.push('{| class="wikitable"');
  out.push(`! ${header.map(escapeWikiCell).join(' !! ')}`);
  for (const row of rows) {
    out.push('|-');
    out.push(`| ${row.map(escapeWikiCell).join(' || ')}`);
  }
  out.push('|}');
  return out.join('\n');
}

// ─── RST list-table ──────────────────────────────────────────────────────────
// Emits a `.. list-table::` directive - the rst/render.js extractor at
// extractListTables() picks these up and renders them as <table>.
function escapeRstCell(s) {
  return String(s ?? '').replace(/\r?\n/g, ' ');
}

export function formatRstTable({ header, rows }) {
  const out = [];
  out.push('.. list-table::');
  out.push('   :header-rows: 1');
  out.push('');
  const allRows = [header, ...rows];
  for (const row of allRows) {
    row.forEach((cell, i) => {
      out.push(`   ${i === 0 ? '*' : ' '} - ${escapeRstCell(cell)}`);
    });
  }
  return out.join('\n');
}

// ─── BBCode ──────────────────────────────────────────────────────────────────
// [table][tr][th]…[/th][/tr][tr][td]…[/td][/tr][/table] — the shape Pandoc's
// BBCode writers emit, so a pasted table round-trips through export/import.
// BBCode has no escape character; the bracket is what breaks a cell, so the
// two that matter are encoded as HTML entities (which every renderer passes
// through, and which our own reader escapes back to visible text).
function escapeBBCodeCell(s) {
  return String(s ?? '').replace(/\r?\n/g, ' ').replace(/\[/g, '&#91;').replace(/]/g, '&#93;');
}

export function formatBBCodeTable({ header, rows }) {
  const out = ['[table]'];
  out.push(`[tr]${header.map(c => `[th]${escapeBBCodeCell(c)}[/th]`).join('')}[/tr]`);
  for (const row of rows) {
    out.push(`[tr]${row.map(c => `[td]${escapeBBCodeCell(c)}[/td]`).join('')}[/tr]`);
  }
  out.push('[/table]');
  return out.join('\n');
}
