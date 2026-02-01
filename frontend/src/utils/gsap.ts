/**
 * GSAP Configuration & Utilities
 * Centralizes GSAP setup with ScrollTrigger plugin
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Configure GSAP defaults for consistent animations
 */
export const configureGSAP = () => {
  gsap.config({
    force3D: true, // Force GPU acceleration
    nullTargetWarn: false, // Suppress warnings for missing elements
  });

  // Set default easing
  gsap.defaults({
    ease: 'power2.out',
    duration: 1,
  });
};

/**
 * Refresh all ScrollTrigger instances
 * Call this after dynamic content loads or layout changes
 */
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};

/**
 * Kill all ScrollTrigger instances
 * Call this on page cleanup/unmount
 */
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Create a parallax effect with ScrollTrigger
 * @param element - Element to animate
 * @param options - Configuration options
 */
export const createParallax = (
  element: HTMLElement | string,
  options: {
    speed?: number; // Parallax speed multiplier (0.5 = slow, 1.5 = fast)
    direction?: 'vertical' | 'horizontal';
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  const {
    speed = 0.5,
    direction = 'vertical',
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
  } = options;

  // Skip if reduced motion is preferred
  if (prefersReducedMotion()) {
    return null;
  }

  const movement = direction === 'vertical' ? { y: '20%' } : { x: '20%' };
  const endMovement = direction === 'vertical' ? { y: '-20%' } : { x: '-20%' };

  return gsap.fromTo(
    element,
    movement,
    {
      ...endMovement,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
      },
    }
  );
};

/**
 * Create a reveal animation that triggers on scroll
 * @param elements - Elements to animate
 * @param options - Configuration options
 */
export const createReveal = (
  elements: HTMLElement | HTMLElement[] | string,
  options: {
    delay?: number;
    stagger?: number;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    start?: string;
    once?: boolean;
  } = {}
) => {
  const {
    delay = 0,
    stagger = 0.1,
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0 },
    start = 'top 80%',
    once = true,
  } = options;

  // Skip if reduced motion is preferred
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1 });
    return null;
  }

  return gsap.fromTo(
    elements,
    from,
    {
      ...to,
      delay,
      stagger,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: Array.isArray(elements) ? elements[0] : elements,
        start,
        once,
      },
    }
  );
};

/**
 * Create a scale animation on scroll
 * @param element - Element to animate
 * @param options - Configuration options
 */
export const createScaleAnimation = (
  element: HTMLElement | string,
  options: {
    fromScale?: number;
    toScale?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  const {
    fromScale = 0.8,
    toScale = 1,
    start = 'top 80%',
    end = 'top 20%',
    scrub = true,
  } = options;

  // Skip if reduced motion is preferred
  if (prefersReducedMotion()) {
    gsap.set(element, { scale: 1 });
    return null;
  }

  return gsap.fromTo(
    element,
    { scale: fromScale },
    {
      scale: toScale,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
      },
    }
  );
};

/**
 * Create a fade animation on scroll
 * @param element - Element to animate
 * @param options - Configuration options
 */
export const createFadeAnimation = (
  element: HTMLElement | string,
  options: {
    fromOpacity?: number;
    toOpacity?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  const {
    fromOpacity = 1,
    toOpacity = 0,
    start = 'top top',
    end = 'bottom top',
    scrub = true,
  } = options;

  // Skip if reduced motion is preferred
  if (prefersReducedMotion()) {
    return null;
  }

  return gsap.fromTo(
    element,
    { opacity: fromOpacity },
    {
      opacity: toOpacity,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
      },
    }
  );
};

export { gsap, ScrollTrigger };
