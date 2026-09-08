# Travel & Expense case study page

A standalone, responsive HTML/CSS/JavaScript implementation of the redesigned case study.

## Files

- `ems.html` — the case-study page. Keep this filename to preserve the existing public `/ems.html` URL.
- `assets/css/case-study.css` — shared case-study styles and design tokens.
- `assets/js/case-study.js` — accessible mobile navigation, scroll state, section tracking, reveal enhancement, and back-to-top behaviour.
- `assets/images/placeholders/` — local SVG placeholders that should be replaced by anonymised product images.

## Run locally

From this folder:

```bash
python3 -m http.server 8765
```

Then open:

```text
http://localhost:8765/ems.html
```

## Add it to the portfolio repository

1. Work only on the `portfolio-v2` branch.
2. Back up the current `ems.html` before replacing it.
3. Copy `ems.html` to the repository root.
4. Copy the `assets/css`, `assets/js`, and `assets/images/placeholders` files into the matching V2 asset folders.
5. Update header, footer, email, LinkedIn, homepage anchors, and next-project URLs to match the final portfolio architecture.
6. Replace each placeholder SVG with an anonymised product image while keeping the same file path, or update the corresponding `src` value.
7. Test at 1440, 1280, 768, 390, and 360 CSS pixels.

## Placeholder replacement map

| Placeholder | Replace with |
|---|---|
| `hero-dashboard.svg` | Final anonymised approval dashboard overview |
| `current-state.svg` | Existing dashboard with 3–4 focused annotations |
| `ageing-breakdown.svg` | Tight crop of category cards and ageing legend |
| `policy-risk.svg` | Report card showing ageing, policy state, and actions |
| `bulk-approval.svg` | Selection, eligibility, and confirmation sequence |

## Font Awesome

The page loads Font Awesome Free from the cdnjs CDN. To remove the external dependency later, install or self-host the Font Awesome Free web assets and update the stylesheet reference in `ems.html`.

## Content boundaries

The page deliberately states that:

- the design and front-end work were completed;
- code was merged into the product codebase;
- live API integration was not verified;
- final release and post-launch impact were outside the designer's visibility.

Do not replace those statements with unsupported shipping, adoption, compliance, or efficiency metrics.
