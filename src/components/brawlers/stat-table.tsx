import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface StatTableProps {
  stats: { label: string; value: string | number }[];
}

export function StatTable({ stats }: StatTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Base Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
          {stats.map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
