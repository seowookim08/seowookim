# Portfolio editorial redesign

Approved scope: the user's 2026-11-15 request to implement the preceding removal audit and page flow. Continue in this checkout with the existing dependency-free HTML/CSS/ES modules.

## Direction

Lavender #e8e3f3, indigo #5145cc, lemon #eced9d, pearl #fbfafc, plum #322b45. Palatino for the name and project titles; Avenir Next / Apple SD Gothic Neo for reading and navigation. The sole expressive entrance is a large name opposite three offset paper links. All align left. Actual project media carries the rest of the page.

Flow: name and factual introduction → Memento → Problem → Wonderwall → compact sports project → real external links. No empty biography or contact section. Future profile text and email render only when populated.

Memento: one wide app cover; three sticky visual chapters covering implementation, user feedback, and focus/release. Problem: one large representative-video collection, credits once. Wonderwall: historical peak figures once, one actual post/reel collection, a brief merchandise note without an invented product photo. Cases retain independent URLs.

Remove workshop branding, English filler, repeated project introductions, numeric counters, duplicate notes/points, forced viewport-height chapters, repeated image galleries, and generic section endings. Keep native scrolling, clear focus, reduced motion, media enlargement, and inline mobile reading.

Rejected approaches: making every case equally long would repeat the original problem; reducing everything to small cards would lose the requested large media and detailed Memento story.

## Implementation plan

- [x] Condense project data while preserving sourced facts, user ownership, and historical metric definitions.
- [x] Rebuild the page renderer with project-specific layouts and shared accessible navigation/media controls.
- [x] Replace accumulated styles with a restrained responsive system; retain reusable native media graphics.
- [x] Verify syntax, assets, desktop/mobile layouts, anchors, standalone cases, scroll scenes, dialog keyboard behavior, and reduced motion. Save screenshots if a local browser is available.

No deployment, new dependencies, fabricated profile, or remote-media fetching is needed.
