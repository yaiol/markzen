import vegaEmbed from 'vega-embed';
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

export default createExtension({
  id: 'vega-lite',
  langPattern: 'vega-lite',
  langId: 'vega-lite',
  containerClass: 'vega-lite',
  dataKey: 'spec',

  render(div, src) {
    const mznStyle = applyMznStyle(div);
    const spec = JSON.parse(src);
    if (mznStyle.width)  spec.width  = parseInt(mznStyle.width);
    if (mznStyle.height) spec.height = parseInt(mznStyle.height);
    vegaEmbed(div, spec, { actions: false, renderer: 'svg' });
    if (mznStyle.width) div.style.width = spec.width + 'px';
  },
});
