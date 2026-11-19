const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function rockMedia(asset) {
  if (asset.type !== 'rock-gallery') return null;
  return `<div class="rock-gallery" role="group" aria-label="${esc(asset.alt)}">${asset.posts.map((post, index) => `<a class="rock-post ${index === 0 ? 'rock-post-magazine' : ''}" href="${esc(post.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(post.kind)} — Instagram에서 보기"><div class="rock-frame"><img src="${esc(post.src)}" alt="${esc(post.alt)}" width="${post.width}" height="${post.height}" loading="lazy" decoding="async"><span class="rock-open" aria-hidden="true">↗</span></div><span class="rock-kind">${esc(post.kind)}</span></a>`).join('')}</div>`;
}
