# BrawlHub — Brawl Stars Fan Web Application

## Project Overview

BrawlHub is a comprehensive Brawl Stars fan web application providing live stats, brawler data, meta builds, guides, and news. The goal is to be the go-to resource for players looking to improve — combining real-time API data with curated content and interactive tools.

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js 14+ (App Router)** | SSR/SSG hybrid, API routes as backend proxy, great SEO |
| Language | **TypeScript** | Type safety across API responses, components, and data models |
| Styling | **Tailwind CSS + shadcn/ui** | Rapid styling, polished components, fully customizable theme |
| State | **React Server Components + SWR** | Server components for static content, SWR for client-side data fetching with caching |
| Content | **MDX** | Guides and editorial content as markdown with embedded components |
| Deployment | **Vercel** | Native Next.js support, edge functions, image optimization, generous free tier |
| Analytics | **Vercel Analytics** or **Plausible** | Privacy-friendly, lightweight |

---

## Data Sources

### Official Brawl Stars API (`api.brawlstars.com`)

Requires developer API key (IP-whitelisted). Must be called server-side only.

| Endpoint | Use Case |
|----------|----------|
| `/v1/players/{tag}` | Player profile, trophies, brawler unlocks |
| `/v1/players/{tag}/battlelog` | Recent 25 battles |
| `/v1/clubs/{tag}` | Club info and member list |
| `/v1/brawlers` | All brawlers and their available star powers/gadgets |
| `/v1/events/rotation` | Current active and upcoming event rotation |
| `/v1/rankings/{country}/players` | Leaderboards |
| `/v1/rankings/{country}/brawlers/{id}` | Per-brawler leaderboards |

### Community Data Sources

| Source | Use Case |
|--------|----------|
| **Brawlify API** (`brawlify.com/api`) | Brawler icons/images, map images, game mode icons, meta stats |
| **Brawl Time Ninja** | Win rates, pick rates, build effectiveness data |
| **Local JSON/MDX files** | Curated builds, guides, badge info (editorially maintained) |

### Caching Strategy

- **Event rotation:** Cache 1 hour (changes on schedule)
- **Player stats:** Cache 5 minutes (fresh on each lookup, SWR stale-while-revalidate)
- **Brawler list:** Cache 24 hours / rebuild on update (rarely changes outside patches)
- **Meta/build stats:** Cache 6 hours (community data updates periodically)
- **Guides/content:** Static at build time via MDX, rebuild on content push

---

## Site Architecture

```
/                           → Home (event rotation, latest news, featured guides)
/brawlers                   → Brawler database (grid, filterable)
/brawlers/[slug]            → Brawler detail (stats, builds, tips, badge links)
/stats                      → Player/club lookup landing
/stats/player/[tag]         → Player profile (trophies, battle log, charts)
/stats/club/[tag]           → Club profile (members, stats)
/meta                       → Meta overview (tier list, win rates, pick rates)
/meta/builds                → Best builds per brawler (filterable by mode)
/guides                     → Guide index
/guides/[slug]              → Individual guide (MDX)
/guides/badges              → Badge & prestige comprehensive guide
/news                       → News & patch notes
/news/[slug]                → Individual article
/tools/team-builder         → Team comp builder (interactive)
/tools/tier-list            → Community tier list builder (interactive)
/leaderboards               → Global and regional leaderboards
```

---

## Feature Specifications

### 1. Brawler Database (`/brawlers`)

**List View:**
- Grid of all brawlers with icon, name, rarity color-coded border
- Filter by: rarity, class (damage dealer, tank, support, etc.), unlock status
- Sort by: name, rarity, trophy road order
- Search by name
- Quick-view tooltip on hover showing key stats

**Detail Page (`/brawlers/[slug]`):**
- Hero banner with brawler art, name, rarity, class
- Base stats table (health, damage, super, range, speed, reload)
- Stats at different power levels (toggle: power 1 / 9 / 11)
- **Recommended Builds section** (see Builds feature below)
- Star powers with descriptions + which is currently meta
- Gadgets with descriptions + meta pick
- Gears with recommendations
- Hypercharge info (if available)
- Best game modes (with win rate data if available)
- Related guides links
- Related badges

