# Redesign verification — 2026-11-15

Local URL: http://127.0.0.1:4173/

## Implementation

- Edited the existing dependency-free checkout; no dependencies or deployment added.
- Removed placeholder profile/contact sections, generic process section, workshop labels, duplicated project indexes, chapter counters, progress line, repeated callouts, and section-ending filler.
- Condensed Memento from five chapters to three, Problem from four repeated chapters to a representative-video collection, and Wonderwall from four repeated chapters to a post/reel collection and compact merchandise note.
- Rebuilt the hero index as three typographic paper links. Actual project galleries now appear once in their respective cases.
- Retained native scrolling, standalone case URLs, keyboard navigation, media enlargement, and reduced-motion support.

## Checks

- `npm run check`: passed, all 13 JavaScript modules parsed.
- Actual Chrome rendering at 1920×1080, 1440×1000, 1024×768, 820×1180, 768×1024, 650×900, 390×844, and 320×740: no horizontal overflow.
- One h1, three projects, all local anchor destinations, all local images: passed.
- Three video links and three Instagram post links retain their real destinations.
- Peak figures appear once each in visible text; examples are not presented as the peak reel.
- All three Memento chapter links: correct active scene and aria-current, heading visible below sticky navigation.
- Desktop dialog: opens, receives focus, closes with native Escape, returns focus to trigger.
- Mobile: inline media visible, desktop stage hidden, inline enlargement works.
- Reduced motion: smooth scrolling disabled, hero scroll transform reset.
- Standalone Memento, Problem, Wonderwall pages: one project and one h1 each, valid skip target, no mobile overflow.
- Unknown project query: readable fallback to all projects.
- Runtime exceptions: 0. HTTP responses with status >=400: 0.
- Final mobile cover adjustment checked again at 320, 390 and 650px: image frame proportions passed, no horizontal overflow.
- Final desktop document height at 1440×1000: 7114px, 3 narrative chapters, 9 narrative paragraphs.

The first Escape check sent an incomplete CDP key event and failed. Repeating with the correct virtual key code passed native Escape and focus restoration. No product workaround was added.

## Visual review

Reviewed actual screenshots of the desktop hero, app cover, sticky story, Problem, Wonderwall, mini project/footer, mobile hero, and mobile story. Final mobile app cover also saved after adjusting the cover height to the screen width.

Screenshots: `previews/redesign-*.png`.

Private draft indexing settings remain unchanged. Real biography, email, and a production domain were not supplied, so no fictional contact/profile or canonical URL was added.
