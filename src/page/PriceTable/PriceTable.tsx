import * as React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Balancer from 'react-wrap-balancer'
import clsx from 'clsx'
import { CheckIcon } from '@heroicons/react/24/outline'
import { Button } from '../../ui/Button/Button'
import PricingToggle from './PricingToggle'

export type PriceTierFeature = {
  id: string
  text: string
}

export type PriceTier = {
  /** Stable id for list keys and analytics */
  id: string
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
  features: PriceTierFeature[]
  buttonText?: string
  /** Optional CTA URL for link-based actions */
  ctaUrl?: string
  onCtaClick?: () => void
  ctaDisabled?: boolean
}

export type PriceTableProps = {
  tiers: PriceTier[]
  /** Small label above the section heading */
  eyebrow?: string
  /** Section heading (h2) */
  heading?: string
  /** Lead paragraph under the heading */
  lead?: string
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
  tier: PriceTier
  isAnnual: boolean
  index: number
}) {
  const monthlyPrice = tier.monthlyPrice ?? 0
  const yearlyPrice = tier.yearlyPrice ?? monthlyPrice * 12 * 0.8
  const displayPrice = isAnnual ? yearlyPrice : monthlyPrice
  const pricePeriod = isAnnual ? '/year' : '/mo'
  const currency = tier.currency ?? 'USD'
  const { formatted, currencySymbol } = formatPrice(displayPrice, currency)
  const isFeatured = tier.isFeatured ?? false
  const badgeText = tier.badge
  const labelColor = tier.labelColor ?? '#0f172a'
  const buttonText = tier.buttonText ?? 'Get started'

  const cta = (
    <Button
      variant={isFeatured ? 'primary' : 'outline'}
      size="lg"
      className="w-full justify-center rounded-[1rem]"
      disabled={tier.ctaDisabled}
      onClick={tier.onCtaClick}
      as={tier.ctaUrl ? 'a' : undefined}
      asProps={tier.ctaUrl ? { href: tier.ctaUrl } : undefined}
    >
      {buttonText}
    </Button>
  )

  const mutedClassName = 'text-[var(--color-muted-foreground)]'

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
          ? 'border-[color-mix(in_srgb,var(--color-primary-400)_45%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-surface)_88%,var(--color-primary-500)_12%)] hover:border-[color-mix(in_srgb,var(--color-primary-400)_60%,var(--color-border))] hover:shadow-[0_34px_90px_-46px_color-mix(in_srgb,var(--color-primary-500)_35%,transparent)]'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[color-mix(in_srgb,var(--color-primary-300)_35%,var(--color-border))] hover:bg-[color-mix(in_srgb,var(--color-surface)_93%,var(--color-primary-500)_7%)] hover:shadow-[0_34px_90px_-50px_rgba(15,23,42,0.42)]',
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
              ? 'bg-[color-mix(in_srgb,var(--color-primary-400)_22%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--color-primary-400)_30%,transparent)]'
              : 'bg-[color-mix(in_srgb,var(--color-muted-foreground)_8%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--color-primary-400)_14%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-background)_40%,transparent)] dark:group-hover:bg-[color-mix(in_srgb,var(--color-primary-400)_12%,transparent)]',
          )}
        />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-[var(--color-foreground)]">
              {tier.title}
            </p>
            <p className={clsx('mt-2 text-sm leading-6', mutedClassName)}>
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

        <div className="mt-8 rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-background)]/70 p-4 transition-[border-color,background-color,transform] duration-300 group-hover:border-[color-mix(in_srgb,var(--color-primary-300)_40%,var(--color-border))] group-hover:bg-[var(--color-background)]/90">
          <PriceValue
            value={formatted}
            currencySymbol={currencySymbol}
            period={pricePeriod}
            metaClassName={mutedClassName}
          />
          {isAnnual ? (
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-status-success)]">
              Billed annually
            </p>
          ) : (
            <p
              className={clsx(
                'mt-2 text-xs font-medium uppercase tracking-[0.16em]',
                mutedClassName,
              )}
            >
              Month to month
            </p>
          )}
        </div>

        <div className="mt-6">{cta}</div>

        <div className="mt-6 border-t border-[var(--color-border)] pt-6 transition-colors duration-300 group-hover:border-[color-mix(in_srgb,var(--color-primary-300)_35%,var(--color-border))]">
          <p
            className={clsx(
              'text-xs font-semibold uppercase tracking-[0.18em]',
              mutedClassName,
            )}
          >
            Includes
          </p>
          <ul className={clsx('mt-4 space-y-3 text-sm', mutedClassName)}>
            {tier.features.map((feature) => (
              <li
                key={feature.id}
                className="flex items-start gap-3 rounded-[0.95rem] px-2 py-1.5 transition-colors duration-200 group-hover:bg-[var(--color-background)]/80"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-status-success-soft)] text-[var(--color-status-success)] transition-transform duration-200 group-hover:scale-105">
                  <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="leading-6">
                  <Balancer>{feature.text}</Balancer>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  )
}

const defaultEyebrow = 'Pricing'
const defaultHeading = 'Pick the plan that matches your launch stage'
const defaultLead =
  'Cleaner tier comparison with billing animation, stronger feature hierarchy, and a clearer featured-plan treatment.'

export function PriceTable({
  tiers,
  eyebrow = defaultEyebrow,
  heading = defaultHeading,
  lead = defaultLead,
}: PriceTableProps) {
  const [isAnnual, setIsAnnual] = React.useState<boolean>(true)

  return (
    <section className="relative overflow-hidden bg-[var(--color-background)] py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden="true"
      >
        <div className="absolute left-[-10%] top-[-12%] h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--color-primary-400)_14%,transparent)] blur-3xl" />
        <div className="absolute right-[-8%] top-[6%] h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--color-primary-300)_10%,transparent)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--color-muted-foreground)]">
            {lead}
          </p>
        </div>

        <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />

        <div className="mx-auto grid max-w-sm gap-6 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <TierCard
              key={tier.id}
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
