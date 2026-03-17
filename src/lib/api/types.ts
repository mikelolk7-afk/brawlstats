import type { Rarity, BrawlerClass } from '../constants';

// --- Brawler types ---

export interface StarPower {
  id: number;
  name: string;
  description: string;
}

export interface Gadget {
  id: number;
  name: string;
  description: string;
}

export interface Gear {
  id: number;
  name: string;
  level: number;
}

export interface Hypercharge {
  id: number;
  name: string;
  description: string;
}

export interface Brawler {
  id: number;
  name: string;
  slug: string;
  rarity: Rarity;
  class: BrawlerClass;
  description: string;
  starPowers: StarPower[];
  gadgets: Gadget[];
  imageUrl: string;
}

export interface BrawlerDetail extends Brawler {
  health: number;
  attack: {
    name: string;
    description: string;
    damage: number;
  };
  super: {
    name: string;
    description: string;
    damage: number;
  };
  speed: string;
  gears: Gear[];
  hypercharge?: Hypercharge;
}

// --- Player types ---

export interface PlayerBrawler {
  id: number;
  name: string;
  power: number;
  rank: number;
  trophies: number;
  highestTrophies: number;
  starPowers: StarPower[];
  gadgets: Gadget[];
  gears: Gear[];
}

export interface PlayerClub {
  tag: string;
  name: string;
}

export interface PlayerProfile {
  tag: string;
  name: string;
  nameColor: string;
  icon: { id: number };
  trophies: number;
  highestTrophies: number;
  expLevel: number;
  expPoints: number;
  isQualifiedFromChampionshipChallenge: boolean;
  '3vs3Victories': number;
  soloVictories: number;
  duoVictories: number;
  bestRoboRumbleTime: number;
  bestTimeAsBigBrawler: number;
  club: PlayerClub | null;
  brawlers: PlayerBrawler[];
}

// --- Event types ---

export interface EventSlot {
  slotId: number;
  startTime: string;
  endTime: string;
  event: {
    id: number;
    mode: string;
    map: string;
  };
}

export interface EventRotation {
  active: EventSlot[];
  upcoming: EventSlot[];
}

// --- Club types ---

export interface ClubMember {
  tag: string;
  name: string;
  role: string;
  trophies: number;
  nameColor: string;
  icon: { id: number };
}

export interface Club {
  tag: string;
  name: string;
  description: string;
  type: string;
  badgeId: number;
  requiredTrophies: number;
  trophies: number;
  members: ClubMember[];
}

// --- API error ---

export interface ApiError {
  error: string;
  status: number;
}
