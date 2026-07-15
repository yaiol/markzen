import { asciidocToHtml } from './render';
import { formatAsciidocTable } from '../shared/tsv-table';

// ─── Extensions shared with Markdown ─────────────────────────────────────────
// AsciiDoc code blocks render as <pre><code class="language-X"> just like Markdown,
// so all code-block extensions work without modification.
// katex: AsciiDoc does not use $...$, so protectMath is not needed.
// style: resize/align hints - not supported in AsciiDoc (Markdown-only block).
import mermaid, { initMermaidTheme }   from '../extensions/mermaid';
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

// ─── AsciiDoc adapter ────────────────────────────────────────────────────────
const asciidocAdapter = {
  id: 'asciidoc',
  label: 'AsciiDoc',
  fileExtensions: ['.adoc', '.asciidoc', '.asc'],
  fileFilter: [{ name: 'AsciiDoc', extensions: ['adoc', 'asciidoc', 'asc'] }],
  supportsToc: true,
  shortcuts: {
    bold: '**', italic: '_', inlineCode: '`', strikethrough: null,
    headings: ['= ', '== ', '=== '],
    codeBlock: { open: '[source]\n----\n', close: '\n----' },
    link:  (text, url) => `link:${url}[${text}]`,
    image: (alt,  url) => `image::${url}[${alt}]`,
    bulletList: '* ', numberedList: '. ', blockquote: '> ', horizontalRule: "'''",
  },
  extensions,

  formatTable: formatAsciidocTable,

  // Convert raw text → injected HTML. ASYNC: asciidoctor v4's convert() is async, so this returns a
  // Promise<string> (unlike the sync markdown formats). The render effect awaits/handles both shapes.
  async toHtml(text) {
    let html = await asciidocToHtml(text);
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
          console.error(`[mzn] asciidoc extension "${ext.id}" postRender error:`, e);
        }
      }
    }
  },

  onThemeChange(themeKey) {
    initMermaidTheme(themeKey);
  },
};

export default asciidocAdapter;
