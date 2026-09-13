# Daily Facebook deals setup

The site now has two independent pieces:

- `/deals/` reads the live Villiers empty-leg RSS feed, filters for Texas-connected routes, and links visitors through the affiliate-tracked booking URL.
- `publish-daily-deal` is a Netlify Scheduled Function. It runs at 10:15 AM America/Chicago across daylight-saving changes, selects one eligible listing, and creates a Facebook Page link post. If there is no truthful Texas-connected listing, it posts a route-planning CTA instead of misrepresenting stale inventory as a deal.

## Netlify environment variables

Set these as **Production** variables in Netlify. Never add them to the repository or a client-side script.

| Variable | Required | Purpose |
| --- | --- | --- |
| `FACEBOOK_PAGE_ID` | Yes for publishing | Facebook Page ID with content-creation access. |
| `FACEBOOK_PAGE_ACCESS_TOKEN` | Yes for publishing | Page token authorized for `pages_manage_posts`; store as a secret. |
| `FACEBOOK_GRAPH_VERSION` | Yes for publishing | A current Graph API version approved for the Meta app, for example `v25.0`. |
| `FACEBOOK_AUTOPUBLISH_ENABLED` | Yes for publishing | Set exactly to `true` only after a successful live test. Any other value keeps the publisher safely off. |
| `PUBLIC_SITE_URL` | Recommended | `https://texasjetquote.com`; used for canonical landing links. |
| `VILLIERS_EMPTY_LEGS_FEED_URL` | Optional | Overrides the account's default affiliate RSS feed URL. It must remain an `https://api.villiers.ai` URL. |

The RSS feed does not require the Villiers MCP token. Keep that token server-side and out of source control; it is only appropriate for a future live-estimate/quote workflow.

## Before enabling the publisher

1. Confirm the Facebook Page token belongs to the Texas Jet Quote Page and has current Page content-creation permission.
2. Deploy the code and open `/deals/` on production. Confirm the cards show real Texas-connected listings and that the Villiers handoff retains the affiliate ID.
3. From Netlify's Functions page, run a controlled test only after choosing an actual test Page or after approving the first live Texas Jet Quote post.
4. Set `FACEBOOK_AUTOPUBLISH_ENABLED=true` only when the copy, destination, Page token, and audience settings are verified.

The function reserves each calendar day before calling Meta and will not automatically retry an ambiguous Facebook response. This is intentional: it prevents a transient timeout from creating duplicate public posts. Check Netlify Function logs if a post is marked `unknown`.

## Selection rules

- Texas airport connection required: Austin, Dallas/DFW, Houston/IAH, San Antonio, and selected nearby Texas business-aviation airports.
- Departure must be 1–14 days away and include a provider-listed price and route.
- Texas-origin opportunities, high-intent destinations, near-term departures, USD price, suitable cabin seating, and a named aircraft rank higher.
- The same feed item is not selected again for 60 days.
- Copy never claims a discount or guaranteed price. It says `Listed from` and directs people to current availability and final terms.
