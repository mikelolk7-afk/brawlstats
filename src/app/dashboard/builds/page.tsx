'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Wrench, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { GAME_MODE_LABELS } from '@/lib/constants';
import type { Database } from '@/lib/supabase/types';

type SavedBuild = Database['public']['Tables']['saved_builds']['Row'];

export default function SavedBuildsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [builds, setBuilds] = useState<SavedBuild[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/auth/login');
      return;
    }

    async function fetchBuilds() {
      const supabase = createClient();
      const { data } = await supabase
        .from('saved_builds')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });
      setBuilds(data ?? []);
      setLoading(false);
    }

    fetchBuilds();
  }, [user, authLoading, router]);

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from('saved_builds').delete().eq('id', id);
    setBuilds((prev) => prev.filter((b) => b.id !== id));
  }

  if (authLoading || !user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
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
        <Wrench className="h-6 w-6 text-[var(--color-gold)]" />
        <h1 className="text-3xl font-bold">Saved Builds</h1>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      ) : builds.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <p className="text-muted-foreground">No saved builds yet.</p>
            <Link href="/meta/builds">
              <Button>Browse Builds</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {builds.map((build) => (
            <Card key={build.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{build.brawler_name}</h3>
                      {build.game_mode && (
                        <Badge variant="outline" className="text-[10px]">
                          {GAME_MODE_LABELS[build.game_mode] ?? build.game_mode}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                      <div>
                        <span className="text-muted-foreground">Star Power: </span>
                        <span className="font-medium">{build.star_power}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gadget: </span>
                        <span className="font-medium">{build.gadget}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gear 1: </span>
                        <span className="font-medium">{build.gear_1}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gear 2: </span>
                        <span className="font-medium">{build.gear_2}</span>
                      </div>
                    </div>
                    {build.notes && (
                      <p className="text-xs text-muted-foreground mt-2">{build.notes}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(build.id)}
                    aria-label="Delete build"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
