// cm-datauri-fold.js — folds base64 `data:` URIs in the editor into a compact atomic chip
// (e.g. `🖼 webp · 38 KB`) so an embedded image doesn't drown the surrounding text.
// Display-only: the document text is untouched — save/copy/cut always carry the full URI,
// and a pasted one folds again on arrival. The chip is atomic: the cursor jumps over it and
// it selects/deletes as a single unit.
import { EditorView, Decoration, WidgetType, MatchDecorator, ViewPlugin } from '@codemirror/view';

// Only fold payloads long enough to be a nuisance; a short data: URI stays readable text.
// The base64 charset can't contain `)`, so a markdown `](...)` closes the match naturally.
const DATA_URI_RE = /data:([a-z0-9.+-]+\/[a-z0-9.+-]+)?;base64,([A-Za-z0-9+/=]{200,})/g;

class DataUriChip extends WidgetType {
  constructor(mime, b64len) { super(); this.mime = mime; this.b64len = b64len; }
  eq(other) { return other.mime === this.mime && other.b64len === this.b64len; }
  toDOM() {
    const bytes = this.b64len * 3 / 4;
    const size = bytes < 1024 * 1024
      ? `${Math.max(1, Math.round(bytes / 1024))} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    const kind = this.mime.split('/')[1] || 'data';
    const el = document.createElement('span');
    el.className = 'cm-datauri-chip';
    el.textContent = `${this.mime.startsWith('image/') ? '\u{1F5BC} ' : ''}${kind} · ${size}`;
    return el;
  }
}

const matcher = new MatchDecorator({
  regexp: DATA_URI_RE,
  decoration: m => Decoration.replace({ widget: new DataUriChip(m[1] || '', m[2].length) }),
  // ⚠ CLAUDE: do not remove maxLength. The default (1000) scans only ~1000 chars beyond the
  // viewport, so a multi-hundred-KB base64 line is sliced mid-blob and the `data:` prefix is
  // never seen → nothing folds. A huge value means "always scan the full lines intersecting
  // the viewport" (matchRanges clips to line boundaries anyway).
  maxLength: 1e9,
});

const foldPlugin = ViewPlugin.fromClass(class {
  constructor(view) { this.deco = matcher.createDeco(view); }
  update(u) { this.deco = matcher.updateDeco(u, this.deco); }
}, {
  decorations: v => v.deco,
  provide: p => EditorView.atomicRanges.of(view => view.plugin(p)?.deco || Decoration.none),
});

// Colours come from the app theme tokens (ui-colors.css) so the chip follows light/dark.
const chipTheme = EditorView.baseTheme({
  '.cm-datauri-chip': {
    display: 'inline-block',
    padding: '0 6px',
    borderRadius: '4px',
    border: '1px solid var(--border)',
    background: 'var(--bg-row)',
    color: 'var(--text-dim)',
    fontSize: '85%',
    whiteSpace: 'nowrap',
    cursor: 'default',
  },
});

export const dataUriFold = [foldPlugin, chipTheme];
