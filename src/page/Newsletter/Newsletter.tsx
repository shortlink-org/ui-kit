import * as React from 'react'
import { clsx } from 'clsx'
import {
  CheckCircleIcon,
  EnvelopeIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { Button } from '../../ui/Button/Button'

export interface NewsletterFeature {
  /** Icon element for the feature */
  icon: React.ReactNode
  /** Feature title */
  title: string
  /** Feature description */
  description: string
}

export interface NewsletterProps {
  /** Small label shown above the heading */
  eyebrow?: string
  /** Main heading text */
  heading?: string
  /** Description text */
  description?: string
  /** Small trust/disclaimer text below the form */
  disclaimer?: string
  /** Email input placeholder */
  emailPlaceholder?: string
  /** Subscribe button text */
  buttonText?: string
  /** Callback when form is submitted */
  onSubmit?: (email: string) => void | Promise<void>
  /** Additional features list */
  features?: NewsletterFeature[]
  /** Optional className for the container */
  className?: string
  /** Loading state */
  loading?: boolean
  /** Test ID for E2E/integration testing */
  'data-testid'?: string
  /** Optional input id override */
  inputId?: string
}

const defaultFeatures: NewsletterFeature[] = [
  {
    icon: <SparklesIcon className="h-5 w-5" aria-hidden="true" />,
    title: 'Launch notes',
    description: 'See what shipped, what changed, and what to watch next.',
  },
  {
    icon: <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />,
    title: 'No inbox bloat',
    description: 'Thoughtful updates only. No noisy cadence or throwaway blasts.',
  },
]

export function Newsletter({
  eyebrow = 'Newsletter',
  heading = 'Get thoughtful product updates, not noisy blasts',
  description = 'Subscribe for curated release notes, launch insights, and practical ideas your team can use right away.',
  disclaimer = 'Weekly at most. Unsubscribe any time.',
  emailPlaceholder = 'Enter your work email',
  buttonText = 'Join the list',
  onSubmit,
  features,
  className = '',
  loading = false,
  'data-testid': dataTestId,
  inputId,
}: NewsletterProps) {
  const [email, setEmail] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const generatedId = React.useId()
  const emailInputId = inputId ?? generatedId
  const displayFeatures = features ?? defaultFeatures

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!email || isSubmitting || loading) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit?.(email)
      setEmail('')
    } catch (error) {
      console.error('Newsletter subscription error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className={clsx(
        'relative isolate overflow-hidden bg-[var(--color-background)] py-16 sm:py-24 lg:py-28',
        className,
      )}
      data-testid={dataTestId}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden="true"
      >
        <div className="absolute left-[-8%] top-[-14%] h-72 w-72 rounded-full bg-sky-400/14 blur-3xl" />
        <div className="absolute right-[-2%] top-[2%] h-72 w-72 rounded-full bg-amber-300/12 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[20%] h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_30px_100px_-60px_rgba(15,23,42,0.75)]">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)] shadow-sm dark:border-white/10 dark:bg-white/6">
                <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {eyebrow}
              </div>

              <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
                {heading}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted-foreground)]">
                {description}
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
              >
                <label htmlFor={emailInputId} className="sr-only">
                  Email address
                </label>
                <div className="relative flex-1">
                  <EnvelopeIcon
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-muted-foreground)]"
                    aria-hidden="true"
                  />
                  <input
                    id={emailInputId}
                    name="email"
                    type="email"
                    required
                    placeholder={emailPlaceholder}
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={isSubmitting || loading}
                    className={clsx(
                      'min-w-0 w-full rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-background)] pl-12 pr-4 py-3.5 text-base text-[var(--color-foreground)]',
                      'placeholder:text-[var(--color-muted-foreground)]',
                      'focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting || loading}
                  disabled={isSubmitting || loading || !email}
                  className="rounded-[1.2rem] px-6 sm:px-7"
                >
                  {buttonText}
                </Button>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
                <span className="inline-flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  Product-minded updates
                </span>
                <span className="hidden h-4 w-px bg-[var(--color-border)] sm:inline-block" />
                <span>{disclaimer}</span>
              </div>
            </div>

            <div className="border-t border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-muted)_72%,white_28%)] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12 dark:bg-[color-mix(in_srgb,var(--color-muted)_86%,black_14%)]">
              <div className="max-w-md">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
                  Why subscribe
                </p>

                <dl className="mt-6 space-y-5">
                  {displayFeatures.map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-[1.25rem] border border-white/70 bg-[var(--color-surface)] p-4 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] dark:border-white/8"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                          {feature.icon}
                        </div>
                        <div>
                          <dt className="text-base font-semibold text-[var(--color-foreground)]">
                            {feature.title}
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-[var(--color-muted-foreground)]">
                            {feature.description}
                          </dd>
                        </div>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
