'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { badgeCountVariants } from '@/animations/variants';

interface BadgeProps {
  count: number;
  label: string;
}

export function Badge({ count, label }: BadgeProps) {
  return (
    <div className="text-footer text-warmGray-500 dark:text-warmGray-400" aria-live="polite">
      <AnimatePresence mode="wait">
        {count === 0 ? (
          <motion.span
            key="complete"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-success-500 font-medium"
          >
            すべて完了!
          </motion.span>
        ) : (
          <motion.span
            key={count}
            variants={badgeCountVariants}
            initial="initial"
            animate="changed"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
