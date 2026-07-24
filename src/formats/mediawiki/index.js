import { wikitextToHtml } from './render';
import { formatMediaWikiTable } from '../shared/tsv-table';

// ─── MediaWiki adapter ────────────────────────────────────────────────────────
const mediawikiAdapter = {
  id: 'mediawiki',
  label: 'MediaWiki',
  fileExtensions: ['.wiki', '.mediawiki'],
  fileFilter: [{ name: 'MediaWiki', extensions: ['wiki', 'mediawiki'] }],
  supportsToc: false,
  shortcuts: {
    bold: "'''", italic: "''", inlineCode: null, strikethrough: null,
    headings: ['= ', '== ', '=== '],
    codeBlock: { open: '<syntaxhighlight>\n', close: '\n</syntaxhighlight>' },
    link:  (text, url) => `[[${url}|${text}]]`,
    image: (alt,  url) => `[[File:${url}|${alt}]]`,
    linkPattern:  { re: /\[\[(?!File:)([^|\]]*)\|([^\]]*)\]\]/g, text: 2, url: 1 },
    imagePattern: { re: /\[\[File:([^|\]]*)\|([^\]]*)\]\]/g,     text: 2, url: 1 },
    bulletList: '* ', numberedList: '# ', blockquote: null, horizontalRule: '\n----\n',
  },
  extensions: [],

  formatTable: formatMediaWikiTable,

  toHtml(text) {
    return wikitextToHtml(text);
  },

  async postRender(_el, _ctx) {},

  onThemeChange(_themeKey) {},
};

export default mediawikiAdapter;
