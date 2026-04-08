/**
 * Animation presets and Framer Motion configurations
 */

import { Variants } from 'framer-motion';

/**
 * Fade animations
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Scale animations
 */
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Slide animations
 */
export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.3,
    },
  },
};

export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Rotate animations
 */
export const rotateInVariants: Variants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Bounce animations
 */
export const bounceVariants: Variants = {
  hidden: { scale: 0.3, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 0.5,
    },
  },
};

/**
 * Pulse animations (for attention)
 */
export const pulseVariants: Variants = {
  hidden: { opacity: 0.5, scale: 1 },
  visible: {
    opacity: [1, 0.7, 1],
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Shimmer/skeleton loading animation
 */
export const shimmerVariants: Variants = {
  hidden: { backgroundPosition: '1000px 0' },
  visible: {
    backgroundPosition: '-1000px 0',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Stagger container for list animations
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * Flip card animation
 */
export const flipVariants: Variants = {
  hidden: { rotateY: -90, opacity: 0 },
  visible: {
    rotateY: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Glow effect animation
 */
export const glowVariants: Variants = {
  hidden: { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
  visible: {
    boxShadow: [
      '0 0 0 0 rgba(59, 130, 246, 0.7)',
      '0 0 0 10px rgba(59, 130, 246, 0)',
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
  },
};

/**
 * Wave animation
 */
export const waveVariants: Variants = {
  hidden: { y: 0 },
  visible: (i: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      delay: i * 0.1,
    },
  }),
};

/**
 * Floating animation
 */
export const floatVariants: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Rotation animation
 */
export const spinVariants: Variants = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Get animation based on direction
 */
export function getDirectionalAnimation(
  direction: 'up' | 'down' | 'left' | 'right'
): Variants {
  switch (direction) {
    case 'up':
      return fadeInUpVariants;
    case 'left':
      return slideInLeftVariants;
    case 'right':
      return slideInRightVariants;
    case 'down':
      return {
        hidden: { opacity: 0, y: -20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' },
        },
      };
    default:
      return fadeInVariants;
  }
}

/**
 * Transition presets for common interactions
 */
export const transitionPresets = {
  fast: { duration: 0.2, ease: 'easeOut' },
  normal: { duration: 0.4, ease: 'easeOut' },
  slow: { duration: 0.6, ease: 'easeOut' },
  spring: { type: 'spring', stiffness: 100, damping: 15 },
  smooth: { type: 'tween', duration: 0.5, ease: 'easeInOut' },
};

/**
 * Hover animation effects
 */
export const hoverAnimations = {
  scale: { whileHover: { scale: 1.05 } },
  lift: { whileHover: { y: -5 } },
  pulse: { whileHover: { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' } },
  rotate: { whileHover: { rotate: 2 } },
};

/**
 * Tap animation effects
 */
export const tapAnimations = {
  scale: { whileTap: { scale: 0.95 } },
  press: { whileTap: { y: 2 } },
  shrink: { whileTap: { scale: 0.92 } },
};

/**
 * Create staggered animation for array items
 */
export function createStaggerAnimation(count: number, baseDelay = 0.1): Variants {
  return {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: baseDelay + i * 0.05,
      },
    }),
  };
}

/**
 * Create timeline animation for sequential effects
 */
export function createTimelineAnimation(
  steps: Array<{ duration: number; values: number[] }>,
  total: number
): Variants {
  const keyframes: number[] = [];

  steps.forEach(({ values }) => {
    keyframes.push(...values);
  });

  return {
    visible: {
      opacity: keyframes,
      transition: {
        times: Array.from({ length: keyframes.length }, (_, i) => i / (keyframes.length - 1)),
        duration: total,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  };
}

/**
 * Delay helper
 */
export function withDelay(animation: Variants, delay: number): Variants {
  return {
    ...animation,
    visible: {
      ...(animation.visible as any),
      transition: {
        ...(animation.visible as any)?.transition,
        delay,
      },
    },
  };
}
