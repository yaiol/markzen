import wtf from 'wtf_wikipedia';
import wtfHtml from 'wtf-plugin-html';

wtf.extend(wtfHtml);

// ─── MediaWiki Wikitext → HTML ────────────────────────────────────────────────
export function wikitextToHtml(text) {
  const doc = wtf(text);
  return doc.html();
}
