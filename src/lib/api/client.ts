import type { Brawler, PlayerProfile, EventSlot } from './types';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function fetchBrawlers(): Promise<Brawler[]> {
  return fetchJson<Brawler[]>('/api/brawlers');
}

export function fetchPlayer(tag: string): Promise<PlayerProfile> {
  const encoded = tag.replace(/^#/, '');
  return fetchJson<PlayerProfile>(`/api/player/${encoded}`);
}

export function fetchEventRotation(): Promise<EventSlot[]> {
  return fetchJson<EventSlot[]>('/api/events');
}
