'use client';

import { ThemeToggle } from '@/components/molecules/ThemeToggle';

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-app-title text-warmGray-900 dark:text-warmGray-50">
        Todo
      </h1>
      <ThemeToggle />
    </header>
  );
}
