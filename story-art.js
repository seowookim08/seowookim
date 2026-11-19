let instance = 0;

/** Original vector placeholders, replaced by project media through story-content.js. */
export function artwork(kind, step = 0) {
  const id = `art-${instance++}`;
  const grid = `<path d="M0 212.5h1200M0 425h1200M0 637.5h1200M300 0v850M600 0v850M900 0v850" fill="none" stroke="var(--art-ink)" stroke-opacity=".07"/>`;
  const fold = `<g transform="translate(600 415)"><path d="m-310 12 310-237 310 215L0 245Z" fill="url(#${id}-fold)"/><path d="M0-225 0 245-80-53Z" fill="var(--art-white)"/><path d="m0 245 310-255-222 29Z" fill="var(--art-deep)"/><path d="m-310 12 230-65L0 245Z" fill="var(--art-mid)"/><path d="m-80-53 80-172 88 244Z" fill="var(--art-pale)"/><path d="m-310 12 310 233 310-255" fill="none" stroke="var(--art-deep)" stroke-opacity=".22"/></g>`;
  const orbit = `<g transform="translate(600 420) rotate(-28)"><ellipse rx="335" ry="212" fill="none" stroke="var(--art-deep)" stroke-width="88"/><ellipse rx="247" ry="157" fill="none" stroke="var(--art-white)" stroke-width="48"/><ellipse rx="151" ry="95" fill="var(--art-mid)"/><ellipse rx="64" ry="41" fill="var(--art-paper)"/></g><circle cx="897" cy="207" r="29" fill="var(--art-contrast)"/>`;
  const modules = `<g transform="translate(330 155)">${Array.from({length:16},(_,i)=>`<rect x="${i%4*137}" y="${Math.floor(i/4)*137}" width="120" height="120" rx="${i%3===0?60:0}" fill="${i%3===0?'var(--art-pale)':i%3===1?'var(--art-deep)':'var(--art-mid)'}"/>`).join('')}</g>`;
  let form = kind === 'fold' ? fold : kind === 'orbit' ? orbit : modules;
  if(step===1) {
    form = `<g opacity=".22" transform="translate(40 25)">${form}</g><g transform="translate(-20 -10)">${form}</g><g fill="none" stroke="var(--art-white)" stroke-width="1.5" stroke-dasharray="6 8" opacity=".8"><path d="M180 425h840M600 110v630"/><circle cx="600" cy="425" r="285"/></g><g fill="var(--art-white)"><circle cx="180" cy="425" r="6"/><circle cx="1020" cy="425" r="6"/><circle cx="600" cy="110" r="6"/></g>`;
  } else if(step===2) {
    form = `<g transform="translate(-110 45) scale(.73)">${form}</g><g transform="translate(660 195)"><rect width="310" height="405" rx="5" fill="var(--art-white)"/><path d="M25 48h260M25 73h160M25 342h260M25 365h135" stroke="var(--art-deep)" stroke-width="3" opacity=".24"/><rect x="25" y="105" width="260" height="190" fill="var(--art-pale)"/><circle cx="155" cy="200" r="58" fill="var(--art-mid)"/><path d="m116 199 27 26 54-58" fill="none" stroke="var(--art-deep)" stroke-width="9"/></g><path d="M585 430h50" stroke="var(--art-white)" stroke-width="2"/><path d="m625 422 10 8-10 8" fill="none" stroke="var(--art-white)" stroke-width="2"/>`;
  } else if(step===3) {
    form = `<g transform="translate(90 60) scale(.85)">${form}</g><g transform="translate(920 130)" fill="none" stroke="var(--art-white)" stroke-width="2"><circle r="43"/><path d="m-18 0 12 13 26-29"/></g>`;
  }
  return `<svg viewBox="0 0 1200 850" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}-fold" x1="0" x2="1" y1="0" y2="1"><stop stop-color="var(--art-white)"/><stop offset="1" stop-color="var(--art-deep)"/></linearGradient><radialGradient id="${id}-shadow"><stop stop-color="var(--art-deep)" stop-opacity=".2"/><stop offset="1" stop-color="var(--art-deep)" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="850" fill="var(--art-paper)"/>${grid}<ellipse cx="600" cy="708" rx="330" ry="60" fill="url(#${id}-shadow)"/>${form}</svg>`;
}
