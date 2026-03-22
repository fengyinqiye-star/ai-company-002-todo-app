'use client';

import { TaskProvider } from '@/contexts/TaskContext';
import { TodoApp } from '@/components/templates/TodoApp';

export default function Home() {
  return (
    <TaskProvider>
      <TodoApp />
    </TaskProvider>
  );
}
