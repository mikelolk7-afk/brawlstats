export interface BadgeData {
  id: string;
  name: string;
  description: string;
  category: 'combat' | 'progression' | 'social' | 'seasonal' | 'special';
  howToEarn: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  brawlerId?: number;
  icon: string;
  prestigeLevel?: string;
}

export const BADGE_CATEGORIES = {
  combat: 'Combat',
  progression: 'Progression',
  social: 'Social',
  seasonal: 'Seasonal',
  special: 'Special',
} as const;

export const BADGES: BadgeData[] = [
  // Combat badges
  {
    id: 'triple-kill',
    name: 'Triple Threat',
    description: 'Eliminate all 3 enemies in a single match without dying.',
    category: 'combat',
    howToEarn: 'Get a team wipe (3 eliminations) without dying in a 3v3 match.',
    difficulty: 3,
    icon: '🎯',
  },
  {
    id: 'showdown-victor',
    name: 'Last One Standing',
    description: 'Win a Solo Showdown match.',
    category: 'combat',
    howToEarn: 'Finish 1st place in a Solo Showdown match.',
    difficulty: 2,
    icon: '👑',
  },
  {
    id: 'shutout',
    name: 'Shutout',
    description: 'Win a match without the enemy team scoring at all.',
    category: 'combat',
    howToEarn: 'Win a Brawl Ball, Gem Grab, or Heist match without the opponents scoring.',
    difficulty: 3,
    icon: '🛡️',
  },
  {
    id: 'clutch-play',
    name: 'Clutch Play',
    description: 'Win a match in the last 15 seconds after being behind.',
    category: 'combat',
    howToEarn: 'Make a comeback and win in the final moments of a match.',
    difficulty: 4,
    icon: '⚡',
  },
  {
    id: 'super-striker',
    name: 'Super Striker',
    description: 'Score a goal with your Super ability in Brawl Ball.',
    category: 'combat',
    howToEarn: 'Use your Super to score the winning goal in Brawl Ball.',
    difficulty: 2,
    icon: '⚽',
  },
  {
    id: 'gem-hoarder',
    name: 'Gem Hoarder',
    description: 'Hold 10 or more gems at once in Gem Grab.',
    category: 'combat',
    howToEarn: 'Collect and hold at least 10 gems simultaneously.',
    difficulty: 3,
    icon: '💎',
  },
  {
    id: 'safe-cracker',
    name: 'Safe Cracker',
    description: 'Deal over 50% of the total damage to the enemy safe in Heist.',
    category: 'combat',
    howToEarn: 'Be the top damage dealer against the enemy safe.',
    difficulty: 3,
    icon: '🔓',
  },

  // Progression badges
  {
    id: 'first-rank-20',
    name: 'Pushing Limits',
    description: 'Push any brawler to Rank 20 (500 trophies).',
    category: 'progression',
    howToEarn: 'Reach 500 trophies with a single brawler.',
    difficulty: 2,
    icon: '📈',
  },
  {
    id: 'first-rank-25',
    name: 'Trophy Legend',
    description: 'Push any brawler to Rank 25 (750 trophies).',
    category: 'progression',
    howToEarn: 'Reach 750 trophies with a single brawler.',
    difficulty: 4,
    icon: '🏆',
  },
  {
    id: 'first-rank-30',
    name: 'Rank 30 Club',
    description: 'Push any brawler to Rank 30 (1000 trophies).',
    category: 'progression',
    howToEarn: 'Reach 1000 trophies with a single brawler.',
    difficulty: 5,
    icon: '💀',
  },
  {
    id: 'max-power',
    name: 'Maxed Out',
    description: 'Upgrade a brawler to Power Level 11.',
    category: 'progression',
    howToEarn: 'Fully upgrade any brawler to power level 11.',
    difficulty: 3,
    icon: '⬆️',
  },
  {
    id: 'ten-thousand',
    name: '10K Club',
    description: 'Reach 10,000 total trophies.',
    category: 'progression',
    howToEarn: 'Accumulate 10,000 total trophies across all brawlers.',
    difficulty: 2,
    icon: '🔟',
  },
  {
    id: 'twenty-five-thousand',
    name: '25K Milestone',
    description: 'Reach 25,000 total trophies.',
    category: 'progression',
    howToEarn: 'Accumulate 25,000 total trophies across all brawlers.',
    difficulty: 4,
    icon: '🌟',
  },
  {
    id: 'fifty-thousand',
    name: '50K Legend',
    description: 'Reach 50,000 total trophies.',
    category: 'progression',
    howToEarn: 'Accumulate 50,000 total trophies across all brawlers.',
    difficulty: 5,
    icon: '🔥',
  },
  {
    id: 'all-brawlers',
    name: 'Gotta Brawl \'Em All',
    description: 'Unlock every brawler in the game.',
    category: 'progression',
    howToEarn: 'Collect and unlock all available brawlers.',
    difficulty: 4,
    icon: '📦',
  },

  // Social badges
  {
    id: 'club-member',
    name: 'Team Player',
    description: 'Join a club.',
    category: 'social',
    howToEarn: 'Join any club through the club search.',
    difficulty: 1,
    icon: '🤝',
  },
  {
    id: 'club-president',
    name: 'Club Leader',
    description: 'Become the president of a club.',
    category: 'social',
    howToEarn: 'Create a club or be promoted to president.',
    difficulty: 2,
    icon: '👔',
  },
  {
    id: 'friendly-battle',
    name: 'Friendly Fire',
    description: 'Play 10 friendly battles.',
    category: 'social',
    howToEarn: 'Complete 10 friendly matches with friends or clubmates.',
    difficulty: 1,
    icon: '🎮',
  },
  {
    id: 'duo-wins',
    name: 'Dynamic Duo',
    description: 'Win 100 Duo Showdown matches.',
    category: 'social',
    howToEarn: 'Accumulate 100 victories in Duo Showdown with a partner.',
    difficulty: 3,
    icon: '👥',
  },

  // Seasonal badges
  {
    id: 'season-reset',
    name: 'Season Survivor',
    description: 'Maintain trophies above 500 on 10 brawlers through a season reset.',
    category: 'seasonal',
    howToEarn: 'Have at least 10 brawlers above 500 trophies when the season resets.',
    difficulty: 3,
    icon: '📅',
  },
  {
    id: 'power-league',
    name: 'Power League Pro',
    description: 'Reach Diamond rank in Power League.',
    category: 'seasonal',
    howToEarn: 'Climb to Diamond rank or higher in a Power League season.',
    difficulty: 4,
    icon: '💠',
  },
  {
    id: 'challenge-winner',
    name: 'Challenge Champion',
    description: 'Complete a challenge event without any losses.',
    category: 'seasonal',
    howToEarn: 'Win all matches in a challenge event (e.g., Championship Challenge).',
    difficulty: 4,
    icon: '🏅',
  },

  // Special badges
  {
    id: 'star-player',
    name: 'Star Player',
    description: 'Earn Star Player 50 times.',
    category: 'special',
    howToEarn: 'Be selected as the Star Player in 50 matches.',
    difficulty: 3,
    icon: '⭐',
  },
  {
    id: 'underdog',
    name: 'Underdog Victory',
    description: 'Win a match as the underdog (trophy disadvantage).',
    category: 'special',
    howToEarn: 'Win a match when your team has a significant trophy disadvantage.',
    difficulty: 2,
    icon: '🐕',
  },
  {
    id: 'no-damage',
    name: 'Untouchable',
    description: 'Win a 3v3 match without taking any damage.',
    category: 'special',
    howToEarn: 'Complete and win a 3v3 match with zero damage taken.',
    difficulty: 5,
    icon: '🔮',
  },

  // Brawler-specific badges
  {
    id: 'shelly-super-chain',
    name: 'Super Chain',
    description: 'Chain 3 Supers in a row as Shelly without the enemies escaping.',
    category: 'combat',
    howToEarn: 'Use Shelly\'s Super 3 times in a row, each recharged from the previous.',
    difficulty: 3,
    brawlerId: 16000000,
    icon: '🔗',
  },
  {
    id: 'mortis-trickshot',
    name: 'Mortis Trickshot',
    description: 'Score a trickshot goal as Mortis in Brawl Ball.',
    category: 'combat',
    howToEarn: 'Score a goal using Mortis\' dash mechanics in Brawl Ball.',
    difficulty: 4,
    brawlerId: 16000011,
    icon: '🦇',
  },
  {
    id: 'spike-full-burst',
    name: 'Spike Burst',
    description: 'Hit an enemy with all spikes from a single attack.',
    category: 'combat',
    howToEarn: 'Land every spike from one Spike attack on a single enemy.',
    difficulty: 3,
    brawlerId: 16000005,
    icon: '🌵',
  },
  {
    id: 'frank-stun-squad',
    name: 'Stun Squad',
    description: 'Stun all 3 enemies at once with Frank\'s Super.',
    category: 'combat',
    howToEarn: 'Hit all 3 enemy brawlers with a single Frank Super.',
    difficulty: 3,
    brawlerId: 16000020,
    icon: '🔨',
  },
  {
    id: 'poco-team-heal',
    name: 'Full Heal',
    description: 'Heal both teammates to full health with a single Poco Super.',
    category: 'combat',
    howToEarn: 'Use Poco\'s Super to fully heal both teammates at once.',
    difficulty: 2,
    brawlerId: 16000013,
    icon: '🎵',
  },
];

export function getBadgesByCategory(category: BadgeData['category']): BadgeData[] {
  return BADGES.filter((b) => b.category === category);
}

export function getBadgesForBrawler(brawlerId: number): BadgeData[] {
  return BADGES.filter((b) => b.brawlerId === brawlerId);
}

export function getBadgeById(id: string): BadgeData | undefined {
  return BADGES.find((b) => b.id === id);
}
