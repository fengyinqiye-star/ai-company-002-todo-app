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
        text-warm-text-secondary hover:text-warm-text-primary
        dark:text-warm-text-secondary-dark dark:hover:text-warm-text-primary-dark
        hover:bg-warm-bg-alt dark:hover:bg-warm-bg-alt-dark
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25
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
