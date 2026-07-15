import { parse, renderHTML } from '@djot/djot';

// ─── Djot → HTML ─────────────────────────────────────────────────────────────
export function djotToHtml(text) {
  return renderHTML(parse(text));
}
