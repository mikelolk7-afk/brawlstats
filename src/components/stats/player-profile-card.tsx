import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Users } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import type { PlayerProfile } from '@/lib/api/types';

export interface PlayerProfileCardProps {
  player: PlayerProfile;
}

export function PlayerProfileCard({ player }: PlayerProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{player.name}</CardTitle>
          <Badge variant="outline" className="font-mono text-xs">
            {player.tag}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatItem
            icon={<Trophy className="h-4 w-4 text-[var(--color-gold)]" />}
            label="Trophies"
            value={formatNumber(player.trophies)}
          />
          <StatItem
            icon={<Star className="h-4 w-4 text-[var(--color-gold)]" />}
            label="Highest"
            value={formatNumber(player.highestTrophies)}
          />
          <StatItem
            icon={<Users className="h-4 w-4" />}
            label="Club"
            value={player.club?.name ?? 'None'}
          />
          <StatItem label="3v3 Wins" value={formatNumber(player['3vs3Victories'])} />
          <StatItem label="Solo Wins" value={formatNumber(player.soloVictories)} />
          <StatItem label="Duo Wins" value={formatNumber(player.duoVictories)} />
        </div>
      </CardContent>
    </Card>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
