import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayerSearchForm } from '@/components/stats/player-search-form';

export const metadata: Metadata = {
  title: 'Player Lookup',
  description: 'Search any Brawl Stars player by tag to view their profile and stats.',
};

export default function StatsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Player Lookup</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Enter a Player Tag</CardTitle>
        </CardHeader>
        <CardContent>
          <PlayerSearchForm />
          <p className="mt-3 text-xs text-muted-foreground">
            Find your tag in-game: tap your profile icon in the top-left, then tap the tag below
            your name to copy it.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
