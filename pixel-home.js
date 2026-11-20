export function initPixelHome(root) {
  const title = root.querySelector('h1');
  const labels = [...title.querySelectorAll('span')];
  const titleCanvas = root.querySelector('.title-raster');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const threshold = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
  const tau = Math.PI * 2;
  const cycle = 6600;
  const waveStepX = .047;
  const waveStepY = .0735;
  const introMs = 1250;
  const titleFrame = { canvas: titleCanvas, ctx: titleCanvas.getContext('2d'), pitch: 3, color: '#4830ae', offset: .65 };
  const paper = root.querySelector('.paper-raster');
  const paperCtx = paper.getContext('2d');
  let paperImage, originX, originY;
  const glyph = document.createElement('canvas');
  const glyphCtx = glyph.getContext('2d', {willReadFrequently: true});
  let titleMask, playing = !motion.matches, visible = true, elapsed = 610, introAt = 0, requested = 0, last = null, lastDraw = -Infinity, introFrames = 0;

  /* A cheap per-cell hash so each pixel can settle on its own beat. */
  function grain(x, y) {
    let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }

  function resize(frame) {
    frame.w = Math.ceil(frame.canvas.clientWidth);
    frame.h = Math.ceil(frame.canvas.clientHeight);
    frame.canvas.width = frame.w;
    frame.canvas.height = frame.h;
    frame.columns = Math.ceil(frame.w / frame.pitch);
    frame.rows = Math.ceil(frame.h / frame.pitch);
  }

  function buildTitle() {
    const {w, h, columns, rows} = titleFrame;
    if (!w || !h) return;
    glyph.width = w;
    glyph.height = h;
    const css = getComputedStyle(title);
    const context = glyphCtx;
    context.font = `${css.fontWeight} ${css.fontSize} ${css.fontFamily}`;
    if ('letterSpacing' in context) context.letterSpacing = css.letterSpacing;
    const top = title.getBoundingClientRect().top;
    for (const label of labels) {
      const value = label.textContent;
      const bounds = context.measureText(value);
      const line = label.getBoundingClientRect();
      const baseline = line.top - top + (line.height + bounds.actualBoundingBoxAscent - bounds.actualBoundingBoxDescent) / 2;
      context.fillText(value, 1, baseline);
    }
    const data = context.getImageData(0, 0, w, h).data;
    titleMask = new Uint8Array(columns * rows);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const xx = Math.min(w - 1, x * titleFrame.pitch + 1);
        const yy = Math.min(h - 1, y * titleFrame.pitch + 1);
        titleMask[y * columns + x] = data[(yy * w + xx) * 4 + 3] > 200;
      }
    }
    title.setAttribute('data-rendered', '');
  }

  function wave(xx, yy, sway, time) {
    return Math.sin(xx + sway + time) + .73 * Math.cos(yy - xx * .53 + time)
      + .51 * Math.sin(xx * 1.71 + yy * 1.54 - time * 2);
  }

  function pixelField(frame, phase, mask, p) {
    const {ctx,w,h,rows,columns,pitch,color,offset} = frame;
    if (!w || !h || !mask) return;
    ctx.clearRect(0, 0, w, h);
    
    ctx.fillStyle = color;
    
    const time = phase + offset;
    const assembling = p < 1;
    const bloom = assembling ? Math.sin(Math.min(1, Math.max(0, (p - .84) / .16)) * Math.PI) : 0;
    let alphaStep = -1;
    ctx.globalAlpha = 1;
    for (let y = 0; y < rows; y++) {
      const yy = y * waveStepY;
      const sway = Math.sin(yy * 1.48 - time) * 1.36;
      const sweepY = (y / rows) * .42;
      for (let x = 0; x < columns; x++) {
        if (!mask[y * columns + x]) continue;
        const xx = x * waveStepX;
        const field = wave(xx, yy, sway, time);
        const bias = threshold[(y & 3) * 4 + (x & 3)] / 16;
        const strength = (field + 1.40) * 1.30 - bias * 1.62;
        let dot = Math.max(1.5, Math.min(pitch, 2.9 + strength * .65));
        let dx = 0, dy = 0, alpha = 1;
        /* Intro: each pixel drifts up from a scattered spot and settles in a diagonal sweep, so the name writes itself in. */
        if (assembling) {
          const seed = grain(x, y);
          const order = Math.min(1, ((x / columns) * .58 + sweepY) * .84 + seed * .16);
          const local = Math.min(1, Math.max(0, (p - order * .45) / .55));
          const remain = 1 - local;
          const settle = local * local * (3 - 2 * local);
          if (seed > .48 + .52 * settle) continue;
          dx = (grain(x + 11, y + 5) - .5) * 15 * remain;
          dy = remain * (6 + seed * 14);
          dot = Math.max(1.2, dot * (.58 + .42 * settle));
          alpha = .34 + .66 * settle;
        }
        if (bloom) dot += (pitch - dot) * bloom;
        const inset = (pitch - dot) / 2;
        const drift = Math.max(0, Math.sin(xx * .42 + yy * .3 - time) - .52) * 7;
        const step = Math.round(alpha * 16);
        if (step !== alphaStep) { alphaStep = step; ctx.globalAlpha = step / 16; }
        ctx.fillRect(x * pitch + inset + dx, y * pitch + inset - drift + dy, dot, dot);
      }
    }
    ctx.globalAlpha = 1;
  }

  function layoutPaper() {
    const pitch = titleFrame.pitch;
    paper.width = Math.max(1, Math.ceil(root.clientWidth / pitch));
    paper.height = Math.max(1, Math.ceil(root.clientHeight / pitch));
    const area = root.getBoundingClientRect();
    const name = titleCanvas.getBoundingClientRect();
    originX = (name.left - area.left) / pitch;
    originY = (name.top - area.top) / pitch;
    paperImage = paperCtx.createImageData(paper.width, paper.height);
    for (let i = 0; i < paperImage.data.length; i += 4) {
      paperImage.data[i] = 72;
      paperImage.data[i + 1] = 48;
      paperImage.data[i + 2] = 174;
    }
  }

  function drawPaper(phase) {
    const time = phase + titleFrame.offset;
    let alpha = 3;
    for (let y = 0; y < paper.height; y++) {
      const row = y - originY;
      const yy = row * waveStepY;
      const sway = Math.sin(yy * 1.48 - time) * 1.36;
      for (let x = 0; x < paper.width; x++, alpha += 4) {
        const col = x - originX;
        const field = wave(col * waveStepX, yy, sway, time);
        const grainValue = threshold[(Math.round(row) & 3) * 4 + (Math.round(col) & 3)] / 16;
        paperImage.data[alpha] = (field + .65 - grainValue * 1.8) * 100;
      }
    }
    paperCtx.putImageData(paperImage, 0, 0);
  }

  const introDone = () => !playing || introAt >= introMs;

  function draw(skipPaper) {
    const phase = elapsed / cycle * tau;
    if (!skipPaper) drawPaper(phase);
    pixelField(titleFrame, phase, titleMask, introDone() ? 1 : introAt / introMs);
  }
  function redraw() {
    layoutPaper();
    resize(titleFrame);
    buildTitle();
    draw();
  }
  function step(now) {
    requested = 0;
    if (!playing || !visible || document.hidden) return;
    if (last !== null) {
      const delta = Math.min(100, now - last);
      elapsed = (elapsed + delta) % cycle;
      if (introAt < introMs) introAt = Math.min(introMs, introAt + delta);
    }
    last = now;
    const interval = introDone() ? 1000 / 30 : 1000 / 60;
    if (now - lastDraw >= interval) {
      /* While the title assembles every frame counts; the paper field can keep its 30fps cadence. */
      draw(introDone() ? false : (introFrames++ & 1) === 1);
      lastDraw = now;
    }
    requested = requestAnimationFrame(step);
  }
  function sync() {
    last = null;
    cancelAnimationFrame(requested);
    requested = playing && visible && !document.hidden ? requestAnimationFrame(step) : 0;
  }
  if (!titleFrame.ctx || !glyphCtx || !paperCtx) return;
  redraw();
  const sizeObserver = new ResizeObserver(redraw);
  sizeObserver.observe(root);
  sizeObserver.observe(title);
  document.fonts.ready.then(redraw);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  observer.observe(root);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', event => { playing = !event.matches; sync(); });
  sync();
}
