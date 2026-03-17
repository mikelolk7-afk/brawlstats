# Phase 1 (MVP) Implementation Plan — BrawlHub

## Step 0: Project Initialization

1. **Create Next.js project** with TypeScript, Tailwind, ESLint, App Router, `src/` dir
2. **Init shadcn/ui** (New York style, dark default, CSS variables)
3. **Install packages:** `swr`, `next-themes`
4. **Create `.env.local`** with `BRAWLSTARS_API_KEY` and `NEXT_PUBLIC_SITE_URL`
5. **Create directory skeleton** per BLUEPRINT.md structure
6. **Add `type-check` script** to package.json

## Step 1: Theme, Constants, and Utilities

1. **Tailwind config** — extend with Brawl Stars rarity colors, dark-first palette, Inter font
2. **Global CSS** — dark theme CSS variables, minimal base styles
3. **`src/lib/constants.ts`** — rarity colors, rarity order, brawler classes, cache durations, tag chars
4. **`src/lib/utils.ts`** — add `formatTag()`, `validateTag()`, `encodeTag()`, `formatNumber()`, `timeRemaining()` to existing shadcn utils file

## Step 2: API Types and Client Library

1. **`src/lib/api/types.ts`** — all TypeScript interfaces: Brawler, BrawlerStats, StarPower, Gadget, PlayerProfile, EventRotation, EventSlot, ApiError, etc.
2. **`src/lib/api/brawlstars.ts`** — server-only wrapper for official API (`getPlayer`, `getBrawlers`, `getEventRotation`, `getPlayerBattleLog`, `getClub`)
3. **`src/lib/api/client.ts`** — client-side fetchers calling internal `/api/` proxy routes

## Step 3: API Proxy Routes

1. **`src/app/api/events/route.ts`** — proxies event rotation, 1hr cache
2. **`src/app/api/brawlers/route.ts`** — proxies brawler list, 24hr cache
3. **`src/app/api/player/[tag]/route.ts`** — proxies player lookup, 5min cache, tag validation
4. **`src/app/api/club/[tag]/route.ts`** — proxies club lookup (skeleton)

## Step 4: Root Layout and Navigation

1. **Install shadcn components:** button, card, input, badge, navigation-menu, sheet, separator, skeleton, select
2. **ThemeProvider** (`src/components/layout/theme-provider.tsx`) — `next-themes` wrapper, dark default
3. **Header** (`src/components/layout/header.tsx`) — sticky nav, logo, links, mobile hamburger with Sheet
4. **Footer** (`src/components/layout/footer.tsx`) — Supercell attribution, site links
5. **Root layout** (`src/app/layout.tsx`) — Inter font, dark class, Header + main + Footer, metadata

## Step 5: Home Page with Event Rotation

1. **`src/hooks/useEventRotation.ts`** — SWR hook for `/api/events`
2. **EventRotationWidget** (`src/components/home/event-rotation.tsx`) — client component, shows active/upcoming events with countdown timers, skeleton loading
3. **Home page** (`src/app/page.tsx`) — hero section, event rotation widget, quick links to Brawlers/Stats

## Step 6: Brawler Database — Grid View

1. **Configure `next.config.ts`** — add `cdn.brawlify.com` to image remote patterns
2. **BrawlerCard** (`src/components/brawlers/brawler-card.tsx`) — icon, name, rarity border, link to detail
3. **BrawlerGrid** (`src/components/brawlers/brawler-grid.tsx`) — client component with search, filter by rarity/class, sort, responsive grid
4. **Brawler slug mapping** (`src/data/brawlers/index.ts`) — maps API brawler IDs to slugs, classes, descriptions
5. **Brawlers page** (`src/app/brawlers/page.tsx`) — server component fetching brawler data, renders BrawlerGrid

## Step 7: Brawler Detail Page

1. **StatTable** (`src/components/brawlers/stat-table.tsx`) — health, damage, range, speed etc.
2. **AbilityCard** (`src/components/brawlers/ability-card.tsx`) — reusable for star powers, gadgets, gears with "Meta" badge
3. **Brawler detail page** (`src/app/brawlers/[slug]/page.tsx`) — hero banner, stats, star powers, gadgets, placeholders for builds/guides
4. **`generateStaticParams()`** for SSG of known brawler slugs

## Step 8: Player Lookup

1. **PlayerSearchForm** (`src/components/stats/player-search-form.tsx`) — client component, tag input with validation, navigates to profile
2. **Stats landing page** (`src/app/stats/page.tsx`) — renders search form
3. **PlayerProfileCard** (`src/components/stats/player-profile-card.tsx`) — name, trophies, wins, club
4. **PlayerBrawlerGrid** (`src/components/stats/player-brawler-grid.tsx`) — unlocked brawlers with trophies/power level
5. **Player profile page** (`src/app/stats/player/[tag]/page.tsx`) — fetches player data server-side, error handling for not found
6. **`src/hooks/usePlayer.ts`** — SWR hook for future client-side refresh

## Step 9: Loading & Error States

1. **`loading.tsx`** files for brawlers, brawler detail, player profile — skeleton UIs
2. **`error.tsx`** and **`not-found.tsx`** files for graceful error handling
3. **Accessibility pass** — alt text, aria-labels, rarity text labels (not just color), keyboard nav

## Step 10: Mobile Responsiveness & Polish

1. Mobile pass on all pages (375px minimum)
2. Type check (`tsc --noEmit`) and lint
3. Basic metadata/SEO on all pages

---

## Implementation Order (dependency chain)

```
Step 0 (project init)
  → Step 1 (theme/constants/utils)
    → Step 2 (types/API library)
      → Step 3 (API proxy routes)
        → Step 4 (layout/nav) ← also depends on Step 1
          → Step 5 (home page)
          → Step 6 (brawler grid)
            → Step 7 (brawler detail)
          → Step 8 (player lookup)
        → Step 9 (loading/error states)
          → Step 10 (polish)
```

## Packages to Install

- `swr` — client-side data fetching
- `next-themes` — dark/light toggle
- shadcn/ui components: button, card, input, badge, navigation-menu, sheet, separator, skeleton, select
