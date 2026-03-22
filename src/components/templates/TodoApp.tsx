'use client';

import { Header } from '@/components/organisms/Header';
import { TaskInput } from '@/components/molecules/TaskInput';
import { FilterTabs } from '@/components/molecules/FilterTabs';
import { TaskList } from '@/components/organisms/TaskList';
import { Footer } from '@/components/organisms/Footer';

export function TodoApp() {
  return (
    <div className="min-h-screen bg-warmGray-50 dark:bg-warmGray-900 transition-colors duration-300">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-8 sm:py-12">
        <Header />
        <main className="mt-8 space-y-6">
          <TaskInput />
          <FilterTabs />
          <TaskList />
        </main>
        <Footer />
      </div>
    </div>
  );
}
