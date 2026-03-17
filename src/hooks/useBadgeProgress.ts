'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './useAuth';

interface BadgeProgressMap {
  [badgeId: string]: boolean;
}

export function useBadgeProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<BadgeProgressMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // Load from localStorage for non-authenticated users
      try {
        const stored = localStorage.getItem('brawlhub-badge-progress');
        if (stored) setProgress(JSON.parse(stored));
      } catch {
        // ignore
      }
      setLoading(false);
      return;
    }

    async function fetchProgress() {
      const supabase = createClient();
      const { data } = await supabase
        .from('badge_progress')
        .select('badge_id, completed')
        .eq('user_id', user!.id);

      const map: BadgeProgressMap = {};
      data?.forEach((row) => {
        map[row.badge_id] = row.completed;
      });
      setProgress(map);
      setLoading(false);
    }

    fetchProgress();
  }, [user]);

  const toggleBadge = useCallback(
    async (badgeId: string) => {
      const newCompleted = !progress[badgeId];
      setProgress((prev) => ({ ...prev, [badgeId]: newCompleted }));

      if (!user) {
        // Persist to localStorage for non-authenticated users
        const updated = { ...progress, [badgeId]: newCompleted };
        try {
          localStorage.setItem('brawlhub-badge-progress', JSON.stringify(updated));
        } catch {
          // ignore
        }
        return;
      }

      const supabase = createClient();

      if (newCompleted) {
        await supabase.from('badge_progress').upsert(
          {
            user_id: user.id,
            badge_id: badgeId,
            completed: true,
            completed_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,badge_id' }
        );
      } else {
        await supabase
          .from('badge_progress')
          .update({ completed: false, completed_at: null })
          .eq('user_id', user.id)
          .eq('badge_id', badgeId);
      }
    },
    [user, progress]
  );

  const completedCount = Object.values(progress).filter(Boolean).length;

  return { progress, toggleBadge, completedCount, loading };
}
