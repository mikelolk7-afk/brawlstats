export interface GuideData {
  slug: string;
  title: string;
  category: 'beginner' | 'advanced' | 'game_mode' | 'brawler' | 'system';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readTime: number;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  excerpt: string;
  content: string;
  relatedBrawlers?: string[];
}

export const GUIDES: GuideData[] = [
  {
    slug: 'beginners-guide',
    title: 'Getting Started with Brawl Stars',
    category: 'beginner',
    difficulty: 'beginner',
    readTime: 8,
    publishedAt: '2026-01-15',
    updatedAt: '2026-03-01',
    tags: ['beginner', 'basics', 'tutorial'],
    excerpt: 'Everything you need to know to start your Brawl Stars journey — from controls to your first matches.',
    content: `## Welcome to Brawl Stars!

Brawl Stars is a fast-paced multiplayer game where you battle with unique characters called **Brawlers**. Each brawler has a basic attack, a Super ability, and unlockable Star Powers, Gadgets, and Gears.

## Basic Controls

- **Move**: Use the left joystick to move your brawler
- **Attack**: Tap or drag the right joystick to aim and shoot
- **Super**: Once charged (by dealing or taking damage), use the yellow button to unleash your Super ability
- **Gadget**: Available from Power 7, tap the green button to use your gadget (limited uses per match)

## Game Modes Overview

### 3v3 Modes
- **Gem Grab**: Collect 10 gems from the center and hold them for a countdown
- **Brawl Ball**: Score 2 goals to win — like soccer with superpowers
- **Heist**: Destroy the enemy team's safe while protecting yours
- **Bounty**: Earn stars by eliminating enemies — team with most stars wins
- **Hot Zone**: Control zones on the map to earn points
- **Knockout**: Eliminate all enemies in best-of-3 rounds

### Showdown
- **Solo Showdown**: 10-player free-for-all — last one standing wins
- **Duo Showdown**: Team up with a partner in 5-team battle royale

## Tips for New Players

1. **Start with Shelly** — she's easy to learn and effective at close range
2. **Stay behind cover** — use walls and bushes to avoid enemy fire
3. **Don't auto-aim everything** — learn to manually aim for better accuracy
4. **Play with your team** — stick together in 3v3 modes
5. **Save your Super** — don't waste it, use it at the right moment
6. **Try every game mode** — find what you enjoy most
7. **Upgrade one brawler at a time** — focus your resources

## Understanding Trophies

Each brawler earns trophies independently. Win to gain trophies, lose to lose them. Your total trophies are the sum of all brawlers. Higher trophies unlock more game modes and rewards.

## Power Levels Explained

| Level | Unlocks |
|-------|---------|
| 1-6 | Base stats increase |
| 7 | Gadget slot |
| 9 | Star Power slot |
| 10 | Gear slots |
| 11 | Hypercharge (if available) |

Prioritize upgrading your favorite brawlers to Power 9 for Star Powers — they significantly change gameplay.`,
  },
  {
    slug: 'trophy-pushing-guide',
    title: 'How to Push Trophies Effectively',
    category: 'advanced',
    difficulty: 'intermediate',
    readTime: 6,
    publishedAt: '2026-02-01',
    updatedAt: '2026-03-10',
    tags: ['trophies', 'ranking', 'competitive', 'strategy'],
    excerpt: 'Master the art of trophy pushing with proven strategies for climbing the ranks efficiently.',
    content: `## Trophy Pushing Fundamentals

Pushing trophies consistently requires more than just raw skill — it's about making smart decisions on which brawlers, modes, and maps to play.

## Pick the Right Brawler for the Mode

Not every brawler works in every mode. Check the current meta tier list to see which brawlers have the highest win rates in specific modes. Playing a strong meta pick gives you an immediate advantage.

### Top Mode Picks (General)
- **Gem Grab**: Controllers and supports shine (Poco, Pam, Emz)
- **Brawl Ball**: Tanks and assassins dominate (El Primo, Frank, Mortis)
- **Showdown**: Self-sufficient brawlers (Shelly, Rosa, Crow)
- **Heist**: High DPS brawlers (Colt, Brock, 8-Bit)
- **Bounty**: Snipers and long-range (Piper, Brock, Bo)

## Tilting Prevention

"Tilting" means losing trophies rapidly. To avoid it:

1. **Stop after 2-3 losses in a row** — take a break
2. **Switch brawlers or modes** — the map rotation might not suit your pick
3. **Don't play when frustrated** — emotional play leads to bad decisions
4. **Track your win rate** — if below 50%, switch your strategy

## Advanced Strategies

### Map Awareness
- Check the map before picking a brawler
- Open maps favor long-range brawlers
- Bushy maps favor short-range and assassins
- Walls favor throwers (Barley, Dynamike, Tick)

### Timing Your Push
- Push early in the season when matchmaking is looser
- Avoid pushing during peak hours when competition is fierce
- Focus on brawlers close to a rank milestone for efficient gains

### Team Composition
In 3v3, a balanced team needs:
- **A carry** (damage dealer or assassin)
- **A support** (healer or controller)
- **A tank or lane holder**

## Setting Goals

Set realistic trophy goals per season:
- **Casual**: 500+ on your top 10 brawlers
- **Competitive**: 750+ on your top 5
- **Hardcore**: 1000+ on at least one brawler

Remember: consistency beats grinding. Short focused sessions outperform marathon play.`,
  },
  {
    slug: 'gem-grab-guide',
    title: 'Mastering Gem Grab: Complete Strategy Guide',
    category: 'game_mode',
    difficulty: 'intermediate',
    readTime: 7,
    publishedAt: '2026-01-20',
    updatedAt: '2026-02-28',
    tags: ['gem grab', 'game mode', 'strategy', '3v3'],
    excerpt: 'Learn the roles, positioning, and strategies that win Gem Grab matches consistently.',
    content: `## Gem Grab Basics

Gem Grab is the quintessential 3v3 mode. A gem mine spawns gems in the center — collect 10 and survive a 15-second countdown to win.

## The Three Roles

### 1. Gem Carrier (Mid Lane)
**Job**: Collect gems, stay alive, play safe.

Best brawlers: Poco, Pam, Gene, Jessie

The gem carrier sits mid, collects gems, and avoids dying at all costs. If the carrier dies with gems, the enemy gets them all.

### 2. Aggro (Lane Pusher)
**Job**: Push forward, get kills, create pressure.

Best brawlers: Mortis, El Primo, Rosa, Darryl

Aggro players push up and take enemy territory, making space for the carrier to collect gems safely.

### 3. Support (Back Line)
**Job**: Control area, chip damage, protect the carrier.

Best brawlers: Spike, Barley, Tick, Emz

Support stays behind the carrier, controlling the map with area denial and picking off enemies.

## Key Strategies

### When You Have 10 Gems
- **Fall back immediately** — don't keep fighting
- Protect the gem carrier at all costs
- Play defensively and run out the countdown timer
- Use walls and cover to survive

### When the Enemy Has 10 Gems
- **Go aggressive** — you have nothing to lose
- Focus the gem carrier
- Use Supers to break through their defense
- A team wipe can swing the entire match

### Gem Control Tips
- Count the gems! Always know the score
- Don't let one person hold all the gems — spread them out
- If you're the carrier with 8+ gems, stop pushing forward
- Dying with 0 gems is better than dying with 5

## Common Mistakes
1. Chasing kills instead of collecting gems
2. Gem carrier playing too aggressively
3. Not falling back when you hit 10 gems
4. All 3 players going aggressive at once
5. Ignoring the gem count`,
  },
  {
    slug: 'brawl-ball-tips',
    title: 'Brawl Ball: Score More Goals',
    category: 'game_mode',
    difficulty: 'beginner',
    readTime: 5,
    publishedAt: '2026-02-10',
    updatedAt: '2026-03-05',
    tags: ['brawl ball', 'game mode', 'tips'],
    excerpt: 'Score more goals and win more Brawl Ball matches with these essential tips and tricks.',
    content: `## Brawl Ball 101

Brawl Ball is Brawl Stars' most popular mode. Two teams of 3 try to score goals — first to 2 goals wins.

## Essential Mechanics

### Ball Control
- **Pick up the ball** by walking over it
- **Shoot the ball** with your attack button (it replaces your attack)
- **Pass to teammates** — teamwork wins games
- **Using Super with the ball** — some Supers let you carry and score

### Key Rules
- You can't attack while holding the ball
- Getting hit drops the ball
- Scoring a goal destroys all walls on the map
- Matches are 2.5 minutes with overtime if tied

## Best Brawlers for Brawl Ball

### S Tier
- **El Primo**: Super into the goal with the ball is an easy score
- **Frank**: His stun Super creates scoring opportunities
- **Rosa**: Tanky with shield, great ball carrier

### A Tier
- **Mortis**: Dashes make him the best ball carrier (high skill)
- **Poco**: Keeps the team healed and alive
- **Bull**: Charges through enemies with the ball

## Scoring Strategies

### The Tank Rush
Have your tank (El Primo, Frank, Bull) grab the ball, charge through mid, and either score or pass to an open teammate.

### The Mortis Play
Mortis dashes around the side, picks up the ball, and dashes into the goal. Requires practice but is devastatingly effective.

### The Team Wipe
Kill all 3 enemies, then walk the ball in. The safest way to score but requires winning the fight first.

### The Super Score
Use El Primo or Darryl's Super to launch into the goal area while holding the ball.

## Defensive Tips
1. **Don't all chase the ball** — someone should stay back
2. **Block the goal** — stand in the goal when defending
3. **Break the ball carrier** — focus fire on whoever has the ball
4. **Don't own-goal** — be careful with your aim near your own goal
5. **Save your Super for defense** — a well-timed Frank stun can prevent a goal`,
  },
  {
    slug: 'understanding-builds',
    title: 'Understanding Builds: Star Powers, Gadgets & Gears',
    category: 'system',
    difficulty: 'intermediate',
    readTime: 6,
    publishedAt: '2026-02-15',
    updatedAt: '2026-03-12',
    tags: ['builds', 'star powers', 'gadgets', 'gears', 'meta'],
    excerpt: 'Learn how to choose the best Star Power, Gadget, and Gear combinations for every brawler.',
    content: `## What is a Build?

A "build" is the combination of Star Power + Gadget + Gears you equip on a brawler. The right build can dramatically change how a brawler plays and their effectiveness.

## Star Powers (Unlocked at Power 9)

Each brawler has 2 Star Powers — passive abilities that are always active. You can only equip one at a time.

### How to Choose
- Check the current meta — one Star Power usually has a higher win rate
- Consider the game mode — some Star Powers are better in specific modes
- Match your playstyle — aggressive vs. defensive options

## Gadgets (Unlocked at Power 7)

Each brawler has 2 Gadgets — active abilities with limited uses per match (usually 3).

### Gadget Tips
- **Don't waste them early** — save gadgets for crucial moments
- **Some gadgets are situational** — learn when each one shines
- **Combo with Supers** — many gadgets pair perfectly with Super abilities

## Gears (Unlocked at Power 10+)

Gears are stat boosts that activate under specific conditions:
- **Damage Gear**: Extra damage when below 50% health
- **Speed Gear**: Movement speed boost in bushes
- **Health Gear**: Regenerate health faster when not taking damage
- **Shield Gear**: Temporary shield when respawning
- **Vision Gear**: See into bushes from further away

### Gear Recommendations by Brawler Type
- **Tanks**: Shield + Health (survivability)
- **Assassins**: Damage + Speed (mobility and burst)
- **Snipers**: Damage + Speed (repositioning)
- **Support**: Health + Shield (staying alive to heal)
- **Controllers**: Damage + Speed (area control)

## Hypercharges (Power 11)

Some brawlers have Hypercharges — enhanced versions of their Super. These are unlocked at max power level and charge by dealing/taking damage (slower than regular Super charge).

## Mode-Specific Builds

The best build often changes by game mode:
- **Showdown**: Prioritize survivability (Shield gear, defensive Star Powers)
- **Gem Grab**: Balance of offense and defense
- **Brawl Ball**: Aggressive builds for quick kills
- **Heist**: Maximum damage output
- **Bounty**: Range and safety first

Check our [Meta Builds page](/meta/builds) for the current best builds per brawler and mode.`,
  },
];

export function getGuideBySlug(slug: string): GuideData | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: GuideData['category']): GuideData[] {
  return GUIDES.filter((g) => g.category === category);
}

export const GUIDE_CATEGORY_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  advanced: 'Advanced',
  game_mode: 'Game Mode',
  brawler: 'Brawler',
  system: 'System',
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};
