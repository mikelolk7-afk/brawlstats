'use client';

import { useEffect, useState } from 'react';
import { useEventRotation } from '@/hooks/useEventRotation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { GAME_MODE_LABELS } from '@/lib/constants';
import { timeRemaining } from '@/lib/utils';
import { Clock, RefreshCw } from 'lucide-react';
import type { EventSlot } from '@/lib/api/types';

function EventCard({ slot }: { slot: EventSlot }) {
  const [remaining, setRemaining] = useState(timeRemaining(slot.endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(timeRemaining(slot.endTime));
    }, 30000);
    return () => clearInterval(interval);
  }, [slot.endTime]);

  const modeLabel = GAME_MODE_LABELS[slot.event.mode] ?? slot.event.mode;

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">{modeLabel}</CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3" />
            {remaining}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{slot.event.map}</p>
      </CardContent>
    </Card>
  );
}

function EventSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  );
}

export function EventRotationWidget() {
  const { events, isLoading, isError, refresh } = useEventRotation();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <section>
        <h2 className="mb-4 text-xl font-bold">Event Rotation</h2>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !events) {
    return (
      <section>
        <h2 className="mb-4 text-xl font-bold">Event Rotation</h2>
        <Card className="p-6 text-center">
          <p className="text-muted-foreground mb-3">Failed to load events.</p>
          <Button variant="outline" size="sm" onClick={() => refresh()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </Card>
      </section>
    );
  }

  const active = events.filter(
    (e) => new Date(e.startTime).getTime() <= now && new Date(e.endTime).getTime() > now
  );
  const upcoming = events.filter((e) => new Date(e.startTime).getTime() > now);

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Active Events</h2>
      {active.length > 0 ? (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {active.map((slot) => (
            <EventCard key={slot.event.id} slot={slot} />
          ))}
        </div>
      ) : (
        <p className="mb-8 text-muted-foreground">No active events right now.</p>
      )}

      {upcoming.length > 0 && (
        <>
          <h2 className="mb-4 text-xl font-bold">Coming Up</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((slot) => (
              <EventCard key={slot.event.id} slot={slot} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
