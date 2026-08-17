import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let nomnoml;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  nomnoml = (await import('nomnoml')).default;
})());

export default createExtension({
  id: 'nomnoml',
  containerClass: 'nomnoml-diagram',

  async render(div, src) {

    await __loadLibs();
    applyMznStyle(div);
    div.innerHTML = nomnoml.renderSvg(src);
  },
});
