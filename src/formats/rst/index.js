import { rstToHtml } from './render';
import { formatRstTable } from '../shared/tsv-table';

// ─── Extensions ──────────────────────────────────────────────────────────────
// render.js pre-processes `.. code-block:: lang` directives and injects them
// as <pre><code class="language-lang"> - the pattern all extension inject()s expect.
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
// ⚠ CLAUDE: style extension omitted - RST has no style-hint block syntax
// ⚠ CLAUDE: katex protectMath is not called - render.js extractMath() handles $...$ / $$...$$ directly

const extensions = [
  markzen,
  mermaid, chordpro, wavedrom, graphviz, vexchords, vexflow, chess, echarts,
  markmap, abc, vegaLite, katex, plantuml, railroad, asciimath, pseudocode,
  cytoscape, goboard, chartjs, qrcode, nomnoml, bytefield, fnplot, tabulator,
  timeline, dbml, musicxml, plotly, jsxgraph, smiles,
];

// ─── RST adapter ─────────────────────────────────────────────────────────────
const rstAdapter = {
  id: 'rst',
  label: 'reStructuredText',
  fileExtensions: ['.rst', '.rest'],
  fileFilter: [{ name: 'reStructuredText', extensions: ['rst', 'rest'] }],
  supportsToc: true,
  shortcuts: {
    bold: '**', italic: '*', inlineCode: '``', strikethrough: null,
    headings: ['#\n', '=\n', '-\n'],
    codeBlock: { open: '::\n\n    ', close: '' },
    link:  (text, url) => `\`${text} <${url}>\`_`,
    image: (alt,  url) => `.. image:: ${url}\n   :alt: ${alt}`,
    bulletList: '- ', numberedList: '#. ', blockquote: '  ', horizontalRule: '\n----\n',
  },
  extensions,

  formatTable: formatRstTable,

  toHtml(text) {
    let html = rstToHtml(text);
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
          console.error(`[mzn] rst extension "${ext.id}" postRender error:`, e);
        }
      }
    }
  },

  onThemeChange(themeKey) {
    initMermaidTheme(themeKey);
  },
};

export default rstAdapter;
