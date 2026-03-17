'use client';

import { useState } from 'react';
import { BookOpen, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GuideCard } from '@/components/guides/guide-card';
import { GUIDES, GUIDE_CATEGORY_LABELS } from '@/data/guides';

const CATEGORIES = ['all', 'beginner', 'advanced', 'game_mode', 'brawler', 'system'] as const;

export default function GuidesPage() {
  const [category, setCategory] = useState<string>('all');

  const filtered = category === 'all' ? GUIDES : GUIDES.filter((g) => g.category === category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="h-6 w-6 text-[var(--color-gold)]" />
          <h1 className="text-3xl font-bold">Guides</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Strategies, tips, and in-depth guides for every aspect of Brawl Stars.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategory(cat)}
          >
            {cat === 'all' ? 'All' : GUIDE_CATEGORY_LABELS[cat] ?? cat}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No guides in this category yet.</p>
      )}
    </div>
  );
}
