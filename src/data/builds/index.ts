export interface BrawlerBuild {
  brawlerId: number;
  brawlerName: string;
  gameMode?: string;
  starPower: string;
  gadget: string;
  gears: [string, string];
  hypercharge?: boolean;
  source: 'data' | 'curated';
  winRate?: number;
  pickRate?: number;
  notes?: string;
}

// Curated builds for the brawlers in our database
export const BUILDS: BrawlerBuild[] = [
  // Shelly
  {
    brawlerId: 16000000,
    brawlerName: 'Shelly',
    starPower: 'Shell Shock',
    gadget: 'Clay Pigeons',
    gears: ['Damage', 'Shield'],
    source: 'curated',
    winRate: 52.1,
    pickRate: 8.3,
    notes: 'Shell Shock slows enemies hit by her Super, giving great control in close-range fights.',
  },
  {
    brawlerId: 16000000,
    brawlerName: 'Shelly',
    gameMode: 'showdown',
    starPower: 'Band-Aid',
    gadget: 'Clay Pigeons',
    gears: ['Shield', 'Health'],
    source: 'curated',
    winRate: 55.4,
    pickRate: 6.1,
    notes: 'Band-Aid provides critical survivability in Showdown, healing Shelly when low.',
  },
  // Colt
  {
    brawlerId: 16000001,
    brawlerName: 'Colt',
    starPower: 'Magnum Special',
    gadget: 'Silver Bullet',
    gears: ['Damage', 'Speed'],
    source: 'curated',
    winRate: 49.8,
    pickRate: 5.2,
    notes: 'Magnum Special extends range and bullet speed, making Colt deadly at distance.',
  },
  {
    brawlerId: 16000001,
    brawlerName: 'Colt',
    gameMode: 'heist',
    starPower: 'Magnum Special',
    gadget: 'Silver Bullet',
    gears: ['Damage', 'Speed'],
    source: 'data',
    winRate: 54.2,
    pickRate: 7.8,
    notes: 'Colt excels in Heist — Silver Bullet opens walls and Magnum Special shreds the safe.',
  },
  // Bull
  {
    brawlerId: 16000002,
    brawlerName: 'Bull',
    starPower: 'Berserker',
    gadget: 'T-Bone Injector',
    gears: ['Shield', 'Health'],
    source: 'curated',
    winRate: 53.7,
    pickRate: 4.5,
    notes: 'Berserker gives Bull increased reload speed when low on health, turning fights around.',
  },
  // Brock
  {
    brawlerId: 16000003,
    brawlerName: 'Brock',
    starPower: 'Rocket No. Four',
    gadget: 'Rocket Laces',
    gears: ['Damage', 'Speed'],
    source: 'curated',
    winRate: 51.3,
    pickRate: 6.7,
    notes: 'Extra rocket adds burst damage. Rocket Laces provides escape utility.',
  },
  // Rico
  {
    brawlerId: 16000004,
    brawlerName: 'Rico',
    starPower: 'Super Bouncy',
    gadget: 'Multiball Launcher',
    gears: ['Damage', 'Speed'],
    source: 'curated',
    winRate: 54.9,
    pickRate: 5.8,
    notes: 'Super Bouncy makes Rico devastating on maps with walls. Bounced shots gain extra damage.',
  },
  {
    brawlerId: 16000004,
    brawlerName: 'Rico',
    gameMode: 'gemGrab',
    starPower: 'Super Bouncy',
    gadget: 'Multiball Launcher',
    gears: ['Damage', 'Shield'],
    source: 'data',
    winRate: 56.2,
    pickRate: 7.1,
    notes: 'Rico dominates enclosed Gem Grab maps with bouncing shots controlling choke points.',
  },
  // Spike
  {
    brawlerId: 16000005,
    brawlerName: 'Spike',
    starPower: 'Curveball',
    gadget: 'Life Plant',
    gears: ['Damage', 'Speed'],
    source: 'curated',
    winRate: 57.2,
    pickRate: 9.1,
    notes: 'Curveball makes it nearly impossible to dodge Spike\'s attacks. One of the strongest builds.',
  },
  // Barley
  {
    brawlerId: 16000006,
    brawlerName: 'Barley',
    starPower: 'Extra Noxious',
    gadget: 'Sticky Syrup Mixer',
    gears: ['Damage', 'Speed'],
    source: 'curated',
    winRate: 52.8,
    pickRate: 4.2,
    notes: 'Extra Noxious boosts area denial damage. Sticky Syrup Mixer slows enemies for easy hits.',
  },
  // Jessie
  {
    brawlerId: 16000007,
    brawlerName: 'Jessie',
    starPower: 'Shocky',
    gadget: 'Spark Plug',
    gears: ['Damage', 'Health'],
    source: 'curated',
    winRate: 50.4,
    pickRate: 3.9,
    notes: 'Shocky makes Scrappy\'s shots bounce between enemies, great for area control.',
  },
  // Nita
  {
    brawlerId: 16000008,
    brawlerName: 'Nita',
    starPower: 'Hyper Bear',
    gadget: 'Bear Paws',
    gears: ['Damage', 'Health'],
    source: 'curated',
    winRate: 53.1,
    pickRate: 5.5,
    notes: 'Hyper Bear makes Bruce attack much faster. Bear Paws stuns enemies near Bruce.',
  },
  // Dynamike
  {
    brawlerId: 16000009,
    brawlerName: 'Dynamike',
    starPower: 'Demolition',
    gadget: 'Fidget Spinner',
    gears: ['Damage', 'Speed'],
    source: 'curated',
    winRate: 48.7,
    pickRate: 4.1,
    notes: 'Demolition adds massive extra Super damage. High skill ceiling with big payoff.',
  },
  // El Primo
  {
    brawlerId: 16000010,
    brawlerName: 'El Primo',
    starPower: 'El Fuego',
    gadget: 'Suplex Supplement',
    gears: ['Shield', 'Health'],
    source: 'curated',
    winRate: 54.3,
    pickRate: 6.8,
    notes: 'El Fuego burns enemies hit by Super. Suplex Supplement grabs and throws enemies.',
  },
  {
    brawlerId: 16000010,
    brawlerName: 'El Primo',
    gameMode: 'brawlBall',
    starPower: 'El Fuego',
    gadget: 'Suplex Supplement',
    gears: ['Shield', 'Health'],
    source: 'data',
    winRate: 57.8,
    pickRate: 9.2,
    notes: 'El Primo is a Brawl Ball menace — Super into goal with the ball for easy scores.',
  },
  // Mortis
  {
    brawlerId: 16000011,
    brawlerName: 'Mortis',
    starPower: 'Coiled Snake',
    gadget: 'Combo Spinner',
    gears: ['Damage', 'Shield'],
    source: 'curated',
    winRate: 51.6,
    pickRate: 11.2,
    notes: 'Coiled Snake gives an extended first dash, critical for engaging. Most popular brawler pick.',
  },
  // Crow
  {
    brawlerId: 16000012,
    brawlerName: 'Crow',
    starPower: 'Extra Toxic',
    gadget: 'Defense Booster',
    gears: ['Speed', 'Shield'],
    source: 'curated',
    winRate: 53.4,
    pickRate: 7.6,
    notes: 'Extra Toxic reduces enemy damage output. Defense Booster provides a crucial shield.',
  },
  // Poco
  {
    brawlerId: 16000013,
    brawlerName: 'Poco',
    starPower: 'Da Capo!',
    gadget: 'Tuning Fork',
    gears: ['Health', 'Shield'],
    source: 'curated',
    winRate: 55.7,
    pickRate: 6.3,
    notes: 'Da Capo! heals teammates with each attack. Core support build for any comp.',
  },
  // Bo
  {
    brawlerId: 16000014,
    brawlerName: 'Bo',
    starPower: 'Snare a Bear',
    gadget: 'Super Totem',
    gears: ['Damage', 'Speed'],
    source: 'curated',
    winRate: 52.0,
    pickRate: 4.7,
    notes: 'Snare a Bear stuns enemies who trigger mines. Super Totem charges team Supers.',
  },
  // Piper
  {
    brawlerId: 16000015,
    brawlerName: 'Piper',
    starPower: 'Ambush',
    gadget: 'Auto Aimer',
    gears: ['Damage', 'Speed'],
    source: 'curated',
    winRate: 53.9,
    pickRate: 5.4,
    notes: 'Ambush adds huge damage when shooting from bushes. Piper dominates open maps.',
  },
  // Pam
  {
    brawlerId: 16000016,
    brawlerName: 'Pam',
    starPower: 'Mama\'s Hug',
    gadget: 'Pulse Modulator',
    gears: ['Health', 'Shield'],
    source: 'curated',
    winRate: 54.6,
    pickRate: 5.0,
    notes: 'Mama\'s Hug heals nearby allies when Pam hits enemies. Excellent in sustained fights.',
  },
  // Tara
  {
    brawlerId: 16000017,
    brawlerName: 'Tara',
    starPower: 'Black Portal',
    gadget: 'Psychic Enhancer',
    gears: ['Damage', 'Speed'],
    source: 'curated',
    winRate: 55.1,
    pickRate: 6.9,
    notes: 'Black Portal spawns a shadow clone after Super. Psychic Enhancer reveals enemies in bushes.',
  },
  // Darryl
  {
    brawlerId: 16000018,
    brawlerName: 'Darryl',
    starPower: 'Steel Hoops',
    gadget: 'Recoiling Rotator',
    gears: ['Shield', 'Damage'],
    source: 'curated',
    winRate: 53.2,
    pickRate: 5.3,
    notes: 'Steel Hoops gives a shield during Super roll. Essential for safe engagements.',
  },
  // Penny
  {
    brawlerId: 16000019,
    brawlerName: 'Penny',
    starPower: 'Balls of Fire',
    gadget: 'Pocket Detonator',
    gears: ['Damage', 'Speed'],
    source: 'curated',
    winRate: 49.5,
    pickRate: 3.8,
    notes: 'Balls of Fire makes mortar shots leave a burning area. Good zone control.',
  },
  // Frank
  {
    brawlerId: 16000020,
    brawlerName: 'Frank',
    starPower: 'Sponge',
    gadget: 'Active Noise Canceling',
    gears: ['Shield', 'Health'],
    source: 'curated',
    winRate: 55.5,
    pickRate: 5.7,
    notes: 'Sponge gives Frank extra max health. Active Noise Canceling prevents interruption.',
  },
  // Gene
  {
    brawlerId: 16000021,
    brawlerName: 'Gene',
    starPower: 'Magic Puffs',
    gadget: 'Lamp Blowout',
    gears: ['Health', 'Speed'],
    source: 'curated',
    winRate: 52.7,
    pickRate: 4.8,
    notes: 'Magic Puffs heals nearby teammates. Gene\'s pull Super is game-changing.',
  },
  // Tick
  {
    brawlerId: 16000022,
    brawlerName: 'Tick',
    starPower: 'Well Oiled',
    gadget: 'Mine Mania',
    gears: ['Damage', 'Speed'],
    source: 'curated',
    winRate: 50.9,
    pickRate: 4.4,
    notes: 'Well Oiled heals Tick faster when not taking damage. Strong area denial thrower.',
  },
  // 8-Bit
  {
    brawlerId: 16000023,
    brawlerName: '8-Bit',
    starPower: 'Boosted Booster',
    gadget: 'Cheat Cartridge',
    gears: ['Damage', 'Shield'],
    source: 'curated',
    winRate: 54.8,
    pickRate: 4.6,
    notes: 'Boosted Booster increases the damage turret radius. 8-Bit hits extremely hard.',
  },
  // Emz
  {
    brawlerId: 16000024,
    brawlerName: 'Emz',
    starPower: 'Bad Karma',
    gadget: 'Friendzoner',
    gears: ['Damage', 'Speed'],
    source: 'curated',
    winRate: 53.6,
    pickRate: 5.9,
    notes: 'Bad Karma increases damage on enemies already in her spray. Devastating area control.',
  },
  // Rosa
  {
    brawlerId: 16000025,
    brawlerName: 'Rosa',
    starPower: 'Plant Life',
    gadget: 'Grow Light',
    gears: ['Shield', 'Health'],
    source: 'curated',
    winRate: 56.1,
    pickRate: 5.2,
    notes: 'Plant Life heals Rosa in bushes. Grow Light creates a bush path for sneaky approaches.',
  },
];

export function getBuildsForBrawler(brawlerId: number): BrawlerBuild[] {
  return BUILDS.filter((b) => b.brawlerId === brawlerId);
}

export function getBuildsByGameMode(gameMode: string): BrawlerBuild[] {
  return BUILDS.filter((b) => b.gameMode === gameMode || !b.gameMode);
}

export function getAllGeneralBuilds(): BrawlerBuild[] {
  return BUILDS.filter((b) => !b.gameMode);
}
