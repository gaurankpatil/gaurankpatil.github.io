# ONCO Oncology Platform — content-frozen case study v1.0

This package contains the complete HTML, CSS, JavaScript, content structure, claim boundaries, and placeholder image files for the public route:

```text
/ONCO.html
```

The narrative is content-frozen. Final product-image preparation is intentionally deferred.

## Package structure

```text
onco-case-study-content-frozen/
├── ONCO.html
├── README.md
├── QA_REPORT.md
├── IMAGE_REPLACEMENT_MAP.md
└── assets/
    ├── css/
    │   └── case-study.css
    ├── js/
    │   └── case-study.js
    └── images/
        └── oncology/
            ├── treatment-plan.webp
            ├── case-summary.webp
            ├── chemotherapy-sitting.webp
            ├── follow-up.webp
            ├── dashboard.webp
            ├── case-listing.webp
            ├── patient-registration.webp
            ├── signup-general.webp
            ├── signup-professional.webp
            ├── retrospective-registration.webp
            └── retrospective-suggestion.webp
```

## Fixes completed

- Correct clinician-controlled decision-support wording
- Removed unsupported clinical-impact and patent claims
- Corrected research ownership: team-led discovery; candidate-owned synthesis and design translation
- Added explicit `I owned / The team owned` boundaries
- Qualified React contribution and avoided claiming sole application development
- Bounded confidential pilot and client-release language
- Replaced the false linear case lifecycle with a non-linear case-view model
- Added the end-to-end oncology workflow
- Added an evidence-to-design section based on verified clinical inputs
- Added a multi-role responsibility model without claiming unverified permissions
- Strengthened all three design-decision stories with problem, response, and rationale
- Added cycle-delay workflow logic without claiming automatic rescheduling
- Added the human-in-the-loop medicine-suggestion flow
- Distinguished generated, clinician-modified, and clinician-confirmed states
- Added a verified clinical/product/engineering collaboration story
- Added precise delivery and evidence-boundary sections
- Added retrospective patient-registration, recommendation, consequential-action, and delayed-cycle improvements
- Added privacy, permissions, auditability, accessibility, responsive, and failure-recovery release-readiness requirements
- Consolidated confidentiality language
- Removed low-value Profile, browser mockup, isolated table, repeated Login, and generic process-story slots
- Removed the generic LinkedIn destination
- Added content-freeze and image-status markers

## Content freeze

The following are frozen at version 1.0:

- Project positioning
- Role and ownership wording
- Research ownership
- Clinical authority boundary
- Pilot and release wording
- Design-decision sequence
- Collaboration story
- Outcome claim boundaries
- Retrospective label and recommendations
- Section order

Reopen the content only when a factual correction or new verifiable evidence becomes available.

## Image phase

The included WebP files are neutral placeholders. Replace them in place using `IMAGE_REPLACEMENT_MAP.md`.

Do not change filenames unless every HTML and metadata reference is updated. In particular, do not reverse `chemotherapy-sitting.webp` and `follow-up.webp`.

## Links to verify in the integrated repository

```text
index.html
index.html#work
index.html#about
index.html#resume
index.html#contact
ems.html
order_tracking.html
mailto:pgaurank@gmail.com
```

No LinkedIn link is included because a verified profile URL was not supplied.

## Local preview

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080/ONCO.html
```

## Claude Code integration prompt

```text
We are on the portfolio-v2 branch.

Integrate the content-frozen ONCO case-study package into the Portfolio V2 repository.

Rules:
1. Read CLAUDE.md and docs/portfolio-v2-plan.md first.
2. Confirm the current branch is portfolio-v2 and show git status.
3. Do not commit or push.
4. Preserve the public /ONCO.html route.
5. Archive the existing page to archive/portfolio-v1/ONCO-v1.html before replacing it.
6. Keep all narrative, factual boundaries, section order, and retrospective labels unchanged.
7. Reuse the shared Portfolio V2 header, footer, tokens, and case-study components where they already exist.
8. If shared CSS or JavaScript already exists, merge only missing ONCO-specific styles and image-dialog behaviour rather than creating conflicting duplicate files.
9. Copy the placeholder images now; they will be replaced in place during the image phase.
10. Do not add autonomous-prescribing, treatment-efficacy, clinical-error, patient-outcome, public-adoption, metric, patent, or personal-research-ownership claims.
11. Keep the case views non-linear; All Cases is a consolidated view, not a lifecycle state.
12. Keep the exact routes ems.html and order_tracking.html unless the repository has a verified canonical alternative.
13. Verify all local paths and internal anchors.
14. Stop before shared desktop/mobile/accessibility QA; that review will be performed after Travel and ONCO are both integrated.
15. Show changed files, git diff --stat, and git status.
```
