'use client';

import { ThemeToggle } from '@/components/molecules/ThemeToggle';

export function Header() {
  return (
    <header className="flex items-center justify-between py-2">
      <div>
        <h1 className="font-heading text-app-title text-warm-text-primary dark:text-warm-text-primary-dark tracking-tight">
          Todo
        </h1>
        <div className="mt-1 h-0.5 w-8 bg-indigo-500 rounded-full" />
      </div>
      <ThemeToggle />
    </header>
  );
}
