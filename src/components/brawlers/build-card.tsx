import { Bookmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { BrawlerBuild } from '@/data/builds';
import { GAME_MODE_LABELS } from '@/lib/constants';

export interface BuildCardProps {
  build: BrawlerBuild;
  showBrawlerName?: boolean;
  onSave?: () => void;
  saved?: boolean;
}

export function BuildCard({ build, showBrawlerName = false, onSave, saved }: BuildCardProps) {
  const modeLabel = build.gameMode
    ? GAME_MODE_LABELS[build.gameMode] ?? build.gameMode
    : 'General';

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">
            {showBrawlerName ? build.brawlerName : modeLabel}
          </CardTitle>
          <div className="flex gap-1.5">
            <Badge variant={build.source === 'curated' ? 'default' : 'secondary'} className="text-[10px]">
              {build.source === 'curated' ? 'Curated' : 'Data'}
            </Badge>
            {showBrawlerName && build.gameMode && (
              <Badge variant="outline" className="text-[10px]">
                {modeLabel}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Loadout grid */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md bg-muted p-2">
            <p className="text-[10px] uppercase text-muted-foreground font-medium">Star Power</p>
            <p className="font-semibold text-xs mt-0.5">{build.starPower}</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <p className="text-[10px] uppercase text-muted-foreground font-medium">Gadget</p>
            <p className="font-semibold text-xs mt-0.5">{build.gadget}</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <p className="text-[10px] uppercase text-muted-foreground font-medium">Gear 1</p>
            <p className="font-semibold text-xs mt-0.5">{build.gears[0]}</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <p className="text-[10px] uppercase text-muted-foreground font-medium">Gear 2</p>
            <p className="font-semibold text-xs mt-0.5">{build.gears[1]}</p>
          </div>
        </div>

        {/* Stats */}
        {(build.winRate || build.pickRate) && (
          <div className="flex gap-4 text-xs text-muted-foreground">
            {build.winRate && (
              <span>
                Win Rate:{' '}
                <span className={build.winRate >= 52 ? 'text-green-400 font-medium' : build.winRate < 50 ? 'text-red-400 font-medium' : 'font-medium text-foreground'}>
                  {build.winRate.toFixed(1)}%
                </span>
              </span>
            )}
            {build.pickRate && (
              <span>
                Pick Rate: <span className="font-medium text-foreground">{build.pickRate.toFixed(1)}%</span>
              </span>
            )}
          </div>
        )}

        {/* Notes */}
        {build.notes && (
          <p className="text-xs text-muted-foreground leading-relaxed">{build.notes}</p>
        )}

        {/* Save button */}
        {onSave && (
          <Button
            variant={saved ? 'default' : 'outline'}
            size="sm"
            className="w-full text-xs"
            onClick={onSave}
            disabled={saved}
          >
            <Bookmark className="mr-1.5 h-3 w-3" />
            {saved ? 'Saved' : 'Save Build'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
