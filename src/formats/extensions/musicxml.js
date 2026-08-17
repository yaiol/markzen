import { createExtension } from '../shared/extensionFactory';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let OpenSheetMusicDisplay;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  ({ OpenSheetMusicDisplay } = await import('opensheetmusicdisplay'));
})());

export default createExtension({
  id: 'musicxml',
  containerClass: 'osmd-diagram',
  dataKey: 'osmd',
  trim: true, // OSMD load() checks content.startsWith('<') - leading \n from fenced blocks breaks it

  async render(div, src) {

    await __loadLibs();
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
