'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Wrench, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BuildCard } from '@/components/brawlers/build-card';
import { BUILDS } from '@/data/builds';
import { BRAWLER_META } from '@/data/brawlers';
import { GAME_MODE_LABELS } from '@/lib/constants';

export default function MetaBuildsPage() {
  const [modeFilter, setModeFilter] = useState<string>('all');

  const filteredBuilds =
    modeFilter === 'all'
      ? BUILDS.filter((b) => !b.gameMode) // Show general builds by default
      : BUILDS.filter((b) => b.gameMode === modeFilter || (!b.gameMode && modeFilter === 'general'));

  // Group by brawler
  const grouped = new Map<number, typeof filteredBuilds>();
  for (const build of filteredBuilds) {
    const existing = grouped.get(build.brawlerId) ?? [];
    existing.push(build);
    grouped.set(build.brawlerId, existing);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="h-6 w-6 text-[var(--color-gold)]" />
            <h1 className="text-3xl font-bold">Best Builds</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Recommended Star Power, Gadget, and Gear combos for every brawler.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={modeFilter} onValueChange={(v) => setModeFilter(v ?? 'all')}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Filter by mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All (General)</SelectItem>
              {Object.entries(GAME_MODE_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-8">
        {Array.from(grouped.entries()).map(([brawlerId, builds]) => {
          const meta = BRAWLER_META[brawlerId];
          const name = builds[0].brawlerName;
          const slug = meta?.slug ?? name.toLowerCase();

          return (
            <section key={brawlerId}>
              <Link href={`/brawlers/${slug}`} className="flex items-center gap-3 mb-3 group">
                <div className="relative h-10 w-10 shrink-0">
                  <Image
                    src={`https://cdn.brawlify.com/brawler/${brawlerId}.png`}
                    alt={name}
                    fill
                    sizes="40px"
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <h2 className="text-lg font-bold group-hover:underline">{name}</h2>
              </Link>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {builds.map((build, idx) => (
                  <BuildCard key={idx} build={build} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {grouped.size === 0 && (
        <Card className="mt-8">
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">No builds found for the selected mode.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
