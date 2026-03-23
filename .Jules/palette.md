## 2024-05-18 - Managing Focus on Display Transitions
**Learning:** When navigating between "screens" (e.g. intro to main page, or opening an envelope to a letter) implemented via CSS opacity/display toggles in a single page app, screen readers and keyboard users lose their place, and focus is often reset to the document body. Adding `tabindex="-1"` and programmatically focusing the newly revealed container dramatically improves the logical document flow.
**Action:** Always manually route focus (`element.focus()`) to the new top-level container (using `tabindex="-1"`) after visually hiding an active screen or element and revealing a new one.
## 2024-05-24 - Accessibility and Typewriter Animations
**Learning:** Adding `aria-live="polite"` directly to an element that updates character-by-character (like a typewriter animation) causes severe screen reader spam, reading out each individual keystroke separately.
**Action:** For animated text, always hide the animated element from screen readers using `aria-hidden="true"`, and provide a visually hidden `.sr-only` element with the complete text and `aria-live="polite"` so screen readers can announce the entire block smoothly.
