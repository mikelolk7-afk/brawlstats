import type { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TierList } from '@/components/meta/tier-list';
import { WinRateTable } from '@/components/meta/win-rate-table';
import { META_STATS } from '@/data/meta';

export const metadata: Metadata = {
  title: 'Meta Overview',
  description: 'Current Brawl Stars meta — tier list, win rates, pick rates, and ban rates for all brawlers.',
};

export default function MetaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-6 w-6 text-[var(--color-gold)]" />
            <h1 className="text-3xl font-bold">Meta Overview</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Current tier rankings, win rates, and pick rates. Updated every 6 hours.
          </p>
        </div>
        <Link href="/meta/builds">
          <Button variant="outline">View Best Builds</Button>
        </Link>
      </div>

      {/* Tier List */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Tier List</h2>
        <TierList stats={META_STATS} />
      </section>

      {/* Win Rate Table */}
      <section>
        <WinRateTable stats={META_STATS} />
      </section>
    </div>
  );
}
