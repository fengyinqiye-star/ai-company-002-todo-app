'use client';

import { useCallback } from 'react';
import { AnimatePresence, Reorder } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import { TaskItem } from '@/components/molecules/TaskItem';
import { EmptyState } from '@/components/atoms/EmptyState';
import { useTasks } from '@/hooks/useTasks';
import { EMPTY_MESSAGES } from '@/lib/constants';
import type { Task } from '@/types';

export function TaskList() {
  const { state, filteredTasks, dispatch } = useTasks();

  const handleReorder = useCallback(
    (newOrder: Task[]) => {
      dispatch({ type: 'REORDER_TASKS', payload: { tasks: newOrder } });
    },
    [dispatch]
  );

  if (filteredTasks.length === 0) {
    return (
      <div id="task-list" role="list" aria-label="タスク一覧">
        <EmptyState
          message={EMPTY_MESSAGES[state.filter]}
          icon={<ClipboardList size={48} strokeWidth={1} />}
        />
      </div>
    );
  }

  // Drag & drop is only enabled when viewing all tasks (no filter active)
  // because reordering filtered subsets would be confusing
  const isDragEnabled = state.filter === 'all';

  if (isDragEnabled) {
    return (
      <Reorder.Group
        axis="y"
        values={filteredTasks}
        onReorder={handleReorder}
        id="task-list"
        role="list"
        aria-label="タスク一覧"
        className="space-y-2"
      >
        {filteredTasks.map((task) => (
          <Reorder.Item
            key={task.id}
            value={task}
            dragListener={true}
            className="list-none"
          >
            <TaskItem task={task} dragControls />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    );
  }

  return (
    <div
      id="task-list"
      role="list"
      aria-label="タスク一覧"
      className="space-y-2"
    >
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </div>
  );
}
