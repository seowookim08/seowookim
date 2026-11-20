import { initPixelHome } from './pixel-home.js';
import { calendarGallery, initCalendars } from './calendar-gallery.js';
import { profile, stories, experiments } from './story-content.js';
import { initMementoCarousel, mementoMedia, sportsThumbnail } from './memento-media.js';
import { channelMedia } from './channel-media.js';
import { rockMedia } from './rock-media.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const lines = value => esc(value).replaceAll('\n', '<br>');
const params = new URLSearchParams(location.search);
const aboutPage = params.get('page') === 'about';
const requestedProject = params.get('project');
const selected = stories.find(project => project.id === requestedProject);
const single = Boolean(selected);
const displayedStories = single ? [selected] : stories;
const home = single || aboutPage ? './' : '';
document.body.classList.toggle('single-project', single);
document.title = aboutPage ? `About — ${profile.name}` : single ? `${selected.title} — ${profile.name}` : `${profile.name} — Portfolio`;

function media(asset, activeSlide) {
  const special = mementoMedia(asset, activeSlide) || channelMedia(asset) || rockMedia(asset);
  if (special) return special;
  if (asset.type === 'image' && asset.src) {
    const img = `<img src="${esc(asset.src)}" alt="${esc(asset.alt)}" width="${asset.width || 1200}" height="${asset.height || 850}" loading="lazy" decoding="async">`;
    return asset.layout === 'app-screen' ? `<div class="app-screen-media">${img}</div>` : img;
  }
  if (asset.type === 'video' && asset.src) {
    return `<video controls playsinline preload="metadata" ${asset.poster ? `poster="${esc(asset.poster)}"` : ''} aria-label="${esc(asset.alt)}"><source src="${esc(asset.src)}">영상을 재생할 수 없습니다.</video>`;
  }
  return '';
}

function links(items = [], label = '외부 링크') {
  return items.length ? `<nav class="resource-links" aria-label="${esc(label)}">${items.map(item => `<a href="${esc(item.href)}" target="_blank" rel="noopener noreferrer">${esc(item.label)}<span aria-hidden="true">↗</span></a>`).join('')}</nav>` : '';
}

function header() {
  return `<header class="site-header"><a class="wordmark" href="${home}#top">${esc(profile.name)}</a><nav aria-label="주요 탐색"><a href="${home}#work">Work</a><a class="small-work-link" href="${home}#experiments">Small work</a><a href="${home}#about">About</a><a href="#contact">Contact</a></nav></header>`;
}

function hero() {
  const words = profile.name.split(' ');
  const intro = profile.introduction ? `<div class="pixel-intro"><strong>${esc(profile.introduction)}</strong>${profile.introductionDetail ? `<span>${esc(profile.introductionDetail)}</span>` : ''}${profile.availability ? `<p class="pixel-availability">${esc(profile.availability)}</p>` : ''}</div>` : '';
  return `<section class="pixel-home" id="top">
    <canvas class="paper-raster" aria-hidden="true"></canvas>
    <div class="pixel-layout page-width">
      <div class="pixel-identity"><h1 aria-label="${esc(profile.name)}">${words.map(word => `<span>${esc(word)}</span>`).join('')}<canvas class="title-raster" aria-hidden="true"></canvas></h1>${intro}</div>
      <div class="pixel-work"><div class="pixel-work-head"><h2>Work</h2></div>
        <nav aria-label="프로젝트 바로가기">${stories.map(project => `<a href="?project=${esc(project.id)}"><strong>${esc(project.title)}</strong><small>${esc(project.indexLabel)}</small><span aria-hidden="true">↗</span></a>`).join('')}</nav>
      </div>
    </div></section>`;
}

function projectHeading(project) {
  const heading = single ? 'h1' : 'h2';
  return `<header class="project-heading page-width"><div class="project-title"><p class="project-category">${esc(project.category)}</p><${heading} id="${project.id}-title">${single ? esc(project.title) : `<a href="?project=${esc(project.id)}" aria-label="${esc(project.title)} 독립 페이지 열기">${esc(project.title)}</a>`}</${heading}>${project.metadata?.length ? `<dl class="project-meta">${project.metadata.map(item => `<div><dt>${esc(item.label)}</dt><dd>${esc(item.value)}</dd></div>`).join('')}</dl>` : ''}</div><div class="project-introduction"><p>${esc(project.description)}</p>${project.tools?.length ? `<dl class="project-tools"><dt>활용 툴</dt><dd>${project.tools.map(esc).join(' · ')}</dd></dl>` : ''}${links(project.links, `${project.title} 외부 링크`)}</div></header>`;
}

const expandIcon = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 8V3h5M12 3h5v5M17 12v5h-5M8 17H3v-5"/></svg>';
function expandButton(project, step) {
  return `<button class="media-expand" type="button" data-expand="${esc(project.id)}" data-step="${step}" aria-label="${esc(project.title)} 시각 자료 크게 보기">${expandIcon}<span>크게 보기</span></button>`;
}

