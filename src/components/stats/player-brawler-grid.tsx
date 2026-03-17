import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { getBrawlerMeta } from '@/data/brawlers';
import { RARITY_COLORS } from '@/lib/constants';
import type { PlayerBrawler } from '@/lib/api/types';

export interface PlayerBrawlerGridProps {
  brawlers: PlayerBrawler[];
}

export function PlayerBrawlerGrid({ brawlers }: PlayerBrawlerGridProps) {
  const sorted = [...brawlers].sort((a, b) => b.trophies - a.trophies);

  return (
    <div>
      <h2 className="mb-3 text-xl font-bold">
        Brawlers ({brawlers.length})
      </h2>
      <div className="grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {sorted.map((b) => {
          const meta = getBrawlerMeta(b.id);
          const rarityColor = meta ? RARITY_COLORS[meta.rarity] : RARITY_COLORS.common;

          return (
            <Card
              key={b.id}
              className="overflow-hidden"
              style={{ borderColor: rarityColor, borderWidth: '2px' }}
            >
              <CardContent className="flex flex-col items-center p-2">
                <p className="text-xs font-semibold text-center leading-tight">{b.name}</p>
                <div className="mt-1 flex items-center gap-1 text-[10px]">
                  <Trophy className="h-3 w-3 text-[var(--color-gold)]" />
                  <span className="font-medium">{formatNumber(b.trophies)}</span>
                </div>
                <Badge variant="outline" className="mt-1 text-[10px] px-1 py-0">
                  Pwr {b.power}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
