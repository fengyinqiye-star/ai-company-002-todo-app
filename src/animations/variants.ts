import { Variants, Transition } from 'framer-motion';

/** タスク追加: 上からスライドイン + フェードイン */
export const taskItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    x: 80,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

export const taskItemTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut',
};

/** チェックマークのストロークアニメーション */
export const checkmarkVariants: Variants = {
  unchecked: {
    pathLength: 0,
    opacity: 0,
  },
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.4,
      },
      opacity: { duration: 0.1 },
    },
  },
};

/** 完了タスクの取り消し線アニメーション */
export const strikethroughVariants: Variants = {
  unchecked: {
    scaleX: 0,
    originX: 0,
  },
  checked: {
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      delay: 0.1,
    },
  },
};

/** タブのアクティブインジケーター */
export const tabIndicatorVariants: Variants = {
  inactive: {
    opacity: 0,
  },
  active: {
    opacity: 1,
  },
};

/** ダークモード切替アイコン */
export const themeIconVariants: Variants = {
  initial: {
    rotate: -90,
    scale: 0,
    opacity: 0,
  },
  animate: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
  exit: {
    rotate: 90,
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

/** 空状態 */
export const emptyStateVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/** カウントバッジ */
export const badgeCountVariants: Variants = {
  initial: {
    scale: 1,
  },
  changed: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.3,
    },
  },
};
