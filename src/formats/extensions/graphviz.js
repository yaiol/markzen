import { Graphviz } from '@hpcc-js/wasm/graphviz';
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

const graphvizPromise = Graphviz.load();

export default createExtension({
  id: 'graphviz',
  containerClass: 'graphviz-diagram',

  async render(div, src) {
    applyMznStyle(div);
    const graphviz = await graphvizPromise;
    try {
      div.innerHTML = graphviz.layout(src, 'svg', 'dot');
    } catch (e) {
      div.innerHTML = `<pre style="color:red">Graphviz error: ${e.message}</pre>`;
    }
  },
});
