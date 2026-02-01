/**
 * Reusable Animation Presets
 * Common animation configurations for consistent effects across the site
 */

import { gsap } from './gsap';

/**
 * Animation preset configurations
 */
export const animationPresets = {
  // Fade in from bottom
  fadeInUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
  },

  // Fade in from top
  fadeInDown: {
    from: { opacity: 0, y: -60 },
    to: { opacity: 1, y: 0 },
  },

  // Fade in from left
  fadeInLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
  },

  // Fade in from right
  fadeInRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 },
  },

  // Scale up with fade
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  },

  // Bounce in
  bounceIn: {
    from: { opacity: 0, scale: 0.3 },
    to: { opacity: 1, scale: 1, ease: 'back.out(1.7)' },
  },

  // Slide in from bottom
  slideInUp: {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, ease: 'power3.out' },
  },

  // Rotate in
  rotateIn: {
    from: { opacity: 0, rotation: -10, scale: 0.9 },
    to: { opacity: 1, rotation: 0, scale: 1 },
  },
};

/**
 * Easing presets for different animation feels
 */
export const easingPresets = {
  smooth: 'power2.inOut',
  snappy: 'power3.out',
  elastic: 'elastic.out(1, 0.5)',
  bounce: 'back.out(1.7)',
  linear: 'none',
};

/**
 * Duration presets for consistent timing
 */
export const durationPresets = {
  fast: 0.3,
  normal: 0.6,
  slow: 1,
  verySlow: 1.5,
};

/**
 * Stagger presets for sequential animations
 */
export const staggerPresets = {
  quick: 0.05,
  normal: 0.1,
  slow: 0.2,
  verySlow: 0.3,
};

/**
 * Helper function to apply animation preset to element
 */
export const applyAnimationPreset = (
  element: HTMLElement | string,
  presetName: keyof typeof animationPresets,
  options: {
    delay?: number;
    duration?: number;
    ease?: string;
    onComplete?: () => void;
  } = {}
) => {
  const preset = animationPresets[presetName];
  
  return gsap.fromTo(
    element,
    preset.from,
    {
      ...preset.to,
      delay: options.delay || 0,
      duration: options.duration || durationPresets.normal,
      ease: options.ease || preset.to.ease || easingPresets.smooth,
      onComplete: options.onComplete,
    }
  );
};

/**
 * Create a timeline with staggered animations
 */
export const createStaggerTimeline = (
  elements: HTMLElement[] | string,
  presetName: keyof typeof animationPresets,
  options: {
    stagger?: number;
    delay?: number;
    duration?: number;
    ease?: string;
  } = {}
) => {
  const preset = animationPresets[presetName];
  const timeline = gsap.timeline({ delay: options.delay || 0 });

  timeline.fromTo(
    elements,
    preset.from,
    {
      ...preset.to,
      stagger: options.stagger || staggerPresets.normal,
      duration: options.duration || durationPresets.normal,
      ease: options.ease || preset.to.ease || easingPresets.smooth,
    }
  );

  return timeline;
};

/**
 * Counter animation for numbers
 */
export const animateCounter = (
  element: HTMLElement,
  options: {
    from?: number;
    to: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
  }
) => {
  const {
    from = 0,
    to,
    duration = 2,
    suffix = '',
    prefix = '',
    decimals = 0,
  } = options;

  const obj = { value: from };

  return gsap.to(obj, {
    value: to,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`;
    },
  });
};
