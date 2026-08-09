## Milestone 3: Accessibility & Visual Design

### 1. WAVE Accessibility Audit & Documentation
The WAVE Web Accessibility Evaluation Tool was run across all three site pages (`index.html`, `projects.html`, and `contact.html`), achieving **0 Errors, 0 Contrast Errors, and 0 Alerts** across the entire site.

* **Form Label Association:** Explicitly linked all `<label>` elements to their corresponding `<input>` and `<textarea>` controls using `for` and `id` attributes so screen reader users hear the correct input prompt when navigating form fields.
* **Grouped Input Structure:** Enclosed radio option controls inside a `<fieldset>` with an explicit `<legend>` element to provide immediate group context for assistive technologies.
* **Accessible Error State Feedback:** Built dynamic DOM error state messages using `aria-describedby` and `role="alert"` instead of browser popups (`alert()`), ensuring screen reader users are notified of inline validation errors without losing focus.
* **Keyboard Focus Visibility:** Implemented distinct hover and focus states with CSS outlines on all interactive elements (navigation buttons, dropdown toggles, form fields) to ensure keyboard-only users can navigate seamlessly.
* **Aria-Expanded State Management:** Added dynamic `aria-expanded` and `aria-controls` attributes to the header accessibility dropdown button to communicate open/closed toggle states to screen readers.

### 2. WCAG AA & AAA Color Contrast Verification
All text and background color combinations were verified using the WebAIM Contrast Checker to ensure compliance across standard and high-contrast modes:

* **Dark Purple Text (`#3B0764`) on Lilac Background (`#D8B4FE`):** Contrast ratio of **8.48:1** (Passes WCAG AA & AAA for all text sizes).
* **Dark Purple Text (`#3B0764`) on Eggshell Background (`#FEF9E7`):** Contrast ratio of **14.22:1** (Passes WCAG AA & AAA for all text sizes).
* **Lilac Text (`#D8B4FE`) on Deep Eggplant Background (`#1A0728`) [High Contrast Mode]:** Contrast ratio of **10.75:1** (Passes WCAG AA & AAA for all text sizes).
* **White Text (`#FFFFFF`) on Deep Eggplant Background (`#1A0728`) [High Contrast Mode]:** Contrast ratio of **19.0:1** (Passes WCAG AA & AAA for all text sizes).

### 3. Gestalt Principles Applied
* **Principle of Proximity:** I used proximity by grouping each project's title, description, and list items inside rounded card containers with distinct inner padding and outer margins, visually separating individual projects from one another and signaling related content.
* **Principle of Similarity:** I applied similarity across the site header and body by using uniform button shapes, consistent border radius styling, cohesive purple/eggshell color palettes, and structured card layouts so users instantly recognize interactive elements and content types across all pages.
