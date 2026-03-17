import { Skeleton } from '@/components/ui/skeleton';

export default function PlayerLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Skeleton className="mb-4 h-8 w-32" />
      <Skeleton className="mb-6 h-48 w-full rounded-lg" />
      <Skeleton className="mb-3 h-7 w-40" />
      <div className="grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
