import { portfolio, directions } from './content.js';

const concept = new URLSearchParams(location.search).get('concept');
const direction = directions.find(d=>d.id===concept) || directions[0];
const projects = portfolio.projects;
const nameOnTwoLines = `${portfolio.name.replace(' ', '<br>')}.`;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
document.body.dataset.concept = direction.id;
document.title = `${direction.name} — Portfolio study`;

let graphicId = 0;
function graphic(kind, className='') {
  const id = `g${graphicId++}`;
  const artwork = kind === 'fold'
    ? `<g class="fold-object"><path d="M145 213 302 93 455 199 300 328Z" fill="url(#${id})"/><path d="m302 93-2 235-40-148Z" fill="var(--art-light)"/><path d="m300 328 155-129-110 14Z" fill="var(--art-dark)"/><path d="m145 213 115-33 40 148Z" fill="var(--art-mid)"/><path d="m260 180 42-87 43 120Z" fill="var(--art-pale)"/><path d="m145 213 155 115 155-129" stroke="var(--art-dark)" stroke-opacity=".25" fill="none"/></g>`
    : kind === 'orbit'
      ? `<g transform="translate(300 210) rotate(-28)"><ellipse rx="170" ry="104" fill="none" stroke="var(--art-dark)" stroke-width="46"/><ellipse rx="126" ry="75" fill="none" stroke="var(--art-light)" stroke-width="25"/><ellipse rx="78" ry="48" fill="var(--art-mid)"/><ellipse rx="35" ry="22" fill="var(--art-bg)"/></g><circle cx="437" cy="112" r="19" fill="var(--art-pale)"/>`
      : `<g transform="translate(163 74)">${Array.from({length:16},(_,i)=>`<rect x="${i%4*68}" y="${Math.floor(i/4)*68}" width="58" height="58" rx="${i%3===0?29:0}" fill="${i%3===0?'var(--art-light)':i%3===1?'var(--art-dark)':'var(--art-mid)'}" transform="rotate(${i%2===0?0:90} ${i%4*68+29} ${Math.floor(i/4)*68+29})"/>`).join('')}</g>`;
  return `<svg class="project-graphic ${className}" viewBox="0 0 600 420" role="img" aria-label="${kind==='fold'?'접힌 종이 형태의 기하 그래픽':kind==='orbit'?'겹쳐진 타원 형태의 그래픽':'반복된 모듈 형태의 그래픽'}"><defs><linearGradient id="${id}" x1="0" x2="1" y1="0" y2="1"><stop stop-color="var(--art-light)"/><stop offset="1" stop-color="var(--art-dark)"/></linearGradient></defs><rect width="600" height="420" fill="var(--art-bg)"/><path d="M0 210h600M300 0v420" stroke="var(--art-dark)" stroke-opacity=".08"/>${artwork}</svg>`;
}

function header() {
  return `<header class="site-header"><a class="site-name" href="#top">${portfolio.name}<span aria-hidden="true">${direction.id==='personal'?'.':'↗'}</span></a><nav aria-label="시안 내부 탐색"><a href="#work">Work</a><a href="#process">Approach</a><a href="#prototype-end">Info</a></nav><span class="draft-label">Design study</span></header>`;
}
function end() {
  return `<footer class="site-footer" id="prototype-end"><span>${portfolio.name}</span><p>디자인 시안입니다. 이름·소개·프로젝트는 임시 콘텐츠입니다.<br>About과 Contact는 방향 선택 후 실제 정보로 구성합니다.</p><a href="#top" aria-label="시안 맨 위로">↑</a></footer>`;
}
function projectButton(project, label='프로젝트 살펴보기', className='text-button') {
  return `<button type="button" class="${className}" data-project="${project.id}">${label}<span aria-hidden="true">↗</span></button>`;
}
function process(kind) {
  const content = kind==='brutal' ? ['질문하기.','만들어보기.','다시 생각하기.'] : kind==='personal' ? ['무엇을 보았는지','어떤 선택을 했는지','다음에는 무엇을 바꿀지'] : ['문제의 맥락','선택의 이유','결과와 배운 점'];
  return `<section class="process-section" id="process"><div class="process-heading"><h2>${kind==='personal'?'Behind the work.':kind==='brutal'?'HOW IT HAPPENS.':'Thinking & process'}</h2><p>결과만큼 중요한, 그 사이의 생각들.<br><span>실제 과정과 의사결정은 추후 추가합니다.</span></p></div><div class="process-items">${content.map((text,i)=>`<div><span class="process-symbol" aria-hidden="true">${['○','◐','●'][i]}</span><h3>${text}</h3><p>${['문제와 제약을 기록할 자리','대안과 의사결정을 기록할 자리','배운 점과 다음 시도를 기록할 자리'][i]}</p></div>`).join('')}</div></section>`;
}

