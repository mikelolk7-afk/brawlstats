export const RARITY_COLORS = {
  common: '#B2DFFC',
  rare: '#68D639',
  super_rare: '#5AB3FF',
  epic: '#D850FF',
  mythic: '#FE5E72',
  legendary: '#FFF11E',
  chromatic: '#FF7FEB',
} as const;

export const RARITY_LABELS: Record<string, string> = {
  common: 'Common',
  rare: 'Rare',
  super_rare: 'Super Rare',
  epic: 'Epic',
  mythic: 'Mythic',
  legendary: 'Legendary',
  chromatic: 'Chromatic',
};

export const RARITY_ORDER = ['common', 'rare', 'super_rare', 'epic', 'mythic', 'legendary', 'chromatic'] as const;

export type Rarity = (typeof RARITY_ORDER)[number];

export const BRAWLER_CLASSES = ['damage_dealer', 'tank', 'assassin', 'support', 'controller', 'marksman'] as const;

export type BrawlerClass = (typeof BRAWLER_CLASSES)[number];

export const CLASS_LABELS: Record<BrawlerClass, string> = {
  damage_dealer: 'Damage Dealer',
  tank: 'Tank',
  assassin: 'Assassin',
  support: 'Support',
  controller: 'Controller',
  marksman: 'Marksman',
};

export const MOVEMENT_SPEEDS = {
  very_slow: 580,
  slow: 650,
  normal: 720,
  fast: 770,
  very_fast: 820,
} as const;

export const MOVEMENT_SPEED_LABELS: Record<string, string> = {
  very_slow: 'Very Slow',
  slow: 'Slow',
  normal: 'Normal',
  fast: 'Fast',
  very_fast: 'Very Fast',
};

export const CACHE_DURATIONS = {
  events: 3600,
  player: 300,
  brawlers: 86400,
} as const;

export const TAG_CHARS = '0289PYLQGRJCUV';

export const GAME_MODES = [
  'gemGrab',
  'brawlBall',
  'showdown',
  'duoShowdown',
  'heist',
  'bounty',
  'hotZone',
  'knockout',
  'siege',
  'presentPlunder',
] as const;

export const GAME_MODE_LABELS: Record<string, string> = {
  gemGrab: 'Gem Grab',
  brawlBall: 'Brawl Ball',
  showdown: 'Showdown',
  duoShowdown: 'Duo Showdown',
  heist: 'Heist',
  bounty: 'Bounty',
  hotZone: 'Hot Zone',
  knockout: 'Knockout',
  siege: 'Siege',
  presentPlunder: 'Present Plunder',
};
