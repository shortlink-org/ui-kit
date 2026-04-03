import React from 'react'
import preview from '#.storybook/preview'
import { Button } from '../Button/Button'
import { ErrorBoundary } from './ErrorBoundary'
import type { ErrorBoundaryProps } from './ErrorBoundary'

const meta = preview.meta({
  title: 'UI/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    chromatic: { viewports: [375, 768, 1280, 1600] },
  },
})

/** Minimal “live widget” that can throw — keeps the story focused on the boundary, not fake UI chrome. */
function CommerceInsightsWidget({
  shouldThrow,
  onBreak,
}: {
  shouldThrow: boolean
  onBreak: () => void
}) {
  if (shouldThrow) {
    throw new Error(
      'Live GMV service stopped responding while refreshing this widget.',
    )
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
            Marketplace pulse
          </p>
          <p className="mt-1 text-2xl font-semibold text-[var(--color-foreground)]">
            $842K
          </p>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            Gross volume (live)
          </p>
        </div>
        <Button onClick={onBreak} variant="outline" size="md">
          Simulate failure
        </Button>
      </div>
    </div>
  )
}

function PartnerBridgeWidget({
  shouldThrow,
  onBreak,
}: {
  shouldThrow: boolean
  onBreak: () => void
}) {
  if (shouldThrow) {
    throw new Error(
      'Webhook dispatcher timed out after 3 retries during partner sync.',
    )
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
            Partner webhook
          </p>
          <p className="mt-1 text-lg font-semibold text-[var(--color-foreground)]">
            Fulfillment bridge
          </p>
        </div>
        <Button onClick={onBreak} variant="outline" size="md">
          Simulate timeout
        </Button>
      </div>
    </div>
  )
}

export const CommerceInsightsRecovery = meta.story({
  render: (args: ErrorBoundaryProps) => {
    const [broken, setBroken] = React.useState(false)

    return (
      <div className="min-h-screen bg-[var(--color-background)] px-4 py-8 text-[var(--color-foreground)] sm:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <header className="space-y-1">
            <h2 className="text-lg font-semibold">Isolated widget recovery</h2>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              Only the wrapped panel errors; the other region stays as-is.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            <aside className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-muted-foreground)]">
              Unaffected area — e.g. navigation or filters.
            </aside>

            <ErrorBoundary
              {...args}
              className="min-h-[180px]"
              onReset={() => setBroken(false)}
            >
              <CommerceInsightsWidget
                shouldThrow={broken}
                onBreak={() => setBroken(true)}
              />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    )
  },
})

export const CustomSupportEscalation = meta.story({
  render: () => {
    const [broken, setBroken] = React.useState(false)

    return (
      <div className="min-h-screen bg-[var(--color-background)] px-4 py-8 text-[var(--color-foreground)] sm:px-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <header className="space-y-1">
            <h2 className="text-lg font-semibold">Custom fallback</h2>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              <code className="text-[0.9em]">fallbackRender</code> replaces the
              default panel; actions can reset state and link out.
            </p>
          </header>

          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div className="space-y-4 rounded-2xl border border-violet-200/80 bg-violet-50/40 p-5 dark:border-violet-900/50 dark:bg-violet-950/25">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
                      Escalation
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-[var(--color-foreground)]">
                      Partner bridge failed
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                      Retry after reconnecting, or follow the runbook.
                    </p>
                  </div>
                  <code className="shrink-0 rounded-md border border-violet-200 bg-[var(--color-surface)] px-2 py-1 text-xs text-[var(--color-foreground)] dark:border-violet-800">
                    sync.webhook.timeout
                  </code>
                </div>

                <p className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm leading-relaxed">
                  {error.message}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      setBroken(false)
                      resetErrorBoundary()
                    }}
                    variant="primary"
                    size="md"
                  >
                    Retry
                  </Button>
                  <Button as="a" asProps={{ href: '#' }} variant="outline" size="md">
                    Open runbook
                  </Button>
                </div>
              </div>
            )}
          >
            <PartnerBridgeWidget
              shouldThrow={broken}
              onBreak={() => setBroken(true)}
            />
          </ErrorBoundary>
        </div>
      </div>
    )
  },
})
