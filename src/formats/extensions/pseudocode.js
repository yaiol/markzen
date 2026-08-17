// ⚠ CLAUDE: import 'pseudocode' (not 'pseudocode/build/pseudocode.js') - the main entry must be
// listed in vite.config.js optimizeDeps.include so esbuild pre-bundles it. Without that,
// Rolldown wraps the CJS source in strict mode, which breaks the undeclared vars `attrVal`
// and `ifCond` in pseudocode's Renderer.js with "X is not defined". Never change the import
// path or remove it from optimizeDeps.include - that was already debugged and fixed.
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let pseudocode;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  pseudocode = (await import('pseudocode')).default;
  await import('pseudocode/build/pseudocode.min.css');
})());

export default createExtension({
  id: 'pseudocode',
  containerClass: 'pseudocode-block',

  async render(div, src) {

    await __loadLibs();
    applyMznStyle(div);
    div.innerHTML = pseudocode.renderToString(src, { lineNumber: true, noEnd: false, captionCount: 0 });
  },
});
