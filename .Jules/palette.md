## 2025-03-24 - Focus trapped beneath overlays
**Learning:** Keyboard-only users can inadvertently tab to interactive elements (`[tabindex="0"]`, buttons, etc) that are positioned "beneath" full-screen cinematic overlay components (like `#cinematic-intro`). Since the design relies on a single page flow without `<dialog>` modals, background elements were leaking focus early.
**Action:** The `<main>` wrapper must use the `inert` attribute natively while cinematic full-screen overlays are active, then have it removed via JS `removeAttribute('inert')` right before calling `.focus()` on the main content container to preserve natural tab order continuity.

## 2025-03-24 - Focus trapped beneath overlays
**Learning:** Keyboard-only users can inadvertently tab to interactive elements (`[tabindex="0"]`, buttons, etc) that are positioned "beneath" full-screen cinematic overlay components (like `#cinematic-intro`). Since the design relies on a single page flow without `<dialog>` modals, background elements were leaking focus early.
**Action:** The `<main>` wrapper must use the `inert` attribute natively while cinematic full-screen overlays are active, then have it removed via JS `removeAttribute('inert')` right before calling `.focus()` on the main content container to preserve natural tab order continuity.
