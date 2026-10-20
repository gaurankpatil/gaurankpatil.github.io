# Syntrio Action Center Case Study

A portfolio-ready concept case study for the route:

```text
/syntrio-action-center.html
```

The page uses the same visual system as the existing Travel & Expense and ONCO case studies:

- Primary colour: `#0067D2`
- Inter-based typography stack
- Shared sticky header and chapter navigation
- Shared section numbering, fact cards, decision cards, outcome cards, validation panel, footer, and back-to-top behaviour
- Shared responsive and reduced-motion behaviour

## Project position

**Title:** Syntrio Action Center: Turning Incident Signals into Preventive Compliance Action

**Status:** Concept proposal at Mitratech — not implemented

The public page shows only one original Action Center dashboard at different scroll positions and crops. It does not invent or display additional confidential product screens.

## Package structure

```text
syntrio-action-center-case-study/
├── syntrio-action-center.html
├── README.md
├── CONTENT_BOUNDARY.md
├── QA_REPORT.md
└── assets/
    ├── css/
    │   ├── case-study.css
    │   └── action-center-case-study.css
    ├── js/
    │   └── case-study.js
    └── images/
        └── action-center/
            ├── action-center-overview.webp
            ├── action-center-operations.webp
            ├── action-center-guidance.webp
            ├── action-center-metrics.webp
            ├── action-center-queue.webp
            ├── action-center-recommendations.webp
            ├── action-center-activity.webp
            └── action-center-sequence.webp
```

## Repository integration

### Add

```text
/syntrio-action-center.html
/assets/css/action-center-case-study.css
/assets/images/action-center/
```

### Keep your existing shared files

```text
/assets/css/case-study.css
/assets/js/case-study.js
```

Copies of the shared CSS and JavaScript are included so the package can be inspected independently. If your repository already contains the final shared versions, do not overwrite them unless you intentionally want to synchronise the files.

## Image handling

The supplied dashboard captures were converted to WebP and reused as:

- one top-of-dashboard view
- one incident-operations view
- one lower guidance/activity view
- focused crops from those same captures

No new product screen was created.

Staff-style names and email addresses visible in the source captures were replaced with synthetic identities for public presentation. Metrics, case values, recommendation text, and other interface values remain example concept content and must not be described as product results.

## Navigation

The page uses root-relative portfolio navigation:

```html
<a href="/">Home</a>
<a href="/#work">Work</a>
<a href="/#about">About</a>
<a href="/#resume">Resume</a>
<a href="/#contact">Contact</a>
```

If the portfolio is later hosted under a repository subdirectory rather than at the GitHub Pages root, replace these with the correct base path.

## Project navigation

The current bottom navigation includes:

- Back to all projects
- Previous case study: `elearning.html`

Update the previous/next order after the final homepage project order is frozen.

## Before publishing

1. Confirm that the Mitratech/Syntrio concept image is authorised for public portfolio use.
2. Confirm whether `Product Designer · concept and prototype contributor` accurately reflects the user's ownership.
3. Test all root-relative navigation links on the deployed site.
4. Confirm the final project order and update previous/next navigation.
5. Add the project to the homepage carousel only after the case-study page is accepted.
6. Run desktop, tablet, mobile, keyboard, zoom, contrast, and link QA on the deployed page.