const templates = {
  swiss: () => `${header()}<main id="top"><section class="swiss-hero"><div class="swiss-context"><span>Independent portfolio</span><span>${portfolio.role}</span></div><div class="swiss-hero-title"><h1>${nameOnTwoLines}</h1><div class="swiss-circle" aria-hidden="true"><span>↗</span></div></div><div class="swiss-hero-bottom"><span class="swiss-edition">Selected work<br>and ways of thinking.</span><p>${portfolio.introduction}</p><a href="#work" aria-label="작품 색인으로 이동">↓</a></div></section><section class="swiss-work" id="work"><div class="work-title"><h2>Work index</h2><span>프로젝트 색인 / ${projects.length} projects</span></div>${projects.map((p,i)=>`<details class="swiss-project" ${i===0?'open':''}><summary><span class="project-title">${p.title}</span><span class="project-category">${p.category}</span><span class="project-toggle" aria-hidden="true"></span></summary><div class="swiss-project-content"><div class="swiss-art art-${p.media}">${graphic(p.media)}</div><div class="swiss-project-copy"><span class="content-label">${p.year}</span><h3>${p.title}</h3><p>${p.description}</p>${projectButton(p,'케이스 스터디 구조 보기')}</div></div></details>`).join('')}</section>${process('swiss')}</main>${end()}`,
  brutal: () => `${header()}<main id="top"><section class="brutal-hero"><div class="brutal-topline"><span>A portfolio in progress</span><span>${portfolio.role}</span></div><div class="brutal-name"><h1>${portfolio.name.toUpperCase().replace(' ', '<br>')}</h1><div class="blue-beam" aria-hidden="true"></div><div class="brutal-note"><span class="tape" aria-hidden="true"></span><p>생각은<br>형태가<br>된다.</p><span>임시 디자인 문구</span></div></div><div class="brutal-hero-bottom"><p>${portfolio.introduction}</p><button id="reassemble" type="button">다시 조립 <span aria-hidden="true">⤮</span></button></div></section><section class="brutal-work" id="work"><div class="brutal-work-heading"><h2>WORK, IN VIEW.</h2><span>프로젝트 임시 데이터</span></div>${projects.map((p,i)=>`<article class="brutal-project brutal-project-${i}"><div class="brutal-project-copy"><span>${p.category}</span><h3>${p.title.replace(' ','<br>')}</h3><p>${p.description}</p>${projectButton(p,'열어보기','brutal-project-button')}</div><div class="brutal-project-art art-${p.media}">${graphic(p.media)}<span class="art-note">자체 제작 그래픽 / 이미지 교체 가능</span></div></article>`).join('')}</section>${process('brutal')}</main>${end()}`,
  premium: () => `${header()}<main id="top"><section class="premium-hero"><div class="premium-title"><span class="premium-role">${portfolio.role}</span><h1>${portfolio.name}.</h1><p>${portfolio.introduction}</p></div><div class="lens-scene" aria-hidden="true"><div class="lens-ground"></div><div class="lens-assembly"><div class="lens-body"></div><div class="lens-ring ring-outer"></div><div class="lens-ring ring-middle"></div><div class="lens-ring ring-inner"></div><div class="lens-core"></div><div class="lens-highlight"></div></div><span class="lens-caption lens-caption-left">A study in perspective</span><span class="lens-caption lens-caption-right">Form meets function</span></div><a href="#work" class="premium-explore">Explore selected work <span aria-hidden="true">↓</span></a></section><section class="premium-work" id="work"><div class="work-title"><h2>Selected work</h2><span>하나의 작품에, 하나의 초점.</span></div><div class="premium-stage" id="premium-stage"></div><div class="stage-controls"><div class="stage-dots" role="group" aria-label="프로젝트 선택">${projects.map((p,i)=>`<button type="button" aria-label="${p.title} 보기" aria-pressed="${i===0}" data-slide="${i}"><span></span></button>`).join('')}</div><span id="stage-label">${projects[0].title}</span><div class="stage-arrows"><button type="button" id="previous-project" aria-label="이전 프로젝트">‹</button><button type="button" id="next-project" aria-label="다음 프로젝트">›</button></div></div></section>${process('premium')}</main>${end()}`,
  art: () => `${header()}<main id="top"><section class="art-hero"><canvas id="field-canvas" aria-hidden="true"></canvas><div class="art-hero-top"><span>Notes from an open field.</span><span>${portfolio.role}</span></div><div class="art-hero-center"><span class="art-intro">An interaction, then an introduction.</span><h1>${portfolio.name}.</h1><p>${portfolio.introduction}</p></div><div class="field-controls"><label for="density">Field density<input type="range" min="35" max="100" value="65" id="density"><output for="density" id="density-output">65%</output></label><button type="button" id="pause-field" aria-pressed="false">움직임 정지 <span aria-hidden="true">Ⅱ</span></button></div><p class="field-hint">${matchMedia('(pointer:coarse)').matches?'밀도를 조절해 형태를 바꿔보세요.':'포인터를 움직여 장의 변화를 살펴보세요.'}</p></section><section class="art-work" id="work"><div class="work-title"><h2>Collected works</h2><span>Experiments in making.</span></div>${projects.map(p=>`<article class="art-project"><div class="art-project-copy"><span>${p.category}</span><h3>${p.title}</h3><p>${p.description}</p>${projectButton(p,'프로젝트 살펴보기')}</div><div class="art-project-art art-${p.media}">${graphic(p.media)}</div></article>`).join('')}</section>${process('art')}</main>${end()}`,
  personal: () => `${header()}<main id="top"><section class="personal-hero"><div class="personal-intro"><span class="personal-role">${portfolio.role}</span><h1>${nameOnTwoLines}</h1><p>${portfolio.introduction}</p><a href="#work" class="personal-work-link">작업물 들여다보기 <span aria-hidden="true">↓</span></a></div><div class="personal-stack-area"><div class="personal-star" aria-hidden="true">✳</div><div class="personal-stack" id="personal-stack">${projects.map((p,i)=>`<button type="button" class="stack-card art-${p.media}" data-stack="${i}" aria-label="${p.title} 앞으로 꺼내기" style="--position:${i}"><div class="stack-caption"><span>${p.title}</span><span aria-hidden="true">↗</span></div>${graphic(p.media)}<span class="stack-card-foot">A placeholder for a real project.</span></button>`).join('')}</div><div class="stack-controls"><span>조금씩, 다른 시선으로.</span><button id="next-stack" type="button">다음 작업물 <span aria-hidden="true">⤮</span></button></div><div class="stack-live sr-only" aria-live="polite" id="stack-live"></div></div><div class="personal-hero-foot"><span>An assembly of work & thought.</span><span>Always personal.</span></div></section><section class="personal-work" id="work"><div class="work-title"><h2>A few things,<br>put into the world.</h2><p>프로젝트가 들어갈 자리.<br>작품마다 다른 비례와 호흡으로.</p></div><div class="personal-work-grid">${projects.slice(0,2).map(p=>`<article class="personal-project"><button class="personal-art-button art-${p.media}" type="button" data-project="${p.id}" aria-label="${p.title} 케이스 스터디 구조 보기">${graphic(p.media)}<span aria-hidden="true">↗</span></button><div class="personal-project-title"><h3>${p.title}</h3><span>${p.category}</span></div><p>${p.description}</p></article>`).join('')}</div></section>${process('personal')}</main>${end()}`,
};

