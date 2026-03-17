'use client';

import { useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './useAuth';
import type { BrawlerBuild } from '@/data/builds';

export function useSavedBuilds() {
  const { user } = useAuth();

  const saveBuild = useCallback(
    async (build: BrawlerBuild) => {
      if (!user) return false;

      const supabase = createClient();
      const { error } = await supabase.from('saved_builds').insert({
        user_id: user.id,
        brawler_id: build.brawlerId,
        brawler_name: build.brawlerName,
        game_mode: build.gameMode ?? null,
        star_power: build.starPower,
        gadget: build.gadget,
        gear_1: build.gears[0],
        gear_2: build.gears[1],
        notes: build.notes ?? null,
      });

      return !error;
    },
    [user]
  );

  return { saveBuild, isAuthenticated: !!user };
}
