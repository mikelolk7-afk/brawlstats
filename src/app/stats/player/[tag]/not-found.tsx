import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PlayerNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Player Not Found</h1>
      <p className="text-muted-foreground mb-6">
        We couldn&apos;t find a player with that tag. Double-check the tag and try again.
      </p>
      <Link href="/stats">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Button>
      </Link>
    </div>
  );
}
