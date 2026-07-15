import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import { createExtension } from '../shared/extensionFactory';

export default createExtension({
  id: 'musicxml',
  containerClass: 'osmd-diagram',
  dataKey: 'osmd',
  trim: true, // OSMD load() checks content.startsWith('<') - leading \n from fenced blocks breaks it

  async render(div, src) {
    div.innerHTML = '';
    const osmd = new OpenSheetMusicDisplay(div, { autoResize: false });
    // Pass string directly - OSMD internally uses DOMParser, which avoids extra nodes
    // that a pre-parsed Document can introduce (causing IXmlElement.value to return "")
    await osmd.load(src);
    // Wait for layout so div.offsetWidth is non-zero before OSMD measures the container
    await new Promise(r => requestAnimationFrame(r));
    osmd.render();
  },
});
