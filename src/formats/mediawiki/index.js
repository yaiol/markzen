import { wikitextToHtml } from './render';
import { formatMediaWikiTable } from '../shared/tsv-table';

import mermaid, { initMermaidTheme } from '../extensions/mermaid';
import markzen   from '../extensions/markzen';
import chordpro  from '../extensions/chordpro';
import wavedrom  from '../extensions/wavedrom';
import graphviz  from '../extensions/graphviz';
import vexchords from '../extensions/vexchords';
import vexflow   from '../extensions/vexflow';
import chess     from '../extensions/chess';
import echarts   from '../extensions/echarts';
import markmap   from '../extensions/markmap';
import abc       from '../extensions/abc';
import vegaLite  from '../extensions/vega-lite';
import katex     from '../extensions/katex';
import plantuml  from '../extensions/plantuml';
import railroad  from '../extensions/railroad';
import asciimath from '../extensions/asciimath';
import pseudocode from '../extensions/pseudocode';
import cytoscape from '../extensions/cytoscape';
import goboard   from '../extensions/goboard';
import chartjs   from '../extensions/chartjs';
import qrcode    from '../extensions/qrcode';
import nomnoml   from '../extensions/nomnoml';
import bytefield from '../extensions/bytefield';
import fnplot    from '../extensions/fnplot';
import tabulator from '../extensions/tabulator';
import timeline  from '../extensions/timeline';
import dbml      from '../extensions/dbml';
import musicxml  from '../extensions/musicxml';
import plotly    from '../extensions/plotly';
import jsxgraph  from '../extensions/jsxgraph';
import smiles    from '../extensions/smiles';

const extensions = [
  markzen,
  mermaid, chordpro, wavedrom, graphviz, vexchords, vexflow, chess, echarts,
  markmap, abc, vegaLite, katex, plantuml, railroad, asciimath, pseudocode,
  cytoscape, goboard, chartjs, qrcode, nomnoml, bytefield, fnplot, tabulator,
  timeline, dbml, musicxml, plotly, jsxgraph, smiles,
];

// ─── MediaWiki adapter ────────────────────────────────────────────────────────
const mediawikiAdapter = {
  id: 'mediawiki',
  label: 'MediaWiki',
  fileExtensions: ['.wiki', '.mediawiki'],
  fileFilter: [{ name: 'MediaWiki', extensions: ['wiki', 'mediawiki'] }],
  supportsToc: true,
  shortcuts: {
    bold: "'''", italic: "''", inlineCode: null, strikethrough: null,
    headings: ['= ', '== ', '=== '],
    codeBlock: { open: '<syntaxhighlight>\n', close: '\n</syntaxhighlight>' },
    link:  (text, url) => `[[${url}|${text}]]`,
    image: (alt,  url) => `[[File:${url}|${alt}]]`,
    linkPattern:  { re: /\[\[(?!File:)([^|\]]*)\|([^\]]*)\]\]/g, text: 2, url: 1 },
    imagePattern: { re: /\[\[File:([^|\]]*)\|([^\]]*)\]\]/g,     text: 2, url: 1 },
    bulletList: '* ', numberedList: '# ', blockquote: null, horizontalRule: '\n----\n',
  },
  extensions,

  formatTable: formatMediaWikiTable,

  // ⚠ CLAUDE: the wikitext parser maps `== X ==` (MediaWiki's top section level) to <h1>, so a
  // heading at HTML level N is written with N+1 equals signs. The TOC's default editor-jump
  // repeats the marker char level times and would look for `= X =` — off by one, never matching.
  headingMatch(line, level) {
    const eq = '='.repeat(level + 1);
    const t  = line.trim();
    if (t.length <= eq.length * 2) return null;
    if (!t.startsWith(eq) || !t.endsWith(eq)) return null;
    // A deeper heading also starts with this level's marker - reject it, or `=== X ===`
    // would match level 1 as well as level 2 and the jump would land on the wrong line.
    if (t[eq.length] === '=' || t[t.length - eq.length - 1] === '=') return null;
    return t.slice(eq.length, t.length - eq.length).trim() || null;
  },

  async toHtml(text) {
    let html = await wikitextToHtml(text);
    for (const ext of extensions) {
      if (ext.inject) html = ext.inject(html);
    }
    return html;
  },

  async postRender(el, ctx) {
    for (const ext of extensions) {
      if (ext.render) {
        try {
          await ext.render(el, ctx);
        } catch (e) {
          console.error(`[mzn] extension "${ext.id}" postRender error:`, e);
        }
      }
    }
  },

  onThemeChange(themeKey) {
    initMermaidTheme(themeKey);
  },
};

export default mediawikiAdapter;
