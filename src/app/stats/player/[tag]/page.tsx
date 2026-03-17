import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlayerProfileCard } from '@/components/stats/player-profile-card';
import { PlayerBrawlerGrid } from '@/components/stats/player-brawler-grid';
import { getPlayer } from '@/lib/api/brawlstars';
import { validateTag, decodeTag } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PlayerPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: PlayerPageProps): Promise<Metadata> {
  const { tag } = await params;
  const playerTag = decodeTag(tag);

  if (!validateTag(playerTag)) {
    return { title: 'Invalid Tag' };
  }

  try {
    const player = await getPlayer(playerTag);
    return {
      title: player.name,
      description: `${player.name} — ${player.trophies} trophies in Brawl Stars.`,
    };
  } catch {
    return { title: 'Player Not Found' };
  }
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { tag } = await params;
  const playerTag = decodeTag(tag);

  if (!validateTag(playerTag)) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Invalid Player Tag</h1>
        <p className="text-muted-foreground mb-6">
          The tag &ldquo;{playerTag}&rdquo; is not a valid Brawl Stars player tag.
        </p>
        <Link href="/stats">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Button>
        </Link>
      </div>
    );
  }

  let player;
  try {
    player = await getPlayer(playerTag);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/stats" className="mb-4 inline-block">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Button>
      </Link>

      <div className="space-y-6">
        <PlayerProfileCard player={player} />
        <PlayerBrawlerGrid brawlers={player.brawlers} />
      </div>
    </div>
  );
}
