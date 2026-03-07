import * as React from 'react'
import Balancer from 'react-wrap-balancer'
import clsx from 'clsx'
import { Button } from '../../ui/Button/Button'

export interface HeaderAction {
  label: string
  handler: () => void
  variant?: 'primary' | 'secondary'
  customNode?: React.ReactNode
}

export interface HeaderStat {
  label: string
  value: React.ReactNode
}

export interface HeaderProps {
  title: string
  primaryAction?: HeaderAction
  secondaryAction?: HeaderAction
  eyebrow?: string
  description?: React.ReactNode
  stats?: HeaderStat[]
  className?: string
}

export function Header({
  title,
  primaryAction,
  secondaryAction,
  eyebrow,
  description,
  stats = [],
  className,
}: HeaderProps) {
  const renderAction = (action: HeaderAction | undefined, isPrimary: boolean) => {
    if (!action) return null

    if (action.customNode) {
      return action.customNode
    }

    return (
      <Button
        variant={action.variant === 'primary' || isPrimary ? 'primary' : 'outline'}
        size="md"
        onClick={action.handler}
        className={clsx(
          'rounded-full px-4',
          !(action.variant === 'primary' || isPrimary) &&
            'border-[var(--color-border)] bg-[var(--color-surface)]',
        )}
      >
        {action.label}
      </Button>
    )
  }

  const hasActions = primaryAction || secondaryAction
  const hasSupportContent = Boolean(eyebrow || description || stats.length > 0)

  return (
    <section
      className={clsx(
        'relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_94%,white)] p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.45)] sm:p-8',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_30%)]"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
            <Balancer>{title}</Balancer>
          </h1>

          {description ? (
            <div className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted-foreground)] sm:text-base">
              {description}
            </div>
          ) : null}

          {stats.length > 0 ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-background)]/70 px-4 py-3 backdrop-blur-sm"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--color-foreground)]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {hasActions ? (
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:justify-end">
            {renderAction(secondaryAction, false)}
            {renderAction(primaryAction, true)}
          </div>
        ) : null}
      </div>

      {!hasSupportContent && !hasActions ? (
        <div className="relative mt-4 h-px bg-[var(--color-border)]/80" />
      ) : null}
    </section>
  )
}

export default Header
