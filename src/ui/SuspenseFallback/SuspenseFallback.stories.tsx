import { Suspense } from 'react'
import preview from '#.storybook/preview'
import { SuspenseFallback } from './SuspenseFallback'

const meta = preview.meta({
  title: 'UI/SuspenseFallback',
  component: SuspenseFallback,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    chromatic: { viewports: [375, 768, 1280, 1600] },
  },
})

const SuspendingComponent = () => {
  throw new Promise(() => {})
}

export default meta

export const WorkspaceModuleLoading = meta.story({
  args: {
    eyebrow: 'Streaming boundary',
    title: 'Rebuilding revenue module',
    message:
      'Live payout summaries, seller velocity and campaign deltas are still streaming in.',
    size: 'lg',
  },
  render: (args) => (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e0f2fe_0%,#f8fafc_34%,#eef2ff_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_32px_120px_-60px_rgba(15,23,42,0.48)] backdrop-blur-xl sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.3fr]">
          <div className="rounded-[1.7rem] border border-slate-200/80 bg-slate-950 p-6 text-slate-50 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.55)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-200">
              Commerce lane
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Operations remain interactive
            </h2>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3">
                Seller onboarding approvals are still available.
              </div>
              <div className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3">
                Returns monitoring and payout queues continue to update.
              </div>
            </div>
          </div>

          <SuspenseFallback {...args} className="min-h-[420px]" />
        </div>
      </div>
    </div>
  ),
})

export const SuspenseBoundaryDemo = meta.story({
  render: () => (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_32px_120px_-60px_rgba(15,23,42,0.48)] backdrop-blur-xl sm:p-8">
        <div className="mb-6 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700">
            Async UI
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            Real Suspense fallback in a page shell
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
            This story uses a genuine `Suspense` boundary, so the fallback is
            exercised as it would be during async module loading.
          </p>
        </div>

        <Suspense
          fallback={
            <SuspenseFallback
              eyebrow="Widget hydration"
              title="Preparing seller insights"
              message="The analytics card is fetching fresh data and assembling its interactive controls."
              size="lg"
              className="min-h-[360px]"
            />
          }
        >
          <SuspendingComponent />
        </Suspense>
      </div>
    </div>
  ),
})
