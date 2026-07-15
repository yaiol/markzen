import { deflate } from 'pako';
import { decodeHtmlEntities, applyMznStyle } from '../shared/utils';

// ─── PlantUML - zlib deflate + custom base64 → plantuml.com/svg ──────────────
function encodePlantUML(src) {
  const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
  const bytes = deflate(new TextEncoder().encode(src));
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i], b1 = i + 1 < bytes.length ? bytes[i + 1] : 0, b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    out += CHARS[b0 >> 2];
    out += CHARS[((b0 & 3) << 4) | (b1 >> 4)];
    out += CHARS[((b1 & 15) << 2) | (b2 >> 6)];
    out += CHARS[b2 & 63];
  }
  return out;
}

export default {
  id: 'plantuml',

  inject(html) {
    let nth = 0;
    return html.replace(
      /<pre><code class="[^"]*language-plantuml[^"]*">([\s\S]*?)<\/code><\/pre>/g,
      (_, code) => {
        const n = ++nth;
        try {
          const src = decodeHtmlEntities(code).trim();
          const url = `https://www.plantuml.com/plantuml/svg/~1${encodePlantUML(src)}`;
          return `<div class="plantuml-block" data-mzn-lang="plantuml" data-mzn-nth="${n}"><img src="${url}" alt="PlantUML diagram"></div>`;
        } catch (e) {
          return `<div class="plantuml-block" data-mzn-lang="plantuml" data-mzn-nth="${n}"><pre style="color:red">PlantUML error: ${e.message}</pre></div>`;
        }
      }
    );
  },

  // plantuml renders via <img> in inject; applyMznStyle runs post-render
  render(el) {
    el.querySelectorAll('.plantuml-block').forEach(div => applyMznStyle(div));
  },
};
