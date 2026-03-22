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
        <div className="mb-4 text-warm-border dark:text-warm-border-dark">
          {icon}
        </div>
      )}
      <p className="text-footer text-warm-text-secondary dark:text-warm-text-secondary-dark font-body">
        {message}
      </p>
    </motion.div>
  );
}
