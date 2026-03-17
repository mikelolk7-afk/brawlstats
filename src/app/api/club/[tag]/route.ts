import { NextResponse } from 'next/server';
import { getClub } from '@/lib/api/brawlstars';
import { validateTag, decodeTag } from '@/lib/utils';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tag: string }> }
) {
  const { tag } = await params;
  const clubTag = decodeTag(tag);

  if (!validateTag(clubTag)) {
    return NextResponse.json(
      { error: 'Invalid club tag format', status: 400 },
      { status: 400 }
    );
  }

  try {
    const club = await getClub(clubTag);
    return NextResponse.json(club, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch club';
    if (message.includes('404')) {
      return NextResponse.json({ error: 'Club not found', status: 404 }, { status: 404 });
    }
    const status = message.includes('Rate limited') ? 429 : 500;
    return NextResponse.json({ error: message, status }, { status });
  }
}
