'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Award, Wrench, Bookmark, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';

interface DashboardStats {
  badgesCompleted: number;
  savedBuilds: number;
  bookmarks: number;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/auth/login');
      return;
    }

    async function fetchStats() {
      const supabase = createClient();

      const [badges, builds, bookmarks] = await Promise.all([
        supabase
          .from('badge_progress')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user!.id)
          .eq('completed', true),
        supabase
          .from('saved_builds')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user!.id),
        supabase
          .from('player_bookmarks')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user!.id),
      ]);

      setStats({
        badgesCompleted: badges.count ?? 0,
        savedBuilds: builds.count ?? 0,
        bookmarks: bookmarks.count ?? 0,
      });
      setLoading(false);
    }

    fetchStats();
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  const username = user.user_metadata?.username ?? user.email?.split('@')[0] ?? 'Brawler';

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <User className="h-6 w-6 text-[var(--color-gold)]" />
          <h1 className="text-3xl font-bold">Welcome, {username}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{user.email}</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-8">
        <Link href="/guides/badges">
          <Card className="transition-shadow hover:shadow-lg cursor-pointer h-full">
            <CardHeader className="pb-2">
              <Award className="h-6 w-6 text-yellow-400" />
              <CardTitle className="text-sm text-muted-foreground">Badges Completed</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <p className="text-3xl font-bold">{stats?.badgesCompleted ?? 0}</p>
              )}
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/builds">
          <Card className="transition-shadow hover:shadow-lg cursor-pointer h-full">
            <CardHeader className="pb-2">
              <Wrench className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-sm text-muted-foreground">Saved Builds</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <p className="text-3xl font-bold">{stats?.savedBuilds ?? 0}</p>
              )}
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/bookmarks">
          <Card className="transition-shadow hover:shadow-lg cursor-pointer h-full">
            <CardHeader className="pb-2">
              <Bookmark className="h-6 w-6 text-green-400" />
              <CardTitle className="text-sm text-muted-foreground">Player Bookmarks</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <p className="text-3xl font-bold">{stats?.bookmarks ?? 0}</p>
              )}
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick actions */}
      <h2 className="text-lg font-bold mb-3">Quick Actions</h2>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
        <Link href="/guides/badges">
          <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3">
            <Award className="h-4 w-4" />
            <div className="text-left">
              <p className="font-medium text-sm">Track Badge Progress</p>
              <p className="text-xs text-muted-foreground">Mark badges as complete</p>
            </div>
          </Button>
        </Link>
        <Link href="/meta/builds">
          <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3">
            <Wrench className="h-4 w-4" />
            <div className="text-left">
              <p className="font-medium text-sm">Browse Builds</p>
              <p className="text-xs text-muted-foreground">Find and save the best builds</p>
            </div>
          </Button>
        </Link>
        <Link href="/stats">
          <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3">
            <Bookmark className="h-4 w-4" />
            <div className="text-left">
              <p className="font-medium text-sm">Look Up Players</p>
              <p className="text-xs text-muted-foreground">Search and bookmark players</p>
            </div>
          </Button>
        </Link>
        <Link href="/dashboard/settings">
          <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3">
            <Settings className="h-4 w-4" />
            <div className="text-left">
              <p className="font-medium text-sm">Settings</p>
              <p className="text-xs text-muted-foreground">Update your profile and preferences</p>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}
