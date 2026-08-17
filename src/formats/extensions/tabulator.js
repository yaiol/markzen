import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let Tabulator;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  ({ TabulatorFull: Tabulator } = await import('tabulator-tables'));
  await import('tabulator-tables/dist/css/tabulator.min.css');
})());

export default createExtension({
  id: 'tabulator',
  containerClass: 'tabulator-diagram',

  async render(div, src) {

    await __loadLibs();
    const mznStyle = applyMznStyle(div);
    const spec = JSON.parse(src);
    if (mznStyle.height) spec.height = parseInt(mznStyle.height);
    div.innerHTML = '';
    new Tabulator(div, { ...spec, layout: 'fitColumns', height: spec.height || 'auto' });
  },
});
