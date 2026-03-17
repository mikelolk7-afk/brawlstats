import type { Metadata } from 'next';
import { BrawlerGrid } from '@/components/brawlers/brawler-grid';
import { BRAWLER_META } from '@/data/brawlers';
import type { Brawler } from '@/lib/api/types';

export const metadata: Metadata = {
  title: 'Brawlers',
  description: 'Browse all Brawl Stars brawlers — filter by rarity, class, and more.',
};

function getBrawlers(): Brawler[] {
  return Object.entries(BRAWLER_META).map(([idStr, meta]) => ({
    id: Number(idStr),
    name: meta.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    slug: meta.slug,
    rarity: meta.rarity,
    class: meta.class,
    description: meta.description,
    starPowers: [],
    gadgets: [],
    imageUrl: `https://cdn.brawlify.com/brawler/${idStr}.png`,
  }));
}

export default function BrawlersPage() {
  const brawlers = getBrawlers();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Brawlers</h1>
      <BrawlerGrid brawlers={brawlers} />
    </div>
  );
}
