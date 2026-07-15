import { markdownToHtml } from './render';
import { formatPipeTable } from '../shared/tsv-table';

// ─── Extensions in inject chain order ────────────────────────────────────────
// ⚠ CLAUDE: Order matters - katex must be position 12 (after all code-block injects,
// before plantuml/railroad). Do NOT reorder. See DEV-refactor-plan.md.
import mermaid, { initMermaidTheme }   from '../extensions/mermaid';
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
import markzenExt from '../extensions/markzen';
import musicxml  from '../extensions/musicxml';
import plotly    from '../extensions/plotly';
import jsxgraph  from '../extensions/jsxgraph';
import smiles    from '../extensions/smiles';
import style     from '../extensions/style';

const extensions = [
  mermaid, chordpro, wavedrom, graphviz, vexchords, vexflow, chess, echarts,
  markmap, abc, vegaLite, katex, plantuml, railroad, asciimath, pseudocode,
  cytoscape, goboard, chartjs, qrcode, nomnoml, bytefield, fnplot, tabulator,
  timeline, dbml, markzenExt, musicxml, plotly, jsxgraph, smiles, style,
];

// ─── Markdown adapter ────────────────────────────────────────────────────────
const markdownAdapter = {
  id: 'markdown',
  label: 'Markdown',
  fileExtensions: ['.md', '.markdown'],
  fileFilter: [{ name: 'Markdown', extensions: ['md', 'markdown'] }],
  supportsToc: true,
  shortcuts: {
    bold: '**', italic: '_', inlineCode: '`', strikethrough: '~~',
    headings: ['# ', '## ', '### '],
    codeBlock: { open: '```\n', close: '\n```' },
    link:  (text, url) => `[${text}](${url})`,
    image: (alt,  url) => `![${alt}](${url})`,
    bulletList: '- ', numberedList: '1. ', blockquote: '> ', horizontalRule: '---',
  },
  extensions,

  formatTable: formatPipeTable,

  // Convert raw text → injected HTML (runs synchronously, no DOM access)
  toHtml(text) {
    let html = markdownToHtml(text);
    for (const ext of extensions) {
      if (ext.inject) html = ext.inject(html);
    }
    return html;
  },

  // Run all extension DOM render passes after HTML is set on the preview element
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

  // Called when the theme changes - pre-initializes mermaid so the next mermaid.run()
  // (triggered by html change or next postRender) uses the updated theme immediately.
  onThemeChange(themeKey) {
    initMermaidTheme(themeKey);
  },
};

export default markdownAdapter;
