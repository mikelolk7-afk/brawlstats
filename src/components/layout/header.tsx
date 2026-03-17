'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Menu, Moon, Sun, X, Swords, Search, Home, TrendingUp, BookOpen, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { UserMenu } from './user-menu';

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/brawlers', label: 'Brawlers', icon: Swords },
  { href: '/meta', label: 'Meta', icon: TrendingUp },
  { href: '/guides', label: 'Guides', icon: BookOpen },
  { href: '/news', label: 'News', icon: Newspaper },
  { href: '/stats', label: 'Stats', icon: Search },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Swords className="h-6 w-6 text-[var(--color-gold)]" />
          <span>BrawlHub</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}>
              <Button variant="ghost" size="sm">
                {label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <UserMenu />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64" showCloseButton={false}>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex items-center justify-between mb-6 p-4">
                <span className="font-bold text-lg">BrawlHub</span>
                <SheetClose className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent" aria-label="Close menu">
                  <X className="h-4 w-4" />
                </SheetClose>
              </div>
              <nav className="flex flex-col gap-2 px-4">
                {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href} onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Icon className="h-4 w-4" />
                      {label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
