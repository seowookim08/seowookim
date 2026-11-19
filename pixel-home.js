export function initPixelHome(root) {
  const title = root.querySelector('h1');
  const labels = [...title.querySelectorAll('span')];
  const titleCanvas = root.querySelector('.title-raster');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const threshold = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
  const tau = Math.PI * 2;
  const cycle = 6600;
  const titleFrame = { canvas: titleCanvas, ctx: titleCanvas.getContext('2d'), pitch: 3, color: '#4830ae', offset: .65 };
  const paper = root.querySelector('.paper-raster');
  const paperCtx = paper.getContext('2d');
  const clusters = [];
  const glyph = document.createElement('canvas');
  const glyphCtx = glyph.getContext('2d', {willReadFrequently: true});
  let titleMask, playing = !motion.matches, visible = true, elapsed = 610, requested = 0, last = null, lastDraw = -Infinity;

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

  function pixelField(frame, phase, mask) {
    const {ctx,w,h,rows,columns,pitch,color,offset} = frame;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);
    
    ctx.fillStyle = color;
    
    const time = phase + offset;
    for (let y = 0; y < rows; y++) {
      const yy = y * .147;
      const sway = Math.sin(yy * 1.48 - time) * 1.36;
      for (let x = 0; x < columns; x++) {
        if (!mask[y * columns + x]) continue;
        const xx = x * .141;
        const field = Math.sin(xx + sway + time) + .73 * Math.cos(yy - xx * .53 + time) + .51 * Math.sin(xx * 1.71 + yy * 1.54 - time * 2);
        const bias = threshold[(y & 3) * 4 + (x & 3)] / 16;
        const strength = (field + 1.40) * 1.30 - bias * 1.62;
        const dot = Math.max(1.5, Math.min(pitch, 2.9 + strength * .65));
        const inset = (pitch - dot) / 2;
        const drift = Math.max(0, Math.sin(xx * .42 + yy * .3 - time) - .52) * 7;
        ctx.fillRect(x * pitch + inset, y * pitch + inset - drift, dot, dot);
      }
    }
    ctx.globalAlpha = 1;
  }

  function layoutPaper() {
    paper.width = root.clientWidth;
    paper.height = root.clientHeight;
    clusters.length = 0;
    for (let y = 0; y < paper.height + 40; y += 56) {
      for (let x = 0; x < paper.width + 40; x += 56) {
        const seed = Math.sin(x * .73 + y * .31 + 1) * 43758.5453;
        const offset = (seed - Math.floor(seed)) * tau;
        clusters.push({ x: x + 16 * Math.cos(offset), y: y + 19 * Math.sin(offset), offset });
      }
    }
  }

  function drawPaper(phase) {
    paperCtx.clearRect(0, 0, paper.width, paper.height);
    paperCtx.fillStyle = '#6849a5';
    for (const {x, y, offset} of clusters) {
      const gathering = .5 + .5 * Math.cos(phase + offset);
      const spacing = 12 - 7 * gathering;
      for (let i = 0; i < 16; i++) {
        const strength = gathering * 1.2 - threshold[i] / 22;
        if (strength <= 0) continue;
        const size = 1 + 2 * strength;
        paperCtx.globalAlpha = Math.min(.85, strength);
        paperCtx.fillRect(Math.round(x + ((i % 4) - 1.5) * spacing),
          Math.round(y + (Math.floor(i / 4) - 1.5) * spacing), size, size);
      }
    }
  }

  function draw() {
    const phase = elapsed / cycle * tau;
    drawPaper(phase);
    pixelField(titleFrame, phase, titleMask);
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
    if (last !== null) elapsed = (elapsed + Math.min(100, now - last)) % cycle;
    last = now;
    if (now - lastDraw >= 1000 / 30) {
      draw();
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
