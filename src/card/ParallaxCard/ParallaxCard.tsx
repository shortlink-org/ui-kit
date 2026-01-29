'use client'

import { useRef, ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'motion/react'

/**
 * Custom hook for parallax effect based on scroll position
 * @see https://motion.dev/tutorials/react-parallax
 */
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

export interface ParallaxCardProps {
  /** Card content */
  children: ReactNode
  /** Parallax distance in pixels (default: 50) */
  parallaxDistance?: number
  /** Enable spring physics for smoother animation */
  useSpringPhysics?: boolean
  /** Spring stiffness (default: 100) */
  springStiffness?: number
  /** Spring damping (default: 30) */
  springDamping?: number
  /** Additional className for the card wrapper */
  className?: string
  /** Scale effect on scroll (default: true) */
  enableScale?: boolean
  /** Opacity effect on scroll (default: true) */
  enableOpacity?: boolean
}

/**
 * ParallaxCard - A card component with scroll-linked parallax animation
 * 
 * Uses Motion for React's useScroll and useTransform hooks to create
 * a natural parallax effect as the card scrolls through the viewport.
 * 
 * @example
 * ```tsx
 * <ParallaxCard parallaxDistance={100}>
 *   <FeatureCard title="Feature" description="Description" icon={<Icon />} />
 * </ParallaxCard>
 * ```
 */
export function ParallaxCard({
  children,
  parallaxDistance = 50,
  useSpringPhysics = true,
  springStiffness = 100,
  springDamping = 30,
  className = '',
  enableScale = true,
  enableOpacity = true,
}: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  // Track scroll progress of this element through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    // Start tracking when the bottom of the element enters the viewport
    // End when the top of the element leaves the viewport
    offset: ['start end', 'end start'],
  })

  // Create parallax Y movement
  const rawY = useParallax(scrollYProgress, parallaxDistance)
  
  // Apply spring physics for smoother animation
  const y = useSpringPhysics
    ? useSpring(rawY, {
        stiffness: springStiffness,
        damping: springDamping,
        restDelta: 0.001,
      })
    : rawY

  // Scale effect: slightly smaller at edges, full size in center
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    enableScale ? [0.95, 1, 1, 0.95] : [1, 1, 1, 1]
  )

  // Opacity effect: fade in/out at edges
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    enableOpacity ? [0.6, 1, 1, 0.6] : [1, 1, 1, 1]
  )

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity }}
      className={className}
      // Hide initially to prevent flash before scroll measurement
      initial={{ visibility: 'hidden' }}
      animate={{ visibility: 'visible' }}
    >
      {children}
    </motion.div>
  )
}

export default ParallaxCard
