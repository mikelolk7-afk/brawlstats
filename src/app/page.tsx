import Link from 'next/link';
import { Swords, Search, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventRotationWidget } from '@/components/home/event-rotation';

const QUICK_LINKS = [
  {
    href: '/brawlers',
    title: 'Brawlers',
    description: 'Browse all brawlers, filter by rarity and class',
    icon: Swords,
  },
  {
    href: '/stats',
    title: 'Player Lookup',
    description: 'Search any player by tag to view their stats',
    icon: Search,
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Hero */}
      <section className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="h-10 w-10 text-[var(--color-gold)]" />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">BrawlHub</h1>
        </div>
        <p className="mx-auto max-w-xl text-lg text-muted-foreground">
          Your Brawl Stars Companion — brawler stats, event rotations, player lookups, and more.
        </p>
      </section>

      {/* Quick Links */}
      <section className="mb-12">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {QUICK_LINKS.map(({ href, title, description, icon: Icon }) => (
            <Link key={href} href={href}>
              <Card className="transition-shadow hover:shadow-lg cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <Icon className="h-6 w-6 text-[var(--color-gold)]" />
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Event Rotation */}
      <EventRotationWidget />

      {/* Coming Soon */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">Coming Soon</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          {['Meta Tier Lists', 'Guides & Tips', 'Team Comp Builder'].map((title) => (
            <Card key={title} className="opacity-60">
              <CardContent className="flex items-center justify-center py-8">
                <p className="text-muted-foreground font-medium">{title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
