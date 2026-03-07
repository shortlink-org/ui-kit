import * as React from 'react'
import { clsx } from 'clsx'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { Drawer } from '../../ui/Drawer/Drawer'
import type { DrawerPosition, DrawerSize } from '../../ui/Drawer/Drawer'

export interface ColumnSpan {
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
}

export interface ColumnWidth {
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}

export interface ColumnConfig {
  content: React.ReactNode
  id?: string
  span?: number | ColumnSpan
  width?: string | ColumnWidth
  className?: string
  surface?: 'card' | 'plain'
  sticky?: boolean
  stickyOffset?: string
}

export interface MobileDrawerConfig {
  columns: number[]
  title?: React.ReactNode
  triggerLabel?: string
  triggerAriaLabel?: string
  position?: DrawerPosition
  size?: DrawerSize
  triggerClassName?: string
  triggerWrapperClassName?: string
  panelClassName?: string
  contentClassName?: string
}

export interface MultiColumnLayoutProps {
  columns: ColumnConfig[]
  className?: string
  gap?: 'none' | 'sm' | 'md' | 'lg'
  minHeight?: string
  containerClassName?: string
  stackAt?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  dataTestId?: string
  mobileDrawer?: MobileDrawerConfig
}

const baseColumnClass = 'w-full h-full min-h-0 min-w-0 flex flex-col'

const defaultConfig = {
  gap: 'md' as const,
  minHeight: 'min-h-0',
  containerClassName:
    'bg-[color-mix(in_srgb,var(--color-surface)_92%,white)] dark:bg-[color-mix(in_srgb,var(--color-surface)_92%,black)]',
  stackAt: 'lg' as const,
}

const gapClasses: Record<'none' | 'sm' | 'md' | 'lg', string> = {
  none: 'gap-0',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
}

const shellPaddingClasses: Record<'none' | 'sm' | 'md' | 'lg', string> = {
  none: 'p-0',
  sm: 'p-3 sm:p-4',
  md: 'p-3 sm:p-4 lg:p-5',
  lg: 'p-4 sm:p-5 lg:p-6',
}

const breakpointMap: Record<'sm' | 'md' | 'lg' | 'xl' | '2xl', string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

const showAtBreakpointClasses: Record<
  'sm' | 'md' | 'lg' | 'xl' | '2xl',
  string
> = {
  sm: 'sm:flex',
  md: 'md:flex',
  lg: 'lg:flex',
  xl: 'xl:flex',
  '2xl': '2xl:flex',
}

const hideAtBreakpointClasses: Record<
  'sm' | 'md' | 'lg' | 'xl' | '2xl',
  string
> = {
  sm: 'sm:hidden',
  md: 'md:hidden',
  lg: 'lg:hidden',
  xl: 'xl:hidden',
  '2xl': '2xl:hidden',
}

