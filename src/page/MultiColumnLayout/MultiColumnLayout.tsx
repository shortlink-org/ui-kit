import React, { ReactNode } from 'react'
import { clsx } from 'clsx'

export interface ColumnSpan {
  /** Span for small screens (640px+) */
  sm?: number
  /** Span for medium screens (768px+) */
  md?: number
  /** Span for large screens (1024px+) */
  lg?: number
  /** Span for extra large screens (1280px+) */
  xl?: number
  /** Span for 2xl screens (1536px+) */
  '2xl'?: number
}

export interface ColumnConfig {
  /** Content to render in the column */
  content: ReactNode
  /** Optional stable id for React keys */
  id?: string
  /** Number of grid columns this column should span (default: 1) - legacy, use span object for responsive */
  span?: number | ColumnSpan
  /** Additional CSS classes for the column */
  className?: string
  /** Whether the column should be sticky when scrolling */
  sticky?: boolean
  /** Sticky offset from top (default: 0) */
  stickyOffset?: string
}

export interface MultiColumnLayoutProps {
  /** Array of column configurations */
  columns: ColumnConfig[]
  /** Optional className for the container */
  className?: string
  /** Gap between columns */
  gap?: 'none' | 'sm' | 'md' | 'lg'
  /** Minimum height of the layout container */
  minHeight?: string
  /** Background color classes for the container */
  containerClassName?: string
  /** Breakpoint at which columns stack vertically (default: 'lg') */
  stackAt?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Test ID for E2E/integration testing */
  dataTestId?: string
}

// Helper for base column classes
const baseColumnClass =
  'transition-colors duration-500 w-full h-full min-h-0 flex flex-col'

// Default configuration
const defaultConfig = {
  gap: 'md' as const,
  minHeight: 'min-h-screen',
  containerClassName: 'bg-white dark:bg-gray-900',
  stackAt: 'lg' as const,
}

// Gap classes mapping
const gapClasses: Record<'none' | 'sm' | 'md' | 'lg', string> = {
  none: 'gap-0',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
}

// Breakpoint mapping for media queries
const breakpointMap: Record<'sm' | 'md' | 'lg' | 'xl' | '2xl', string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export function MultiColumnLayout({
  columns,
  className = '',
  gap = defaultConfig.gap,
  minHeight = defaultConfig.minHeight,
  containerClassName = defaultConfig.containerClassName,
  stackAt = defaultConfig.stackAt,
  dataTestId,
}: MultiColumnLayoutProps) {
  // Generate unique ID for this layout instance to scope styles (must be called before any conditional returns)
  const layoutId = React.useId().replace(/:/g, '-')

  // Filter out empty columns
  const validColumns = columns.filter(
    (col) => col.content !== null && col.content !== undefined,
  )
  const columnCount = validColumns.length

  // Helper to get span value (supports number or ColumnSpan object)
  const getSpanValue = React.useCallback(
    (
      span: number | ColumnSpan | undefined,
      breakpoint: keyof typeof breakpointMap,
    ): number => {
      if (!span) return 1
      if (typeof span === 'number') return span
      // For responsive spans, get the value for current breakpoint or fallback to smaller breakpoint
      const breakpointOrder: (keyof typeof breakpointMap)[] = [
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
      ]
      const currentIndex = breakpointOrder.indexOf(breakpoint)
      for (let i = currentIndex; i >= 0; i--) {
        const bp = breakpointOrder[i]
        if (span[bp] !== undefined) {
          return span[bp]!
        }
      }
      return 1
    },
    [],
  )

  // Helper to check if span is responsive object
  const isResponsiveSpan = (
    span: number | ColumnSpan | undefined,
  ): span is ColumnSpan => {
    return typeof span === 'object' && span !== null && !Array.isArray(span)
  }

  // Check if any column uses responsive spans
  const hasResponsiveSpans = validColumns.some((col) =>
    isResponsiveSpan(col.span),
  )

  const breakpoint = breakpointMap[stackAt]

  // Generate grid template columns for each breakpoint if responsive spans are used
  const generateGridTemplate = React.useCallback(
    (bp: keyof typeof breakpointMap): string => {
      // Check if any column has explicit span > 1 at this breakpoint
      const hasSpanColumns = validColumns.some((col) => {
        const span = getSpanValue(col.span, bp)
        return span > 1
      })

      if (hasSpanColumns) {
        // Use proportional sizing based on spans (including last column)
        return validColumns
          .map((col) => `${getSpanValue(col.span, bp)}fr`)
          .join(' ')
      } else {
        // Use auto-sizing: auto for menus, 1fr for last column (content)
        return validColumns
          .map((_, idx) => {
            // Last column always takes remaining space with 1fr
            if (idx === validColumns.length - 1) {
              return '1fr'
            }
            // Other columns use auto (for menus with max-width)
            return 'auto'
          })
          .join(' ')
      }
    },
    [validColumns, getSpanValue],
  )

  // Generate CSS for responsive grid template columns
  const generateResponsiveStyles = React.useCallback((): string => {
    if (!hasResponsiveSpans) {
      // Simple case: generate only for stackAt breakpoint
      const gridTemplateColumns = generateGridTemplate(stackAt)
      return `
        @media (min-width: ${breakpoint}) {
          [data-layout-id="${layoutId}"] {
            grid-template-columns: ${gridTemplateColumns};
          }
        }
      `
    }

    // Complex case: generate for each breakpoint
    const styles: string[] = []
    const breakpointOrder: (keyof typeof breakpointMap)[] = [
      'sm',
      'md',
      'lg',
      'xl',
      '2xl',
    ]

    breakpointOrder.forEach((bp) => {
      const bpValue = breakpointMap[bp]
      const gridTemplateColumns = generateGridTemplate(bp)
      styles.push(`
        @media (min-width: ${bpValue}) {
          [data-layout-id="${layoutId}"] {
            grid-template-columns: ${gridTemplateColumns};
          }
        }
      `)
    })

    return styles.join('\n')
  }, [hasResponsiveSpans, stackAt, layoutId, breakpoint, generateGridTemplate])

  // Memoize styles to avoid remounting style tags on every render
  const responsiveStyles = React.useMemo(
    () => generateResponsiveStyles(),
    [generateResponsiveStyles],
  )

  if (columnCount === 0) {
    return null
  }

  return (
    <div className={clsx('w-full h-full', className)} data-testid={dataTestId}>
      <style>{responsiveStyles}</style>
      <div
        data-layout-id={layoutId}
        className={clsx(
          'grid',
          'grid-cols-1',
          gapClasses[gap],
          minHeight,
          'w-full',
          containerClassName,
        )}
      >
        {validColumns.map((column, index) => {
          const isSticky = column.sticky === true
          const stickyOffset = column.stickyOffset || '0'

          // Build column classes
          const columnClasses = clsx(
            baseColumnClass,
            column.className,
            isSticky && 'sticky self-start',
          )

          // Generate column ID for CSS targeting
          const columnId = `col-${layoutId}-${index}`

          // Build inline styles for sticky
          const columnStyles: React.CSSProperties = {
            ...(isSticky && { top: stickyOffset }),
          }

          return (
            <div
              key={column.id ?? index}
              data-column-id={columnId}
              className={columnClasses}
              style={columnStyles}
            >
              {column.content}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MultiColumnLayout
