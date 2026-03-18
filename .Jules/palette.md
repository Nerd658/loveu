## 2025-01-20 - Keyboard Navigation Hidden on Interactive Elements
**Learning:** Adding `tabindex="0"` and `role="button"` to non-standard elements (like canvas or div) makes them technically focusable, but without explicit `:focus-visible` styles, screen-reader and keyboard users get no visual indication of their current position.
**Action:** Always pair `tabindex="0"` on custom interactive elements with a global `:focus-visible` styling using the design system`s native focus color.
