import 'server-only';
import type { PlayerProfile, Club, EventSlot } from './types';

const API_BASE = 'https://api.brawlstars.com/v1';

function getApiKey(): string {
  const key = process.env.BRAWLSTARS_API_KEY;
  if (!key) throw new Error('BRAWLSTARS_API_KEY is not set');
  return key;
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
    },
    next: { revalidate: 300 },
  });

  if (res.status === 429) {
    throw new Error('Rate limited by Brawl Stars API');
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brawl Stars API error ${res.status}: ${body}`);
  }

  return res.json() as Promise<T>;
}

export async function getBrawlers(): Promise<{ items: RawBrawler[] }> {
  return apiFetch<{ items: RawBrawler[] }>('/brawlers');
}

export async function getPlayer(tag: string): Promise<PlayerProfile> {
  const encoded = encodeURIComponent(tag.startsWith('#') ? tag : `#${tag}`);
  return apiFetch<PlayerProfile>(`/players/${encoded}`);
}

export async function getPlayerBattleLog(tag: string): Promise<{ items: unknown[] }> {
  const encoded = encodeURIComponent(tag.startsWith('#') ? tag : `#${tag}`);
  return apiFetch<{ items: unknown[] }>(`/players/${encoded}/battlelog`);
}

export async function getClub(tag: string): Promise<Club> {
  const encoded = encodeURIComponent(tag.startsWith('#') ? tag : `#${tag}`);
  return apiFetch<Club>(`/clubs/${encoded}`);
}

export async function getEventRotation(): Promise<EventSlot[]> {
  return apiFetch<EventSlot[]>('/events/rotation');
}

// Raw brawler shape from the official API
export interface RawBrawler {
  id: number;
  name: string;
  starPowers: { id: number; name: string }[];
  gadgets: { id: number; name: string }[];
}
