import { ChordProParser, HtmlDivFormatter } from 'chordsheetjs';
import { createExtension, } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

export default createExtension({
  id: 'chordpro',
  containerClass: 'chordpro-sheet',
  render(div, src) {
    applyMznStyle(div);
    const song = new ChordProParser().parse(src);
    div.innerHTML = new HtmlDivFormatter().format(song);
  },
});
