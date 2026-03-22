'use client';

import { motion } from 'framer-motion';
import { useTasks } from '@/hooks/useTasks';
import { FILTER_LABELS } from '@/lib/constants';
import type { FilterType } from '@/types';

const filters: FilterType[] = ['all', 'active', 'completed'];

export function FilterTabs() {
  const { state, dispatch } = useTasks();

  return (
    <div
      className="flex gap-1 p-1.5 bg-warm-bg-alt dark:bg-warm-bg-alt-dark rounded-pill"
      role="tablist"
      aria-label="タスクフィルタ"
    >
      {filters.map((filter) => {
        const isActive = state.filter === filter;
        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls="task-list"
            onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter } })}
            className={`
              relative flex-1 px-3 py-2 text-tab rounded-full
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25
              ${isActive
                ? 'text-warm-text-primary dark:text-warm-text-primary-dark'
                : 'text-warm-text-secondary dark:text-warm-text-secondary-dark hover:text-warm-text-primary dark:hover:text-warm-text-primary-dark'
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-warm-surface dark:bg-warm-surface-dark rounded-full shadow-card dark:shadow-card-dark"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 font-body">{FILTER_LABELS[filter]}</span>
          </button>
        );
      })}
    </div>
  );
}
