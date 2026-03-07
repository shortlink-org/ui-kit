import * as React from 'react'
import { motion } from 'motion/react'
import clsx from 'clsx'

type PricingToggleProps = {
  isAnnual: boolean
  setIsAnnual: (isAnnual: boolean) => void
}

const plans = [
  {
    id: 'yearly',
    label: 'Yearly',
    hint: 'Save 20%',
    annual: true,
  },
  {
    id: 'monthly',
    label: 'Monthly',
    hint: 'Flexible billing',
    annual: false,
  },
] as const

const PricingToggle: React.FC<PricingToggleProps> = ({
  isAnnual,
  setIsAnnual,
}) => {
  return (
    <div className="mx-auto mb-10 flex max-w-md justify-center lg:mb-16">
      <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)]">
        {plans.map((plan) => {
          const isActive = plan.annual === isAnnual

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setIsAnnual(plan.annual)}
              className={clsx(
                'focus-ring relative min-w-[8.5rem] rounded-full px-4 py-2.5 text-left transition-colors sm:px-5',
                isActive
                  ? 'text-white'
                  : 'text-slate-700 hover:text-slate-950 dark:text-[var(--color-muted-foreground)] dark:hover:text-[var(--color-foreground)]',
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="pricing-toggle-indicator"
                  className="absolute inset-0 rounded-full bg-slate-950 shadow-[0_16px_36px_-24px_rgba(15,23,42,0.85)] dark:bg-white"
                  transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                  aria-hidden="true"
                />
              ) : null}

              <span className="relative block text-sm font-semibold">
                {plan.label}
              </span>
              <span
                className={clsx(
                  'relative mt-0.5 block text-xs',
                  isActive
                    ? 'text-white/70 dark:text-slate-500'
                    : 'text-slate-500 dark:text-[var(--color-muted-foreground)]',
                )}
              >
                {plan.hint}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PricingToggle
