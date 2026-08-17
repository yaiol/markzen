import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let ChordBox;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  ({ ChordBox } = await import('vexchords'));
})());

export default createExtension({
  id: 'vexchords',
  containerClass: 'vexchords-sheet',

  async render(div, src) {

    await __loadLibs();
    applyMznStyle(div);
    const spec = JSON.parse(src);
    const chords = Array.isArray(spec) ? spec : [spec];
    div.innerHTML = '';
    chords.forEach(({ name, chord, position, barres, tuning, positionText }) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'vexchords-chord';
      if (name) {
        const label = document.createElement('div');
        label.className = 'vexchords-name';
        label.textContent = name;
        wrapper.appendChild(label);
      }
      const canvas = document.createElement('div');
      wrapper.appendChild(canvas);
      div.appendChild(wrapper);
      new ChordBox(canvas, { width: 100, height: 120 }).draw({ chord: chord || [], position, barres, positionText, tuning });
    });
  },
});
