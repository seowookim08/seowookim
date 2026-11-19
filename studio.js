import { directions } from './content.js';

const nav = document.querySelector('#concept-nav');
const frame = document.querySelector('#concept-frame');
const notes = document.querySelector('#direction-notes');
const comparison = document.querySelector('#comparison-grid');
let active = directions.find(item => item.id === location.hash.slice(1)) || directions[0];

nav.innerHTML = directions.map(d => `<button class="concept-button" type="button" data-concept="${d.id}" style="--concept-color:${d.color}"><span class="concept-number">${d.number}</span><span><strong>${d.category}</strong><small>${d.name}</small></span><span class="concept-indicator" aria-hidden="true">↗</span></button>`).join('');
comparison.innerHTML = directions.map(d => `<button type="button" class="comparison-card" data-concept="${d.id}" style="--concept-color:${d.color}"><div class="mini-art mini-${d.id}" aria-hidden="true">${d.id === 'swiss' ? '<b>Aa</b><i></i>' : d.id === 'brutal' ? '<b>CUT</b><i></i>' : d.id === 'premium' ? '<i></i><i></i><i></i>' : d.id === 'art' ? '<i></i>' : '<b>Aa.</b><i></i>'}</div><span class="comparison-name">${d.name}</span><span class="comparison-keyword">${d.keyword}</span></button>`).join('');

function selectDirection(direction, updateHash = true) {
  active = direction;
  document.querySelectorAll('[data-concept]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.concept === active.id)));
  document.querySelector('#preview-count').textContent = `${active.number} / 05`;
  document.querySelector('#preview-heading').textContent = active.name;
  document.querySelector('#preview-address').textContent = `portfolio.study / ${active.name.toLowerCase().replaceAll(' ', '-')}`;
  const url = `prototype.html?concept=${active.id}`;
  if (frame.getAttribute('src') !== url) frame.src = url;
  frame.title = `${active.category} 디자인 시안`;
  document.querySelector('#open-preview').href = url;
  notes.innerHTML = `<div class="notes-intro"><div><span class="small-label">${active.category}</span><h2 id="notes-heading">${active.subtitle}</h2></div><p>${active.summary}</p></div><div class="notes-grid"><div class="note-philosophy"><h3>디자인 철학</h3><p>${active.philosophy}</p><div class="palette">${active.palette.map(p=>`<div><span style="background:${p.hex}"></span><small>${p.name}</small><code>${p.hex}</code></div>`).join('')}</div><h3>타이포그래피</h3><p>${active.type}</p><p class="font-note">외부 폰트 요청 없이 시스템 서체를 사용합니다. 최종 서체와 라이선스는 선택 후 확정합니다.</p></div><div class="note-details"><details open><summary>Hero와 프로젝트</summary><h3>첫 화면</h3><p>${active.hero}</p><h3>작품을 보여주는 방식</h3><p>${active.projects}</p></details><details><summary>인터랙션과 차별점</summary><h3>직접 조작하는 움직임</h3><p>${active.interaction}</p><h3>이 방향만의 이유</h3><p>${active.difference}</p><h3>판단할 점</h3><p>${active.tradeoff}</p></details></div><div class="note-layout"><h3>전체 페이지로 확장하면</h3><p>${active.layout}</p><ol>${active.outline.map(label=>`<li>${label}</li>`).join('')}</ol><details class="wireframe"><summary>구조 스케치 보기</summary><pre>${active.wireframe}</pre></details></div></div>`;
  if (updateHash) history.replaceState(null, '', `#${active.id}`);
}

document.querySelectorAll('[data-concept]').forEach(button => button.addEventListener('click', () => {
  selectDirection(directions.find(d=>d.id===button.dataset.concept));
  if (button.classList.contains('comparison-card')) document.querySelector('.preview-section').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}));
document.querySelectorAll('[data-viewport]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelector('#preview-stage').classList.toggle('is-mobile',button.dataset.viewport==='mobile');
  document.querySelectorAll('[data-viewport]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
}));
addEventListener('hashchange',()=>selectDirection(directions.find(d=>d.id===location.hash.slice(1))||directions[0],false));
selectDirection(active,false);