document.querySelector('#app').innerHTML = templates[direction.id]();

const dialog = document.createElement('dialog');
dialog.className = 'project-dialog';
dialog.setAttribute('aria-labelledby', 'dialog-title');
document.body.append(dialog);
let lastTrigger;
function openProject(project, trigger) {
  lastTrigger=trigger;
  dialog.innerHTML=`<div class="dialog-top"><span>Case study / structure preview</span><button type="button" class="dialog-close" aria-label="케이스 스터디 미리보기 닫기">×</button></div><h2 id="dialog-title">${project.title}</h2><p class="dialog-intro">케이스 스터디의 구조를 확인하는 화면입니다.<br>실제 프로젝트 내용과 성과는 아직 작성하지 않았습니다.</p><dl><div><dt>Overview</dt><dd>프로젝트 배경, 기간, 본인의 역할</dd></div><div><dt>Context</dt><dd>문제 정의, 사용자 맥락, 제약 조건</dd></div><div><dt>Decisions</dt><dd>검토한 대안과 선택한 접근의 근거</dd></div><div><dt>Outcome</dt><dd>확인 가능한 결과, 배운 점, 다음 단계</dd></div></dl><p class="dialog-note">이미지·영상·검증된 수치는 실제 자료를 받은 후 추가합니다.</p>`;
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.showModal();
}
document.addEventListener('click',event=>{
  const trigger=event.target.closest('[data-project]');
  if (!trigger) return;
  const project=projects.find(p=>p.id===trigger.dataset.project);
  if (project) openProject(project, trigger);
});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>lastTrigger?.focus());

