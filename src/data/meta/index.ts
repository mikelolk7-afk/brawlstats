export type Tier = 'S' | 'A' | 'B' | 'C' | 'D';

export interface BrawlerMetaStats {
  brawlerId: number;
  brawlerName: string;
  tier: Tier;
  winRate: number;
  pickRate: number;
  banRate: number;
  trend: 'up' | 'down' | 'stable';
}

// Simulated meta data — in production this comes from community APIs (Brawlify, Brawl Time Ninja)
export const META_STATS: BrawlerMetaStats[] = [
  // S Tier
  { brawlerId: 16000005, brawlerName: 'Spike', tier: 'S', winRate: 57.2, pickRate: 9.1, banRate: 12.3, trend: 'stable' },
  { brawlerId: 16000025, brawlerName: 'Rosa', tier: 'S', winRate: 56.1, pickRate: 5.2, banRate: 3.1, trend: 'up' },
  { brawlerId: 16000013, brawlerName: 'Poco', tier: 'S', winRate: 55.7, pickRate: 6.3, banRate: 4.2, trend: 'up' },
  { brawlerId: 16000020, brawlerName: 'Frank', tier: 'S', winRate: 55.5, pickRate: 5.7, banRate: 6.8, trend: 'stable' },

  // A Tier
  { brawlerId: 16000017, brawlerName: 'Tara', tier: 'A', winRate: 55.1, pickRate: 6.9, banRate: 5.4, trend: 'up' },
  { brawlerId: 16000004, brawlerName: 'Rico', tier: 'A', winRate: 54.9, pickRate: 5.8, banRate: 2.1, trend: 'up' },
  { brawlerId: 16000023, brawlerName: '8-Bit', tier: 'A', winRate: 54.8, pickRate: 4.6, banRate: 1.8, trend: 'stable' },
  { brawlerId: 16000016, brawlerName: 'Pam', tier: 'A', winRate: 54.6, pickRate: 5.0, banRate: 2.5, trend: 'down' },
  { brawlerId: 16000010, brawlerName: 'El Primo', tier: 'A', winRate: 54.3, pickRate: 6.8, banRate: 3.7, trend: 'stable' },
  { brawlerId: 16000015, brawlerName: 'Piper', tier: 'A', winRate: 53.9, pickRate: 5.4, banRate: 4.0, trend: 'stable' },

  // B Tier
  { brawlerId: 16000002, brawlerName: 'Bull', tier: 'B', winRate: 53.7, pickRate: 4.5, banRate: 1.2, trend: 'stable' },
  { brawlerId: 16000024, brawlerName: 'Emz', tier: 'B', winRate: 53.6, pickRate: 5.9, banRate: 3.3, trend: 'down' },
  { brawlerId: 16000012, brawlerName: 'Crow', tier: 'B', winRate: 53.4, pickRate: 7.6, banRate: 5.1, trend: 'down' },
  { brawlerId: 16000018, brawlerName: 'Darryl', tier: 'B', winRate: 53.2, pickRate: 5.3, banRate: 1.9, trend: 'up' },
  { brawlerId: 16000008, brawlerName: 'Nita', tier: 'B', winRate: 53.1, pickRate: 5.5, banRate: 1.5, trend: 'stable' },
  { brawlerId: 16000006, brawlerName: 'Barley', tier: 'B', winRate: 52.8, pickRate: 4.2, banRate: 0.8, trend: 'stable' },
  { brawlerId: 16000021, brawlerName: 'Gene', tier: 'B', winRate: 52.7, pickRate: 4.8, banRate: 3.6, trend: 'down' },

  // C Tier
  { brawlerId: 16000000, brawlerName: 'Shelly', tier: 'C', winRate: 52.1, pickRate: 8.3, banRate: 0.5, trend: 'stable' },
  { brawlerId: 16000014, brawlerName: 'Bo', tier: 'C', winRate: 52.0, pickRate: 4.7, banRate: 1.4, trend: 'down' },
  { brawlerId: 16000011, brawlerName: 'Mortis', tier: 'C', winRate: 51.6, pickRate: 11.2, banRate: 7.8, trend: 'stable' },
  { brawlerId: 16000003, brawlerName: 'Brock', tier: 'C', winRate: 51.3, pickRate: 6.7, banRate: 2.2, trend: 'down' },
  { brawlerId: 16000022, brawlerName: 'Tick', tier: 'C', winRate: 50.9, pickRate: 4.4, banRate: 3.9, trend: 'up' },
  { brawlerId: 16000007, brawlerName: 'Jessie', tier: 'C', winRate: 50.4, pickRate: 3.9, banRate: 0.6, trend: 'stable' },

  // D Tier
  { brawlerId: 16000001, brawlerName: 'Colt', tier: 'D', winRate: 49.8, pickRate: 5.2, banRate: 0.9, trend: 'down' },
  { brawlerId: 16000019, brawlerName: 'Penny', tier: 'D', winRate: 49.5, pickRate: 3.8, banRate: 0.4, trend: 'down' },
  { brawlerId: 16000009, brawlerName: 'Dynamike', tier: 'D', winRate: 48.7, pickRate: 4.1, banRate: 0.7, trend: 'stable' },
];

export function getMetaByTier(tier: Tier): BrawlerMetaStats[] {
  return META_STATS.filter((s) => s.tier === tier);
}

export const TIER_COLORS: Record<Tier, string> = {
  S: '#FF7F7F',
  A: '#FFD700',
  B: '#90EE90',
  C: '#87CEEB',
  D: '#D3D3D3',
};

export const TIER_DESCRIPTIONS: Record<Tier, string> = {
  S: 'Overpowered — dominant in most modes',
  A: 'Strong — reliable picks in competitive play',
  B: 'Balanced — solid with the right team/map',
  C: 'Situational — map or mode dependent',
  D: 'Weak — needs buffs or highly skill-dependent',
};
