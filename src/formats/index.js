import markdownAdapter   from './markdown/index';
import asciidocAdapter   from './asciidoc/index';
import rstAdapter        from './rst/index';
import orgAdapter        from './org/index';
import textileAdapter    from './textile/index';
import djotAdapter       from './djot/index';
import mediawikiAdapter  from './mediawiki/index';

// ─── Format registry ──────────────────────────────────────────────────────────
// All registered adapters. Add new formats here.
export const formats = [
  markdownAdapter,
  asciidocAdapter,
  rstAdapter,
  orgAdapter,
  textileAdapter,
  djotAdapter,
  mediawikiAdapter,
];

// Default format (used for New Document and as fallback)
export const defaultFormat = markdownAdapter;

// Look up adapter by id
export function getFormat(id) {
  return formats.find(f => f.id === id) || defaultFormat;
}

// Look up adapter by file extension (e.g. '.md', '.adoc')
export function getFormatByExtension(ext) {
  const lower = ext.toLowerCase();
  return formats.find(f => f.fileExtensions.includes(lower)) || defaultFormat;
}

// ─── Text alignment compatibility table ───────────────────────────────────────
// Lists which formats support text-alignment natively and the insertion syntax.
// A direction key (left/center/right) is absent when that direction is not standard.
// Markdown has no standard alignment - omitted entirely.
//
//   open:       string inserted before the selected text
//   close:      string inserted after ('': prefix-only, no suffix)
//   indent:     if set, each line of the selection is prefixed with this (RST body indent)
//   linePrefix: if true, open is applied per-line and toggled on/off (Textile)
//
// ┌──────────┬──────────────────────────┬────────────────────────┬──────────────────────────┐
// │ Format   │ Left                     │ Center                 │ Right                    │
// ├──────────┼──────────────────────────┼────────────────────────┼──────────────────────────┤
// │ AsciiDoc │ [.text-left]             │ [.text-center]         │ [.text-right]            │
// │ Djot     │ {.text-left}             │ {.text-center}         │ {.text-right}            │
// │ RST      │ .. class:: text-left     │ .. class:: text-center │ .. class:: text-right    │
// │ Org      │ - (not standard)         │ #+BEGIN_CENTER         │ - (not standard)         │
// │ Textile  │ <. paragraph             │ =. paragraph           │ >. paragraph             │
// └──────────┴──────────────────────────┴────────────────────────┴──────────────────────────┘
export const FORMAT_ALIGN = {
  asciidoc: {
    left:   { open: '[.text-left]\n',           close: '' },
    center: { open: '[.text-center]\n',         close: '' },
    right:  { open: '[.text-right]\n',          close: '' },
  },
  djot: {
    left:   { open: '{.text-left}\n',           close: '' },
    center: { open: '{.text-center}\n',         close: '' },
    right:  { open: '{.text-right}\n',          close: '' },
  },
  rst: {
    left:   { open: '.. class:: text-left\n\n',   close: '', indent: '   ' },
    center: { open: '.. class:: text-center\n\n', close: '', indent: '   ' },
    right:  { open: '.. class:: text-right\n\n',  close: '', indent: '   ' },
  },
  org: {
    center: { open: '#+BEGIN_CENTER\n', close: '\n#+END_CENTER' },
  },
  textile: {
    left:   { open: '<. ', close: '', linePrefix: true },
    center: { open: '=. ', close: '', linePrefix: true },
    right:  { open: '>. ', close: '', linePrefix: true },
  },
};
