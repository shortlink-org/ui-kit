import * as React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Balancer from 'react-wrap-balancer'
import clsx from 'clsx'
import { CheckIcon } from '@heroicons/react/24/outline'
import { Button } from '../../ui/Button/Button'
import PricingToggle from './PricingToggle'

type LegacyButtonVariant = 'text' | 'outlined' | 'contained'

type Tier = {
  title: string
  subheader: string
  /** Monthly price in the base currency */
  monthlyPrice?: number
  /** Yearly price in the base currency (if not provided, calculated as monthlyPrice * 12 * 0.8) */
  yearlyPrice?: number
  /** Currency code (default: 'USD') */
  currency?: string
  /** Badge text to display (e.g., 'Most Popular') */
  badge?: string
  /** Whether this tier is featured (affects styling) */
  isFeatured?: boolean
  /** Custom background color for featured badge */
  labelColor?: string
  description: string[]
  /** Legacy custom CTA button props */
  ctaButton?: {
    children?: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: LegacyButtonVariant
  }
  /** @deprecated Use monthlyPrice instead */
  price?: number
  buttonVariant?: LegacyButtonVariant
  buttonText?: string
  /** Optional CTA URL for link-based actions */
  ctaUrl?: string
}

export type TiersProps = {
  tiers: Tier[]
}

function formatPrice(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US',
): { formatted: string; currencySymbol: string } {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  const parts = formatter.formatToParts(amount)
  const currencySymbol =
    parts.find((part) => part.type === 'currency')?.value || '$'
  const formatted = parts
    .filter((part) => part.type !== 'currency')
    .map((part) => part.value)
    .join('')

  return { formatted, currencySymbol }
}

function mapLegacyVariant(
  variant?: LegacyButtonVariant,
): 'primary' | 'outline' | 'ghost' {
  if (variant === 'outlined') {
    return 'outline'
  }

  if (variant === 'text') {
    return 'ghost'
  }

  return 'primary'
}

