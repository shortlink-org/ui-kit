import { OverridableStringUnion } from '@mui/types'
import Button, {
  ButtonProps,
  ButtonPropsVariantOverrides,
} from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React from 'react'
import Balancer from 'react-wrap-balancer'
import clsx from 'clsx'

import PricingToggle from './PricingToggle'

type Tier = {
  title: string
  subheader: string
  /** Monthly price in the base currency */
  monthlyPrice: number
  /** Yearly price in the base currency (if not provided, calculated as monthlyPrice * 12 * 0.8) */
  yearlyPrice?: number
  /** Currency code (default: 'USD') */
  currency?: string
  /** Badge text to display (e.g., 'Most Popular') */
  badge?: string
  /** Whether this tier is featured (affects styling) */
  isFeatured?: boolean
  /** Custom background color for featured badge (default: 'emerald-500') */
  labelColor?: string
  description: string[]
  /** Custom CTA button props (if not provided, uses default buttonVariant and buttonText) */
  ctaButton?: ButtonProps
  /** @deprecated Use monthlyPrice instead */
  price?: number
  buttonVariant?: OverridableStringUnion<
    'text' | 'outlined' | 'contained',
    ButtonPropsVariantOverrides
  >
  buttonText?: string
  /** Optional CTA URL for link-based actions */
  ctaUrl?: string
}

export type TiersProps = {
  tiers: Tier[]
}

/**
 * Formats a price using Intl.NumberFormat
 */
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

export const PriceTable: React.FC<TiersProps> = ({ tiers }) => {
  const [isAnnual, setIsAnnual] = React.useState<boolean>(true)

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
      <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />

      <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
        {tiers.map((tier) => {
          // Calculate prices: use monthlyPrice/yearlyPrice if provided, otherwise calculate
          const monthlyPrice = tier.monthlyPrice ?? tier.price ?? 0
          const yearlyPrice = tier.yearlyPrice ?? monthlyPrice * 12 * 0.8 // 20% discount for yearly
          const displayPrice = isAnnual ? yearlyPrice : monthlyPrice
          const pricePeriod = isAnnual ? '/year' : '/mo'

          // Format price
          const currency = tier.currency ?? 'USD'
          const { formatted, currencySymbol } = formatPrice(
            displayPrice,
            currency,
          )

          // Determine if featured
          const isFeatured = tier.isFeatured ?? false
          const badgeText = tier.badge
          const labelColor = tier.labelColor ?? '#10b981'
          const isClassColor =
            typeof labelColor === 'string' && labelColor.startsWith('bg-')
          const badgeStyle =
            !labelColor || isClassColor
              ? undefined
              : {
                  backgroundColor:
                    labelColor.startsWith('#') ||
                    labelColor.startsWith('rgb') ||
                    labelColor.startsWith('hsl') ||
                    labelColor.startsWith('var(')
                      ? labelColor
                      : `var(--${labelColor})`,
                }

          // CTA button configuration
          const defaultButtonProps: ButtonProps = {
            fullWidth: true,
            variant:
              tier.buttonVariant ?? tier.ctaButton?.variant ?? 'contained',
            children:
              tier.buttonText ?? tier.ctaButton?.children ?? 'Get Started',
            ...tier.ctaButton,
          }

          return (
            <div
              className={`relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5 ${
                isFeatured ? 'bg-green-50 dark:bg-green-900' : ''
              }`}
              key={tier.title}
            >
              {badgeText && (
                <div className="absolute top-0 right-0 mr-6 -mt-4">
                  <div
                    className={clsx(
                      'inline-flex items-center text-xs font-semibold py-1.5 px-3 text-white rounded-full shadow-sm shadow-slate-950/5',
                      isClassColor ? labelColor : undefined,
                    )}
                    style={badgeStyle}
                  >
                    {badgeText}
                  </div>
                </div>
              )}
              <div className="mb-5">
                <div className="text-slate-900 dark:text-slate-200 font-semibold mb-1">
                  {tier.title}
                </div>
                <div className="inline-flex items-baseline mb-2">
                  <span className="text-slate-900 dark:text-slate-200 font-bold text-3xl">
                    {currencySymbol}
                  </span>
                  <span className="text-slate-900 dark:text-slate-200 font-bold text-4xl">
                    {formatted}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {pricePeriod}
                  </span>
                </div>
                <div className="text-sm text-slate-500 mb-5">
                  <Balancer>{tier.subheader}</Balancer>
                </div>

                {tier.ctaUrl ? (
                  <Button
                    component="a"
                    href={tier.ctaUrl}
                    {...defaultButtonProps}
                  />
                ) : (
                  <Button {...defaultButtonProps} />
                )}
              </div>

              <div className="text-slate-900 dark:text-slate-200 font-medium mb-3">
                Includes:
              </div>
              <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
                {tier.description.map((line: string) => (
                  <Typography
                    component="li"
                    variant="subtitle1"
                    align="center"
                    className="flex items-center"
                    key={line}
                  >
                    <svg
                      className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>

                    <span>
                      <Balancer>{line}</Balancer>
                    </span>
                  </Typography>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PriceTable
