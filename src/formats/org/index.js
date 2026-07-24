import { orgToHtml } from './render';
import { formatOrgTable } from '../shared/tsv-table';

// ─── Extensions ──────────────────────────────────────────────────────────────
// uniorg-rehype outputs code blocks as <pre><code class="language-X"> (after
// normalization in render.js) - all code-block extensions work without modification.
// ⚠ CLAUDE: style extension omitted - Org-Mode has no style-hint block syntax
// ⚠ CLAUDE: katex protectMath is not called - render.js converts uniorg math spans
// to \(...\) / \[...\] directly; the katex inject() handles those.
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

// ─── Org-Mode adapter ────────────────────────────────────────────────────────
const orgAdapter = {
  id: 'org',
  label: 'Org-Mode',
  fileExtensions: ['.org'],
  fileFilter: [{ name: 'Org-Mode', extensions: ['org'] }],
  supportsToc: true,
  shortcuts: {
    bold: '*', italic: '/', inlineCode: '~', strikethrough: '+',
    headings: ['* ', '** ', '*** '],
    codeBlock: { open: '#+BEGIN_SRC\n', close: '\n#+END_SRC' },
    link:  (text, url) => `[[${url}][${text}]]`,
    image: (alt,  url) => `[[${url}]]`,
    linkPattern:  { re: /\[\[([^\]]*)\]\[([^\]]*)\]\]/g, text: 2, url: 1 },
    imagePattern: { re: /\[\[([^\]]*)\]\](?!\[)/g,       text: null, url: 1 },
    bulletList: '- ', numberedList: '1. ', blockquote: '  ', horizontalRule: '\n-----\n',
  },
  extensions,

  formatTable: formatOrgTable,

  toHtml(text) {
    let html = orgToHtml(text);
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
          console.error(`[mzn] org extension "${ext.id}" postRender error:`, e);
        }
      }
    }
  },

  onThemeChange(themeKey) {
    initMermaidTheme(themeKey);
  },
};

export default orgAdapter;
