import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { StatTable } from '@/components/brawlers/stat-table';
import { AbilityCard } from '@/components/brawlers/ability-card';
import { BRAWLER_META, getBrawlerBySlug } from '@/data/brawlers';
import { RARITY_COLORS, RARITY_LABELS, CLASS_LABELS } from '@/lib/constants';
import type { Brawler } from '@/lib/api/types';

interface BrawlerDetailPageProps {
  params: Promise<{ slug: string }>;
}

function getBrawlerData(slug: string): Brawler | null {
  const match = getBrawlerBySlug(slug);
  if (!match) return null;

  return {
    id: match.id,
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    slug: match.meta.slug,
    rarity: match.meta.rarity,
    class: match.meta.class,
    description: match.meta.description,
    starPowers: [],
    gadgets: [],
    imageUrl: `https://cdn.brawlify.com/brawler/${match.id}.png`,
  };
}

export async function generateStaticParams() {
  return Object.values(BRAWLER_META).map((meta) => ({
    slug: meta.slug,
  }));
}

export async function generateMetadata({ params }: BrawlerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = getBrawlerBySlug(slug);
  const name = match
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Brawler';

  return {
    title: name,
    description: match?.meta.description ?? `Stats and builds for ${name} in Brawl Stars.`,
  };
}

export default async function BrawlerDetailPage({ params }: BrawlerDetailPageProps) {
  const { slug } = await params;
  const brawler = getBrawlerData(slug);

  if (!brawler) {
    notFound();
  }

  const rarityColor = RARITY_COLORS[brawler.rarity];
  const rarityLabel = RARITY_LABELS[brawler.rarity];
  const classLabel = CLASS_LABELS[brawler.class];

  const stats = [
    { label: 'Rarity', value: rarityLabel },
    { label: 'Class', value: classLabel },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Hero */}
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div
          className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 bg-card sm:h-36 sm:w-36"
          style={{ borderColor: rarityColor }}
        >
          <Image
            src={brawler.imageUrl}
            alt={brawler.name}
            width={120}
            height={120}
            className="object-contain"
            priority
          />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold">{brawler.name}</h1>
          <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
            <Badge style={{ backgroundColor: rarityColor, color: '#000' }}>
              {rarityLabel}
            </Badge>
            <Badge variant="outline">{classLabel}</Badge>
          </div>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">{brawler.description}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <StatTable stats={stats} />
      </div>

      {/* Star Powers */}
      {brawler.starPowers.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-xl font-bold">Star Powers</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {brawler.starPowers.map((sp) => (
              <AbilityCard
                key={sp.id}
                name={sp.name}
                description={sp.description}
                type="Star Power"
              />
            ))}
          </div>
        </div>
      )}

      {/* Gadgets */}
      {brawler.gadgets.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-xl font-bold">Gadgets</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {brawler.gadgets.map((g) => (
              <AbilityCard
                key={g.id}
                name={g.name}
                description={g.description}
                type="Gadget"
              />
            ))}
          </div>
        </div>
      )}

      {/* Placeholder for builds */}
      <Card className="opacity-60">
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-muted-foreground font-medium">Recommended Builds — Coming Soon</p>
        </CardContent>
      </Card>
    </div>
  );
}
