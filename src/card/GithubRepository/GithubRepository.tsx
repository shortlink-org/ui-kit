import * as React from 'react'
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketSquareIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

export interface GithubRepositoryProps {
  url: string
  title: string
  description?: string
  /** Accent color used for the left rail and ambient glow */
  accentColor?: string
  /** Secondary accent for gradients and hover treatment */
  hoverColor?: string
  /** Optional metadata pill, e.g. "Open source" or "Monorepo" */
  meta?: string
  /** CTA label shown on the right side */
  ctaText?: string
  /** Allow consumer to control width; when false we avoid width constraints */
  fullWidth?: boolean
  /** Additional className passthrough */
  className?: string
}

function getRepositoryPath(url: string): string {
  try {
    const parsed = new URL(url)
    return parsed.pathname || '/'
  } catch {
    return url.replace(/^.*\/\/[^/]+/, '') || url
  }
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'github.com'
  }
}

export function GithubRepository({
  url,
  title,
  description = 'Open the repository, inspect the codebase, and review the latest implementation details.',
  accentColor = '#2563eb',
  hoverColor = '#06b6d4',
  meta = 'Open source',
  ctaText = 'View repository',
  fullWidth = true,
  className,
}: GithubRepositoryProps) {
  const repositoryPath = getRepositoryPath(url)
  const hostname = getHostname(url)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit GitHub repository ${title}`}
      className={clsx(
        'group focus-ring relative flex overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.8)] transition-transform duration-300 hover:-translate-y-1 sm:p-6',
        fullWidth && 'w-full',
        className,
      )}
      style={
        {
          '--repo-accent': accentColor,
          '--repo-hover': hoverColor,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden="true"
      >
        <div
          className="absolute inset-y-0 left-0 w-1"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="absolute right-[-10%] top-[-20%] h-40 w-40 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125"
          style={{
            background: `radial-gradient(circle, ${hoverColor}33 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}55, transparent)`,
          }}
        />
      </div>

      <div className="relative flex min-w-0 flex-1 items-start gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] text-white shadow-[0_18px_45px_-24px_rgba(15,23,42,0.8)]"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${hoverColor})`,
          }}
        >
          <CodeBracketSquareIcon className="size-7" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--color-muted)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
              {meta}
            </span>
            <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
              {hostname}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-2xl">
            {title}
          </h3>

          <p
            className="mt-2 truncate text-sm font-medium text-[var(--color-muted-foreground)]"
            dir="ltr"
            title={repositoryPath}
          >
            {repositoryPath}
          </p>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted-foreground)] sm:text-base">
            {description}
          </p>
        </div>

        <div className="hidden shrink-0 items-center sm:flex">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: accentColor }}
          >
            {ctaText}
            <ArrowTopRightOnSquareIcon className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </a>
  )
}

export default GithubRepository
