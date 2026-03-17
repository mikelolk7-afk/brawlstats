'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Trash2, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { formatTag, formatNumber } from '@/lib/utils';
import type { Database } from '@/lib/supabase/types';

type PlayerBookmark = Database['public']['Tables']['player_bookmarks']['Row'];

export default function BookmarksPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<PlayerBookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/auth/login');
      return;
    }

    async function fetchBookmarks() {
      const supabase = createClient();
      const { data } = await supabase
        .from('player_bookmarks')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });
      setBookmarks(data ?? []);
      setLoading(false);
    }

    fetchBookmarks();
  }, [user, authLoading, router]);

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from('player_bookmarks').delete().eq('id', id);
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }

  if (authLoading || !user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/dashboard">
        <Button variant="ghost" size="sm" className="mb-4 -ml-2">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Dashboard
        </Button>
      </Link>

      <div className="flex items-center gap-2 mb-6">
        <Bookmark className="h-6 w-6 text-[var(--color-gold)]" />
        <h1 className="text-3xl font-bold">Player Bookmarks</h1>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      ) : bookmarks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <p className="text-muted-foreground">No bookmarked players yet.</p>
            <Link href="/stats">
              <Button>Look Up Players</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((bookmark) => {
            const encodedTag = bookmark.player_tag.replace(/^#/, '');
            return (
              <Card key={bookmark.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={`/stats/player/${encodedTag}`}
                      className="flex items-center gap-3 flex-1 hover:underline"
                    >
                      <div>
                        <p className="font-semibold">{bookmark.player_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTag(bookmark.player_tag)}
                        </p>
                      </div>
                      {bookmark.trophies != null && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto mr-2">
                          <Trophy className="h-3.5 w-3.5 text-yellow-400" />
                          {formatNumber(bookmark.trophies)}
                        </div>
                      )}
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() => handleDelete(bookmark.id)}
                      aria-label="Remove bookmark"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
