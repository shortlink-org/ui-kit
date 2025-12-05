import * as React from 'react'
import { clsx } from 'clsx'
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
  /** Main heading text */
  heading?: string
  /** Description text */
  description?: string
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
}

export function Newsletter({
  heading = 'Subscribe to our newsletter',
  description = 'Get the latest updates and news delivered to your inbox.',
  emailPlaceholder = 'Enter your email',
  buttonText = 'Subscribe',
  onSubmit,
  features,
  className = '',
  loading = false,
  'data-testid': dataTestId,
}: NewsletterProps) {
  const [email, setEmail] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting || loading) return

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

  // Default features if none provided
  const defaultFeatures: NewsletterFeature[] = [
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
      ),
      title: 'Weekly articles',
      description: 'Stay updated with our latest content and insights.',
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
      title: 'No spam',
      description: 'We respect your privacy. Unsubscribe at any time.',
    },
  ]

  const displayFeatures = features || defaultFeatures

  return (
    <div
      className={clsx(
        'relative isolate overflow-hidden bg-gray-900 dark:bg-gray-950 py-16 sm:py-24 lg:py-32',
        className,
      )}
      data-testid={dataTestId}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-white">{heading}</h2>
            <p className="mt-4 text-lg text-gray-300 dark:text-gray-400">{description}</p>
            <form onSubmit={handleSubmit} className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder={emailPlaceholder}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || loading}
                className={clsx(
                  'min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white',
                  'outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500',
                  'focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500',
                  'sm:text-sm/6 disabled:opacity-50 disabled:cursor-not-allowed',
                  'border border-white/10 focus:border-indigo-500',
                )}
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={isSubmitting || loading}
                disabled={isSubmitting || loading || !email}
                className="flex-none bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-indigo-500 shadow-xs"
              >
                {buttonText}
              </Button>
            </form>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            {displayFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <dt className="mt-4 text-base font-semibold text-white">{feature.title}</dt>
                <dd className="mt-2 text-base/7 text-gray-400 dark:text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1155/678] w-[36.125rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  )
}

export default Newsletter

