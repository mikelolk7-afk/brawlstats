import { NextResponse } from 'next/server';
import { getEventRotation } from '@/lib/api/brawlstars';

export async function GET() {
  try {
    const events = await getEventRotation();
    return NextResponse.json(events, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch events';
    const status = message.includes('Rate limited') ? 429 : 500;
    return NextResponse.json({ error: message, status }, { status });
  }
}
