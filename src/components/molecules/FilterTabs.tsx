'use client';

import { motion } from 'framer-motion';
import { useTasks } from '@/hooks/useTasks';
import { FILTER_LABELS } from '@/lib/constants';
import type { FilterType } from '@/types';

const filters: FilterType[] = ['all', 'active', 'completed'];

export function FilterTabs() {
  const { state, dispatch } = useTasks();

  return (
    <div className="flex gap-1 p-1 bg-warmGray-100 dark:bg-warmGray-800 rounded-input" role="tablist" aria-label="タスクフィルタ">
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
              relative flex-1 px-3 py-2 text-tab rounded-[6px]
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/20
              ${isActive
                ? 'text-warmGray-900 dark:text-warmGray-50'
                : 'text-warmGray-500 dark:text-warmGray-400 hover:text-warmGray-700 dark:hover:text-warmGray-300'
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-white dark:bg-warmGray-700 rounded-[6px] shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{FILTER_LABELS[filter]}</span>
          </button>
        );
      })}
    </div>
  );
}
