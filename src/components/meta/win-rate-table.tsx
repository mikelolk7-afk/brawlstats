'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BRAWLER_META } from '@/data/brawlers';
import type { BrawlerMetaStats } from '@/data/meta';
import { TIER_COLORS } from '@/data/meta';

export interface WinRateTableProps {
  stats: BrawlerMetaStats[];
}

type SortKey = 'winRate' | 'pickRate' | 'banRate' | 'brawlerName';

export function WinRateTable({ stats }: WinRateTableProps) {
  const [sortBy, setSortBy] = useState<SortKey>('winRate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sorted = [...stats].sort((a, b) => {
    const av = a[sortBy];
    const bv = b[sortBy];
    if (typeof av === 'string' && typeof bv === 'string') {
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    }
    return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
  });

  function toggleSort(key: SortKey) {
    if (sortBy === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir('desc');
    }
  }

  const SortHeader = ({ label, sortKey }: { label: string; sortKey: SortKey }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto p-0 text-xs font-semibold text-muted-foreground hover:text-foreground"
      onClick={() => toggleSort(sortKey)}
    >
      {label}
      {sortBy === sortKey && (
        <span className="ml-1">{sortDir === 'desc' ? '↓' : '↑'}</span>
      )}
    </Button>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Win Rates & Pick Rates</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground">#</th>
                <th className="px-4 py-2 text-left">
                  <SortHeader label="Brawler" sortKey="brawlerName" />
                </th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-muted-foreground">Tier</th>
                <th className="px-4 py-2 text-right">
                  <SortHeader label="Win Rate" sortKey="winRate" />
                </th>
                <th className="px-4 py-2 text-right">
                  <SortHeader label="Pick Rate" sortKey="pickRate" />
                </th>
                <th className="px-4 py-2 text-right hidden sm:table-cell">
                  <SortHeader label="Ban Rate" sortKey="banRate" />
                </th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-muted-foreground">Trend</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((b, i) => {
                const meta = BRAWLER_META[b.brawlerId];
                const slug = meta?.slug ?? b.brawlerName.toLowerCase();

                return (
                  <tr key={b.brawlerId} className="border-b border-border/30 hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-2 text-xs text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-2">
                      <Link href={`/brawlers/${slug}`} className="flex items-center gap-2 hover:underline">
                        <div className="relative h-7 w-7 shrink-0">
                          <Image
                            src={`https://cdn.brawlify.com/brawler/${b.brawlerId}.png`}
                            alt={b.brawlerName}
                            fill
                            sizes="28px"
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        <span className="font-medium">{b.brawlerName}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className="inline-block rounded px-1.5 py-0.5 text-[10px] font-bold text-black"
                        style={{ backgroundColor: TIER_COLORS[b.tier] }}
                      >
                        {b.tier}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <span className={b.winRate >= 52 ? 'text-green-400' : b.winRate < 50 ? 'text-red-400' : ''}>
                        {b.winRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">{b.pickRate.toFixed(1)}%</td>
                    <td className="px-4 py-2 text-right hidden sm:table-cell">{b.banRate.toFixed(1)}%</td>
                    <td className="px-4 py-2 text-center">
                      {b.trend === 'up' && <ArrowUp className="inline h-4 w-4 text-green-400" />}
                      {b.trend === 'down' && <ArrowDown className="inline h-4 w-4 text-red-400" />}
                      {b.trend === 'stable' && <Minus className="inline h-4 w-4 text-muted-foreground" />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
