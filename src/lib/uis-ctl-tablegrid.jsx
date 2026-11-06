// uis-ctl-tablegrid.jsx — the ONE canonical "pick a table size" grid for every yaiol electron app.
// A matrix of cells the user sweeps with the pointer: the rectangle from the top-left corner to
// the hovered cell lights up, a "R × C" readout names the choice, and a click commits it. The
// familiar word-processor gesture — faster than typing two numbers, and it shows the result.
//
// It owns the GRID ONLY. The floating panel around it is the shared <UisPopover> (portal + position
// + dismiss) and the trigger is the caller's own .uis-btn.ico, exactly like every other dropdown in
// the catalog — this control does not open, position, or close itself.
//
// Keyboard-reachable: each cell is a real <button>, so Tab/Enter work and focus moves the
// highlight the same way hover does. Grid CSS lives in the paired uis-ctl-tablegrid.css
// (imported below → it rides only into apps that use this control, not into every uis-app.css).
//
// Controlled by nothing — it is a one-shot picker: `onPick(rows, cols)` fires on click.
// Optional: maxRows / maxCols (the matrix size), label (a (r,c) => string formatter for the
// readout, so the caller owns the wording and its translation).
//
// Distributed into each app's src/lib/uis-ctl-tablegrid.jsx by sync-shared — ⚠ SYNCED
// FILE, never edit the per-app copy; edit this canonical source and re-sync.
// Import: `import { UisTableGrid } from './lib/uis-ctl-tablegrid';`
import React, { useState } from 'react';
import '../assets/uis-ctl-tablegrid.css';

export function UisTableGrid({ onPick, maxRows = 8, maxCols = 10, label }) {
  // 0 = nothing hovered yet; cells are 1-indexed so "hover row 1" still lights a row.
  const [hover, setHover] = useState({ r: 0, c: 0 });

  const cells = [];
  for (let r = 1; r <= maxRows; r++) {
    for (let c = 1; c <= maxCols; c++) {
      const on = r <= hover.r && c <= hover.c;
      cells.push(
        <button
          key={`${r}:${c}`}
          type="button"
          className={`uis-pkr-grid-cell${on ? ' is-on' : ''}`}
          onMouseEnter={() => setHover({ r, c })}
          onFocus={() => setHover({ r, c })}
          onClick={() => onPick(r, c)}
          tabIndex={-1}
          aria-label={label ? label(r, c) : `${r} x ${c}`}
        />
      );
    }
  }

  return (
    <div className="uis-pkr-grid" onMouseLeave={() => setHover({ r: 0, c: 0 })}>
      {/* Only the COUNT crosses into JS; the cell size stays in the stylesheet. */}
      <div className="uis-pkr-grid-cells" style={{ '--uis-pkr-grid-cols': maxCols }}>
        {cells}
      </div>
      <div className="uis-pkr-grid-label">
        {hover.r > 0 ? (label ? label(hover.r, hover.c) : `${hover.r} × ${hover.c}`) : ''}
      </div>
    </div>
  );
}
