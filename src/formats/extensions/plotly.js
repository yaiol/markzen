import Plotly from 'plotly.js-dist-min';
import { createExtension } from '../shared/extensionFactory';
import { readMznStyle, applyMznAlign } from '../shared/utils';

export default createExtension({
  id: 'plotly',
  containerClass: 'plotly-diagram',

  render(div, src) {
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
