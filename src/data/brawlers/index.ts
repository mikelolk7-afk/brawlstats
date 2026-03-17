import type { Rarity, BrawlerClass } from '@/lib/constants';

export interface BrawlerMeta {
  slug: string;
  class: BrawlerClass;
  rarity: Rarity;
  description: string;
}

// Maps official API brawler ID to local metadata.
// This is manually maintained. Add new brawlers as they release.
export const BRAWLER_META: Record<number, BrawlerMeta> = {
  16000000: { slug: 'shelly', class: 'damage_dealer', rarity: 'common', description: 'Shelly fires a burst of shells dealing medium damage. Her Super shells deal more damage and can destroy obstacles.' },
  16000001: { slug: 'colt', class: 'damage_dealer', rarity: 'common', description: 'Colt fires a burst of bullets that deal damage at long range. His Super fires a volley that can destroy obstacles.' },
  16000002: { slug: 'bull', class: 'tank', rarity: 'common', description: 'Bull charges forward dealing massive close-range damage with his shotgun. His Super sends him charging headfirst.' },
  16000003: { slug: 'brock', class: 'marksman', rarity: 'common', description: 'Brock fires long-range rockets that deal splash damage. His Super rains down a volley of rockets.' },
  16000004: { slug: 'rico', class: 'damage_dealer', rarity: 'common', description: 'Rico fires bouncing bullets that ricochet off walls. His Super unleashes a barrage of bouncing balls.' },
  16000005: { slug: 'spike', class: 'damage_dealer', rarity: 'legendary', description: 'Spike throws cactus grenades that explode into spikes. His Super creates a field that slows and damages enemies.' },
  16000006: { slug: 'barley', class: 'controller', rarity: 'rare', description: 'Barley lobs bottles that create puddles of damage. His Super throws a flurry of bottles over a large area.' },
  16000007: { slug: 'jessie', class: 'controller', rarity: 'common', description: 'Jessie fires an energy orb that bounces between enemies. Her Super deploys Scrappy, a gun turret.' },
  16000008: { slug: 'nita', class: 'damage_dealer', rarity: 'common', description: 'Nita sends a shockwave that damages enemies. Her Super summons a big bear to fight by her side.' },
  16000009: { slug: 'dynamike', class: 'controller', rarity: 'common', description: 'Dynamike throws sticks of dynamite. His Super is a big barrel of dynamite that deals massive damage.' },
  16000010: { slug: 'el-primo', class: 'tank', rarity: 'common', description: 'El Primo fires a flurry of punches at close range. His Super launches him into the air, crashing down on enemies.' },
  16000011: { slug: 'mortis', class: 'assassin', rarity: 'mythic', description: 'Mortis dashes forward and slashes enemies. His Super sends a swarm of bats that damages enemies and heals himself.' },
  16000012: { slug: 'crow', class: 'assassin', rarity: 'legendary', description: 'Crow throws poisoned daggers. His Super launches him into the air, raining daggers below.' },
  16000013: { slug: 'poco', class: 'support', rarity: 'rare', description: 'Poco fires sound waves that damage enemies. His Super heals himself and nearby allies.' },
  16000014: { slug: 'bo', class: 'controller', rarity: 'epic', description: 'Bo fires explosive arrows. His Super places mines on the ground that explode when triggered.' },
  16000015: { slug: 'piper', class: 'marksman', rarity: 'epic', description: 'Piper fires sniper shots that deal more damage at range. Her Super drops grenades and launches her away.' },
  16000016: { slug: 'pam', class: 'support', rarity: 'epic', description: 'Pam fires a burst of scrap metal. Her Super deploys a healing turret for her team.' },
  16000017: { slug: 'tara', class: 'assassin', rarity: 'mythic', description: 'Tara throws piercing cards. Her Super creates a gravity well that pulls enemies in.' },
  16000018: { slug: 'darryl', class: 'tank', rarity: 'super_rare', description: 'Darryl fires two shotgun blasts. His Super has him roll forward in his barrel, dealing damage.' },
  16000019: { slug: 'penny', class: 'controller', rarity: 'super_rare', description: 'Penny fires a pouch of gold that splits on hit. Her Super deploys a mortar cannon.' },
  16000020: { slug: 'frank', class: 'tank', rarity: 'epic', description: 'Frank swings his hammer dealing massive damage. His Super stuns all enemies in its area.' },
  16000021: { slug: 'gene', class: 'support', rarity: 'mythic', description: 'Gene fires a magical hand that splits. His Super pulls an enemy to him.' },
  16000022: { slug: 'tick', class: 'controller', rarity: 'super_rare', description: 'Tick throws mines that arm after a delay. His Super launches his head which chases enemies.' },
  16000023: { slug: '8-bit', class: 'damage_dealer', rarity: 'super_rare', description: '8-Bit fires laser beams. His Super places a damage booster for his team.' },
  16000024: { slug: 'emz', class: 'controller', rarity: 'epic', description: 'Emz sprays hairspray that deals damage over time. Her Super creates a slowing cloud.' },
  16000025: { slug: 'rosa', class: 'tank', rarity: 'common', description: 'Rosa punches enemies with boxing gloves. Her Super gives her a shield that absorbs damage.' },
};

export function getBrawlerMeta(id: number): BrawlerMeta | undefined {
  return BRAWLER_META[id];
}

export function getBrawlerBySlug(slug: string): { id: number; meta: BrawlerMeta } | undefined {
  for (const [idStr, meta] of Object.entries(BRAWLER_META)) {
    if (meta.slug === slug) {
      return { id: Number(idStr), meta };
    }
  }
  return undefined;
}
