import { NextResponse } from 'next/server';
import { getBrawlers } from '@/lib/api/brawlstars';
import { getBrawlerMeta } from '@/data/brawlers';
import type { Brawler } from '@/lib/api/types';

export async function GET() {
  try {
    const { items } = await getBrawlers();

    const brawlers: Brawler[] = items.map((raw) => {
      const meta = getBrawlerMeta(raw.id);
      const slug = meta?.slug ?? raw.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      return {
        id: raw.id,
        name: raw.name,
        slug,
        rarity: meta?.rarity ?? 'common',
        class: meta?.class ?? 'damage_dealer',
        description: meta?.description ?? '',
        starPowers: raw.starPowers.map((sp) => ({
          id: sp.id,
          name: sp.name,
          description: '',
        })),
        gadgets: raw.gadgets.map((g) => ({
          id: g.id,
          name: g.name,
          description: '',
        })),
        imageUrl: `https://cdn.brawlify.com/brawler/${raw.id}.png`,
      };
    });

    return NextResponse.json(brawlers, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch brawlers';
    const status = message.includes('Rate limited') ? 429 : 500;
    return NextResponse.json({ error: message, status }, { status });
  }
}
