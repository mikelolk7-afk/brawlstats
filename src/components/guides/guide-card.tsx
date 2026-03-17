import Link from 'next/link';
import { Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { GuideData } from '@/data/guides';
import { GUIDE_CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/data/guides';

export interface GuideCardProps {
  guide: GuideData;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'text-green-400 border-green-400/50',
  intermediate: 'text-yellow-400 border-yellow-400/50',
  advanced: 'text-red-400 border-red-400/50',
};

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guides/${guide.slug}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-tight">{guide.title}</CardTitle>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            <Badge variant="secondary" className="text-[10px]">
              {GUIDE_CATEGORY_LABELS[guide.category]}
            </Badge>
            <Badge variant="outline" className={`text-[10px] ${DIFFICULTY_COLORS[guide.difficulty] ?? ''}`}>
              {DIFFICULTY_LABELS[guide.difficulty]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{guide.excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {guide.readTime} min read
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {new Date(guide.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
