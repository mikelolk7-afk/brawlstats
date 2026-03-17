# CLAUDE.md — BrawlHub Project

## Project Overview

BrawlHub is a Brawl Stars fan web application. It provides brawler data, meta builds, player/club stat lookups, guides (including badges & prestige), news, and interactive tools like a team comp builder and tier list maker.

See `BLUEPRINT.md` for the full project spec, architecture, and feature details.

## Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui component library
- **Data fetching:** React Server Components for static data, SWR for client-side fetching
- **Content:** MDX for guides and editorial content
- **Deployment:** Vercel

## Project Structure

```
src/
  app/          → Pages and API routes (Next.js App Router)
  components/   → React components organized by feature
  lib/          → API clients, utilities, constants
  data/         → Static JSON data (brawlers, builds, badges) and MDX guides
  hooks/        → Custom React hooks
  styles/       → Global CSS and Tailwind config
```

## Key Architecture Decisions

### API Proxy Pattern
The official Brawl Stars API key must NEVER be exposed client-side. All official API calls go through Next.js API routes in `src/app/api/`. These routes:
- Read `BRAWLSTARS_API_KEY` from environment
- Call the official API server-side
- Return sanitized/typed responses
- Implement caching headers (Cache-Control, stale-while-revalidate)

### Data Layering
Brawler data comes from multiple sources combined:
1. Official API (`/v1/brawlers`) — canonical stats, star powers, gadgets
2. Community APIs (Brawlify) — icons, images, meta stats, win rates
3. Local JSON files (`src/data/`) — curated builds, editorial notes, badge catalog

The API layer merges these. Static data in `src/data/` is the fallback if external APIs are down.

### Content System
Guides and news are MDX files in `src/data/guides/`. They can embed React components (e.g., `<BuildCard>`, `<TierList>`, `<BadgeChecklist>`). New guides are added by creating an MDX file — no CMS needed.

## Coding Conventions

### General
- Use TypeScript strict mode. No `any` types except in API response parsing boundaries.
- Prefer named exports over default exports (except page components).
- Use `interface` for object shapes, `type` for unions and utility types.
- File names: kebab-case for files, PascalCase for components.
- One component per file. Co-locate component-specific types in the same file.

### Components
- Use React Server Components by default. Add `'use client'` only when needed (interactivity, hooks, browser APIs).
- Props interfaces named `{ComponentName}Props`.
- Destructure props in function signature.
- Use shadcn/ui components as the base — customize via Tailwind classes, don't override shadcn internals.

### Styling
- Tailwind utility classes directly on elements. No custom CSS except in `globals.css` for base theme.
- Use `cn()` utility (from shadcn) for conditional class merging.
- Dark mode is the primary theme. Use `dark:` variants for any light mode overrides.
- Rarity colors are defined in `src/lib/constants.ts` — always reference these, don't hardcode hex values.

### API Routes
- Located in `src/app/api/`.
- Always validate and sanitize input (especially player tags).
- Return typed JSON responses with consistent error format: `{ error: string, status: number }`.
- Set appropriate `Cache-Control` headers on every response.
- Handle rate limiting gracefully — return 429 with retry-after if upstream API rate-limits us.

### Data Fetching
- Server components: `fetch()` with Next.js caching (`{ next: { revalidate: N } }`).
- Client components: SWR with typed fetcher functions from `src/lib/api/`.
- Never fetch from the official Brawl Stars API directly in client code.

### Player Tags
Tags are formatted as `#ABC123` with characters from `0289PYLQGRJCUV` only. When used in URLs:
- URL-encode the `#` as `%23`, or strip `#` and prepend it server-side.
- Validate format before sending to API.
- Display with `#` prefix to users.
- Utility function: `src/lib/utils.ts` → `formatTag()`, `validateTag()`, `encodeTag()`.

## File Organization Rules

### Adding a New Brawler
1. Add/update entry in `src/data/brawlers/{slug}.json`
2. Add build recommendations in `src/data/builds/{slug}.json`
3. Add brawler image to `public/images/brawlers/` (or rely on Brawlify CDN)

### Adding a New Guide
1. Create MDX file in `src/data/guides/{slug}.mdx`
2. Include frontmatter: title, category, difficulty, tags, publishedAt
3. Guide automatically appears in the index page

### Adding a New Badge
1. Add to `src/data/badges/badges.json`
2. Link to brawler if brawler-specific (`brawlerId` field)

## Environment Variables

Required in `.env.local`:
```
BRAWLSTARS_API_KEY=           # From developer.brawlstars.com — NEVER expose client-side
NEXT_PUBLIC_SITE_URL=         # Production URL (used in OG tags, canonical URLs)
```

Optional:
```
BRAWLIFY_API_KEY=             # If Brawlify requires auth
```

## Common Tasks

### Run development server
```bash
npm run dev
```

### Add a shadcn/ui component
```bash
npx shadcn@latest add <component-name>
```

### Type-check the project
```bash
npm run type-check   # or: npx tsc --noEmit
```

### Build for production
```bash
npm run build
```

## Important Constraints

- **Copyright:** Brawl Stars assets are owned by Supercell. Follow the Supercell Fan Content Policy. Include attribution in the footer.
- **API rate limits:** The official API has rate limits. Cache aggressively. Never make redundant API calls.
- **Mobile first:** Most users are mobile gamers. Every page must be responsive. Test at 375px width minimum.
- **Performance:** Target <3s LCP on mobile. Use Next.js Image component for all images. Lazy load below-the-fold content.
- **Accessibility:** Don't rely on color alone for information (e.g., rarity). Use aria-labels on interactive elements. Keyboard navigation must work.

## Domain Knowledge

### Brawl Stars Concepts
- **Brawlers** are characters with unique attacks, supers, star powers (passive abilities unlocked at power 9), gadgets (active abilities unlocked at power 7), and gears (stat boosts unlocked at power 10+).
- **Hypercharges** are enhanced super abilities available for some brawlers at power 11.
- **Game modes** include Gem Grab, Brawl Ball, Showdown (solo/duo), Heist, Bounty, Hot Zone, Knockout, and rotating special modes.
- **Trophies** are the primary ranking system. Each brawler has individual trophies. Total trophies = sum of all brawler trophies.
- **Ranks** are brawler-specific milestones based on trophy thresholds.
- **Prestige** is an advanced progression system beyond max rank.
- **Badges** are achievement-like collectibles earned through various in-game accomplishments.
- **Power levels** range from 1 to 11. Star powers unlock at 9, gears at 10, hypercharges at 11.

### Meta
The "meta" (most effective tactics available) shifts with every balance update. Win rates and pick rates from community aggregation sites reflect the current meta. Builds (star power + gadget + gear combos) vary by game mode.
