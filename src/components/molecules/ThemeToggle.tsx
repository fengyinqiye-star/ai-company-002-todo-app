'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { themeIconVariants } from '@/animations/variants';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'ダークモードに切り替え' : 'ライトモードに切り替え'}
      className="
        relative p-2 rounded-input
        text-warmGray-500 hover:text-warmGray-700
        dark:text-warmGray-400 dark:hover:text-warmGray-200
        hover:bg-warmGray-100 dark:hover:bg-warmGray-700
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/20
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div
            key="sun"
            variants={themeIconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Sun size={20} strokeWidth={1.5} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            variants={themeIconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Moon size={20} strokeWidth={1.5} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