// One direct interaction per art direction. Native scrolling is preserved.
if (direction.id==='swiss') {
  const hero=document.querySelector('.swiss-hero');
  hero.addEventListener('pointermove',event=>{
    if(reducedMotion.matches)return;
    const bounds=hero.getBoundingClientRect();
    const x=(event.clientX-bounds.left)/bounds.width-.5;
    document.querySelector('.swiss-circle').style.transform=`translateX(${x*9}px) rotate(${x*12}deg)`;
  });
  hero.addEventListener('pointerleave',()=>document.querySelector('.swiss-circle').style.transform='');
}

if(direction.id==='brutal') {
  let composition=0;
  document.querySelector('#reassemble').addEventListener('click',()=>{
    composition=(composition+1)%3;
    document.querySelector('.brutal-hero').dataset.composition=composition;
  });
}

if(direction.id==='premium') {
  let current=0;
  function showSlide(index){
    current=(index+projects.length)%projects.length;
    const p=projects[current];
    document.querySelector('#premium-stage').innerHTML=`<div class="premium-project-art art-${p.media}">${graphic(p.media)}</div><div class="premium-project-copy"><span>${p.category}</span><h3>${p.title}</h3><p>${p.description}</p>${projectButton(p,'케이스 스터디 구조 보기')}</div>`;
    document.querySelectorAll('[data-slide]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.slide)===current)));
    document.querySelector('#stage-label').textContent=p.title;
  }
  showSlide(0);
  document.querySelector('#next-project').addEventListener('click',()=>showSlide(current+1));
  document.querySelector('#previous-project').addEventListener('click',()=>showSlide(current-1));
  document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>showSlide(Number(b.dataset.slide))));
  const scene=document.querySelector('.lens-scene');
  scene.addEventListener('pointermove',event=>{
    if(reducedMotion.matches)return;
    const b=scene.getBoundingClientRect();
    scene.style.setProperty('--light-x',`${(event.clientX-b.left)/b.width*100}%`);
    scene.style.setProperty('--light-y',`${(event.clientY-b.top)/b.height*100}%`);
  });
}

