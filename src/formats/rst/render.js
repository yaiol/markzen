import rst2html from 'rst2html';

// ─── Pre-process: math - two separate passes at different pipeline positions ───
// rst2html passes $ characters through unchanged - they never reach katex.
//
// extractDisplayMath runs BEFORE extractCodeBlocks:
//   $$...$$ at column 0 → .. code-block:: katex
//   extractCodeBlocks then picks it up → katex inject renders as display math.
//
// extractInlineMath runs AFTER extractCodeBlocks:
//   $...$ in regular text → MZNMATHINL{n} markers → replaced after rst2html with \(...\)
//   katex inject already handles \(...\) → inline KaTeX.
//   Running AFTER extractCodeBlocks ensures $...$ inside .. code-block:: pseudocode
//   (or any other code block) is never touched - code content is already extracted.
//
// Both passes skip RST backtick inline-code spans (``...`` and `...`).

function extractDisplayMath(text) {
  // $$...$$ only at column 0 (indented literal-block lines start with spaces → won't match)
  return text.replace(/``[^`\n]*``|`[^`\n]*`|^\$\$([^\n]*?)\$\$/gm, (match, display) => {
    if (display !== undefined) return `.. code-block:: katex\n\n   ${display.trim()}\n`;
    return match;
  });
}

function extractInlineMath(text) {
  // (?<!\$)\$(?!\$) prevents matching a lone $ that is part of $$...$$
  const mathInline = [];
  const processed = text.replace(/``[^`\n]*``|`[^`\n]*`|(?<!\$)\$(?!\$)([^\n$]*?)\$(?!\$)/g, (match, inline) => {
    if (inline !== undefined) {
      const marker = `MZNMATHINL${mathInline.length}MZNMATHINL`;
      mathInline.push(inline);
      return marker;
    }
    return match;
  });
  return { text: processed, mathInline };
}

// ─── Pre-process: extract .. class:: text-X directives ───────────────────────
// rst2html is a minimal parser and does not reliably handle .. class:: with an
// indented body. We extract the block before rst2html runs, replace with a marker,
// then after rst2html re-process the body content and wrap in a classed div.
//
// Syntax (standard RST class directive with content block, indented 3 spaces):
//   .. class:: text-center
//
//      This paragraph is centered.
//      Multiple lines are fine.
function extractClassBlocks(text) {
  const blocks = [];
  const processed = text.replace(
    /^\.\. class:: (text-(?:left|center|right))\n((?:\n|[ \t][^\n]*\n)*)/gm,
    (_, cls, body) => {
      const content = body.replace(/^ {3}/gm, '').trim();
      const marker = `MZNCLASS${blocks.length}MZNCLASS`;
      blocks.push({ cls, content });
      return `${marker}\n\n`;
    }
  );
  return { processed, blocks };
}

// ─── Pre-process: extract .. list-table:: directives ─────────────────────────
// rst2html does not support .. list-table:: - the whole block renders as unstyled
// text spans. We extract each table before rst2html runs, build an HTML <table>
// from the parsed rows, and inject it back after rst2html via a tight marker regex.
// Inline RST markup in cells (``code``, **bold**, *italic*) is converted by a
// small inline renderer so cell content looks right without running through rst2html.
function rstCellToHtml(text) {
  // Escape raw HTML entities first, then apply RST inline markup.
  // MZNMATHINL markers contain only alnum - unaffected by escaping.
  return escapeHtml(text)
    .replace(/``([^`]+)``/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function extractListTables(text) {
  const tables = [];
  const processed = text.replace(
    /^\.\. list-table::[^\n]*\n((?:\n|[ \t][^\n]*\n)*)/gm,
    (_, body) => {
      const lines = body.split('\n');
      let headerRows = 0;
      const rows = [];
      let currentRow = null;
      let currentCellIdx = -1;
      let inOptions = true;

      for (const line of lines) {
        if (!line.trim()) { inOptions = false; continue; }

        if (inOptions) {
          const opt = line.match(/^\s+:header-rows:\s*(\d+)/);
          if (opt) { headerRows = parseInt(opt[1]); continue; }
          if (/^\s+:\w/.test(line)) continue; // other options - skip
          inOptions = false;
        }

        // New row: "   * - cell"
        const rowStart = line.match(/^\s+\*\s+-\s*(.*)/);
        if (rowStart) {
          currentRow = [rowStart[1]];
          rows.push(currentRow);
          currentCellIdx = 0;
          continue;
        }
        // Additional cell: "     - cell"
        const cell = line.match(/^\s+-\s+(.*)/);
        if (cell && currentRow) {
          currentRow.push(cell[1]);
          currentCellIdx++;
          continue;
        }
        // Continuation of current cell (extra indented line)
        if (currentRow && currentCellIdx >= 0 && /^\s+\S/.test(line)) {
          currentRow[currentCellIdx] += ' ' + line.trim();
        }
      }

      const marker = `MZNLSTBL${tables.length}MZNLSTBL`;
      tables.push({ rows, headerRows });
      return `${marker}\n\n`;
    }
  );
  return { processed, tables };
}

// ─── Pre-process: extract .. code-block:: directives ─────────────────────────
// rst2html does not support directives - .. code-block:: content spills out as
// unstyled text spans. We extract all code-block directives before rst2html
// runs, replace them with unique markers, then after rst2html inject them back
// as <pre><code class="language-X"> - the pattern all extension inject()s expect.
function extractCodeBlocks(text) {
  const blocks = [];
  const processed = text.replace(
    /^\.\. code-block:: (\S+)\n((?:\n|[ \t][^\n]*\n)*)/gm,
    (_, lang, body) => {
      // Dedent by 3 spaces (standard RST code-block indent level)
      const content = body.replace(/^ {3}/gm, '').trim();
      const marker = `MZNRST${blocks.length}MZNRST`;
      blocks.push({ lang, content });
      return `${marker}\n\n`;
    }
  );
  return { processed, blocks };
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── RST → HTML ──────────────────────────────────────────────────────────────
export function rstToHtml(text) {
  // Order matters - see comments on extractDisplayMath / extractInlineMath above.
  text = extractDisplayMath(text);                          // $$...$$ → .. code-block:: katex
  const { processed: afterBlocks, blocks } = extractCodeBlocks(text); // extract all code blocks
  const { processed: afterClasses, blocks: classBlocks } = extractClassBlocks(afterBlocks);
  const { processed: afterTables, tables } = extractListTables(afterClasses);
  const { text: processed, mathInline } = extractInlineMath(afterTables); // $...$ after blocks removed

  let html = rst2html(processed);

  // Remove all <div ...> and </div> - rst2html only generates document/section
  // wrappers, never content divs, so this is safe to do globally.
  html = html.replace(/<div[^>]*>/g, '').replace(/<\/div>/g, '');

  // Normalise literal blocks: each <span class="rst-text"> is one line - join
  // with \n (stripping tags alone loses newlines since rst2html emits no \n
  // between spans).
  html = html.replace(/<pre class="rst-literal-block">([\s\S]*?)<\/pre>/g, (_, inner) => {
    const lines = [];
    inner.replace(/<span[^>]*>([^<]*)<\/span>/g, (_, t) => lines.push(t));
    return `<pre><code>${lines.join('\n')}</code></pre>`;
  });

  // Replace code-block markers with proper <pre><code class="language-X"> blocks.
  // Match only the specific <p><span>MZNRSTn</span></p> paragraph - the marker
  // is always the sole content of its paragraph so we can match tightly.
  if (blocks.length) {
    html = html.replace(
      /<p[^>]*>\s*<span[^>]*>\s*MZNRST(\d+)MZNRST\s*<\/span>\s*<\/p>/g,
      (_, id) => {
        const { lang, content } = blocks[parseInt(id)];
        return `<pre><code class="language-${lang}">${escapeHtml(content)}</code></pre>`;
      }
    );
  }

  // Replace class-block markers with classed divs - content re-processed by rst2html.
  if (classBlocks.length) {
    html = html.replace(
      /<p[^>]*>\s*(?:<span[^>]*>)?\s*MZNCLASS(\d+)MZNCLASS\s*(?:<\/span>)?\s*<\/p>/g,
      (_, id) => {
        const { cls, content } = classBlocks[parseInt(id)];
        let inner = rst2html(content).replace(/<div[^>]*>/g, '').replace(/<\/div>/g, '');
        return `<div class="${cls}">${inner}</div>`;
      }
    );
  }

  // Replace list-table markers with HTML <table> elements.
  // Cells are processed with rstCellToHtml (inline markup + HTML escaping).
  // MZNMATHINL markers inside cells survive here and are replaced in the next step.
  if (tables.length) {
    html = html.replace(
      /<p[^>]*>\s*<span[^>]*>\s*MZNLSTBL(\d+)MZNLSTBL\s*<\/span>\s*<\/p>/g,
      (_, id) => {
        const { rows, headerRows } = tables[parseInt(id)];
        let tbl = '<table class="rst-table"><tbody>';
        rows.forEach((row, ri) => {
          const tag = ri < headerRows ? 'th' : 'td';
          tbl += '<tr>' + row.map(cell => `<${tag}>${rstCellToHtml(cell)}</${tag}>`).join('') + '</tr>';
        });
        tbl += '</tbody></table>';
        return tbl;
      }
    );
  }

  // Replace inline math markers with \(...\) - katex inject handles \(...\) → KaTeX HTML.
  if (mathInline.length) {
    html = html.replace(/MZNMATHINL(\d+)MZNMATHINL/g, (_, i) => `\\(${mathInline[parseInt(i)]}\\)`);
  }

  return html;
}
