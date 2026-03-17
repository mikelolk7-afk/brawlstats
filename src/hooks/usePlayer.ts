'use client';

import useSWR from 'swr';
import type { PlayerProfile } from '@/lib/api/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePlayer(tag: string | null) {
  const { data, error, isLoading, mutate } = useSWR<PlayerProfile>(
    tag ? `/api/player/${tag.replace(/^#/, '')}` : null,
    fetcher
  );

  return {
    player: data,
    isLoading,
    isError: !!error,
    error,
    refresh: mutate,
  };
}