function PriceValue({
  value,
  currencySymbol,
  period,
  metaClassName,
}: {
  value: string
  currencySymbol: string
  period: string
  metaClassName?: string
}) {
  return (
    <div className="flex items-end gap-1">
      <span className={clsx('pb-2 text-lg font-semibold', metaClassName)}>
        {currencySymbol}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${currencySymbol}-${value}-${period}`}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
          transition={{ duration: 0.24 }}
          className="text-5xl font-semibold tracking-tight text-[var(--color-foreground)]"
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <span className={clsx('pb-2 text-sm font-medium', metaClassName)}>
        {period}
      </span>
    </div>
  )
}

function TierCard({
  tier,
  isAnnual,
  index,
}: {
  tier: Tier
  isAnnual: boolean
  index: number
}) {
  const monthlyPrice = tier.monthlyPrice ?? tier.price ?? 0
  const yearlyPrice = tier.yearlyPrice ?? monthlyPrice * 12 * 0.8
  const displayPrice = isAnnual ? yearlyPrice : monthlyPrice
  const pricePeriod = isAnnual ? '/year' : '/mo'
  const currency = tier.currency ?? 'USD'
  const { formatted, currencySymbol } = formatPrice(displayPrice, currency)
  const isFeatured = tier.isFeatured ?? false
  const badgeText = tier.badge
  const labelColor = tier.labelColor ?? '#0f172a'
  const defaultButtonVariant = mapLegacyVariant(
    tier.buttonVariant ?? tier.ctaButton?.variant,
  )
  const buttonText =
    tier.buttonText ??
    (typeof tier.ctaButton?.children === 'string'
      ? tier.ctaButton.children
      : 'Get started')

  const cta = (
    <Button
      variant={isFeatured ? 'primary' : defaultButtonVariant}
      size="lg"
      className={clsx(
        'w-full justify-center rounded-[1rem]',
        isFeatured &&
          '!bg-slate-950 hover:!bg-slate-800 dark:!bg-white dark:!text-slate-950 dark:hover:!bg-slate-100',
      )}
      disabled={tier.ctaButton?.disabled}
      onClick={tier.ctaButton?.onClick}
      as={tier.ctaUrl ? 'a' : undefined}
      asProps={tier.ctaUrl ? { href: tier.ctaUrl } : undefined}
    >
      {buttonText}
    </Button>
  )

  const secondaryTextClassName = isFeatured
    ? 'text-slate-700 dark:text-slate-300'
    : 'text-[var(--color-muted-foreground)]'
  const sectionLabelClassName = isFeatured
    ? 'text-slate-600 dark:text-slate-400'
    : 'text-[var(--color-muted-foreground)]'

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={clsx(
        'group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-6 shadow-[0_26px_70px_-42px_rgba(15,23,42,0.45)] backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 sm:p-7',
        isFeatured
          ? 'border-sky-300/70 bg-[color-mix(in_srgb,var(--color-surface)_88%,rgb(14_165_233)_12%)] hover:border-sky-400/80 hover:shadow-[0_34px_90px_-46px_rgba(14,165,233,0.42)]'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-sky-200/70 hover:bg-[color-mix(in_srgb,var(--color-surface)_93%,rgb(14_165_233)_7%)] hover:shadow-[0_34px_90px_-50px_rgba(15,23,42,0.42)]',
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      >
        <div
          className={clsx(
            'absolute right-[-18%] top-[-12%] h-40 w-40 rounded-full blur-3xl transition-all duration-300 group-hover:scale-110',
            isFeatured
              ? 'bg-sky-400/20 group-hover:bg-sky-400/28'
              : 'bg-slate-300/10 group-hover:bg-sky-300/14 dark:bg-white/5 dark:group-hover:bg-sky-400/10',
          )}
        />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-[var(--color-foreground)]">
              {tier.title}
            </p>
            <p className={clsx('mt-2 text-sm leading-6', secondaryTextClassName)}>
              <Balancer>{tier.subheader}</Balancer>
            </p>
          </div>

          {badgeText ? (
            <span
              className="shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm"
              style={{ backgroundColor: labelColor }}
            >
              {badgeText}
            </span>
          ) : null}
        </div>

        <div className="mt-8 rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-background)]/70 p-4 transition-[border-color,background-color,transform] duration-300 group-hover:border-sky-200/70 group-hover:bg-[var(--color-background)]/90">
          <PriceValue
            value={formatted}
            currencySymbol={currencySymbol}
            period={pricePeriod}
            metaClassName={secondaryTextClassName}
          />
          {isAnnual ? (
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-300">
              Billed annually
            </p>
          ) : (
            <p
              className={clsx(
                'mt-2 text-xs font-medium uppercase tracking-[0.16em]',
                sectionLabelClassName,
              )}
            >
              Month to month
            </p>
          )}
        </div>

        <div className="mt-6">{cta}</div>

        <div className="mt-6 border-t border-[var(--color-border)] pt-6 transition-colors duration-300 group-hover:border-sky-200/70">
          <p
            className={clsx(
              'text-xs font-semibold uppercase tracking-[0.18em]',
              sectionLabelClassName,
            )}
          >
            Includes
          </p>
          <ul className={clsx('mt-4 space-y-3 text-sm', secondaryTextClassName)}>
            {tier.description.map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 rounded-[0.95rem] px-2 py-1.5 transition-colors duration-200 group-hover:hover:bg-[var(--color-background)]/80"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 transition-transform duration-200 group-hover:scale-105 dark:text-emerald-300">
                  <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="leading-6">
                  <Balancer>{line}</Balancer>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  )
}

export const PriceTable: React.FC<TiersProps> = ({ tiers }) => {
  const [isAnnual, setIsAnnual] = React.useState<boolean>(true)

  return (
    <section className="relative overflow-hidden bg-[var(--color-background)] py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden="true"
      >
        <div className="absolute left-[-10%] top-[-12%] h-72 w-72 rounded-full bg-sky-400/14 blur-3xl" />
        <div className="absolute right-[-8%] top-[6%] h-72 w-72 rounded-full bg-amber-300/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-[var(--color-muted-foreground)]">
            Pricing
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
            Pick the plan that matches your launch stage
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-[var(--color-muted-foreground)]">
            Cleaner tier comparison with billing animation, stronger feature
            hierarchy, and a clearer featured-plan treatment.
          </p>
        </div>

        <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />

        <div className="mx-auto grid max-w-sm gap-6 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <TierCard
              key={tier.title}
              tier={tier}
              isAnnual={isAnnual}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PriceTable
