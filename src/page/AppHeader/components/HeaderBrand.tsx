import { type ReactNode } from 'react'
import {
  AppHeaderBrand,
  AppHeaderStatusBadge,
  LinkComponent,
} from '../types'
import { classNames } from '../utils'

interface HeaderBrandProps {
  brand: AppHeaderBrand
  LinkComponent?: LinkComponent
  hasNavigation?: boolean
  workspaceLabel?: string
  statusBadge?: AppHeaderStatusBadge
}

const statusToneClassMap: Record<
  NonNullable<AppHeaderStatusBadge['tone']>,
  string
> = {
  neutral:
    'border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-muted-foreground)]',
  accent:
    'border-sky-200/70 bg-sky-500/10 text-sky-700 dark:border-sky-400/20 dark:text-sky-200',
  success:
    'border-emerald-200/70 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/20 dark:text-emerald-200',
  warning:
    'border-amber-200/70 bg-amber-500/10 text-amber-700 dark:border-amber-400/20 dark:text-amber-200',
}

export function HeaderBrand({
  brand,
  LinkComponent,
  hasNavigation = false,
  workspaceLabel,
  statusBadge,
}: HeaderBrandProps) {
  const brandClassName =
    'group flex min-w-0 items-center gap-3 transition-all duration-200'
  const brandContent = (
    <>
      <div className="shrink-0">{brand.logo}</div>
      <div className="min-w-0">
        {workspaceLabel ? (
          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            {workspaceLabel}
          </p>
        ) : null}
        <div className="mt-0.5 flex min-w-0 items-center gap-2">
          <h1 className="truncate text-base font-semibold tracking-tight text-[var(--color-foreground)] transition-all duration-200 sm:text-lg">
            {brand.name}
          </h1>
          {statusBadge ? (
            <span
              className={classNames(
                'hidden rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] sm:inline-flex',
                statusToneClassMap[statusBadge.tone ?? 'neutral'],
              )}
            >
              {statusBadge.label}
            </span>
          ) : null}
        </div>
      </div>
    </>
  )

  const renderLink = (
    href: string,
    children: ReactNode | string,
    linkClassName?: string,
  ) => {
    if (LinkComponent) {
      return (
        <LinkComponent href={href} className={linkClassName}>
          {children}
        </LinkComponent>
      )
    }
    return (
      <a href={href} className={linkClassName}>
        {children}
      </a>
    )
  }

  if (brand.render && brand.href) {
    return brand.render({
      href: brand.href,
      children: brandContent,
      className: brandClassName,
    })
  }

  if (brand.href) {
    return renderLink(brand.href, brandContent, brandClassName)
  }

  return (
    <div
      className={classNames(brandClassName, hasNavigation && 'ml-10 sm:ml-0')}
    >
      {brandContent}
    </div>
  )
}
