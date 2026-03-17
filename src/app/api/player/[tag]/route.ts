import { NextResponse } from 'next/server';
import { getPlayer } from '@/lib/api/brawlstars';
import { validateTag, decodeTag } from '@/lib/utils';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tag: string }> }
) {
  const { tag } = await params;
  const playerTag = decodeTag(tag);

  if (!validateTag(playerTag)) {
    return NextResponse.json(
      { error: 'Invalid player tag format', status: 400 },
      { status: 400 }
    );
  }

  try {
    const player = await getPlayer(playerTag);
    return NextResponse.json(player, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch player';
    if (message.includes('404')) {
      return NextResponse.json({ error: 'Player not found', status: 404 }, { status: 404 });
    }
    const status = message.includes('Rate limited') ? 429 : 500;
    return NextResponse.json({ error: message, status }, { status });
  }
}
