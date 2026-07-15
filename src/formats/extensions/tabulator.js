import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

export default createExtension({
  id: 'tabulator',
  containerClass: 'tabulator-diagram',

  render(div, src) {
    const mznStyle = applyMznStyle(div);
    const spec = JSON.parse(src);
    if (mznStyle.height) spec.height = parseInt(mznStyle.height);
    div.innerHTML = '';
    new Tabulator(div, { ...spec, layout: 'fitColumns', height: spec.height || 'auto' });
  },
});
