/**
 * CSS Spring Easing Utilities
 * 
 * Uses Motion's spring function to generate CSS linear() easing
 * for natural, physics-based animations.
 * 
 * @see https://motion.dev/tutorials/react-css-spring
 */
import { spring } from 'motion'

/**
 * Pre-generated spring easings for common use cases.
 * These can be used in CSS transitions and animations.
 * 
 * Format: spring(perceivedDuration, bounce)
 * - perceivedDuration: Roughly how long the animation feels (in seconds)
 * - bounce: 0 = no bounce, 1 = maximum bounce
 */

/** Snappy spring - quick with slight bounce (buttons, toggles) */
export const springSnappy = spring(0.3, 0.3)

/** Default spring - balanced feel (general UI) */
export const springDefault = spring(0.4, 0.25)

/** Bouncy spring - playful with noticeable bounce (fun interactions) */
export const springBouncy = spring(0.5, 0.5)

/** Wobbly spring - extra bouncy (attention-grabbing) */
export const springWobbly = spring(0.6, 0.7)

/** Gentle spring - smooth with minimal bounce (subtle transitions) */
export const springGentle = spring(0.5, 0.15)

/** Stiff spring - quick settle, almost no bounce (precise movements) */
export const springStiff = spring(0.2, 0.1)

/** Slow spring - longer duration with gentle bounce (large elements) */
export const springSlow = spring(0.8, 0.2)

/**
 * Generate a custom spring easing
 * @param duration - Perceived duration in seconds
 * @param bounce - Bounciness from 0 to 1
 * @returns CSS transition value with duration and linear() easing
 */
export function createSpring(duration: number, bounce: number): string {
  return spring(duration, bounce)
}

/**
 * CSS custom properties for spring easings.
 * Inject these into your global styles or component.
 */
export const springCSSVariables = `
:root {
  /* Spring easing functions using CSS linear() */
  --spring-snappy: ${springSnappy};
  --spring-default: ${springDefault};
  --spring-bouncy: ${springBouncy};
  --spring-wobbly: ${springWobbly};
  --spring-gentle: ${springGentle};
  --spring-stiff: ${springStiff};
  --spring-slow: ${springSlow};
}
`

export default {
  snappy: springSnappy,
  default: springDefault,
  bouncy: springBouncy,
  wobbly: springWobbly,
  gentle: springGentle,
  stiff: springStiff,
  slow: springSlow,
  create: createSpring,
  cssVariables: springCSSVariables,
}
