import { decodeHtmlEntities, applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: mermaid uses <pre class="mermaid"> with decoded content (not a data attr).
// mermaid.run() reads the pre's textContent directly - cannot use standard factory pattern.
//
// ⚠ CLAUDE: mermaid is loaded ON FIRST RENDER, never at startup. It is by far the largest
// renderer library (it drags in cytoscape + dagre), and a static import here put all of it in
// the entry chunk. Do NOT restore a top-level `import mermaid from 'mermaid'`, and do NOT move
// initialize() back to module scope — it would re-import the library at boot.
let mermaid;
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
      (_, code) => `<pre class="mermaid" data-mzn-lang="mermaid" data-mzn-nth="${++nth}">${decodeHtmlEntities(code)}</pre>`
    );
  },

  async render(el, ctx) {
    const nodesToDraw = el.querySelectorAll('pre.mermaid');
    if (!nodesToDraw.length) return;              // nothing to draw — don't pull in the library
    await __loadLibs();
    mermaid.initialize({ startOnLoad: false, theme: ctx?.themeKey === 'dark' ? 'dark' : 'default', suppressErrors: true });
    const nodes = [...el.querySelectorAll('pre.mermaid')];
    if (nodes.length) await mermaid.run({ nodes, suppressErrors: true });
    nodes.forEach(pre => applyMznStyle(pre));
  },
};
