'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { validateTag, encodeTag } from '@/lib/utils';

export function PlayerSearchForm() {
  const router = useRouter();
  const [tag, setTag] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const cleaned = tag.trim().toUpperCase();
    if (!validateTag(cleaned)) {
      setError('Invalid tag. Tags use characters 0289PYLQGRJCUV only.');
      return;
    }

    const encoded = encodeTag(cleaned.replace(/^#/, ''));
    router.push(`/stats/player/${encoded}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="flex-1">
        <Input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="#ABC123"
          className="text-lg"
          aria-label="Player tag"
        />
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
      <Button type="submit" className="gap-2">
        <Search className="h-4 w-4" />
        Look Up
      </Button>
    </form>
  );
}
