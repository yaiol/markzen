import { createExtension } from '../shared/extensionFactory';
import { readMznStyle, applyMznAlign } from '../shared/utils';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let Plotly;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  Plotly = (await import('plotly.js-dist-min')).default;
})());

export default createExtension({
  id: 'plotly',
  containerClass: 'plotly-diagram',

  async render(div, src) {

    await __loadLibs();
    const mznStyle = readMznStyle(div);
    const spec   = JSON.parse(src);
    const data   = Array.isArray(spec) ? spec : (spec.data   || []);
    const layout = Array.isArray(spec) ? {}   : (spec.layout || {});
    const config = Array.isArray(spec) ? {}   : (spec.config || {});
    if (mznStyle.width)  layout.width  = parseInt(mznStyle.width);
    if (mznStyle.height) layout.height = parseInt(mznStyle.height);
    Plotly.purge(div);
    div.innerHTML = '';
    Plotly.newPlot(div, data, { paper_bgcolor: 'transparent', plot_bgcolor: 'transparent', ...layout }, { responsive: true, displayModeBar: false, ...config });
    if (mznStyle.width) div.style.width = layout.width + 'px';
    if (mznStyle.align) {
      if (!mznStyle.width) div.style.width = div.offsetWidth + 'px';
      applyMznAlign(div, mznStyle);
    }
  },
});