### 2. Brawler Builds (`/meta/builds`)

**Per-brawler build cards:**
- Visual "loadout" layout: Star Power + Gadget + Gear 1 + Gear 2 (+ Hypercharge)
- **"Meta Build"** — highest win rate combination (data-driven)
- **"Popular Build"** — most-used combination (data-driven)
- **"Recommended Build"** — editorially curated with explanation
- Filterable by game mode (the best build for Gem Grab may differ from Showdown)
- Win rate and pick rate shown per build where data available
- Brief explanation of why the build works

**Data model:**
```typescript
interface BrawlerBuild {
  brawlerId: string;
  gameMode?: string;         // null = general, or specific mode
  starPower: string;         // star power ID
  gadget: string;            // gadget ID
  gears: [string, string];   // gear IDs
  hypercharge?: boolean;
  source: 'data' | 'curated';
  winRate?: number;          // from community data
  pickRate?: number;
  notes?: string;            // editorial explanation
}
```

### 3. Player & Club Stats (`/stats`)

**Player Lookup:**
- Input: player tag (with # prefix handling and validation)
- Profile card: name, icon, trophies, highest trophies, 3v3 wins, solo/duo wins, club
- Brawler collection: grid showing all unlocked brawlers with trophy count, power level
- Battle log: last 25 matches with result, mode, map, brawler used, trophies gained/lost
- **Visualizations:**
  - Trophy progression (if trackable via periodic snapshots)
  - Win rate by game mode (pie/bar chart)
  - Most played brawlers (bar chart)
  - Recent performance trend

**Club Lookup:**
- Club name, tag, description, trophy total, type, member count
- Member list sortable by trophies, role
- Club stats summary

### 4. Badges & Prestige Guide (`/guides/badges`)

**Badge Catalog:**
- Complete list of all badges organized by category
- Each badge: icon, name, description, how to earn, difficulty rating (1-5 stars)
- Filter by: category, difficulty, brawler-specific vs general
- Cross-links to relevant brawler pages

**Prestige Pathway:**
- Visual progression diagram showing prestige ranks
- Requirements at each stage
- Estimated time/effort for each tier
- Rewards breakdown

**Interactive Progress Tracker:**
- Checklist UI where users can mark completed badges
- Progress bar showing overall completion percentage
- Persistent storage (localStorage or the artifact storage API)
- Filter: show incomplete only, show by category

### 5. Meta Overview (`/meta`)

- **Tier list:** S/A/B/C/D ranking of brawlers, overall and per game mode
- **Win rate table:** sortable by win rate, pick rate, ban rate
- **Trend indicators:** up/down arrows showing meta shifts since last patch
- Data refreshed every 6 hours from community sources

### 6. Guides (`/guides`)

- MDX-based content with embedded interactive components
- Categories: beginner, advanced, game mode specific, brawler specific
- Each guide has: title, author, date, difficulty level, estimated read time
- Table of contents auto-generated from headings
- Related guides sidebar

### 7. News & Updates (`/news`)

- Patch notes breakdowns with balance change summaries
- New brawler spotlights
- Event/season announcements
- Can be MDX-based or pulled from RSS/API if available

### 8. Interactive Tools

**Team Comp Builder (`/tools/team-builder`):**
- Select game mode → select map → pick 3 brawlers
- Show synergy score, counter matchups, suggested alternatives
- Shareable via URL params

**Tier List Builder (`/tools/tier-list`):**
- Drag-and-drop brawlers into S/A/B/C/D tiers
- Exportable as image
- Shareable via URL

### 9. Event Rotation (Home Page Widget)

- Current active events with mode, map, time remaining
- Upcoming events
- Auto-refreshes
- Each event links to the relevant map/mode guide

---

## Data Models

```typescript
// Core entities

interface Brawler {
  id: string;
  name: string;
  slug: string;
  rarity: 'common' | 'rare' | 'super_rare' | 'epic' | 'mythic' | 'legendary' | 'chromatic';
  class: 'damage_dealer' | 'tank' | 'assassin' | 'support' | 'controller' | 'marksman';
  description: string;
  stats: BrawlerStats;
  starPowers: StarPower[];
  gadgets: Gadget[];
  gears: Gear[];
  hypercharge?: Hypercharge;
  builds: BrawlerBuild[];
  relatedBadges: string[];
}

interface BrawlerStats {
  health: { base: number; max: number };
  damage: { base: number; max: number };
  superDamage?: { base: number; max: number };
  range: number;
  reloadSpeed: number;
  movementSpeed: 'very_slow' | 'slow' | 'normal' | 'fast' | 'very_fast';
}

interface StarPower {
  id: string;
  name: string;
  description: string;
  isMeta: boolean;
}

interface Gadget {
  id: string;
  name: string;
  description: string;
  uses: number;
  isMeta: boolean;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  category: string;
  howToEarn: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  brawlerId?: string;    // null if general badge
  icon: string;
  prestigeLevel?: string;
}

interface Guide {
  slug: string;
  title: string;
  category: 'beginner' | 'advanced' | 'game_mode' | 'brawler' | 'system';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readTime: number;       // minutes
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  relatedBrawlers?: string[];
}

interface PlayerProfile {
  tag: string;
  name: string;
  icon: { id: number };
  trophies: number;
  highestTrophies: number;
  soloVictories: number;
  duoVictories: number;
  threeVsThreeVictories: number;
  club?: { tag: string; name: string };
  brawlers: PlayerBrawler[];
}

interface EventRotation {
  active: EventSlot[];
  upcoming: EventSlot[];
}

interface EventSlot {
  startTime: string;
  endTime: string;
  event: {
    id: number;
    mode: string;
    map: string;
  };
}
```

---

## Project Structure

```
brawlhub/
├── public/
│   ├── images/
│   │   ├── brawlers/          # Brawler icons/art (or fetched from CDN)
│   │   ├── modes/             # Game mode icons
│   │   └── badges/            # Badge icons
│   └── favicon.ico
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout with nav, footer, theme
│   │   ├── page.tsx           # Home page
│   │   ├── brawlers/
│   │   │   ├── page.tsx       # Brawler grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Brawler detail
│   │   ├── stats/
│   │   │   ├── page.tsx       # Lookup landing
│   │   │   ├── player/[tag]/
│   │   │   │   └── page.tsx   # Player profile
│   │   │   └── club/[tag]/
│   │   │       └── page.tsx   # Club profile
│   │   ├── meta/
│   │   │   ├── page.tsx       # Meta overview / tier list
│   │   │   └── builds/
│   │   │       └── page.tsx   # Build recommendations
│   │   ├── guides/
│   │   │   ├── page.tsx       # Guide index
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx   # Individual guide
│   │   │   └── badges/
│   │   │       └── page.tsx   # Badge & prestige guide
│   │   ├── news/
│   │   │   ├── page.tsx       # News index
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Individual article
│   │   ├── tools/
│   │   │   ├── team-builder/
│   │   │   │   └── page.tsx
│   │   │   └── tier-list/
│   │   │       └── page.tsx
│   │   ├── leaderboards/
│   │   │   └── page.tsx
│   │   └── api/               # API route handlers (server-side proxy)
│   │       ├── player/[tag]/
│   │       │   └── route.ts
│   │       ├── club/[tag]/
│   │       │   └── route.ts
│   │       ├── brawlers/
│   │       │   └── route.ts
│   │       ├── events/
│   │       │   └── route.ts
│   │       └── leaderboards/
│   │           └── route.ts
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── layout/            # Header, Footer, Sidebar, Nav
│   │   ├── brawlers/          # BrawlerCard, BrawlerGrid, BuildCard, StatTable
│   │   ├── stats/             # PlayerCard, BattleLogEntry, TrophyChart
│   │   ├── meta/              # TierList, WinRateTable, BuildComparison
│   │   ├── guides/            # GuideCard, BadgeCard, ProgressTracker
│   │   ├── tools/             # TeamBuilder, TierListBuilder
│   │   └── home/              # EventRotation, NewsCarousel, FeaturedGuides
│   ├── lib/
│   │   ├── api/               # API client functions
│   │   │   ├── brawlstars.ts  # Official API wrapper
│   │   │   ├── brawlify.ts    # Community API wrapper
│   │   │   └── types.ts       # API response types
│   │   ├── utils.ts           # Tag formatting, helpers
│   │   └── constants.ts       # Rarity colors, mode names, etc.
│   ├── data/
│   │   ├── brawlers/          # Static brawler data JSON (fallback / enrichment)
│   │   ├── builds/            # Curated build recommendations JSON
│   │   ├── badges/            # Badge catalog JSON
│   │   └── guides/            # MDX guide files
│   ├── hooks/
│   │   ├── useBrawlers.ts
│   │   ├── usePlayer.ts
│   │   └── useEventRotation.ts
│   └── styles/
│       └── globals.css        # Tailwind base + custom theme
├── .env.local                 # BRAWLSTARS_API_KEY
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

---

## Design Direction

- **Theme:** Dark mode primary (matches the game's aesthetic), with light mode toggle
- **Color palette:** Brawl Stars-inspired — dark backgrounds, vibrant accent colors per rarity
  - Common: `#B2DFFC` (light blue)
  - Rare: `#68D639` (green)
  - Super Rare: `#5AB3FF` (blue)
  - Epic: `#D850FF` (purple)
  - Mythic: `#FE5E72` (red)
  - Legendary: `#FFF11E` (gold)
  - Chromatic: gradient (multi-color)
- **Typography:** Bold, clean sans-serif (e.g., Inter or Nunito)
- **Cards:** Rounded corners, subtle borders, hover effects
- **Animations:** Subtle transitions, no heavy animation (performance first)

---

## Build Phases

### Phase 1 — MVP (Core Foundation)

- Project setup (Next.js, Tailwind, shadcn/ui, TypeScript)
- Root layout with navigation and dark theme
- Home page with live event rotation widget
- Brawler database: grid view + detail page with base stats
- Player lookup: basic profile + brawler collection
- API proxy routes for official Brawl Stars API

### Phase 2 — Content & Meta

- Brawler builds system (data-driven + curated)
- Meta overview page with tier list and win/pick rates
- MDX guide system with first batch of guides
- Badge & prestige guide with catalog
- News section

### Phase 3 — Interactive Tools & Polish

- Team comp builder
- Tier list builder (drag & drop, exportable)
- Badge progress tracker with persistent storage
- Battle log visualizations and charts
- Club lookup and profiles

### Phase 4 — Community & Growth

- Leaderboards
- Search across entire site
- SEO optimization (structured data, OG tags, sitemaps)
- Performance optimization (ISR, image CDN, bundle analysis)
- PWA support (offline access for guides)
- Optional: user accounts for saved builds, favorites, progress tracking

---

## Environment Variables

```
BRAWLSTARS_API_KEY=           # Official API key from developer.brawlstars.com
NEXT_PUBLIC_SITE_URL=         # Production URL for OG tags / canonical
BRAWLIFY_API_KEY=             # If required by Brawlify
```

---

## Notes & Considerations

- **Rate limits:** Official API has rate limits — implement caching aggressively on API routes
- **Player tags:** Tags use `#` prefix and contain `0289PYLQGRJCUV` characters — need URL encoding (`%23`) and validation
- **Images:** Brawler art is copyrighted by Supercell — use their fan content policy guidelines, attribute properly
- **Updates:** Brawl Stars updates frequently — brawler data should be easy to update (JSON files + API fallback)
- **Mobile first:** Most Brawl Stars players are on mobile — responsive design is critical
- **Accessibility:** Rarity colors should not be the only differentiator — use labels/icons alongside color
