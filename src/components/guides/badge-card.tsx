import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BadgeData } from '@/data/badges';
import { BADGE_CATEGORIES } from '@/data/badges';
import { BRAWLER_META } from '@/data/brawlers';

export interface BadgeCardProps {
  badge: BadgeData;
}

function DifficultyStars({ difficulty }: { difficulty: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`Difficulty: ${difficulty} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-xs ${i < difficulty ? 'text-yellow-400' : 'text-muted-foreground/30'}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export function BadgeCard({ badge }: BadgeCardProps) {
  const brawlerMeta = badge.brawlerId ? BRAWLER_META[badge.brawlerId] : undefined;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl" role="img" aria-label={badge.name}>
            {badge.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm truncate">{badge.name}</h3>
              <DifficultyStars difficulty={badge.difficulty} />
            </div>
            <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <Badge variant="outline" className="text-[10px]">
                {BADGE_CATEGORIES[badge.category]}
              </Badge>
              {brawlerMeta && (
                <Badge variant="secondary" className="text-[10px]">
                  {brawlerMeta.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </Badge>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground">
              <span className="font-medium text-foreground/80">How to earn:</span> {badge.howToEarn}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
