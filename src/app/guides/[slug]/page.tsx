import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, BookOpen, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MarkdownContent } from '@/components/guides/markdown-content';
import { GUIDES, getGuideBySlug, GUIDE_CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/data/guides';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  return {
    title: guide?.title ?? 'Guide',
    description: guide?.excerpt ?? 'A Brawl Stars guide on BrawlHub.',
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/guides">
        <Button variant="ghost" size="sm" className="mb-4 -ml-2">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Guides
        </Button>
      </Link>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{guide.title}</h1>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="secondary">{GUIDE_CATEGORY_LABELS[guide.category]}</Badge>
          <Badge variant="outline">{DIFFICULTY_LABELS[guide.difficulty]}</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {guide.readTime} min read
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            Published {new Date(guide.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          {guide.updatedAt !== guide.publishedAt && (
            <span className="text-xs">
              Updated {new Date(guide.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>
      </header>

      {/* Content */}
      <Card>
        <CardContent className="p-6 sm:p-8">
          <MarkdownContent content={guide.content} />
        </CardContent>
      </Card>

      {/* Tags */}
      {guide.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-1.5">
          {guide.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
