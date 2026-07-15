import { djotToHtml } from './render';
import { formatPipeTable } from '../shared/tsv-table';

// ─── Extensions ──────────────────────────────────────────────────────────────
// @djot/djot outputs code blocks as <pre><code class="language-X"> - all
// code-block extensions work without modification.
// ⚠ CLAUDE: style extension omitted - Djot has no style-hint block syntax
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

// ─── Djot adapter ────────────────────────────────────────────────────────────
const djotAdapter = {
  id: 'djot',
  label: 'Djot',
  fileExtensions: ['.dj'],
  fileFilter: [{ name: 'Djot', extensions: ['dj'] }],
  supportsToc: true,
  shortcuts: {
    bold: '**', italic: '_', inlineCode: '`', strikethrough: '~~',
    headings: ['# ', '## ', '### '],
    codeBlock: { open: '```\n', close: '\n```' },
    link:  (text, url) => `[${text}](${url})`,
    image: (alt,  url) => `![${alt}](${url})`,
    bulletList: '- ', numberedList: '1. ', blockquote: '> ', horizontalRule: '\n---\n',
  },
  extensions,

  formatTable: formatPipeTable,

  toHtml(text) {
    let html = djotToHtml(text);
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
          console.error(`[mzn] djot extension "${ext.id}" postRender error:`, e);
        }
      }
    }
  },

  onThemeChange(themeKey) {
    initMermaidTheme(themeKey);
  },
};

export default djotAdapter;
