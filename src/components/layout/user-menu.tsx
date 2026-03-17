'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, User, Bookmark, Award, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';

export function UserMenu() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />;
  }

  if (!user) {
    return (
      <Link href="/auth/login">
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </Link>
    );
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  const username = user.user_metadata?.username ?? user.email?.split('@')[0] ?? 'User';

  return (
    <div className="flex items-center gap-1">
      <Link href="/dashboard">
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
          <User className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{username}</span>
        </Button>
      </Link>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSignOut} aria-label="Sign out">
        <LogOut className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
