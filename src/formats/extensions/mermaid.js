import mermaid from 'mermaid';
import { decodeHtmlEntities, applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: mermaid uses <pre class="mermaid"> with decoded content (not a data attr).
// mermaid.run() reads the pre's textContent directly - cannot use standard factory pattern.
mermaid.initialize({ startOnLoad: false, theme: 'default', suppressErrors: true });

// Called from adapter.onThemeChange - stores new theme in mermaid's config so the
// next mermaid.run() call (triggered by html change) uses the updated theme.
export function initMermaidTheme(themeKey) {
  mermaid.initialize({ startOnLoad: false, theme: themeKey === 'dark' ? 'dark' : 'default', suppressErrors: true });
}

export default {
  id: 'mermaid',

  inject(html) {
    let nth = 0;
    return html.replace(
      /<pre><code class="[^"]*mermaid[^"]*">([\s\S]*?)<\/code><\/pre>/g,
      (_, code) => `<pre class="mermaid" data-mzn-lang="mermaid" data-mzn-nth="${++nth}">${decodeHtmlEntities(code)}</pre>`
    );
  },

  async render(el, ctx) {
    mermaid.initialize({ startOnLoad: false, theme: ctx?.themeKey === 'dark' ? 'dark' : 'default', suppressErrors: true });
    const nodes = [...el.querySelectorAll('pre.mermaid')];
    if (nodes.length) await mermaid.run({ nodes, suppressErrors: true });
    nodes.forEach(pre => applyMznStyle(pre));
  },
};
