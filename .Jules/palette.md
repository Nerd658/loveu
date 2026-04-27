## 2024-05-18 - Managing Focus on Display Transitions
**Learning:** When navigating between "screens" (e.g. intro to main page, or opening an envelope to a letter) implemented via CSS opacity/display toggles in a single page app, screen readers and keyboard users lose their place, and focus is often reset to the document body. Adding `tabindex="-1"` and programmatically focusing the newly revealed container dramatically improves the logical document flow.
**Action:** Always manually route focus (`element.focus()`) to the new top-level container (using `tabindex="-1"`) after visually hiding an active screen or element and revealing a new one.
## 2024-05-18 - Preventing Focus Leaks with Full-Screen Overlays
**Learning:** In a single page app, when using full-screen cinematic overlays instead of native `<dialog>` modals, background elements remain focusable by keyboard navigation. Users can Tab out of the overlay and interact with hidden or visually obscured elements.
**Action:** Use the `inert` attribute on the background container (like `<main>`) while the custom overlay is active. Remove the `inert` attribute right before programmatically focusing the container after the overlay is dismissed.
## 2024-05-18 - Managing State and Focus for Canvas Interactive Elements
**Learning:** When using a `<canvas>` element as an interactive button (using `role="button"` and `tabindex="0"`), default browser behavior doesn't visually accommodate custom shapes (like circles) for focus rings. Furthermore, changes to the canvas's interactive state are not automatically conveyed to screen readers.
**Action:** Always provide custom `:focus-visible` styles (e.g., matching the element's border-radius) for non-standard elements like canvas buttons. Manually update `aria-disabled` and `aria-label` attributes via JavaScript upon interaction to ensure state changes are communicated to assistive technologies.
## 2024-05-18 - Typewriter Accessibility and Security
**Learning:** Using `aria-live` for typewriter/character-by-character animations creates excessive screen reader verbosity, and updating text via `innerHTML` opens potential DOM XSS vectors.
**Action:** Instead of `aria-live`, set the full text as the `aria-label` on the focused parent container and use `aria-hidden="true"` on the animating child nodes. Update text dynamically using `textContent` and programmatically create and append cursor elements (`document.createElement`) to avoid injecting HTML strings.
## 2024-05-18 - Managing Screen Reader Verbosity with Typewriter Effects
**Learning:** Using `aria-live="polite"` on elements with typewriter or character-by-character animations creates excessive verbosity, as screen readers will announce every single appended character.
**Action:** Remove `aria-live` from the animating text container. Instead, set the full text as the `aria-label` on the parent container right before focusing it, and add `aria-hidden="true"` to the animating children so the text is announced smoothly once.
## 2024-05-18 - Delightful Custom Cursor Interaction
**Learning:** Adding a subtle scale animation (e.g., `transform: scale(1.8)`) to a custom pointer cursor when hovering interactive elements provides an intuitive and elegant visual feedback that delights users.
**Action:** When implementing custom cursors, ensure the default pointer is completely hidden (`cursor: none !important`) on interactive elements and use CSS `:has()` pseudo-class to scale the custom cursor when any interactive child is hovered.
