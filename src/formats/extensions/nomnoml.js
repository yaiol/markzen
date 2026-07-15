import nomnoml from 'nomnoml';
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

export default createExtension({
  id: 'nomnoml',
  containerClass: 'nomnoml-diagram',

  render(div, src) {
    applyMznStyle(div);
    div.innerHTML = nomnoml.renderSvg(src);
  },
});
