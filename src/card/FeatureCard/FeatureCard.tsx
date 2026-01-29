'use client'

import React, { ReactNode, useMemo, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'motion/react'

// Valid Tailwind color classes for gradients
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VALID_GRADIENT_COLORS = [
  'indigo-500',
  'indigo-600',
  'purple-500',
  'purple-600',
  'blue-500',
  'blue-600',
  'green-500',
  'green-600',
  'red-500',
  'red-600',
  'yellow-500',
  'yellow-600',
  'pink-500',
  'pink-600',
  'rose-500',
  'rose-600',
  'teal-500',
  'teal-600',
  'cyan-500',
  'cyan-600',
  'orange-500',
  'orange-600',
] as const

// Valid Tailwind color classes with opacity for decoration gradients
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VALID_DECORATION_COLORS = [
  'indigo-500/5',
  'indigo-500/10',
  'purple-500/5',
  'purple-500/10',
  'blue-500/5',
  'blue-500/10',
  'green-500/5',
  'green-500/10',
  'red-500/5',
  'red-500/10',
  'yellow-500/5',
  'yellow-500/10',
  'pink-500/5',
  'pink-500/10',
  'rose-500/5',
  'rose-500/10',
  'teal-500/5',
  'teal-500/10',
  'cyan-500/5',
  'cyan-500/10',
  'orange-500/5',
  'orange-500/10',
] as const

// Valid link text color classes
const VALID_LINK_COLORS = {
  indigo: 'text-indigo-600 dark:text-indigo-400',
  purple: 'text-purple-600 dark:text-purple-400',
  blue: 'text-blue-600 dark:text-blue-400',
  green: 'text-green-600 dark:text-green-400',
  red: 'text-red-600 dark:text-red-400',
  yellow: 'text-yellow-600 dark:text-yellow-400',
  pink: 'text-pink-600 dark:text-pink-400',
  teal: 'text-teal-600 dark:text-teal-400',
  cyan: 'text-cyan-600 dark:text-cyan-400',
  orange: 'text-orange-600 dark:text-orange-400',
} as const

// Color map extracted outside component - calculated once
const COLOR_MAP: Record<string, string> = {
  'indigo-500': '#6366f1',
  'indigo-600': '#4f46e5',
  'purple-500': '#a855f7',
  'purple-600': '#9333ea',
  'blue-500': '#3b82f6',
  'blue-600': '#2563eb',
  'green-500': '#22c55e',
  'green-600': '#16a34a',
  'red-500': '#ef4444',
  'red-600': '#dc2626',
  'yellow-500': '#eab308',
  'yellow-600': '#ca8a04',
  'pink-500': '#ec4899',
  'pink-600': '#db2777',
  'rose-500': '#f43f5e',
  'rose-600': '#e11d48',
  'teal-500': '#14b8a6',
  'teal-600': '#0d9488',
  'cyan-500': '#06b6d4',
  'cyan-600': '#0891b2',
  'orange-500': '#f97316',
  'orange-600': '#ea580c',
}

// Opacity map extracted outside component
const OPACITY_MAP: Record<string, number> = {
  '/5': 0.05,
  '/10': 0.1,
}

type GradientColor = (typeof VALID_GRADIENT_COLORS)[number]
type DecorationColor = (typeof VALID_DECORATION_COLORS)[number]
type LinkColorKey = keyof typeof VALID_LINK_COLORS

export interface FeatureCardProps {
  /** Icon element (SVG or component) */
  icon: ReactNode
  /** Card title */
  title: string
  /** Card description */
  description: string
  /** Optional link text */
  linkText?: string
  /** Optional link click handler */
  onLinkClick?: () => void
  /** Icon background gradient colors (from-to format) */
  iconGradient?: {
    from: GradientColor
    to: GradientColor
  }
  /** Background decoration gradient colors */
  decorationGradient?: {
    from: DecorationColor
    to: DecorationColor
  }
  /** Link text color */
  linkColor?: LinkColorKey
}

// Helper to convert hex to rgba - extracted outside component
const hexToRgba = (hex: string, opacity: number): string => {
  if (!hex.startsWith('#')) return hex
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// Helper to get color value - extracted outside component
const getColorValue = (colorStr: string): string => {
  if (colorStr.includes('/')) {
    const [baseColor, opacityKey] = colorStr.split('/')
    const baseValue = COLOR_MAP[baseColor] || baseColor
    const opacity =
      OPACITY_MAP[`/${opacityKey}`] || parseFloat(`0.${opacityKey}`) || 1
    // Convert hex to rgba
    if (baseValue.startsWith('#')) {
      return hexToRgba(baseValue, opacity)
    }
    return baseValue
  }
  return COLOR_MAP[colorStr] || colorStr
}

// Cache for gradient styles to avoid recalculation
const gradientStyleCache = new Map<string, React.CSSProperties>()

// Helper to get Tailwind gradient classes or fallback to inline styles - optimized with caching
const getGradientStyle = (from: string, to: string): React.CSSProperties => {
  const cacheKey = `${from}-${to}`

  if (gradientStyleCache.has(cacheKey)) {
    return gradientStyleCache.get(cacheKey)!
  }

  const style: React.CSSProperties = {
    background: `linear-gradient(to bottom right, ${getColorValue(from)}, ${getColorValue(to)})`,
  }

  gradientStyleCache.set(cacheKey, style)
  return style
}

export function FeatureCard({
  icon,
  title,
  description,
  linkText = 'Learn more',
  onLinkClick,
  iconGradient = { from: 'indigo-500', to: 'purple-600' },
  decorationGradient = { from: 'indigo-500/5', to: 'purple-500/5' },
  linkColor = 'indigo',
}: FeatureCardProps) {
  const linkColorClass =
    VALID_LINK_COLORS[linkColor] || VALID_LINK_COLORS.indigo
  const cardRef = useRef<HTMLDivElement>(null)

  // Tilt effect using Motion springs
  // @see https://motion.dev/tutorials/react-tilt-card
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    // Max tilt of 8 degrees for subtle effect
    const maxTilt = 8
    rotateY.set((mouseX / (rect.width / 2)) * maxTilt)
    rotateX.set(-(mouseY / (rect.height / 2)) * maxTilt)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  // Memoize gradient styles to avoid recalculation on every render
  const iconGradientStyle = useMemo(
    () => getGradientStyle(iconGradient.from, iconGradient.to),
    [iconGradient.from, iconGradient.to],
  )

  const decorationGradientStyle = useMemo(
    () => getGradientStyle(decorationGradient.from, decorationGradient.to),
    [decorationGradient.from, decorationGradient.to],
  )

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
      }}
      className="relative p-8 lg:p-10 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden group"
    >
      {/* Decorative background */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"
        style={decorationGradientStyle}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-sm group-hover:scale-105 group-hover:rotate-3 transition-all duration-500"
          style={iconGradientStyle}
        >
          {icon}
        </div>

        {/* Title */}
        <h4 className="text-3xl lg:text-4xl text-gray-900 dark:text-white font-bold mb-4">
          {title}
        </h4>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          {description}
        </p>

        {/* Link */}
        {onLinkClick && (
          <button
            onClick={onLinkClick}
            className={`flex items-center ${linkColorClass} font-semibold group-hover:translate-x-2 transition-transform duration-300 cursor-pointer`}
          >
            <span>{linkText}</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default FeatureCard
