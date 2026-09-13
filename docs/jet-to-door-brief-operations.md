# Jet-to-Door Private Trip Brief operations

## Offer currently live

- **Arrival Preview:** complimentary first-look planning resource.
- **Founding Full Brief:** $249 request for one destination, up to five nights, with one revision.
- The public experience deliberately uses a discreet luxury-planning voice rather than leading with "AI." Research can be AI-assisted, but each recommendation should be reviewed before delivery.

## Intake and fulfillment

- Form name: `private-trip-brief` in Netlify Forms.
- Review new submissions before responding. The form is an inquiry, not an automatic promise of fulfillment.
- Do not request or accept passports, government IDs, payment-card data, medical records, passwords, exact addresses, or uploads.
- Do not make reservations, accept supplier funds, or imply that inventory is held.
- The Full Brief uses the live Well Played Travel Stripe Payment Link `plink_1UF4KzEfOgyEs9gKDPcn7OHs`; checkout returns buyers to the preference form. Stripe hosts card entry, and no payment credentials reach this site.
- There is no purchase-verification webhook or automatic fulfillment. Match the completed Stripe checkout and submitted preferences before beginning work; do not rely on the return URL alone as proof of payment.

## Delivery standard

Provide a concise, dated planning brief with direct supplier links, arrival and timing considerations, options rather than promises, and a note that availability, pricing, and policies require direct confirmation. Keep the scope to the requested destination and the disclosed five-night limit unless a different offer is approved.

## Measurement

GA records internal calls to action as `private_trip_brief_click` and non-sensitive lead-tier selection as `generate_lead`. Form contents must never be passed to analytics or advertising platforms.