function chapterText(chapter) {
  return `<div class="chapter-copy"><h3>${lines(chapter.title)}</h3>${chapter.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}${chapter.milestones?.length ? `<dl class="milestones">${chapter.milestones.map(item => `<div><dt>${esc(item.date)}</dt><dd>${esc(item.text)}</dd></div>`).join('')}</dl>` : ''}${links(chapter.links, `${chapter.label} 관련 링크`)}</div>`;
}

function narrative(project) {
  return `<div class="project-chapter-bar"><nav class="chapter-bar-inner page-width" aria-label="${esc(project.title)} 목차">${project.chapters.map((chapter, i) => `<a href="#${project.id}-${chapter.id}" data-chapter-link="${i}" aria-label="${esc(chapter.label)}" ${i === 0 ? 'aria-current="step"' : ''}><span class="chapter-label-full">${esc(chapter.label)}</span><span class="chapter-label-short" aria-hidden="true">${esc(chapter.shortLabel || chapter.label)}</span></a>`).join('')}</nav></div><div class="project-narrative page-width"><figure class="story-stage"><div class="story-stage-media">${project.chapters.map((chapter, i) => `<div class="stage-scene ${i === 0 ? 'is-active' : ''}" data-scene="${i}" ${i ? 'inert aria-hidden="true"' : ''}>${media(chapter.media)}</div>`).join('')}${expandButton(project, 'active')}</div><figcaption class="stage-caption">${esc(project.chapters[0].media.caption)}</figcaption></figure><div class="story-chapters">${project.chapters.map((chapter, i) => `<section class="story-chapter" id="${project.id}-${chapter.id}" data-chapter="${i}" aria-label="${esc(chapter.label)}"><figure class="inline-media"><div class="inline-media-frame">${media(chapter.media)}${expandButton(project, i)}</div><figcaption>${esc(chapter.media.caption)}</figcaption></figure>${chapterText(chapter)}</section>`).join('')}</div></div>`;
}

function projectStats(stats) {
  return `<div class="project-stats page-width"><dl>${stats.items.map(item => `<div><dd>${esc(item.value)}<span>${esc(item.unit)}</span></dd><dt>${esc(item.label)}</dt></div>`).join('')}</dl>${stats.note ? `<p>${esc(stats.note)}</p>` : ''}</div>`;
}

function extensionSection(extension) {
  return `<section class="project-extension page-width">${extension.calendars ? calendarGallery(extension.calendars) : ''}${extension.post ? `<a class="extension-post" href="${esc(extension.post.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(extension.title)} Instagram에서 보기"><img src="${esc(extension.post.src)}" alt="${esc(extension.post.alt)}" width="${extension.post.width}" height="${extension.post.height}" loading="lazy" decoding="async"><span>${esc(extension.post.label || '홍보 게시물 보기')} ↗</span></a>` : ''}<div class="extension-copy"><h3>${esc(extension.title)}</h3><p>${esc(extension.text)}</p></div></section>`;
}

function projectNotes(notes) {
  return `<section class="project-notes page-width"><h3>${lines(notes.title)}</h3><div>${notes.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}</div></section>`;
}

function project(project) {
  return `<article class="project project-${project.layout} theme-${project.theme}" id="${project.id}" aria-labelledby="${project.id}-title">${projectHeading(project)}${project.stats ? projectStats(project.stats) : ''}<div class="project-media page-width ${project.layout === 'story' ? 'project-cover' : ''}">${media(project.cover)}${project.layout === 'story' ? expandButton(project, 'cover') : ''}</div>${project.notes ? projectNotes(project.notes) : ''}${project.chapters?.length ? narrative(project) : ''}${(project.extensions || (project.extension ? [project.extension] : [])).map(extensionSection).join('')}</article>`;
}

function smallWork() {
  return `<section class="small-work page-width" id="experiments" aria-labelledby="small-work-title"><h2 id="small-work-title">작은 프로젝트</h2><div class="mini-project-list">${experiments.map(item => `<details class="mini-project"><summary>${sportsThumbnail()}<div class="mini-project-title"><p class="mini-project-category">${esc(item.category)}</p><h3>${item.url ? `<a class="mini-project-link" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${esc(item.title)}<span aria-hidden="true">↗</span></a>` : esc(item.title)}</h3><p>${esc(item.description)}</p></div><span class="mini-project-toggle" aria-hidden="true"></span></summary><div class="mini-project-description"><p>${esc(item.details)}</p></div></details>`).join('')}</div></section>`;
}

function aboutSection() {
  const { headline, introduction, chapters } = profile.about;
  return `<section class="about" id="about" aria-labelledby="about-title">
    <div class="about-inner page-width">
      <div class="about-intro">
        <h2 id="about-title">${lines(headline)}</h2>
        ${introduction.map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}
      </div>
      <div class="about-essay">
        ${chapters.map(({ title, paragraphs }) => `<section>
          <h3>${esc(title)}</h3>
          <div>${paragraphs.map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}</div>
        </section>`).join('')}
      </div>
    </div>
  </section>`;
}

