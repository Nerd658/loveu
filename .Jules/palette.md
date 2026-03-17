## 2024-05-24 - Focus states for custom interactive elements
**Learning:** Custom interactive elements like `div` or `canvas` with `role="button"` and `tabindex="0"` lack default browser focus indicators, making keyboard navigation difficult or impossible to track.
**Action:** Always add `:focus-visible` styles (e.g., using existing design tokens like `--gold`) to custom interactive elements to ensure keyboard accessibility without affecting mouse users.
