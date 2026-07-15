import { decodeHtmlEntities } from '../shared/utils';

// ─── Style block - scoped to .md-body, injected as <style> in the preview ────
// Note: @-rules (media, keyframes) are not supported - standard selectors only.
export default {
  id: 'style',

  inject(html) {
    return html.replace(
      /<pre><code class="[^"]*language-style[^"]*">([\s\S]*?)<\/code><\/pre>/g,
      (_, code) => {
        const css = decodeHtmlEntities(code).trim();
        const scoped = css.replace(/([^{}]+)\{/g, (_, selectors) =>
          selectors.split(',').map(s => `.md-body ${s.trim()}`).join(', ') + ' {'
        );
        return `<style>${scoped}</style>`;
      }
    );
  },

  render: null, // inject writes a <style> tag directly - no DOM rendering needed
};
