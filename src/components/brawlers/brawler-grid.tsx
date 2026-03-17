'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BrawlerCard } from './brawler-card';
import { RARITY_ORDER, RARITY_LABELS, BRAWLER_CLASSES, CLASS_LABELS } from '@/lib/constants';
import type { Brawler } from '@/lib/api/types';

export interface BrawlerGridProps {
  brawlers: Brawler[];
}

export function BrawlerGrid({ brawlers }: BrawlerGridProps) {
  const [search, setSearch] = useState('');
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    let result = brawlers;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((b) => b.name.toLowerCase().includes(q));
    }

    if (rarityFilter !== 'all') {
      result = result.filter((b) => b.rarity === rarityFilter);
    }

    if (classFilter !== 'all') {
      result = result.filter((b) => b.class === classFilter);
    }

    return result;
  }, [brawlers, search, rarityFilter, classFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search brawlers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
          aria-label="Search brawlers"
        />
        <Select value={rarityFilter} onValueChange={(v) => setRarityFilter(v ?? 'all')}>
          <SelectTrigger className="sm:w-40" aria-label="Filter by rarity">
            <SelectValue placeholder="Rarity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rarities</SelectItem>
            {RARITY_ORDER.map((r) => (
              <SelectItem key={r} value={r}>
                {RARITY_LABELS[r]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={classFilter} onValueChange={(v) => setClassFilter(v ?? 'all')}>
          <SelectTrigger className="sm:w-40" aria-label="Filter by class">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {BRAWLER_CLASSES.map((c) => (
              <SelectItem key={c} value={c}>
                {CLASS_LABELS[c]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No brawlers match your filters.</p>
      ) : (
        <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {filtered.map((brawler) => (
            <BrawlerCard key={brawler.id} brawler={brawler} />
          ))}
        </div>
      )}
    </div>
  );
}
