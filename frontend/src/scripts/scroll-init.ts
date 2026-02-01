/**
 * Lenis Smooth Scroll Initialization
 * Sets up buttery-smooth scrolling with GSAP integration
 */

import Lenis from 'lenis';
import { gsap, ScrollTrigger, configureGSAP, prefersReducedMotion } from '../utils/gsap';

/**
 * Initialize Lenis smooth scroll
 */
export const initSmoothScroll = (): Lenis | null => {
  // Skip smooth scroll if user prefers reduced motion
  if (prefersReducedMotion()) {
    console.log('Smooth scroll disabled: prefers-reduced-motion');
    return null;
  }

  // Configure GSAP
  configureGSAP();

  // Initialize Lenis
  const lenis = new Lenis({
    duration: 1.2, // Scroll duration (higher = smoother/slower)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false, // Disable on touch devices (better performance)
    touchMultiplier: 2,
    infinite: false,
  });

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Add Lenis to GSAP ticker for smooth integration
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert to milliseconds
  });

  // Disable lag smoothing for more accurate scroll sync
  gsap.ticker.lagSmoothing(0);

  // Debug: Log scroll position (remove in production)
  if (import.meta.env.DEV) {
    lenis.on('scroll', (e: { scroll: number; velocity: number }) => {
      // console.log('Scroll:', e.scroll, 'Velocity:', e.velocity);
    });
  }

  return lenis;
};

/**
 * Destroy smooth scroll instance
 */
export const destroySmoothScroll = (lenis: Lenis | null) => {
  if (lenis) {
    lenis.destroy();
    gsap.ticker.lagSmoothing(500, 33); // Reset to defaults
  }
};

/**
 * Scroll to a specific target smoothly
 */
export const scrollTo = (
  lenis: Lenis | null,
  target: string | number | HTMLElement,
  options?: {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
  }
) => {
  if (!lenis) {
    // Fallback to native scroll if Lenis not available
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
    return;
  }

  lenis.scrollTo(target, {
    offset: options?.offset || 0,
    duration: options?.duration || 1.2,
    easing: options?.easing,
  });
};

/**
 * Stop smooth scroll
 */
export const stopScroll = (lenis: Lenis | null) => {
  lenis?.stop();
};

/**
 * Resume smooth scroll
 */
export const startScroll = (lenis: Lenis | null) => {
  lenis?.start();
};
