import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TIER_COLORS, TIER_DESCRIPTIONS, type Tier, type BrawlerMetaStats } from '@/data/meta';
import { BRAWLER_META } from '@/data/brawlers';

export interface TierListProps {
  stats: BrawlerMetaStats[];
}

const TIERS: Tier[] = ['S', 'A', 'B', 'C', 'D'];

export function TierList({ stats }: TierListProps) {
  return (
    <div className="space-y-3">
      {TIERS.map((tier) => {
        const brawlers = stats.filter((s) => s.tier === tier);
        if (brawlers.length === 0) return null;

        return (
          <Card key={tier} className="overflow-hidden">
            <div className="flex">
              <div
                className="flex w-16 shrink-0 flex-col items-center justify-center text-black font-bold sm:w-20"
                style={{ backgroundColor: TIER_COLORS[tier] }}
              >
                <span className="text-2xl">{tier}</span>
                <span className="text-[9px] opacity-70 hidden sm:block text-center px-1">
                  {TIER_DESCRIPTIONS[tier].split('—')[0].trim()}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 p-3">
                {brawlers.map((b) => {
                  const meta = BRAWLER_META[b.brawlerId];
                  const slug = meta?.slug ?? b.brawlerName.toLowerCase();

                  return (
                    <Link
                      key={b.brawlerId}
                      href={`/brawlers/${slug}`}
                      className="group flex flex-col items-center gap-0.5"
                      title={`${b.brawlerName} — ${b.winRate.toFixed(1)}% WR`}
                    >
                      <div className="relative h-10 w-10 rounded-lg border border-border/50 bg-muted p-0.5 transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
                        <Image
                          src={`https://cdn.brawlify.com/brawler/${b.brawlerId}.png`}
                          alt={b.brawlerName}
                          fill
                          sizes="48px"
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground group-hover:text-foreground">
                        {b.brawlerName}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
