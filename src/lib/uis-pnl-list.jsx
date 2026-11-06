// uis-pnl-list.jsx — the ONE canonical side list panel for every yaiol app: the `.uis-pnl` surface, an
// optional head row (a title and small filter buttons), and a scrolling list under it. Reference:
// markzen's table of contents (filters = heading depth 2 3 4) and apps-cockpit's language rail
// (filters = tiers 1 2 3 4). It owns the shell - the three nested elements and their classes, which are
// easy to get silently wrong - and NOTHING about the rows: the caller passes them as children, built
// from `.uis-lvw-item` (+ `-body` / `-name` / `-sub`), so a table of contents with indent and chevrons
// and a language list with a second line both fit.
//
// Controlled: `filters` = [{ key, label, title }], `activeFilter` = the key that is on (null/undefined =
// none), `onFilter(key)`. Whether a click on the active one turns it off is the caller's decision (it
// answers in `onFilter`). `title` is the head's text, `headExtra` more controls after the filter buttons
// (a "select every row shown"). With no title, no filters and no headExtra there is no head row. `width`
// is the caller's: it usually comes from a splitter. Look lives in uis-app.css (.uis-pnl-list*, .uis-pnl-head*).
//   <UisPnlList width={tocWidth} title={t('tipHdrToc')} filters={[{ key: 2, label: '2', title: '…' }]}
//     activeFilter={tocMaxLevel} onFilter={k => setTocMaxLevel(v => v === k ? null : k)}>
//     <div className="uis-lvw-item" onClick={…}>…</div>
//   </UisPnlList>
//
// Distributed into each app's src/lib/uis-pnl-list.jsx by sync-shared — ⚠ SYNCED FILE,
// never edit the per-app copy; edit this canonical source and re-sync.
// Import: `import { UisPnlList } from './lib/uis-pnl-list';`
import React from 'react';

export function UisPnlList({ title, filters = [], activeFilter, onFilter, headExtra, width, children }) {
  const hasHead = title || filters.length > 0 || headExtra;
  return (
    <div className="uis-pnl uis-pnl-list" style={width != null ? { width } : undefined}>
      {hasHead && (
        <div className="uis-pnl-head">
          {title && <span className="uis-hnt uis-pnl-head-title">{title}</span>}
          {filters.map(f => (
            <button key={f.key} type="button" title={f.title}
              className={`uis-btn ico small${activeFilter === f.key ? ' primary' : ''}`}
              onClick={() => onFilter(f.key)}>{f.label}</button>
          ))}
          {headExtra}
        </div>
      )}
      <div className="uis-lvw-scroll">{children}</div>
    </div>
  );
}
