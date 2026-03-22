'use client';

import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { motion } from 'framer-motion';
import { checkmarkVariants } from '@/animations/variants';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
}

export function Checkbox({ checked, onChange, ariaLabel }: CheckboxProps) {
  return (
    <RadixCheckbox.Root
      checked={checked}
      onCheckedChange={onChange}
      aria-label={ariaLabel}
      className={`
        flex h-5 w-5 min-w-[20px] items-center justify-center rounded-[4px] border-2
        transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/20
        ${checked
          ? 'border-success-500 bg-success-500'
          : 'border-warmGray-300 bg-white dark:border-warmGray-600 dark:bg-warmGray-800 hover:border-warmGray-400 dark:hover:border-warmGray-500'
        }
      `}
    >
      <RadixCheckbox.Indicator asChild>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="text-white"
        >
          <motion.path
            d="M2 6L5 9L10 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={checkmarkVariants}
            initial="unchecked"
            animate={checked ? 'checked' : 'unchecked'}
          />
        </svg>
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}
