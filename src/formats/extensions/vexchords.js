import { ChordBox } from 'vexchords';
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

export default createExtension({
  id: 'vexchords',
  containerClass: 'vexchords-sheet',

  render(div, src) {
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
