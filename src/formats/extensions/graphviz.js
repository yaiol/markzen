import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: the graphviz WASM module is fetched ON FIRST RENDER, never at startup. The old
// module-level `Graphviz.load()` ran during app boot and paid for the WASM download/compile
// even when no document contained a graph. Keep both the import and the load() inside the
// cached loader below.
let graphvizPromise;
const __loadLibs = () => (graphvizPromise ??= (async () => {
  const { Graphviz } = await import('@hpcc-js/wasm/graphviz');
  return Graphviz.load();
})());

export default createExtension({
  id: 'graphviz',
  containerClass: 'graphviz-diagram',

  async render(div, src) {
    applyMznStyle(div);
    const graphviz = await __loadLibs();
    try {
      div.innerHTML = graphviz.layout(src, 'svg', 'dot');
    } catch (e) {
      div.innerHTML = `<pre style="color:red">Graphviz error: ${e.message}</pre>`;
    }
  },
});
