import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface AbilityCardProps {
  name: string;
  description: string;
  type: 'Star Power' | 'Gadget' | 'Gear';
  isMeta?: boolean;
}

export function AbilityCard({ name, description, type, isMeta }: AbilityCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold">
          {type === 'Star Power' ? 'SP' : type === 'Gadget' ? 'G' : 'GR'}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">{name}</p>
            {isMeta && (
              <Badge variant="default" className="text-[10px] px-1.5 py-0">
                Meta
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {description || `${type} ability`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
