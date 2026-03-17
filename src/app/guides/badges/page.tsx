'use client';

import { useState } from 'react';
import { Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCard } from '@/components/guides/badge-card';
import { BADGES, BADGE_CATEGORIES } from '@/data/badges';
import { useBadgeProgress } from '@/hooks/useBadgeProgress';

const DIFFICULTIES = [1, 2, 3, 4, 5] as const;

export default function BadgesPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const { progress, toggleBadge, completedCount, loading: progressLoading } = useBadgeProgress();

  const filtered = BADGES.filter((b) => {
    if (categoryFilter !== 'all' && b.category !== categoryFilter) return false;
    if (difficultyFilter !== null && b.difficulty !== difficultyFilter) return false;
    if (showIncomplete && progress[b.id]) return false;
    return true;
  });

  const totalBadges = BADGES.length;
  const categories = Object.entries(BADGE_CATEGORIES);
  const progressPercent = totalBadges > 0 ? Math.round((completedCount / totalBadges) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Award className="h-6 w-6 text-[var(--color-gold)]" />
          <h1 className="text-3xl font-bold">Badges & Prestige Guide</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Complete catalog of all {totalBadges} badges. Track your progress and learn how to earn each one.
        </p>
      </div>

      {/* Progress Tracker */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedCount} / {totalBadges} ({progressPercent}%)
            </span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--color-gold)] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Prestige Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Prestige Pathway</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {[
              { rank: 'Bronze', trophies: '750', color: '#CD7F32' },
              { rank: 'Silver', trophies: '900', color: '#C0C0C0' },
              { rank: 'Gold', trophies: '1000', color: '#FFD700' },
              { rank: 'Diamond', trophies: '1100', color: '#B9F2FF' },
              { rank: 'Master', trophies: '1150+', color: '#FF6B6B' },
            ].map((p) => (
              <div
                key={p.rank}
                className="rounded-lg border-2 p-3 text-center"
                style={{ borderColor: p.color }}
              >
                <p className="font-bold text-sm" style={{ color: p.color }}>
                  {p.rank}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.trophies} trophies</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Push brawlers past Rank 25 to enter the Prestige system. Each tier unlocks exclusive icons, sprays, and badges.
          </p>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={categoryFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategoryFilter('all')}
          >
            All ({totalBadges})
          </Button>
          {categories.map(([key, label]) => {
            const count = BADGES.filter((b) => b.category === key).length;
            return (
              <Button
                key={key}
                variant={categoryFilter === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter(key)}
              >
                {label} ({count})
              </Button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Difficulty:</span>
          {DIFFICULTIES.map((d) => (
            <Button
              key={d}
              variant={difficultyFilter === d ? 'default' : 'outline'}
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setDifficultyFilter(difficultyFilter === d ? null : d)}
            >
              {d}
            </Button>
          ))}
          {difficultyFilter !== null && (
            <Button variant="ghost" size="sm" onClick={() => setDifficultyFilter(null)}>
              Clear
            </Button>
          )}
          <span className="mx-1 text-border">|</span>
          <Button
            variant={showIncomplete ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowIncomplete(!showIncomplete)}
          >
            {showIncomplete ? 'Showing Incomplete' : 'Show Incomplete Only'}
          </Button>
        </div>
      </div>

      {/* Badge Grid */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            completed={!!progress[badge.id]}
            onToggle={() => toggleBadge(badge.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No badges match the selected filters.</p>
      )}
    </div>
  );
}