export function MultiColumnLayout({
  columns,
  className = '',
  gap = defaultConfig.gap,
  minHeight = defaultConfig.minHeight,
  containerClassName = defaultConfig.containerClassName,
  stackAt = defaultConfig.stackAt,
  dataTestId,
  mobileDrawer,
}: MultiColumnLayoutProps) {
  const layoutId = React.useId().replace(/:/g, '-')
  const validColumns = columns.filter(
    (column) => column.content !== null && column.content !== undefined,
  )
  const columnCount = validColumns.length

  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false)

  const mobileDrawerColumnIndexes = (mobileDrawer?.columns ?? []).filter(
    (index) => index >= 0 && index < columnCount,
  )
  const mobileDrawerColumnSet = new Set(mobileDrawerColumnIndexes)
  const hasMobileDrawer = mobileDrawerColumnSet.size > 0
  const mobileDrawerPosition = mobileDrawer?.position ?? 'bottom'
  const mobileDrawerSize =
    mobileDrawer?.size ??
    (mobileDrawerPosition === 'bottom' ? 'full' : 'md')
  const mobileDrawerTriggerLabel = mobileDrawer?.triggerLabel ?? 'Open panels'
  const showAtBreakpointClass = showAtBreakpointClasses[stackAt]
  const hideAtBreakpointClass = hideAtBreakpointClasses[stackAt]

  const getSpanValue = React.useCallback(
    (
      span: number | ColumnSpan | undefined,
      breakpoint: keyof typeof breakpointMap,
    ): number => {
      if (!span) return 1
      if (typeof span === 'number') return span

      const breakpointOrder: (keyof typeof breakpointMap)[] = [
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
      ]
      const currentIndex = breakpointOrder.indexOf(breakpoint)

      for (let index = currentIndex; index >= 0; index -= 1) {
        const currentBreakpoint = breakpointOrder[index]
        if (span[currentBreakpoint] !== undefined) {
          return span[currentBreakpoint] as number
        }
      }

      return 1
    },
    [],
  )

  const isResponsiveSpan = (
    span: number | ColumnSpan | undefined,
  ): span is ColumnSpan => typeof span === 'object' && span !== null

  const getWidthValue = React.useCallback(
    (
      width: string | ColumnWidth | undefined,
      breakpoint: keyof typeof breakpointMap,
    ): string | undefined => {
      if (!width) return undefined
      if (typeof width === 'string') return width

      const breakpointOrder: (keyof typeof breakpointMap)[] = [
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
      ]
      const currentIndex = breakpointOrder.indexOf(breakpoint)

      for (let index = currentIndex; index >= 0; index -= 1) {
        const currentBreakpoint = breakpointOrder[index]
        if (width[currentBreakpoint] !== undefined) {
          return width[currentBreakpoint]
        }
      }

      return undefined
    },
    [],
  )

  const hasResponsiveSpans = validColumns.some((column) =>
    isResponsiveSpan(column.span),
  )

  const breakpoint = breakpointMap[stackAt]

  const generateGridTemplate = React.useCallback(
    (bp: keyof typeof breakpointMap): string => {
      const hasExplicitWidths = validColumns.some(
        (column) => getWidthValue(column.width, bp) !== undefined,
      )
      const hasSpanColumns = validColumns.some(
        (column) => getSpanValue(column.span, bp) > 1,
      )

      return validColumns
        .map((column, index) => {
          const explicitWidth = getWidthValue(column.width, bp)

          if (explicitWidth) {
            return explicitWidth
          }

          if (hasSpanColumns) {
            return `minmax(0, ${getSpanValue(column.span, bp)}fr)`
          }

          if (hasExplicitWidths) {
            return 'minmax(0, 1fr)'
          }

          return index === validColumns.length - 1 ? 'minmax(0, 1fr)' : 'auto'
        })
        .join(' ')
    },
    [getSpanValue, getWidthValue, validColumns],
  )

  const generateResponsiveStyles = React.useCallback((): string => {
    if (!hasResponsiveSpans) {
      const gridTemplateColumns = generateGridTemplate(stackAt)
      return `
        @media (min-width: ${breakpoint}) {
          [data-layout-id="${layoutId}"] {
            grid-template-columns: ${gridTemplateColumns};
          }
        }
      `
    }

    const styles: string[] = []
    const breakpointOrder: (keyof typeof breakpointMap)[] = [
      'sm',
      'md',
      'lg',
      'xl',
      '2xl',
    ]

    breakpointOrder.forEach((bp) => {
      styles.push(`
        @media (min-width: ${breakpointMap[bp]}) {
          [data-layout-id="${layoutId}"] {
            grid-template-columns: ${generateGridTemplate(bp)};
          }
        }
      `)
    })

    return styles.join('\n')
  }, [
    breakpoint,
    generateGridTemplate,
    hasResponsiveSpans,
    layoutId,
    stackAt,
  ])

  const responsiveStyles = React.useMemo(
    () => generateResponsiveStyles(),
    [generateResponsiveStyles],
  )

  if (columnCount === 0) {
    return null
  }

  return (
    <div
      className={clsx(
        'relative flex w-full max-w-none min-h-0 flex-1 flex-col',
        className,
      )}
      data-testid={dataTestId}
    >
      <style>{responsiveStyles}</style>

      {hasMobileDrawer ? (
        <div
          className={clsx(
            'mb-4 flex items-center justify-stretch px-1 sm:justify-end sm:px-0',
            hideAtBreakpointClass,
            mobileDrawer?.triggerWrapperClassName,
          )}
        >
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label={
              mobileDrawer?.triggerAriaLabel ?? mobileDrawerTriggerLabel
            }
            className={clsx(
              'focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-medium text-[var(--color-foreground)] shadow-[0_20px_48px_-34px_rgba(15,23,42,0.42)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-muted)] sm:w-auto',
              mobileDrawer?.triggerClassName,
            )}
          >
            <Bars3BottomLeftIcon className="size-4" aria-hidden="true" />
            {mobileDrawerTriggerLabel}
          </button>
        </div>
      ) : null}

      <div
        className={clsx(
          'relative flex min-h-0 w-full max-w-none flex-1 flex-col overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] shadow-[0_30px_90px_-58px_rgba(15,23,42,0.48)] sm:rounded-[2rem]',
          containerClassName,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.1),transparent_26%)]"
          aria-hidden="true"
        />

        <div
          data-layout-id={layoutId}
          className={clsx(
            'relative grid min-h-0 w-full max-w-none flex-1 grid-cols-1 items-start transition-[grid-template-columns] duration-300 ease-out',
            gapClasses[gap],
            shellPaddingClasses[gap],
            minHeight,
            'h-full w-full',
          )}
        >
          {validColumns.map((column, index) => {
            const isSticky = column.sticky === true
            const stickyOffset = column.stickyOffset || '0'
            const isMobileDrawerColumn = mobileDrawerColumnSet.has(index)
            const seamlessMode = gap === 'none'
            const plainSurface = column.surface === 'plain'

            const columnClasses = clsx(
              baseColumnClass,
              isSticky && 'sticky self-start',
              isMobileDrawerColumn && 'hidden',
              isMobileDrawerColumn && showAtBreakpointClass,
            )

            const columnStyles: React.CSSProperties = {
              ...(isSticky && { top: stickyOffset }),
            }

            return (
              <div
                key={column.id ?? index}
                className={columnClasses}
                style={columnStyles}
              >
                <div
                  className={clsx(
                    'relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden',
                    seamlessMode || plainSurface
                      ? 'bg-transparent'
                      : 'rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_24px_60px_-44px_rgba(15,23,42,0.38)]',
                    column.className,
                  )}
                >
                  {column.content}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {hasMobileDrawer ? (
        <Drawer
          open={mobileDrawerOpen}
          onClose={setMobileDrawerOpen}
          position={mobileDrawerPosition}
          size={mobileDrawerSize}
          title={mobileDrawer?.title}
          panelClassName={clsx(
            mobileDrawerPosition === 'bottom' &&
              'rounded-t-[1.75rem] border-t border-[var(--color-border)]',
            mobileDrawer?.panelClassName,
          )}
          contentClassName={clsx('space-y-4 pb-6', mobileDrawer?.contentClassName)}
        >
          {validColumns
            .filter((_, index) => mobileDrawerColumnSet.has(index))
            .map((column, index) => (
              <div
                key={column.id ?? index}
                className="overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_24px_60px_-42px_rgba(15,23,42,0.32)]"
              >
                <div className={clsx('h-full min-h-0', column.className)}>
                  {column.content}
                </div>
              </div>
            ))}
        </Drawer>
      ) : null}
    </div>
  )
}

export default MultiColumnLayout
