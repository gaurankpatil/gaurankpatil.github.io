# Homepage eLearning Card QA

## Static checks passed

- Exactly one `h1`
- No duplicate IDs
- Three carousel panels and three matching selector tabs
- Every tab `aria-controls` value points to a real panel
- Every panel `aria-labelledby` value points to a real tab
- The eLearning CTA and image both link to `elearning.html`
- The third selector uses `data-carousel-tab="2"`
- Carousel numbering is `01 / 03`, `02 / 03`, and `03 / 03`
- The counter fallback is `1 / 3`, and JavaScript derives the total from the slide count
- The eLearning panel and selector both reference the supplied synthetic hero visual
- The eLearning SVG parses successfully
- All images retain `src`, `width`, `height`, and `alt` attributes
- CSS braces are balanced
- JavaScript passes `node --check`
- Existing carousel JavaScript remains data-driven and supports three projects

## Manual checks after repository integration

- Confirm `elearning.html` is present at the repository root
- Confirm `assets/css/elearning-case-study.css` and all eLearning case-study assets remain present
- Review at 1440, 1280, 768, 390, and 360 px
- Test mouse, keyboard, touch swipe, previous, and next navigation
- Confirm visible focus on all three selector cards and CTAs
- Confirm project thumbnails remain legible and are not cropped incorrectly
