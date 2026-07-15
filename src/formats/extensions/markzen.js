import { decodeHtmlEntities } from '../shared/utils';

// ─── Markzen meta-block - toc and style directives ───────────────────────────
// These are not rendered visually; they inject hidden divs that downstream code
// reads for TOC overrides and per-block style hints.
export default {
  id: 'markzen',

  inject(html) {
    return html.replace(
      /<pre><code class="[^"]*language-markzen[^"]*">([\s\S]*?)<\/code><\/pre>/g,
      (_, code) => {
        const src = decodeHtmlEntities(code).trim();
        const lines = src.split('\n');
        if (lines[0].trim() === 'toc') {
          const toc = lines.slice(1).join('\n');
          return `<div class="mzn-toc-def" style="display:none" data-toc="${encodeURIComponent(toc)}"></div>`;
        } else if (lines[0].trim() === 'style') {
          const directives = {};
          lines.slice(1).forEach(line => {
            const parts = line.trim().split(/\s+/);
            const key = parts[0];
            if (key) directives[key] = parts.slice(1).join(' ');
          });
          return `<div class="mzn-style-hint" style="display:none" data-mzn-style="${encodeURIComponent(JSON.stringify(directives))}"></div>`;
        }
        return '';
      }
    );
  },

  render: null, // no DOM rendering needed - divs are hidden metadata
};
