export const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function computeStaggerDelay(
  index: number,
  baseDelaySec = 0.1,
  stepSec = 0.12
): number {
  const safeIndex = Math.max(0, Math.floor(index));
  return Number((baseDelaySec + safeIndex * stepSec).toFixed(4));
}

export const HERO_STAGGER_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
} as const;

export const HERO_WORDMARK_LEFT_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.78,
      delay: computeStaggerDelay(0, 0.08, 0.12),
      ease: HERO_EASE,
    },
  },
} as const;

export const HERO_PILL_ENTRANCE_VARIANTS = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.82,
      delay: computeStaggerDelay(1, 0.08, 0.12),
      ease: HERO_EASE,
    },
  },
} as const;

export const HERO_WORDMARK_RIGHT_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.78,
      delay: computeStaggerDelay(2, 0.08, 0.12),
      ease: HERO_EASE,
    },
  },
} as const;

export const HERO_SUBHEADING_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.74,
      delay: computeStaggerDelay(3, 0.08, 0.12),
      ease: HERO_EASE,
    },
  },
} as const;

export const HERO_FOOTER_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.36,
    },
  },
} as const;

export const HERO_FOOTER_ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: HERO_EASE,
    },
  },
} as const;

export const HERO_BUTTON_ENTRANCE_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.68,
      ease: HERO_EASE,
    },
  },
} as const;

export const HERO_NAV_LIST_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
} as const;

export const HERO_NAV_ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: HERO_EASE,
    },
  },
} as const;
