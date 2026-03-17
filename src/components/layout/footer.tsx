import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Separator className="mb-6" />
        <div className="flex flex-col items-center gap-4 text-center text-sm text-muted-foreground">
          <p>
            This content is not affiliated with, endorsed, sponsored, or specifically approved by
            Supercell and Supercell is not responsible for it. For more information see{' '}
            <a
              href="https://supercell.com/en/fan-content-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Supercell&apos;s Fan Content Policy
            </a>
            .
          </p>
          <p>&copy; {new Date().getFullYear()} BrawlHub. Not affiliated with Supercell.</p>
        </div>
      </div>
    </footer>
  );
}
