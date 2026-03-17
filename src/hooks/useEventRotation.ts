'use client';

import useSWR from 'swr';
import type { EventSlot } from '@/lib/api/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useEventRotation() {
  const { data, error, isLoading, mutate } = useSWR<EventSlot[]>(
    '/api/events',
    fetcher,
    { refreshInterval: 60000 }
  );

  return {
    events: data,
    isLoading,
    isError: !!error,
    error,
    refresh: mutate,
  };
}
