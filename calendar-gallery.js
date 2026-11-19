const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function calendarGallery(items) {
  return `<div class="calendar-gallery"><div class="calendar-stack" tabindex="0" role="group" aria-label="달력 디자인. 좌우 방향키 또는 스와이프로 넘기기">${items.map((item, i) => `<img class="calendar-card" src="${esc(item.src)}" alt="${esc(item.alt)}" data-label="${esc(item.label)}" width="1134" height="1610" loading="lazy" decoding="async" style="--rank:${i};z-index:${items.length-i}" ${i ? 'aria-hidden="true"' : ''}>`).join('')}</div><div class="calendar-controls"><button type="button" data-calendar-prev aria-label="이전 달력">←</button><span class="calendar-status" aria-live="polite" aria-atomic="true">${esc(items[0].label)} <span>1 / ${items.length}</span></span><button type="button" data-calendar-next aria-label="다음 달력">→</button></div></div>`;
}

export function initCalendars() {
  document.querySelectorAll('.calendar-gallery').forEach(gallery => {
    const stack = gallery.querySelector('.calendar-stack');
    const cards = [...stack.querySelectorAll('.calendar-card')];
    const status = gallery.querySelector('.calendar-status');
    let current = 0, busy = false, pointerStart = null;
    async function turn(direction) {
      if (busy || cards.length < 2) return;
      busy = true;
      const front = cards[current];
      let animation;
      try {
        if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
          animation = front.animate([
            { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${direction * 20}%, -2%) rotate(${direction * 5}deg)`, opacity: 0 },
          ], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });
          await animation.finished;
        }
        current = (current + direction + cards.length) % cards.length;
        cards.forEach((card, i) => {
          const rank = (i - current + cards.length) % cards.length;
          card.style.setProperty('--rank', rank);
          card.style.zIndex = cards.length - rank;
          card.setAttribute('aria-hidden', String(rank !== 0));
        });
        animation?.cancel();
        status.replaceChildren(document.createTextNode(cards[current].dataset.label + ' '));
        const count = document.createElement('span');
        count.textContent = `${current + 1} / ${cards.length}`;
        status.append(count);
      } finally { busy = false; }
    }
    gallery.querySelector('[data-calendar-prev]').addEventListener('click', () => turn(-1));
    gallery.querySelector('[data-calendar-next]').addEventListener('click', () => turn(1));
    stack.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      turn(event.key === 'ArrowRight' ? 1 : -1);
    });
    stack.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      pointerStart = { x: event.clientX, y: event.clientY };
      stack.setPointerCapture(event.pointerId);
    });
    stack.addEventListener('pointerup', event => {
      if (!pointerStart) return;
      const dx = event.clientX - pointerStart.x, dy = event.clientY - pointerStart.y;
      pointerStart = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) turn(dx < 0 ? 1 : -1);
    });
    stack.addEventListener('pointercancel', () => { pointerStart = null; });
    stack.addEventListener('dragstart', event => event.preventDefault());
  });
}
