import React, { ReactNode, useId, useMemo } from 'react'
import styles from './ElectricBorderCard.module.css'
import { hexToRgb, lightenColor } from '../../utils/colorUtils'

export interface ElectricBorderCardProps {
  /** Badge text displayed at the top */
  badge?: string
  /** Card title */
  title: string
  /** Card description */
  description: string
  /** Optional children content */
  children?: ReactNode
  /** Border color in hex format (e.g., #dd8448) */
  borderColor?: string
  /** Card width (default: '20rem', can be any CSS value like '100%', '350px', etc.) */
  width?: string
  /** Card height (default: '31.25rem', can be any CSS value like '100%', '500px', etc.) */
  height?: string
  /** Additional CSS class name */
  className?: string
  /** Additional inline styles */
  style?: React.CSSProperties
}

export function ElectricBorderCard({
  badge = 'Dramatic',
  title,
  description,
  children,
  borderColor = '#dd8448',
  width = '20rem',
  height = '31.25rem',
  className,
  style,
}: ElectricBorderCardProps) {
  // Generate unique ID for SVG filter to avoid conflicts with multiple instances
  const filterId = useId()

  // Memoize color calculations to avoid recalculating on every render
  const colorCalculations = useMemo(() => {
    const rgb = hexToRgb(borderColor)
    const borderColorRgb = `${rgb.r}, ${rgb.g}, ${rgb.b}`
    const lightRgb = lightenColor(rgb.r, rgb.g, rgb.b)
    const lightColor = `rgb(${lightRgb.r}, ${lightRgb.g}, ${lightRgb.b})`
    const gradientColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`

    return {
      borderColorRgb,
      lightColor,
      gradientColor,
    }
  }, [borderColor])

  return (
    <div className={`${styles.mainContainer} ${className || ''}`} style={style}>
      <svg className={styles.svgContainer}>
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise1"
              seed={1}
            />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate
                attributeName="dy"
                values="700; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise2"
              seed={1}
            />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate
                attributeName="dy"
                values="0; -700"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise1"
              seed={2}
            />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate
                attributeName="dx"
                values="490; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise2"
              seed={2}
            />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate
                attributeName="dx"
                values="0; -490"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend
              in="part1"
              in2="part2"
              mode="color-dodge"
              result="combinedNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>
      <div
        className={styles.cardContainer}
        data-height-mode={height === 'auto' ? 'auto' : 'fixed'}
        style={
          {
            '--electric-border-color': borderColor,
            '--electric-border-rgb': colorCalculations.borderColorRgb,
            '--electric-light-color': colorCalculations.lightColor,
            '--gradient-color': colorCalculations.gradientColor,
            '--card-width': width,
            '--card-height': height,
            '--card-min-height': height === 'auto' ? '31.25rem' : height,
            ...style,
          } as React.CSSProperties
        }
      >
        <div className={styles.innerContainer}>
          <div className={styles.borderOuter}>
            <div
              className={styles.mainCard}
              style={{ filter: `url(#${filterId})` }}
            ></div>
          </div>
          <div className={styles.glowLayer1}></div>
          <div className={styles.glowLayer2}></div>
        </div>
        <div className={styles.overlay1}></div>
        <div className={styles.overlay2}></div>
        <div className={styles.backgroundGlow}></div>
        <div className={styles.contentContainer}>
          <div className={styles.contentTop}>
            {badge && <div className={styles.scrollbarGlass}>{badge}</div>}
            <p className={styles.title}>{title}</p>
          </div>
          <hr className={styles.divider} />
          <div className={styles.contentBottom}>
            <p className={styles.description}>{description}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ElectricBorderCard
