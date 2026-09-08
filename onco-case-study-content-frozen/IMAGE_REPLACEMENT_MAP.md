# ONCO image replacement map

The HTML, CSS, JavaScript, narrative, and claim boundaries are content-frozen at version 1.0. The included WebP files are neutral placeholders so the page renders before final portfolio imagery is ready.

Replace each file **in place** and keep the filename unchanged. This avoids editing the HTML again.

| Filename | Final image required | Primary use |
|---|---|---|
| `treatment-plan.webp` | Anonymised Treatment Plan screen | Hero, Decision 2 |
| `case-summary.webp` | Anonymised Case Summary / patient-case workspace | Hero, Decision 1 |
| `chemotherapy-sitting.webp` | Anonymised Chemotherapy Sitting screen | Hero, Decision 2, Decision 3 evidence |
| `follow-up.webp` | Anonymised Follow-up Appointment screen | Decision 2 |
| `dashboard.webp` | Anonymised operational dashboard | Context and challenge |
| `case-listing.webp` | Anonymised case listing showing Active, Pending Approval, Transferred, Archived, and All Cases views | Product model |
| `patient-registration.webp` | Anonymised patient-registration flow | Supporting onboarding decision |
| `signup-general.webp` | Professional signup — general information | Supporting onboarding decision |
| `signup-professional.webp` | Professional signup — role, qualification, association, and documentation | Supporting onboarding decision |
| `retrospective-registration.webp` | Clearly labelled present-day patient-registration exploration | Retrospective design section |
| `retrospective-suggestion.webp` | Clearly labelled present-day clinical-suggestion exploration | Retrospective design section |

## Critical mapping rule

Do not reverse these two files:

- `chemotherapy-sitting.webp` must show the Chemotherapy Sitting interface.
- `follow-up.webp` must show the Follow-up Appointment interface.

## Final image preparation rules

Use one coherent synthetic scenario across every screen. Replace or remove:

- Client identity and geography
- Patient and clinician names
- Phone numbers and email addresses
- Dates of birth and street addresses
- Hospital and institution names
- Case identifiers
- Real clinical records, medicine records, and dosage values
- Internal identifiers or confidential rules

The retrospective files must visibly state:

> Retrospective design exploration — not part of the original release

After replacing an image, update the HTML `width` and `height` attributes only when the final export dimensions differ from the placeholder.
