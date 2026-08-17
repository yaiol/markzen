import katex from 'katex';
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: asciimath2tex is loaded ON FIRST RENDER, never at startup — a static import puts
// it in the entry chunk. The parser instance is built once, inside the loader. Do not restore
// a top-level import or move `new AsciiMath2Tex()` back to module scope.
// (katex stays static: it is used synchronously elsewhere — see extensions/katex.js.)
let am2tex;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  const AsciiMath2Tex = (await import('asciimath2tex')).default;
  am2tex = new AsciiMath2Tex();
})());

export default createExtension({
  id: 'asciimath',
  containerClass: 'asciimath-block',

  async render(div, src) {
    await __loadLibs();
    applyMznStyle(div);
    const latex = am2tex.parse(src.trim());
    div.innerHTML = katex.renderToString(latex, { displayMode: true, throwOnError: false });
  },
});
