import React from 'react'
import preview from '#.storybook/preview'
import { Button } from '../Button/Button'
import { StatCard } from '../StatCard/StatCard'
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

const InsightsPanel = ({
  shouldThrow,
  onTriggerCrash,
}: {
  shouldThrow: boolean
  onTriggerCrash: () => void
}) => {
  if (shouldThrow) {
    throw new Error('Live GMV service stopped responding while refreshing this widget.')
  }

  return (
    <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_20px_56px_-44px_rgba(15,23,42,0.22)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Revenue cockpit
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Marketplace pulse
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
            The panel mixes live orders, conversion deltas and seller alerts in
            one workspace module.
          </p>
        </div>

        <Button onClick={onTriggerCrash} variant="outline" size="md">
          Simulate sync failure
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1.5fr_0.9fr]">
        <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-600">Gross volume</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
                $842K
              </p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              +12.4%
            </span>
          </div>

          <div className="mt-6 grid grid-cols-8 items-end gap-2">
            {[36, 58, 42, 76, 64, 88, 72, 94].map((height, index) => (
              <div
                key={height}
                className="rounded-full bg-gradient-to-t from-slate-900 via-slate-700 to-slate-400"
                style={{ height: `${height}px`, opacity: index === 7 ? 1 : 0.65 }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <StatCard label="Orders awaiting pick" value="128" />
          <StatCard label="Sellers above target" value="24" />
          <div className="rounded-[22px] border border-slate-200 bg-slate-950 p-5 text-slate-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300">
              Next sync
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">02:14</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Data refresh window for payouts, seller score and trending lanes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const IncidentPanel = ({
  shouldThrow,
  onTriggerCrash,
}: {
  shouldThrow: boolean
  onTriggerCrash: () => void
}) => {
  if (shouldThrow) {
    throw new Error('Webhook dispatcher timed out after 3 retries during partner sync.')
  }

  return (
    <div className="rounded-[30px] border border-slate-200/80 bg-white/85 p-6 shadow-[0_30px_100px_-56px_rgba(15,23,42,0.4)] backdrop-blur-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-700">
            Partner operations
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Fulfillment bridge
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            This workspace card monitors partner webhooks, retry budgets and
            incident routing for high-volume catalog imports.
          </p>
        </div>

        <Button onClick={onTriggerCrash} variant="outline" size="md">
          Trigger partner timeout
        </Button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <StatCard label="Open incidents" value="03" />
        <StatCard label="Retries left" value="11" />
        <StatCard label="Partner SLA" value="99.92%" />
      </div>
    </div>
  )
}

export const CommerceInsightsRecovery = meta.story({
  render: (args: ErrorBoundaryProps) => {
    const [isBroken, setIsBroken] = React.useState(false)

    return (
      <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-10 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_64px_-52px_rgba(15,23,42,0.28)] sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                  Marketplace workspace
                </p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  Error recovery inside a live dashboard
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-[15px] dark:text-slate-300">
                  The boundary isolates one broken analytics module while the
                  rest of the control surface stays interactive.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <StatCard label="Active sellers" value="2.4K" />
                <StatCard label="Pending payouts" value="$91K" />
                <StatCard label="Live alerts" value="07" />
              </div>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.4fr]">
              <div className="rounded-[26px] border border-slate-200 bg-slate-900 p-6 text-slate-50 dark:border-slate-800">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300">
                  Control lane
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  Commerce command queue
                </h3>
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    18 seller onboarding approvals are ready for review.
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    4 catalog feeds were processed in the last 10 minutes.
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    Returns spike is concentrated in home and decor.
                  </div>
                </div>
              </div>

              <ErrorBoundary
                {...args}
                className="min-h-[430px]"
                onReset={() => setIsBroken(false)}
              >
                <InsightsPanel
                  shouldThrow={isBroken}
                  onTriggerCrash={() => setIsBroken(true)}
                />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    )
  },
})

export const CustomSupportEscalation = meta.story({
  render: () => {
    const [isBroken, setIsBroken] = React.useState(false)

    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f5f3ff_45%,#eef2ff_100%)] px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-[0_30px_120px_-60px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-violet-700">
                Operations handoff
              </p>
              <h2 className="text-4xl font-semibold tracking-tight text-slate-950">
                Custom fallback with support actions
              </h2>
              <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-[15px]">
                This scenario demonstrates when a product team needs a branded
                recovery path with escalation links, diagnostics and reset.
              </p>
            </div>

            <div className="mt-8">
              <ErrorBoundary
                fallbackRender={({ error, resetErrorBoundary }) => (
                  <div className="relative isolate overflow-hidden rounded-[30px] border border-violet-200/80 bg-[linear-gradient(180deg,rgba(139,92,246,0.12),rgba(255,255,255,0.96))] p-6 shadow-[0_30px_100px_-56px_rgba(76,29,149,0.4)]">
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-violet-400/20 to-transparent" />
                    <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-2xl">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-700">
                          Escalation flow
                        </p>
                        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                          Partner bridge needs intervention
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
                          The boundary keeps the page stable and replaces the
                          failed widget with a guided recovery surface.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-violet-200/80 bg-white/85 px-4 py-3 text-sm text-slate-600 shadow-[0_18px_55px_-40px_rgba(76,29,149,0.35)]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-700">
                          Incident code
                        </p>
                        <p className="mt-2 font-medium text-slate-900">
                          sync.webhook.timeout
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                      <div className="rounded-[24px] border border-violet-200/70 bg-white/80 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-700">
                          Error details
                        </p>
                        <p className="mt-3 text-sm leading-6 text-slate-700">
                          {error.message}
                        </p>
                      </div>

                      <div className="rounded-[24px] border border-slate-200/80 bg-slate-950 p-5 text-slate-50">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-200">
                          Suggested next step
                        </p>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          Reconnect the partner queue or hand the incident to
                          operations if retries keep timing out.
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-6 flex flex-wrap items-center gap-3">
                      <Button
                        onClick={() => {
                          setIsBroken(false)
                          resetErrorBoundary()
                        }}
                        variant="primary"
                      >
                        Reload bridge
                      </Button>
                      <Button
                        as="a"
                        asProps={{ href: '#' }}
                        variant="outline"
                      >
                        Open runbook
                      </Button>
                    </div>
                  </div>
                )}
              >
                <IncidentPanel
                  shouldThrow={isBroken}
                  onTriggerCrash={() => setIsBroken(true)}
                />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    )
  },
})
