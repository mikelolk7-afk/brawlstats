export interface NewsArticle {
  slug: string;
  title: string;
  category: 'patch_notes' | 'new_brawler' | 'event' | 'season' | 'general';
  publishedAt: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const NEWS_CATEGORY_LABELS: Record<string, string> = {
  patch_notes: 'Patch Notes',
  new_brawler: 'New Brawler',
  event: 'Event',
  season: 'Season',
  general: 'General',
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: 'season-25-update',
    title: 'Season 25 Balance Changes & New Content',
    category: 'patch_notes',
    publishedAt: '2026-03-15',
    excerpt: 'Major balance changes hit the game — several brawlers receive significant buffs and nerfs, plus a new game mode rotation.',
    tags: ['balance', 'patch', 'season 25'],
    content: `## Season 25 Balance Changes

The latest balance update brings significant changes to the meta. Here's a breakdown of the most impactful changes.

### Buffs

**Shelly**
- Main attack damage increased by 5%
- Super charge rate increased slightly
- *Analysis: Shelly gets a small boost to help her compete at higher trophy ranges.*

**Penny**
- Mortar HP increased by 10%
- Main attack split projectile damage increased
- *Analysis: Penny needed this — her mortar was too easy to destroy.*

**Dynamike**
- Dynamite damage increased by 3%
- Super radius slightly increased
- *Analysis: A small but welcome buff for Dynamike mains.*

### Nerfs

**Spike**
- Curveball speed slightly reduced
- Main attack damage reduced by 2%
- *Analysis: Spike has been dominant for too long. This should bring him more in line.*

**Frank**
- Super stun duration reduced from 1.5s to 1.2s
- *Analysis: Frank's stun was too oppressive in competitive play.*

**Rosa**
- Shield duration on Super reduced by 0.5s
- *Analysis: Rosa was overperforming in most modes.*

### New Features
- New Power League map rotation
- Championship Challenge returns next week
- New seasonal skins available in the shop

Check the [meta page](/meta) for updated tier lists reflecting these changes.`,
  },
  {
    slug: 'best-brawlers-march-2026',
    title: 'Top 10 Best Brawlers — March 2026 Meta',
    category: 'general',
    publishedAt: '2026-03-10',
    excerpt: 'The meta has shifted after the latest update. Here are the top 10 brawlers dominating the game right now.',
    tags: ['meta', 'tier list', 'best brawlers'],
    content: `## March 2026 Meta Rankings

After the latest balance changes, here are the brawlers dominating the current meta.

### 1. Spike (S Tier)
Despite a small nerf, Spike remains incredibly strong. Curveball is still very hard to dodge, and his area denial with Super is unmatched.

### 2. Rosa (S Tier)
Rosa's shield makes her nearly unkillable in the right hands. Plant Life in bushes gives her insane sustain.

### 3. Poco (S Tier)
The best support in the game. Da Capo! healing plus Tuning Fork gadget keeps his team alive through anything.

### 4. Frank (S Tier)
Even with the stun nerf, Frank's massive health pool and devastating Super make him a top pick in most 3v3 modes.

### 5. Tara (A Tier)
Tara's pull Super is one of the best in the game. Black Portal clone provides extra value after every Super.

### 6. Rico (A Tier)
On maps with walls, Rico is arguably the best damage dealer. Super Bouncy turns him into a bouncing nightmare.

### 7. 8-Bit (A Tier)
Slow but deadly. 8-Bit's damage output is among the highest in the game, and his turret boosts the whole team.

### 8. Pam (A Tier)
A versatile support/tank hybrid. Mama's Hug keeps her team healthy while she dishes out consistent damage.

### 9. El Primo (A Tier)
The Brawl Ball king. El Primo's Super is one of the most versatile tools in the game for scoring goals and team wipes.

### 10. Piper (A Tier)
Dominates open maps with her long-range sniper shots. Ambush Star Power makes her lethal from bushes.

Check the full [tier list](/meta) for all brawler rankings.`,
  },
  {
    slug: 'championship-challenge-tips',
    title: 'Championship Challenge: How to Win All 15 Games',
    category: 'event',
    publishedAt: '2026-03-05',
    excerpt: 'The Championship Challenge returns this season. Here are our best tips for going 15-0.',
    tags: ['championship', 'challenge', 'competitive', 'tips'],
    content: `## Championship Challenge Guide

The Championship Challenge is back! Win 15 games (across 5 modes, 3 wins each) before losing 4 total to earn exclusive rewards and qualify for monthly finals.

## Preparation

### Team Up
**Never play solo queue.** Find 2 reliable teammates who communicate. Use voice chat if possible.

### Study the Maps
The challenge maps are announced in advance. Study each one:
- What brawlers excel on this map?
- Are there walls for throwers? Bushes for tanks?
- What's the dominant lane strategy?

### Practice Compositions
For each map, have 2-3 team compositions ready. If your first pick gets banned or countered, you need backup plans.

## Mode-by-Mode Strategy

### Gem Grab (Matches 1-3)
- Play a standard comp: Gem carrier + Aggro + Support
- Count gems religiously
- Don't get greedy with kills — gems win games

### Brawl Ball (Matches 4-6)
- Run a tank + support + damage comp
- Practice passing plays before the challenge
- Defensive plays are safer than hero plays

### Heist (Matches 7-9)
- Bring at least one wall-breaker (Colt, Brock)
- Balance offense and defense
- Don't all-in on attack — protect your safe

### Bounty (Matches 10-12)
- Long-range comps dominate
- Don't chase kills into enemy territory
- Play the star count, not the kill count

### Knockout (Matches 13-15)
- These are the hardest matches — you'll face strong teams
- Play for picks — first elimination wins the round
- Use the environment for cover, don't peek unnecessarily

## If You Lose
Stay calm. You have 3 lives (4 losses = elimination). Losing early doesn't mean failure — some of the best players lose 1-2 games. Refocus and adapt.

Good luck!`,
  },
  {
    slug: 'prestige-system-explained',
    title: 'Prestige System Explained: Everything You Need to Know',
    category: 'season',
    publishedAt: '2026-02-20',
    excerpt: 'The Prestige system adds new progression beyond max rank. Here\'s how it works and what you can earn.',
    tags: ['prestige', 'progression', 'ranks', 'rewards'],
    content: `## What is the Prestige System?

The Prestige system is an advanced progression path for dedicated players. Once you push a brawler past Rank 25 (750 trophies), you enter Prestige territory.

## How Prestige Works

### Prestige Ranks
After Rank 25, every additional 50 trophies earns Prestige points for that brawler:

| Rank | Trophies | Prestige Level |
|------|----------|----------------|
| 25 | 750 | Bronze |
| 26 | 800 | Bronze II |
| 27 | 850 | Bronze III |
| 28 | 900 | Silver |
| 29 | 950 | Silver II |
| 30 | 1000 | Gold |
| 31 | 1050 | Gold II |
| 32 | 1100 | Diamond |
| 33+ | 1150+ | Master |

### Prestige Rewards
Each Prestige level unlocks:
- **Exclusive profile icons** tied to that brawler
- **Spray emotes** for that brawler
- **Title badges** displayed on your profile
- **Prestige skin color variants** (at Gold and above)

## Tips for Prestige Pushing

1. **Play in a coordinated team** — solo queue above 750 is very difficult
2. **Choose the right time** — push early in the season when fewer players are at high trophies
3. **Know your matchups** — at high trophies, every opponent knows what they're doing
4. **Take breaks between losses** — tilting from 900 to 800 is devastating
5. **Focus on one brawler** — spreading across many brawlers is inefficient for Prestige

## Is Prestige Worth It?

Prestige rewards are mainly cosmetic but are among the rarest items in the game. Having a Gold or Diamond Prestige badge shows serious dedication and skill. For competitive players, it's a badge of honor.

Check out our [Badge Guide](/guides/badges) for a complete list of all earnable badges including Prestige badges.`,
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: NewsArticle['category']): NewsArticle[] {
  return NEWS_ARTICLES.filter((a) => a.category === category);
}
