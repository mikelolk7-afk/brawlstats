import type { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NEWS_ARTICLES, NEWS_CATEGORY_LABELS } from '@/data/news';

export const metadata: Metadata = {
  title: 'News & Updates',
  description: 'Latest Brawl Stars news, patch notes, balance changes, and event announcements.',
};

export default function NewsPage() {
  const sorted = [...NEWS_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Newspaper className="h-6 w-6 text-[var(--color-gold)]" />
          <h1 className="text-3xl font-bold">News & Updates</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Stay up to date with the latest Brawl Stars patch notes, events, and announcements.
        </p>
      </div>

      <div className="space-y-4">
        {sorted.map((article) => (
          <Link key={article.slug} href={`/news/${article.slug}`}>
            <Card className="transition-all hover:shadow-lg hover:scale-[1.01] cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <Badge variant="secondary" className="shrink-0 text-[10px]">
                    {NEWS_CATEGORY_LABELS[article.category]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
