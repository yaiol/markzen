// ⚠ CLAUDE: import 'pseudocode' (not 'pseudocode/build/pseudocode.js') - the main entry must be
// listed in vite.config.js optimizeDeps.include so esbuild pre-bundles it. Without that,
// Rolldown wraps the CJS source in strict mode, which breaks the undeclared vars `attrVal`
// and `ifCond` in pseudocode's Renderer.js with "X is not defined". Never change the import
// path or remove it from optimizeDeps.include - that was already debugged and fixed.
import pseudocode from 'pseudocode';
import 'pseudocode/build/pseudocode.min.css';
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

export default createExtension({
  id: 'pseudocode',
  containerClass: 'pseudocode-block',

  render(div, src) {
    applyMznStyle(div);
    div.innerHTML = pseudocode.renderToString(src, { lineNumber: true, noEnd: false, captionCount: 0 });
  },
});
