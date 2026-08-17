import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let vegaEmbed;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  vegaEmbed = (await import('vega-embed')).default;
})());

export default createExtension({
  id: 'vega-lite',
  langPattern: 'vega-lite',
  langId: 'vega-lite',
  containerClass: 'vega-lite',
  dataKey: 'spec',

  async render(div, src) {

    await __loadLibs();
    const mznStyle = applyMznStyle(div);
    const spec = JSON.parse(src);
    if (mznStyle.width)  spec.width  = parseInt(mznStyle.width);
    if (mznStyle.height) spec.height = parseInt(mznStyle.height);
    vegaEmbed(div, spec, { actions: false, renderer: 'svg' });
    if (mznStyle.width) div.style.width = spec.width + 'px';
  },
});