function footer() {
  return `<footer class="site-footer" id="contact"><div class="footer-inner page-width"><div class="footer-identity"><p>${esc(profile.name)}</p></div><nav class="footer-links" aria-label="Seowoo Kim 연락처">${profile.phone ? `<a href="tel:${esc(profile.phone.replace(/[^\d+]/g, ''))}">${esc(profile.phone)}</a>` : ''}${profile.email ? `<a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>` : ''}${profile.links.map(item => `<a href="${esc(item.href)}" target="_blank" rel="noopener noreferrer">${esc(item.label)}<span aria-hidden="true">↗</span></a>`).join('')}</nav><a class="back-top" href="#${single ? selected.id : 'top'}" aria-label="맨 위로">↑</a></div></footer>`;
}

const unknownNotice = requestedProject && !selected ? '<p class="not-found page-width" role="status">요청한 프로젝트를 찾을 수 없어 전체 작업을 보여드립니다.</p>' : '';
document.querySelector('#app').innerHTML = aboutPage ? `${header()}<main id="top">${aboutSection()}</main>${footer()}` : `${header()}<main>${single ? '<div class="single-back page-width" id="top"><a href="./#work">← 전체 작업</a></div>' : hero()}${unknownNotice}<div id="work" class="work">${displayedStories.map(project).join('')}</div>${single ? '' : smallWork() + aboutSection()}</main>${footer()}`;
document.querySelector('.skip-link').href = aboutPage ? '#about' : single ? `#${selected.id}` : '#work';

const activeSteps = new Map(stories.filter(item => item.chapters?.length).map(item => [item.id, 0]));
const narrativeNodes = [...document.querySelectorAll('.project-story')];
const pixelHome = document.querySelector('.pixel-home');
if (pixelHome) initPixelHome(pixelHome);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let pendingFrame = 0;

function setChapter(article, index) {
  if (activeSteps.get(article.id) === index) return;
  activeSteps.set(article.id, index);
  const data = stories.find(item => item.id === article.id);
  article.querySelectorAll('[data-scene]').forEach((scene, i) => {
    const active = i === index;
    scene.classList.toggle('is-active', active);
    scene.inert = !active;
    scene.setAttribute('aria-hidden', String(!active));
    if (!active) scene.querySelector('video')?.pause();
  });
  article.querySelectorAll('[data-chapter-link]').forEach((link, i) => {
    if (i === index) link.setAttribute('aria-current', 'step');
    else link.removeAttribute('aria-current');
  });
  article.querySelector('.stage-caption').textContent = data.chapters[index].media.caption;
}

function updateScroll() {
  pendingFrame = 0;
  const line = Math.max(210, innerHeight * .37);
  narrativeNodes.forEach(article => {
    const bounds = article.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > innerHeight) return;
    let current = 0;
    article.querySelectorAll('[data-chapter]').forEach((node, i) => {
      if (node.getBoundingClientRect().top <= line) current = i;
    });
    setChapter(article, current);
  });
  closeChapterBars();
}

/* The sticky chapter bar steps aside at the end of its case so the store links there stay readable. */
const headerHeight = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
function closeChapterBars() {
  document.querySelectorAll('.project-chapter-bar').forEach(bar => {
    const tail = bar.closest('.project')?.querySelector('.story-chapter:last-child');
    if (!tail) return;
    const stuckBottom = headerHeight() + bar.offsetHeight;
    bar.classList.toggle('is-closing', tail.getBoundingClientRect().bottom < stuckBottom + 26);
  });
}
const schedule = () => { if (!pendingFrame) pendingFrame = requestAnimationFrame(updateScroll); };
addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', schedule);
addEventListener('hashchange', schedule);
addEventListener('load', schedule);
reducedMotion.addEventListener('change', schedule);
updateScroll();

const dialog = document.querySelector('#media-dialog');
let modalTrigger;
document.addEventListener('click', event => {
  const button = event.target.closest('[data-expand]');
  if (!button) return;
  const data = stories.find(item => item.id === button.dataset.expand);
  const step = button.dataset.step;
  const chapter = step === 'cover' ? null : data.chapters[step === 'active' ? activeSteps.get(data.id) : Number(step)];
  const asset = chapter ? chapter.media : data.cover;
  const activeSlide = Number(button.parentElement.querySelector('.memento-carousel')?.dataset.activeSlide ?? 0);
  modalTrigger = button;
  dialog.className = `media-dialog theme-${data.theme}`;
  dialog.innerHTML = `<div class="media-dialog-head"><h2 id="media-dialog-title">${esc(data.title)}${chapter ? ` / ${esc(chapter.label)}` : ''}</h2><button class="dialog-close" type="button" aria-label="확대 화면 닫기">닫기 <span aria-hidden="true">×</span></button></div><div class="expanded-media">${media(asset, activeSlide)}</div>${asset.caption ? `<p class="expanded-caption">${esc(asset.caption)}</p>` : ''}`;
  dialog.querySelectorAll('.memento-carousel').forEach(initMementoCarousel);
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.showModal();
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  dialog.querySelector('video')?.pause();
  modalTrigger?.focus({ preventScroll: true });
});

document.querySelectorAll('.memento-carousel').forEach(initMementoCarousel);
initCalendars();
