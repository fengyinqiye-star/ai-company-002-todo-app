'use client';

import { motion } from 'framer-motion';
import { emptyStateVariants } from '@/animations/variants';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
}

export function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <motion.div
      variants={emptyStateVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      {icon && (
        <div className="mb-4 text-warmGray-300 dark:text-warmGray-600">
          {icon}
        </div>
      )}
      <p className="text-footer text-warmGray-400 dark:text-warmGray-500">
        {message}
      </p>
    </motion.div>
  );
}
