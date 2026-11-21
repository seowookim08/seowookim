const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6Z"/></svg>';

function videoTile(video, index) {
  return `<a class="film-tile ${index === 0 ? 'film-featured' : ''}" href="${esc(video.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(video.title)} - YouTube에서 보기"><div class="film-poster"><img src="${esc(video.thumbnail)}" alt="${esc(video.title)} 영상 썸네일" width="720" height="404" loading="lazy" decoding="async"><span class="film-play">${playIcon}</span><span class="film-duration">${esc(video.duration)}</span></div><div class="film-copy"><h3>${esc(video.title)}</h3><span>조회수 ${esc(video.views.toLocaleString('ko-KR'))}회</span></div></a>`;
}

export function channelMedia(asset) {
  if (asset.type !== 'video-board') return null;
  return `<div class="video-board" role="group" aria-label="${esc(asset.alt)}">${asset.videos.map(videoTile).join('')}</div>`;
}
