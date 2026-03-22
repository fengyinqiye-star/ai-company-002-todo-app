'use client';

import { useContext } from 'react';
import { TaskContext, type TaskContextValue } from '@/contexts/TaskContext';

export function useTasks(): TaskContextValue {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
