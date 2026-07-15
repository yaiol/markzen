import { Factory, Renderer, VoiceMode } from 'vexflow';
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

// ─── PDF export helper - re-renders using CANVAS backend so Bravura glyphs render
// correctly in the print window (document.fonts already loaded in current window).
// ⚠ CLAUDE: Do NOT apply canvas conversion to HTML export - SVG left as-is there.
export async function vexflowToCanvas(liveDiv) {
  const src = decodeURIComponent(liveDiv.dataset.vexflow || '');
  if (!src) return null;
  await document.fonts.ready;
  const spec = JSON.parse(src);
  const staves = spec.staves || [{ clef: spec.clef || 'treble', time: spec.time || '4/4', key: spec.key || 'C', notes: spec.notes || '' }];
  const width = liveDiv.clientWidth || 600;
  const height = staves.length * 120 + 40;
  const tmpDiv = document.createElement('div');
  tmpDiv.style.cssText = `position:fixed;left:-9999px;top:0;width:${width}px;height:${height}px;`;
  document.body.appendChild(tmpDiv);
  try {
    const vf = new Factory({ renderer: { elementId: tmpDiv, width, height, backend: Renderer.Backends.CANVAS } });
    const score = vf.EasyScore();
    staves.forEach(({ clef = 'treble', time = '4/4', key = 'C', notes = '' }, idx) => {
      const sys = vf.System({ x: 10, y: idx * 120 + 10, width: width - 20 });
      const voice = score.voice(score.notes(notes, { clef, key }));
      voice.setMode(VoiceMode.SOFT);
      sys.addStave({ voices: [voice] }).addClef(clef).addTimeSignature(time);
    });
    vf.draw();
    return tmpDiv.querySelector('canvas');
  } finally {
    document.body.removeChild(tmpDiv);
  }
}

export default createExtension({
  id: 'vexflow',
  containerClass: 'vexflow-diagram',

  render(div, src) {
    // VexFlow 5 loads its Bravura music font asynchronously - use RAF to wait for layout
    // ⚠ CLAUDE: see local/markzen-bug-vexflow-chess.md for background on the timing issue
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        const mznStyle = applyMznStyle(div);
        try {
          const spec = JSON.parse(src);
          const staves = spec.staves || [{ clef: spec.clef || 'treble', time: spec.time || '4/4', key: spec.key || 'C', notes: spec.notes || '' }];
          div.innerHTML = '';
          const width = mznStyle.width ? parseInt(mznStyle.width) : (div.clientWidth || 600);
          const height = staves.length * 120 + 40;
          const vf = new Factory({ renderer: { elementId: div, width, height, backend: Renderer.Backends.SVG } });
          const score = vf.EasyScore();
          staves.forEach(({ clef = 'treble', time = '4/4', key = 'C', notes = '' }, i) => {
            const sys = vf.System({ x: 10, y: i * 120 + 10, width: width - 20 });
            const voice = score.voice(score.notes(notes, { clef, key }));
            voice.setMode(VoiceMode.SOFT);
            sys.addStave({ voices: [voice] }).addClef(clef).addTimeSignature(time);
          });
          vf.draw();
          if (mznStyle.width) div.style.width = width + 'px';
        } catch (e) {
          div.innerHTML = `<pre style="color:red">VexFlow error: ${e.message}</pre>`;
        }
        resolve();
      });
    });
  },
});
