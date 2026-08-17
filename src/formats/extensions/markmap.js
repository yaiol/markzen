import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let Transformer, builtInPlugins, Markmap, katex;
let markmapTransformer;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  ({ Transformer, builtInPlugins } = await import('markmap-lib'));
  ({ Markmap } = await import('markmap-view'));
  katex = (await import('katex')).default;
  // Markmap transformer - katex plugin disabled so $...$ survives as &#x24;...&#x24;
  // in content strings. Math is pre-rendered into root.content before Markmap.create().
  // ⚠ CLAUDE: Do NOT re-enable the built-in katex plugin - it conflicts with our math pipeline.
  // Built here, not at module scope: `Transformer` does not exist before the import above.
  markmapTransformer = new Transformer(builtInPlugins.filter(p => p.name !== 'katex'));
})());

export function applyMathToMarkmapRoot(node) {
  if (typeof node.content === 'string' && node.content.includes('&#x24;')) {
    node.content = node.content.replace(/&#x24;([\s\S]+?)&#x24;/g, (_, tex) => {
      const decoded = tex.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
      try { return katex.renderToString(decoded, { throwOnError: false }); }
      catch { return tex; }
    });
  }
  node.children?.forEach(applyMathToMarkmapRoot);
}

// ⚠ CLAUDE: `Markmap` and `markmapTransformer` are no longer exported. They were unused —
// App.jsx keeps its own copies for getExportHtml (also lazy-loaded there). Re-exporting a
// binding that is undefined until __loadLibs() runs is a trap; don't reintroduce it.

export default createExtension({
  id: 'markmap',
  containerClass: 'markmap-container',

  async render(div, src) {

    await __loadLibs();
    // Wait for fonts, then a RAF for layout, then render; fit() needs another frame
    return new Promise(resolve => {
      const mznStyle = applyMznStyle(div);
      if (!src) { resolve(); return; }
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          div.innerHTML = '';
          const { root } = markmapTransformer.transform(src);
          applyMathToMarkmapRoot(root);
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          if (mznStyle.width)  div.style.width  = mznStyle.width  + 'px';
          if (mznStyle.height) div.style.height = mznStyle.height + 'px';
          const w = div.clientWidth || 800;
          const h = div.clientHeight || 420;
          svg.setAttribute('width', w);
          svg.setAttribute('height', h);
          div.appendChild(svg);
          // pan: false removes the separate handlePan wheel listener so scroll reaches the page
          const mm = Markmap.create(svg, { pan: false }, root);
          // Also remove wheel from the D3 zoom filter so ctrl+scroll doesn't zoom either
          mm.zoom.filter(event => event.type !== 'wheel' && !event.ctrlKey && !event.button);
          // fit() needs a second frame - foreignObject nodes aren't laid out until after first paint
          requestAnimationFrame(() => { mm.fit(); resolve(); });
        });
      });
    });
  },
});
