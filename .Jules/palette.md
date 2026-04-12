## 2024-05-18 - Managing Focus on Display Transitions
**Learning:** When navigating between "screens" (e.g. intro to main page, or opening an envelope to a letter) implemented via CSS opacity/display toggles in a single page app, screen readers and keyboard users lose their place, and focus is often reset to the document body. Adding `tabindex="-1"` and programmatically focusing the newly revealed container dramatically improves the logical document flow.
**Action:** Always manually route focus (`element.focus()`) to the new top-level container (using `tabindex="-1"`) after visually hiding an active screen or element and revealing a new one.
## 2024-05-18 - Preventing Focus Leaks with Full-Screen Overlays
**Learning:** In a single page app, when using full-screen cinematic overlays instead of native `<dialog>` modals, background elements remain focusable by keyboard navigation. Users can Tab out of the overlay and interact with hidden or visually obscured elements.
**Action:** Use the `inert` attribute on the background container (like `<main>`) while the custom overlay is active. Remove the `inert` attribute right before programmatically focusing the container after the overlay is dismissed.

## 2024-05-24 - Interactive Canvas Elements
**Learning:** When using `<canvas>` elements as interactive buttons, they lack native disabled states and focus rings. This can lead to confusing experiences for keyboard and screen reader users when the interaction state changes.
**Action:** Explicitly provide visual hover/focus states via CSS (respecting the shape, e.g., `border-radius: 50%`) and manually update `aria-disabled` and `aria-label` attributes to ensure interactive states and state changes are communicated to screen readers.
