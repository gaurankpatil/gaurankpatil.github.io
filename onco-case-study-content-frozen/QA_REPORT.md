# ONCO case study v1.0 — structural QA report

## Status

- Narrative and claim boundaries: **content-frozen**
- Final product imagery: **pending**
- Shared Travel + ONCO visual/accessibility QA: **deferred by request**

## Automated structural checks

**Result: 25 passed, 0 failed.**

Validated:

- One HTML document
- Exactly one H1
- Logical heading hierarchy
- No duplicate IDs
- Every content image has non-empty alternative text
- Every content image has explicit width and height attributes
- Every local CSS, JavaScript, and image path resolves
- Every internal section anchor resolves
- Case-study navigation matches all `data-section` sections
- No unsupported claims of improved treatment accuracy
- No unsupported claims of improved patient outcomes
- No unsupported claims of reduced clinical errors
- No patent language
- No autonomous-prescribing language
- No generic LinkedIn URL
- Content-freeze version markers are present
- Research ownership is explicitly team-led
- Clinician authority boundary is explicit
- Non-linear case-view model is present
- Multi-role responsibility model is present
- Cross-functional trade-off story is present
- React contribution is qualified
- Retrospective work is clearly labelled as not part of the original release
- Image status is marked as pending
- CSS braces are balanced
- JavaScript passes Node syntax validation

## Local server checks

The following paths returned HTTP 200 from a local static server:

- `ONCO.html`
- `assets/css/case-study.css`
- `assets/js/case-study.js`
- `assets/images/oncology/treatment-plan.webp`
- `assets/images/oncology/case-summary.webp`
- `assets/images/oncology/chemotherapy-sitting.webp`
- `assets/images/oncology/follow-up.webp`
- `assets/images/oncology/dashboard.webp`
- `assets/images/oncology/case-listing.webp`
- `assets/images/oncology/patient-registration.webp`
- `assets/images/oncology/signup-general.webp`
- `assets/images/oncology/signup-professional.webp`
- `assets/images/oncology/retrospective-registration.webp`
- `assets/images/oncology/retrospective-suggestion.webp`

## Claim-boundary review

The package presents the product as clinician-controlled decision support:

- Predefined clinical rules generated medicine suggestions.
- Specialist oncologists validated rule logic and terminology.
- The treating oncologist could modify the suggestions.
- The treating oncologist retained responsibility for the final treatment decision.

The package does not claim:

- Autonomous treatment prescribing
- Improved treatment accuracy
- Improved patient outcomes
- Reduced clinical errors
- Measured administrative savings
- Public adoption or commercial impact
- Patent ownership or scope
- Personal ownership of interviews or usability studies
- Sole ownership of the full released React application

## Deliberately deferred checks

These require the final images and integrated Portfolio V2 repository:

- Correct chemotherapy versus follow-up image mapping
- Synthetic-data consistency across all screens
- Manual healthcare-data confidentiality review
- Product screenshot legibility at 100% zoom
- Desktop and mobile visual rhythm
- Responsive image cropping
- Contrast and focus-state validation
- Screen-reader review
- Cross-browser testing
- Homepage, résumé, and project-route validation
- Performance checks using final image file sizes
- Final social-preview image

## Freeze rule

Do not change the project narrative, claims, role boundaries, clinical authority model, design-decision order, or delivery wording unless a factual correction or new verifiable evidence becomes available.

Image files may be replaced in place. CSS may be corrected for integration, browser compatibility, accessibility, or final visual QA without reopening the content.
