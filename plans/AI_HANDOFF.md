# AI Handoff: CentrLP

Last updated: 2026-04-14

This file is the shared working context for `centrlp.ru` so Claude, Codex, or any other assistant can pick up the project without losing operational history.

## Project

- Repo: `G:\mvp\centrlp`
- Production host: `90.156.168.115`
- Main domain: `https://centrlp.ru/`
- CRM landing is a separate project and should not be mixed into this repo.

## Deployment Reality

- Primary git remote is already the personal server git:
  - `origin = ssh://root@90.156.168.115/home/deploy/git/centrlp.git`
- Secondary GitHub remote still exists:
  - `github = git@github.com:Makselyanov/centrlp2026.git`
- Old docs still mention GitHub as `origin`; that is outdated.
- Historically the server working tree at `/var/www/centrlp` has been treated as a practical source of truth during live fixes, so after local changes always verify what was actually deployed.

## Important Working Rules

- Preserve the current visual language of the site. The user explicitly wants the style to stay recognizable.
- Do not reintroduce dark sections or gimmicky fake urgency widgets unless the user explicitly asks.
- The user disliked chaotic article layouts and overly mixed infographic styles. Prefer calm, editorial, unified presentation.
- Form widths were intentionally normalized. Avoid making lead forms huge again.
- Blog tag filter was intentionally compacted. Avoid expanding it back into a giant chip wall.
- Keep secrets out of git. SEO secrets live in `.env.seo.local`.

## Major Completed Work

### SEO and content

- Added Yandex Webmaster local workflow and reporting scaffold.
- Added and updated multiple SEO articles, including OpenClaw/Beget-related content.
- Fixed prerendered blog route heads so blog URLs no longer hard-404 on direct open.
- Generated and deployed updated sitemap and robots flow.

### Image system

- Added OpenRouter-based image generation infrastructure:
  - `scripts/generate-image.mjs`
  - `scripts/build-image-batches.mjs`
  - retry and batch JSON files in `scripts/`
- Generated a full OG image set for blog posts and service pages.
- Added homepage visuals to the `digital products` block on the main page.
- Added per-post and per-service OG image routing in layout/prerender logic.

### Blog readability refactor

- Added an inline infographic system for articles.
- Then unified the article rendering style after the user said the first version looked chaotic.
- Current direction is a calmer editorial layout:
  - lighter code blocks
  - branded list styling
  - improved numbered sections
  - reduced visual noise
- Contact forms were also normalized to a more compact width.

### Service page design work

- Added shared service design primitives:
  - `src/components/services/BentoSection.tsx`
  - `src/components/services/BentoCard.tsx`
  - `src/components/services/ProcessTimeline.tsx`
  - `src/components/services/StatBand.tsx`
- Refactored `src/components/ServicePageTemplate.tsx` to the lighter bento/editorial system.
- Refactored several long custom service pages into the new direction, including:
  - `MarketingStrategy.tsx`
  - `WebsiteDevelopment.tsx`
  - `YandexDirect.tsx`
  - `ContentPlan.tsx`
- Added new product-cluster service pages and interlinking around self-hosted AI:
  - `OpenClawAI.tsx`
  - `N8nAutomation.tsx`
  - `TelegramLeadAgent.tsx`
  - `TelegramServiceAgent.tsx`
- Updated `/services` hero and catalog so OpenClaw, n8n and Telegram AI lead/service handling read as one commercial cluster.
- Featured cards in the `/services` catalog now visually prioritize the Telegram / Max / AI / CRM core cluster.
- Added a dedicated system section on `/services` that explains how channel, interface, AI, orchestration, CRM and growth fit together.
- Added a ready-made stack section on `/services` with 3 packaged business scenarios for leads, service, and self-hosted AI operations.
- Added a business-profile section on `/services` so users can recognize themselves by company type, not only by technology stack.
- Added a launch-format section on `/services` that frames projects as pilot, MVP, or full system instead of one-size-fits-all delivery.
- Repositioned `MaxMessenger.tsx` from a vague early-market page into a clearer commercial offer around early channel entry, sales, service, CRM and AI-supported workflows.

### Conversion sprint

- Added a lightweight metrics helper for explicit conversion events and delegated `data-metric` click tracking.
- Homepage hero was reframed toward fast lead capture instead of generic product exploration.
- Header CTA now routes to a stable lead-entry point instead of a fragile `#form` anchor from inner pages.
- Contact form now has a lower-friction offer:
  - only name and phone remain required
  - stronger promise around “2-3 working scenarios”
  - quick Telegram / phone shortcuts inside the form
  - form submissions now include page path / source context

## Important Recent Commits

- `544b301` SEO: Beget partner integration + 4 new OpenClaw deployment guides
- `5caaffc` image generation infrastructure and OG cards
- `cbf5e19` second batch of OG images, full set complete
- `f5e5238` inline infographic system for blog posts
- `4fa45a0` unified editorial design for blog posts + form width consistency
- `8ddb5a8` compact tag filter on `/blog`
- `41045fd` bento design system for service pages + `ServicePageTemplate` refactor
- `2f434ed` unification of 4 long custom service pages under bento design system

## Known Open Issues

### 1. GitHub Pages workflow is probably obsolete

`.github/workflows/static.yml` looks out of sync with the actual deployment flow and may confuse future work.

### 2. SEO reporting still needs regular maintenance

- Latest Yandex report was refreshed on `2026-04-13`
- Current Yandex snapshot is healthy: `SQI=10`, `searchable=32`, `excluded=1`, `active diagnostics=0`
- Yandex still sees crawled sitemap `urls=66`, while the local generated sitemap already contains more URLs, so recheck after the next crawler refresh

### 3. There is minor cleanup debt

- No real test script in `package.json`
- Root has had stray artifacts before; re-check repo cleanliness before releases

## Suggested First Checks Before New Work

1. Read this file.
2. Run `git status`.
3. Run `npm run build`.
4. Run `npm run lint`.
5. If touching SEO or deployment, re-check live reality rather than trusting old docs.

## Suggested Next Priorities

1. Continue service-page design unification only after verifying the already-refactored pages look correct live.
2. Decide whether to remove or archive the old GitHub Pages workflow.
3. Keep the Yandex monthly SEO report updated as part of regular ops.

## Product Decision

- OpenClaw and Beget content is intentionally part of the CentrLP product direction.
- Treat this cluster as self-hosted AI / Telegram agent infrastructure for business, not as off-topic content.
- When expanding this cluster, connect it to AI agents, AI systems, CRM, Telegram, automation, and productized implementation services.

## Notes for Future Sessions

- Homepage hero and header CTA were rolled back to the earlier visual direction on `2026-04-14` after the user said the newer conversion-first version felt broken.
- A new secondary-offer compliance direction was added on `2026-04-14`:
  - homepage compliance block
  - `/services` compliance competence section
  - dedicated service page `src/pages/services/Compliance2026.tsx`
- Position compliance carefully as practical digital implementation support around domain/admin setup, personal-data touchpoints, public texts and site/interface cleanup; do not present it as a substitute for a профильный юрист.
- If you make a major structural change, update this handoff file in the same commit.
- When reporting status to the user, separate:
  - what is already deployed
  - what exists only locally
  - what is still a recommendation
