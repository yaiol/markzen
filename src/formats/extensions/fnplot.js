import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

function renderFnplotCanvas(spec) {
  const W = spec.width || 600;
  const H = spec.height || 300;
  const [xMin, xMax] = spec.xAxis?.domain || [-10, 10];
  const [yMin, yMax] = spec.yAxis?.domain || [-10, 10];
  const pad = { t: 16, r: 16, b: 36, l: 48 };
  const pw = W - pad.l - pad.r;
  const ph = H - pad.t - pad.b;

  const toSx = v => pad.l + (v - xMin) / (xMax - xMin) * pw;
  const toSy = v => pad.t + (1 - (v - yMin) / (yMax - yMin)) * ph;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#fafafa';
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.rect(pad.l, pad.t, pw, ph);
  ctx.clip();

  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 0.5;
  const nGrid = 5;
  for (let i = 0; i <= nGrid; i++) {
    const vx = xMin + (i / nGrid) * (xMax - xMin);
    const vy = yMin + (i / nGrid) * (yMax - yMin);
    ctx.beginPath(); ctx.moveTo(toSx(vx), pad.t); ctx.lineTo(toSx(vx), pad.t + ph); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad.l, toSy(vy)); ctx.lineTo(pad.l + pw, toSy(vy)); ctx.stroke();
  }

  ctx.strokeStyle = '#999';
  ctx.lineWidth = 1;
  if (xMin <= 0 && xMax >= 0) {
    const ax = toSx(0);
    ctx.beginPath(); ctx.moveTo(ax, pad.t); ctx.lineTo(ax, pad.t + ph); ctx.stroke();
  }
  if (yMin <= 0 && yMax >= 0) {
    const ay = toSy(0);
    ctx.beginPath(); ctx.moveTo(pad.l, ay); ctx.lineTo(pad.l + pw, ay); ctx.stroke();
  }

  for (const datum of (spec.data || [])) {
    const color = datum.color || '#5a4fff';
    const n = datum.nSamples || 256;
    const fnType = datum.fnType || 'linear';
    let evaluator;
    try {
      if (fnType === 'polar') {
        // eslint-disable-next-line no-new-func
        evaluator = new Function('theta', 'r', `with(Math){return ${datum.fn};}`);
      } else {
        // eslint-disable-next-line no-new-func
        evaluator = new Function('x', `with(Math){return ${datum.fn};}`);
      }
    } catch (e) { continue; }

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    let penDown = false;

    if (fnType === 'polar') {
      const steps = n * 4;
      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * Math.PI * 2;
        let r;
        try { r = evaluator(theta, theta); } catch (_) { penDown = false; continue; }
        if (!isFinite(r)) { penDown = false; continue; }
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        const sx = toSx(x), sy = toSy(y);
        if (!penDown) { ctx.moveTo(sx, sy); penDown = true; } else { ctx.lineTo(sx, sy); }
      }
    } else {
      for (let i = 0; i <= n; i++) {
        const x = xMin + (i / n) * (xMax - xMin);
        let y;
        try { y = evaluator(x); } catch (_) { penDown = false; continue; }
        if (!isFinite(y)) { penDown = false; continue; }
        const sx = toSx(x), sy = toSy(y);
        if (!penDown) { ctx.moveTo(sx, sy); penDown = true; } else { ctx.lineTo(sx, sy); }
      }
    }
    ctx.stroke();
  }

  ctx.restore();

  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 1;
  ctx.strokeRect(pad.l, pad.t, pw, ph);

  ctx.fillStyle = '#888';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  for (let i = 0; i <= nGrid; i++) {
    const vx = xMin + (i / nGrid) * (xMax - xMin);
    ctx.fillText(+vx.toFixed(2), toSx(vx), pad.t + ph + 14);
  }
  ctx.textAlign = 'right';
  for (let i = 0; i <= nGrid; i++) {
    const vy = yMin + (i / nGrid) * (yMax - yMin);
    ctx.fillText(+vy.toFixed(2), pad.l - 4, toSy(vy) + 4);
  }

  return canvas;
}

export default createExtension({
  id: 'fnplot',
  containerClass: 'fnplot-diagram',

  render(div, src) {
    const mznStyle = applyMznStyle(div);
    const spec = JSON.parse(src);
    if (mznStyle.width)  spec.width  = parseInt(mznStyle.width);
    if (mznStyle.height) spec.height = parseInt(mznStyle.height);
    div.innerHTML = '';
    div.appendChild(renderFnplotCanvas(spec));
    if (mznStyle.width) div.style.width = spec.width + 'px';
  },
});
