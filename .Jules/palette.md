## 2024-05-18 - Managing Focus on Display Transitions
**Learning:** When navigating between "screens" (e.g. intro to main page, or opening an envelope to a letter) implemented via CSS opacity/display toggles in a single page app, screen readers and keyboard users lose their place, and focus is often reset to the document body. Adding `tabindex="-1"` and programmatically focusing the newly revealed container dramatically improves the logical document flow.
**Action:** Always manually route focus (`element.focus()`) to the new top-level container (using `tabindex="-1"`) after visually hiding an active screen or element and revealing a new one.
## 2024-05-18 - Preventing Focus Leaks with Full-Screen Overlays
**Learning:** In a single page app, when using full-screen cinematic overlays instead of native `<dialog>` modals, background elements remain focusable by keyboard navigation. Users can Tab out of the overlay and interact with hidden or visually obscured elements.
**Action:** Use the `inert` attribute on the background container (like `<main>`) while the custom overlay is active. Remove the `inert` attribute right before programmatically focusing the container after the overlay is dismissed.
## 2024-04-10 - Canvas Interaction States
**Learning:** Using an HTML5 Canvas as an interactive button requires explicit manual handling for screen reader visibility (via aria-disabled and aria-label updates) and visual focus styles (via outline on :focus-visible) that native buttons get for free.
**Action:** When making custom graphics interactive, always pair the visual CSS cues (:hover/:focus) with dynamic ARIA state updates in the JS click handler.
