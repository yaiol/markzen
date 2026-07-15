import AsciiMath2Tex from 'asciimath2tex';
import katex from 'katex';
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

const am2tex = new AsciiMath2Tex();

export default createExtension({
  id: 'asciimath',
  containerClass: 'asciimath-block',

  render(div, src) {
    applyMznStyle(div);
    const latex = am2tex.parse(src.trim());
    div.innerHTML = katex.renderToString(latex, { displayMode: true, throwOnError: false });
  },
});
