'use client';

import { useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './useAuth';

export function usePlayerBookmarks() {
  const { user } = useAuth();

  const addBookmark = useCallback(
    async (playerTag: string, playerName: string, trophies?: number) => {
      if (!user) return false;

      const supabase = createClient();
      const { error } = await supabase.from('player_bookmarks').upsert(
        {
          user_id: user.id,
          player_tag: playerTag,
          player_name: playerName,
          trophies: trophies ?? null,
        },
        { onConflict: 'user_id,player_tag' }
      );

      return !error;
    },
    [user]
  );

  const removeBookmark = useCallback(
    async (playerTag: string) => {
      if (!user) return false;

      const supabase = createClient();
      const { error } = await supabase
        .from('player_bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('player_tag', playerTag);

      return !error;
    },
    [user]
  );

  return { addBookmark, removeBookmark, isAuthenticated: !!user };
}
