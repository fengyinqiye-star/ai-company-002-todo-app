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
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25
        ${checked
          ? 'border-emerald-500 bg-emerald-500'
          : 'border-warm-border bg-warm-surface dark:border-warm-border-dark dark:bg-warm-surface-dark hover:border-indigo-400 dark:hover:border-indigo-400'
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
