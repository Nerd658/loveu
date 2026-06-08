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

## 2024-05-01 - Custom Cursor Interaction States
**Learning:** Custom cursors require explicit interactive states because standard `:hover` states don't naturally affect a detached fixed cursor element. Additionally, simply setting `cursor: none` on `body` doesn't prevent child elements with explicit `cursor: pointer` from showing the default cursor alongside the custom one, creating a confusing dual-cursor effect.
**Action:** Always use `body, body * { cursor: none !important; }` inside the fine-pointer media query when using a custom cursor. To add hover states to the custom cursor without JavaScript listeners on every element, use the modern CSS `:has()` pseudo-class on the body: `body:has(button:hover, a:hover) #cursor::before { ... }`.
## 2024-05-30 - Focus-Visible Parity & Input-Agnostic Microcopy
**Learning:** Keyboard users navigating via focus often miss vital interactive affordances if a design system maps hover states aggressively without matching `:focus-visible` states, and language like "Clique" breaks immersion or accessibility for touch and keyboard users.
**Action:** When adding or verifying interactive CSS elements (buttons, envelopes, canvas targets), systematically ensure `, .class:focus-visible` mirrors `.class:hover` styling, and always prefer input-agnostic verbs like "Ouvrir" over "Clique".
## 2024-05-31 - Semantic Scroll Indicators
**Learning:** Decorative "scroll down" indicators are often skipped by screen readers or inaccessible via keyboard. Making them functional anchor links improves navigation flow.
**Action:** Convert decorative scroll indicators into `<a>` tags with `href` pointing to the next section, include `aria-label`, add `aria-hidden="true"` to visual children, and strip default link styling to prevent visual regressions.
## 2024-06-01 - Preserving Rich Context in ARIA Labels
**Learning:** When dynamically setting `aria-label` via JavaScript, updating it multiple times consecutively (e.g., overwriting a richer descriptive string with a shorter one before focusing) causes screen readers to only announce the final, less informative string.
**Action:** Review programmatic ARIA attribute updates to ensure they don't redundantly overwrite themselves, preserving the most complete and descriptive context for assistive technologies.

## 2024-10-24 - Custom Cursor and Disabled ARIA States
**Learning:** When custom interactive elements rely on `aria-disabled="true"` instead of native `:disabled` attributes, CSS-driven visual feedback (like custom cursors triggering via `:has(:hover)`) can trigger incorrectly, making disabled elements appear interactive.
**Action:** Ensure CSS selectors explicitly filter out disabled states by using `:not([aria-disabled="true"])` to prevent false interactive cues. Additionally, ensure decorative symbols (like '✦') within actionable elements have `aria-hidden="true"`.
