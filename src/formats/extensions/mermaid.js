import { decodeHtmlEntities, applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: this file does NOT call mermaid.run(), and must not be "simplified" back to it.
// run() takes its input from the element's innerHTML and rewrites it before parsing:
//     txt = dedent(entityDecode(element.innerHTML)).trim()  (plus a <br> normalisation)
// so the diagram source round-trips through the DOM and two rewrites. Diagrams that are provably
// valid (pasted into Mermaid Live unchanged) came back as "Syntax error in text" - 18 of the 20
// blocks in local/doc/md/doc/mermaid.md. A previous comment here claimed run() reads textContent;
// it does not, and that wrong claim is what kept the design in place.
//
// render() below calls mermaid.render(id, src) with the source taken from data-mzn-src - the exact
// fenced-block text, never parsed as HTML. The <pre> body stays ESCAPED so the DOM cannot eat
// markup-looking content (`<br/>` in a mindmap, `&nbsp;` in a block diagram), and it is only ever
// a fallback display; mermaid replaces it with the SVG.
//
// ⚠ CLAUDE: mermaid is loaded ON FIRST RENDER, never at startup. It is by far the largest
// renderer library (it drags in cytoscape + dagre), and a static import here put all of it in
// the entry chunk. Do NOT restore a top-level `import mermaid from 'mermaid'`, and do NOT move
// initialize() back to module scope — it would re-import the library at boot.
let mermaid;
let renderSeq = 0;
let pendingTheme = 'default';                     // theme chosen before the library exists
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  mermaid = (await import('mermaid')).default;
  mermaid.initialize({ startOnLoad: false, theme: pendingTheme, suppressErrors: true });
})());

// Called from adapter.onThemeChange - stores new theme in mermaid's config so the
// next mermaid.run() call (triggered by html change) uses the updated theme. Before the
// library has loaded there is nothing to configure, so the choice is simply remembered.
export function initMermaidTheme(themeKey) {
  pendingTheme = themeKey === 'dark' ? 'dark' : 'default';
  if (mermaid) mermaid.initialize({ startOnLoad: false, theme: pendingTheme, suppressErrors: true });
}

export default {
  id: 'mermaid',

  inject(html) {
    let nth = 0;
    return html.replace(
      /<pre><code class="[^"]*mermaid[^"]*">([\s\S]*?)<\/code><\/pre>/g,
      (_, code) => `<pre class="mermaid" data-mzn-lang="mermaid" data-mzn-nth="${++nth}" data-mzn-src="${encodeURIComponent(decodeHtmlEntities(code))}">${code}</pre>`
    );
  },

  async render(el, ctx) {
    const nodesToDraw = el.querySelectorAll('pre.mermaid');
    if (!nodesToDraw.length) return;              // nothing to draw — don't pull in the library
    await __loadLibs();
    mermaid.initialize({ startOnLoad: false, theme: ctx?.themeKey === 'dark' ? 'dark' : 'default', suppressErrors: true });
    const nodes = [...el.querySelectorAll('pre.mermaid')];
    // ⚠ CLAUDE: render from data-mzn-src, NEVER via mermaid.run().
    // run() takes its input from element.innerHTML and then rewrites it -
    //     txt = dedent(entityDecode(element.innerHTML)).trim()
    // - so the source makes a round-trip through the DOM and two rewrites before mermaid parses
    // it. That is what produced "Syntax error in text" on documents whose diagrams are valid
    // (verified in Mermaid Live), for 18 of the 20 blocks in local/doc/md/doc/mermaid.md.
    // data-mzn-src holds the exact fenced-block source, so render() gets it untouched.
    for (const node of nodes) {
      const src = decodeURIComponent(node.dataset.mznSrc || '').trim();
      if (!src) continue;
      const id = 'mzn-mermaid-' + (node.dataset.mznNth || '0') + '-' + (renderSeq++);
      try {
        const { svg, bindFunctions } = await mermaid.render(id, src);
        node.innerHTML = svg;
        if (bindFunctions) bindFunctions(node);
      } catch (err) {
        console.error('[mzn/mermaid]', (err && err.message) || String(err));
      }
    }
    nodes.forEach(pre => applyMznStyle(pre));
  },
};
