import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RARITY_COLORS, RARITY_LABELS } from '@/lib/constants';
import type { Brawler } from '@/lib/api/types';

export interface BrawlerCardProps {
  brawler: Brawler;
}

export function BrawlerCard({ brawler }: BrawlerCardProps) {
  const rarityColor = RARITY_COLORS[brawler.rarity] ?? RARITY_COLORS.common;
  const rarityLabel = RARITY_LABELS[brawler.rarity] ?? brawler.rarity;

  return (
    <Link href={`/brawlers/${brawler.slug}`}>
      <Card
        className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg overflow-hidden"
        style={{ borderColor: rarityColor, borderWidth: '2px' }}
      >
        <CardContent className="flex flex-col items-center p-3">
          <div className="relative mb-2 h-16 w-16 sm:h-20 sm:w-20">
            <Image
              src={brawler.imageUrl}
              alt={brawler.name}
              fill
              sizes="80px"
              className="object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
              }}
            />
          </div>
          <p className="text-xs font-semibold text-center leading-tight sm:text-sm">
            {brawler.name}
          </p>
          <Badge
            variant="outline"
            className="mt-1 text-[10px] px-1.5 py-0"
            style={{ borderColor: rarityColor, color: rarityColor }}
          >
            {rarityLabel}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
