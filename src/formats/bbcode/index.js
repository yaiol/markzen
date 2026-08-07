import { bbcodeToHtml } from './render';
import { formatBBCodeTable } from '../shared/tsv-table';

// ─── Extensions ──────────────────────────────────────────────────────────────
// The reader emits <pre><code class="language-X"> for [code=X], which is the
// exact shape every extension inject() matches - so the full suite works in a
// .bbcode file: [code=mermaid], [code=katex], [code=chess], …
// ⚠ CLAUDE: style extension omitted - BBCode has no style-hint block syntax
// (same reason it is omitted for Textile).
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

// ─── BBCode adapter ──────────────────────────────────────────────────────────
// ⚠ CLAUDE: BBCode's markers are ASYMMETRIC ([b]…[/b]), unlike every other
// format here. bold/italic/inlineCode/strikethrough and headings therefore use
// the { open, close } form - see toggleInlineFormat / cycleHeading in App.jsx,
// which accept either a plain string (symmetric) or that pair.
const bbcodeAdapter = {
  id: 'bbcode',
  label: 'BBCode',
  fileExtensions: ['.bbcode', '.bb'],
  fileFilter: [{ name: 'BBCode', extensions: ['bbcode', 'bb'] }],
  supportsToc: true,
  shortcuts: {
    bold:          { open: '[b]', close: '[/b]' },
    italic:        { open: '[i]', close: '[/i]' },
    inlineCode:    { open: '[icode]', close: '[/icode]' },
    strikethrough: { open: '[s]', close: '[/s]' },
    headings: [
      { open: '[h1]', close: '[/h1]' },
      { open: '[h2]', close: '[/h2]' },
      { open: '[h3]', close: '[/h3]' },
    ],
    codeBlock: { open: '[code]\n', close: '\n[/code]' },
    link:  (text, url) => `[url=${url}]${text}[/url]`,
    image: (alt,  url) => `[img alt="${alt}"]${url}[/img]`,
    linkPattern:  { re: /\[url=([^\]]+)]([\s\S]*?)\[\/url]/gi,            text: 2, url: 1 },
    imagePattern: { re: /\[img[^\]]*alt="([^"]*)"[^\]]*]([\s\S]*?)\[\/img]/gi, text: 1, url: 2 },
    // Block form: BBCode lists wrap their items rather than prefixing lines,
    // so these use { open, close, item } (see toggleLineBlock in App.jsx).
    bulletList:   { open: '[list]\n',   close: '\n[/list]', item: '[*]' },
    numberedList: { open: '[list=1]\n', close: '\n[/list]', item: '[*]' },
    blockquote:   { open: '[quote]\n',  close: '\n[/quote]' },
    horizontalRule: '\n[hr]\n',
  },
  extensions,

  formatTable: formatBBCodeTable,

  // Heading lines are wrapped, not prefixed, so the TOC's editor-jump needs its
  // own matcher (the default one repeats a marker char: #, ##, ===).
  headingMatch(line, level) {
    const m = new RegExp(`^\\[(?:h${level}|heading=${level})]([\\s\\S]*)\\[\\/(?:h${level}|heading)]\\s*$`, 'i').exec(line.trim());
    return m ? m[1] : null;
  },

  toHtml(text) {
    let html = bbcodeToHtml(text);
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
          console.error(`[mzn] bbcode extension "${ext.id}" postRender error:`, e);
        }
      }
    }
  },

  onThemeChange(themeKey) {
    initMermaidTheme(themeKey);
  },
};

export default bbcodeAdapter;
