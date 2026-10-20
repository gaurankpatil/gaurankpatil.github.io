# Homepage eLearning Card Update

This patch adds the third featured case study to the existing homepage carousel.

## Files to replace

- `index.html`
- `assets/css/homepage.css`
- `assets/js/homepage.js`

## New asset to add

- `assets/images/elearning/hero-template-system.svg`

## Route expected

The new card links to:

```text
elearning.html
```

Keep the previously generated `elearning.html`, `assets/css/elearning-case-study.css`, and remaining eLearning assets in the repository.

## Changes included

- Adds an eLearning panel and selector card using the same accessible tab/tabpanel carousel pattern as Travel and ONCO.
- Updates carousel numbering to `01 / 03`, `02 / 03`, and `03 / 03`.
- Updates the carousel counter to `1 / 3`; JavaScript now derives the total from the number of slides.
- Updates homepage copy from two to three projects.
- Updates the About statistic to `3 Featured case studies`.
- Adds eLearning-specific media and selector surfaces without changing the shared portfolio theme.

## Verification

Run the site through a local web server, then confirm:

1. The third selector opens the eLearning panel.
2. The main CTA and image both open `elearning.html`.
3. Previous/next controls cycle through all three projects.
4. Left/Right/Home/End keyboard controls work across all three selectors.
5. The tabs stack at tablet width and scroll horizontally on mobile.
