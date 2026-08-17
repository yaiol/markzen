import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let Chess;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  ({ Chess } = await import('chess.js'));
})());

export default createExtension({
  id: 'chess',
  containerClass: 'chess-diagram',

  async render(div, src) {

    await __loadLibs();
    applyMznStyle(div);
    let fen, orientation = 'white', caption = '';
    const trimmed = src.trim();
    if (trimmed.startsWith('{')) {
      const spec = JSON.parse(trimmed);
      fen = spec.fen;
      orientation = spec.orientation || 'white';
      caption = spec.caption || '';
    } else {
      fen = trimmed;
    }
    const chess = new Chess();
    chess.load(fen);
    const board = chess.board();
    const PIECES = { wk:'♔', wq:'♕', wr:'♖', wb:'♗', wn:'♘', wp:'♙', bk:'♚', bq:'♛', br:'♜', bb:'♝', bn:'♞', bp:'♟' };
    const SQ = 56, LABEL = 18, TOTAL = 8 * SQ + LABEL;
    const flipped = orientation === 'black';
    const files = flipped ? ['h','g','f','e','d','c','b','a'] : ['a','b','c','d','e','f','g','h'];
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TOTAL} ${TOTAL}" width="${TOTAL}" height="${TOTAL}" style="display:block">`;
    for (let row = 0; row < 8; row++) {
      const rankIdx = flipped ? 7 - row : row;
      const rankLabel = flipped ? rankIdx + 1 : 8 - rankIdx;
      for (let col = 0; col < 8; col++) {
        const colIdx = flipped ? 7 - col : col;
        const piece = board[rankIdx][colIdx];
        const light = (row + col) % 2 === 0;
        const x = LABEL + col * SQ, y = row * SQ;
        svg += `<rect x="${x}" y="${y}" width="${SQ}" height="${SQ}" fill="${light ? '#F0D9B5' : '#B58863'}"/>`;
        if (piece) {
          const key = piece.color + piece.type;
          const isWhite = piece.color === 'w';
          svg += `<text x="${x + SQ / 2}" y="${y + SQ * 0.8}" text-anchor="middle" style="font-size:${SQ * 0.78}px;font-family:serif;fill:${isWhite ? '#fff' : '#000'};stroke:${isWhite ? '#000' : '#fff'};stroke-width:0.8px;paint-order:stroke">${PIECES[key]}</text>`;
        }
      }
      svg += `<text x="${LABEL / 2}" y="${row * SQ + SQ * 0.65}" text-anchor="middle" style="font-size:11px;font-family:sans-serif;fill:#888">${rankLabel}</text>`;
    }
    for (let col = 0; col < 8; col++) {
      svg += `<text x="${LABEL + col * SQ + SQ / 2}" y="${8 * SQ + LABEL - 3}" text-anchor="middle" style="font-size:11px;font-family:sans-serif;fill:#888">${files[col]}</text>`;
    }
    svg += '</svg>';
    div.innerHTML = caption ? `<figure style="margin:0">${svg}<figcaption>${caption}</figcaption></figure>` : svg;
  },
});
