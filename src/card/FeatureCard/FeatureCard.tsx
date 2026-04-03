'use client'

import * as React from 'react'
import { clsx } from 'clsx'
import {
  ArrowRightIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'

const _VALID_GRADIENT_COLORS = [
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

const _VALID_DECORATION_COLORS = [
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

const OPACITY_MAP: Record<string, number> = {
  '/5': 0.05,
  '/10': 0.1,
}

type GradientColor = (typeof _VALID_GRADIENT_COLORS)[number]
type DecorationColor = (typeof _VALID_DECORATION_COLORS)[number]
type LinkColorKey = keyof typeof VALID_LINK_COLORS

export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  linkText?: string
  onLinkClick?: () => void
  href?: string
  eyebrow?: string
  metric?: string
  className?: string
  iconGradient?: {
    from: GradientColor
    to: GradientColor
  }
  decorationGradient?: {
    from: DecorationColor
    to: DecorationColor
  }
  linkColor?: LinkColorKey
}

const gradientStyleCache = new Map<string, React.CSSProperties>()

function hexToRgba(hex: string, opacity: number): string {
  if (!hex.startsWith('#')) {
    return hex
  }

  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

function getColorValue(colorStr: string): string {
  if (colorStr.includes('/')) {
    const [baseColor, opacityKey] = colorStr.split('/')
    const baseValue = COLOR_MAP[baseColor] || baseColor
    const opacity =
      OPACITY_MAP[`/${opacityKey}`] || parseFloat(`0.${opacityKey}`) || 1

    if (baseValue.startsWith('#')) {
      return hexToRgba(baseValue, opacity)
    }

    return baseValue
  }

  return COLOR_MAP[colorStr] || colorStr
}

function getGradientStyle(from: string, to: string): React.CSSProperties {
  const cacheKey = `${from}-${to}`
  const cachedStyle = gradientStyleCache.get(cacheKey)

  if (cachedStyle) {
    return cachedStyle
  }

  const style: React.CSSProperties = {
    background: `linear-gradient(135deg, ${getColorValue(from)}, ${getColorValue(to)})`,
  }

  gradientStyleCache.set(cacheKey, style)
  return style
}

function FeatureCardCTA({
  href,
  linkText,
  linkColorClass,
  onLinkClick,
}: {
  href?: string
  linkText: string
  linkColorClass: string
  onLinkClick?: () => void
}) {
  const sharedClassName = clsx(
    'focus-ring inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-transform duration-300 hover:translate-x-1',
    linkColorClass,
  )

  const content = (
    <>
      <span>{linkText}</span>
      <ArrowRightIcon className="size-4" aria-hidden="true" />
    </>
  )

  if (href) {
    return (
      <a href={href} className={sharedClassName}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onLinkClick} className={sharedClassName}>
      {content}
    </button>
  )
}

export function FeatureCard({
  icon,
  title,
  description,
  linkText = 'Learn more',
  onLinkClick,
  href,
  eyebrow = 'Feature',
  metric,
  className,
  iconGradient = { from: 'indigo-500', to: 'blue-600' },
  decorationGradient = { from: 'indigo-500/10', to: 'cyan-500/5' },
  linkColor = 'indigo',
}: FeatureCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 })
  const iconGradientStyle = getGradientStyle(iconGradient.from, iconGradient.to)
  const decorationGradientStyle = getGradientStyle(
    decorationGradient.from,
    decorationGradient.to,
  )
  const linkColorClass =
    VALID_LINK_COLORS[linkColor] || VALID_LINK_COLORS.indigo
  const hasCTA = Boolean(href || onLinkClick)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) {
      return
    }

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = event.clientX - centerX
    const mouseY = event.clientY - centerY
    const maxTilt = 3

    rotateY.set((mouseX / (rect.width / 2)) * maxTilt)
    rotateX.set(-(mouseY / (rect.height / 2)) * maxTilt)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReducedMotion
          ? undefined
          : {
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformPerspective: 1000,
            }
      }
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.35 }}
      className={clsx(
        'group relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.8)] sm:p-8',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden="true"
      >
        <div
          className="absolute right-[-15%] top-[-18%] h-48 w-48 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125"
          style={decorationGradientStyle}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/70 to-transparent dark:via-white/15" />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div
            className="inline-flex h-16 w-16 items-center justify-center rounded-[1.35rem] text-white shadow-[0_20px_45px_-24px_rgba(15,23,42,0.85)] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
            style={iconGradientStyle}
          >
            {icon}
          </div>

          {metric ? (
            <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
              {metric}
            </div>
          ) : null}
        </div>

        <div className="mt-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-muted)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
            <SparklesIcon className="size-3.5" aria-hidden="true" />
            {eyebrow}
          </div>

          <h4 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-3xl">
            {title}
          </h4>

          <p className="mt-4 text-base leading-7 text-[var(--color-muted-foreground)]">
            {description}
          </p>
        </div>

        {hasCTA ? (
          <div className="mt-6 pt-2">
            <FeatureCardCTA
              href={href}
              linkText={linkText}
              linkColorClass={linkColorClass}
              onLinkClick={onLinkClick}
            />
          </div>
        ) : null}
      </div>
    </motion.article>
  )
}

export default FeatureCard
