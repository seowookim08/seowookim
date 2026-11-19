const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function mementoMedia(asset, activeSlide = 0) {
  if(asset.type === 'app-gallery') {
    const cover = `<div class="memento-gallery" role="group" aria-label="${esc(asset.alt)}"><div class="gallery-wordmark">memento<span>오늘을, 내일의 배움으로.</span></div><div class="gallery-screens">${asset.screens.map(screen=>`<figure><img src="${esc(screen.src)}" alt="${esc(screen.alt)}" width="832" height="1800" loading="lazy" decoding="async"><figcaption>${esc(screen.label)}</figcaption></figure>`).join('')}</div></div>`;
    const posters = asset.posters.map(({src, alt}) =>
      `<img class="memento-poster" src="${esc(src)}" alt="${esc(alt)}" width="3342" height="1800" loading="lazy" decoding="async">`
    );
    const slides = [cover, ...posters];
    return `<div class="memento-carousel" role="group" aria-label="메멘토 이미지 갤러리" data-active-slide="${activeSlide}">
      <div class="memento-carousel-viewport" tabindex="0" role="group" aria-label="좌우 방향키 또는 스와이프로 이미지 넘기기">
        ${slides.map((slide, index) => `<div class="memento-slide"${index === activeSlide ? '' : ' hidden'}>${slide}</div>`).join('')}
      </div>
      <div class="memento-carousel-controls">
        <button type="button" data-memento-prev aria-label="이전 이미지"><span aria-hidden="true">←</span></button>
        <span class="memento-carousel-count" aria-live="polite" aria-atomic="true">${activeSlide + 1} / ${slides.length}</span>
        <button type="button" data-memento-next aria-label="다음 이미지"><span aria-hidden="true">→</span></button>
      </div>
    </div>`;
  }
  if(asset.type === 'memento-diagram') {
    return `<div class="memento-diagram" role="img" aria-label="${esc(asset.alt)}"><div class="diagram-clients"><span>Web<small>Cloudflare Pages</small></span><span>Android</span><span>iOS</span></div><div class="diagram-connector" aria-hidden="true"></div><div class="diagram-data"><span>로그인<small>Firebase</small></span><span>기록 · 프로필<small>Firestore</small></span></div><div class="diagram-connector" aria-hidden="true"></div><div class="diagram-functions"><strong>Cloud Functions</strong><small>서버에서 외부 API 연결</small></div><div class="diagram-connector" aria-hidden="true"></div><div class="diagram-apis"><span>카카오<small>책 검색</small></span><span>KMDb<small>영화</small></span><span>Spotify<small>음악</small></span><span>OpenAI<small>AI 코치 · 질문</small></span></div></div>`;
  }
  return null;
}

export function initMementoCarousel(carousel) {
  const slides = [...carousel.querySelectorAll('.memento-slide')];
  const viewport = carousel.querySelector('.memento-carousel-viewport');
  const count = carousel.querySelector('.memento-carousel-count');
  let current = Number(carousel.dataset.activeSlide);
  let swipeStart = null;

  function turn(direction) {
    slides[current].hidden = true;
    current = (current + direction + slides.length) % slides.length;
    slides[current].hidden = false;
    carousel.dataset.activeSlide = current;
    count.textContent = `${current + 1} / ${slides.length}`;
  }

  carousel.querySelector('[data-memento-prev]').addEventListener('click', () => turn(-1));
  carousel.querySelector('[data-memento-next]').addEventListener('click', () => turn(1));
  carousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    turn(event.key === 'ArrowRight' ? 1 : -1);
  });
  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' && event.isPrimary) {
      swipeStart = { x: event.clientX, y: event.clientY };
    }
  });
  viewport.addEventListener('pointerup', event => {
    if (!swipeStart || !event.isPrimary) return;
    const dx = event.clientX - swipeStart.x;
    const dy = event.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) turn(dx < 0 ? 1 : -1);
  });
  viewport.addEventListener('pointercancel', () => { swipeStart = null; });
}

export function sportsThumbnail() {
  return `<div class="sports-thumbnail" aria-hidden="true"><div class="sports-ticket"><div class="ticket-name">오늘의 운동회<br>증명사진</div><div class="ticket-avatar"></div><span class="ticket-type">나의 운동회 유형</span><div class="ticket-rule"></div></div><div class="sports-mini-card"><i></i><span>다른 학교의<br>새로운 친구</span></div></div>`;
}
