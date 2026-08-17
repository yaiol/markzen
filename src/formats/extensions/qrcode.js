import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let QRCode;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  QRCode = (await import('qrcode')).default;
})());

export default createExtension({
  id: 'qrcode',
  containerClass: 'qrcode-diagram',
  trim: true,

  async render(div, src) {

    await __loadLibs();
    const mznStyle = applyMznStyle(div);
    const text = src;
    const size = mznStyle.width ? parseInt(mznStyle.width) : 180;
    const svg = await QRCode.toString(text, { type: 'svg', margin: 2, width: size, color: { dark: '#000', light: '#fff' } });
    div.innerHTML = `${svg}<div class="qrcode-caption">${text}</div>`;
    const svgEl = div.querySelector('svg');
    // Set inline style (not just attributes) - CSS class rule beats HTML attributes
    if (svgEl) { svgEl.style.width = size + 'px'; svgEl.style.height = size + 'px'; }
    if (mznStyle.width) div.style.width = size + 'px';
  },
});
