'use client';

import { Header } from '@/components/organisms/Header';
import { TaskInput } from '@/components/molecules/TaskInput';
import { FilterTabs } from '@/components/molecules/FilterTabs';
import { TaskList } from '@/components/organisms/TaskList';
import { Footer } from '@/components/organisms/Footer';

export function TodoApp() {
  return (
    <div className="min-h-screen bg-warm-bg dark:bg-warm-bg-dark transition-colors duration-300">
      <div className="mx-auto max-w-[640px] px-4 sm:px-6 py-10 sm:py-16">
        <Header />
        <main className="mt-10 space-y-5">
          <TaskInput />
          <FilterTabs />
          <TaskList />
        </main>
        <Footer />
      </div>
    </div>
  );
}
