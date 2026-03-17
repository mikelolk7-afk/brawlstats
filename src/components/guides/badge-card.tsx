import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import type { BadgeData } from '@/data/badges';
import { BADGE_CATEGORIES } from '@/data/badges';
import { BRAWLER_META } from '@/data/brawlers';

export interface BadgeCardProps {
  badge: BadgeData;
  completed?: boolean;
  onToggle?: () => void;
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

export function BadgeCard({ badge, completed = false, onToggle }: BadgeCardProps) {
  const brawlerMeta = badge.brawlerId ? BRAWLER_META[badge.brawlerId] : undefined;

  return (
    <Card className={`transition-shadow hover:shadow-md ${completed ? 'border-green-500/50 bg-green-500/5' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl" role="img" aria-label={badge.name}>
            {badge.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className={`font-semibold text-sm truncate ${completed ? 'line-through text-muted-foreground' : ''}`}>
                {badge.name}
              </h3>
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
          {onToggle && (
            <Button
              variant={completed ? 'default' : 'outline'}
              size="icon"
              className={`h-8 w-8 shrink-0 ${completed ? 'bg-green-600 hover:bg-green-700' : ''}`}
              onClick={onToggle}
              aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