if(direction.id==='personal') {
  let front=2;
  function arrange(index) {
    front=index;
    document.querySelectorAll('[data-stack]').forEach(card=>{
      const position=(Number(card.dataset.stack)-front+2+projects.length)%projects.length;
      card.style.setProperty('--position',position);
      card.setAttribute('aria-label',`${projects[Number(card.dataset.stack)].title}${position===2?' 선택됨. 케이스 스터디 구조 보기':' 앞으로 꺼내기'}`);
    });
    document.querySelector('#stack-live').textContent=`${projects[front].title} 선택됨`;
  }
  document.querySelector('#next-stack').addEventListener('click',()=>arrange((front+1)%projects.length));
  document.querySelectorAll('[data-stack]').forEach(card=>card.addEventListener('click',()=>{
    const index=Number(card.dataset.stack);
    if(index===front) openProject(projects[index],card);
    else arrange(index);
  }));
  arrange(front);
}

if(direction.id==='art') initField();
function initField(){
  const canvas=document.querySelector('#field-canvas');
  const context=canvas.getContext('2d');
  const hero=document.querySelector('.art-hero');
  const slider=document.querySelector('#density');
  const pause=document.querySelector('#pause-field');
  let width=0,height=0,density=.65,paused=reducedMotion.matches,visible=true,raf=0,phase=0;
  const pointer={x:-1000,y:-1000};
  function resize(){
    const b=hero.getBoundingClientRect();width=b.width;height=b.height;
    const dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    context.setTransform(dpr,0,0,dpr,0,0);
    draw();
  }
  function draw(){
    context.clearRect(0,0,width,height);
    const rings=Math.round(18+density*18),steps=width<600?58:92;
    const centerX=width*.5,centerY=height*.47;
    const scaleX=width*.435,scaleY=Math.min(height*.4,width*.37);
    for(let ring=0;ring<rings;ring++){
      const v=ring/(rings-1),radius=.59+v*.41;
      for(let i=0;i<steps;i++){
        const a=i/steps*Math.PI*2;
        const wave=1+.105*Math.sin(a*3+v*3+phase)+.055*Math.cos(a*5-v*5);
        let x=centerX+Math.cos(a)*scaleX*radius*wave;
        let y=centerY+Math.sin(a)*scaleY*radius*wave+Math.cos(a*2+v*2)*24;
        if(!paused){const dx=x-pointer.x,dy=y-pointer.y,dist=Math.hypot(dx,dy);if(dist<120&&dist>0){const force=(1-dist/120)*26;x+=dx/dist*force;y+=dy/dist*force;}}
        const alpha=.23+.6*(Math.sin(a+v*2)*.5+.5);
        context.fillStyle=`rgba(210,255,106,${alpha})`;
        context.beginPath();context.arc(x,y,width<600?.85:1.05,0,Math.PI*2);context.fill();
      }
    }
  }
  function tick(){raf=0;if(paused||!visible||document.hidden)return;phase+=.002;draw();raf=requestAnimationFrame(tick);}
  function sync(){cancelAnimationFrame(raf);raf=0;pause.setAttribute('aria-pressed',String(paused));pause.innerHTML=paused?'움직임 재생 <span aria-hidden="true">▷</span>':'움직임 정지 <span aria-hidden="true">Ⅱ</span>';if(!paused&&visible&&!document.hidden)raf=requestAnimationFrame(tick);else draw();}
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(hero);
  hero.addEventListener('pointermove',event=>{const b=hero.getBoundingClientRect();pointer.x=event.clientX-b.left;pointer.y=event.clientY-b.top;});
  hero.addEventListener('pointerleave',()=>{pointer.x=-1000;pointer.y=-1000;});
  slider.addEventListener('input',()=>{density=Number(slider.value)/100;document.querySelector('#density-output').value=`${slider.value}%`;if(paused)draw();});
  pause.addEventListener('click',()=>{paused=!paused;sync();});
  reducedMotion.addEventListener('change',event=>{paused=event.matches;sync();});
  document.addEventListener('visibilitychange',sync);
  resize();sync();
}
