import { Skeleton } from '@/components/ui/skeleton';

export default function BrawlerDetailLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <Skeleton className="h-36 w-36 rounded-2xl" />
        <div className="space-y-3">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-16 w-80" />
        </div>
      </div>
      <Skeleton className="mb-8 h-40 w-full rounded-lg" />
      <Skeleton className="mb-8 h-32 w-full rounded-lg" />
    </div>
  );
}
