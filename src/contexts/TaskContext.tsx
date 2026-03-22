'use client';

import {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type Dispatch,
} from 'react';
import { taskReducer } from '@/reducers/taskReducer';
import { loadTasks, saveTasks } from '@/lib/storage';
import type { Task, TaskState, TaskAction, FilterType } from '@/types';

export interface TaskContextValue {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
  filteredTasks: Task[];
  activeCount: number;
  completedCount: number;
}

export const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    filter: 'all' as FilterType,
  });

  // SSRハイドレーション対策: クライアントサイドでのみlocalStorageを読む
  useEffect(() => {
    const saved = loadTasks();
    if (saved.length > 0) {
      dispatch({ type: 'LOAD_TASKS', payload: { tasks: saved } });
    }
    setIsHydrated(true);
  }, []);

  // タスク変更時にlocalStorageへ保存（初回ロード完了後のみ）
  useEffect(() => {
    if (isHydrated) {
      saveTasks(state.tasks);
    }
  }, [state.tasks, isHydrated]);

  // 派生データのメモ化
  const filteredTasks = useMemo(() => {
    switch (state.filter) {
      case 'active':
        return state.tasks.filter((t) => !t.completed);
      case 'completed':
        return state.tasks.filter((t) => t.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.filter]);

  const activeCount = useMemo(
    () => state.tasks.filter((t) => !t.completed).length,
    [state.tasks]
  );

  const completedCount = useMemo(
    () => state.tasks.filter((t) => t.completed).length,
    [state.tasks]
  );

  const value = useMemo(
    () => ({ state, dispatch, filteredTasks, activeCount, completedCount }),
    [state, filteredTasks, activeCount, completedCount]
  );

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}
