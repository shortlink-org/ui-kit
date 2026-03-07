import React, { useLayoutEffect, useRef, useState } from 'react'
import preview from '#.storybook/preview'
import ScrollToTopButton from './ScrollToTopButton'

function ScrollSurface({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e0f2fe_0%,#f8fafc_34%,#eef2ff_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_32px_120px_-60px_rgba(15,23,42,0.48)] backdrop-blur-xl sm:p-8">
        <div className="mb-6 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-700">
            Utility action
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            Scroll-to-top inside a long workspace surface
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
            This story uses a constrained scroll container so the component can
            be tested in a realistic dashboard feed without relying on the whole
            preview page scroll.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.98))] shadow-[0_24px_70px_-44px_rgba(15,23,42,0.42)]">
          {children}
        </div>
      </div>
    </div>
  )
}

const ScrollableContainer = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => (
  <div
    ref={ref}
    className="relative h-[75vh] overflow-y-auto px-5 py-5 sm:px-6"
  >
    <div className="sticky top-0 z-10 mb-5 rounded-[1.4rem] border border-slate-200/80 bg-white/80 px-4 py-4 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.35)] backdrop-blur-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
        Marketplace workspace
      </p>
      <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
        Scroll down to reveal the utility action
      </p>
    </div>

    <div className="space-y-4 pb-32">
      {Array.from({ length: 16 }).map((_, i) => (
        <section
          key={i}
          className="rounded-[1.45rem] border border-slate-200/80 bg-white/85 p-5 shadow-[0_18px_50px_-42px_rgba(15,23,42,0.32)]"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Feed block {i + 1}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            Seller performance snapshot
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Review category momentum, new orders, conversion spikes and payout
            health while keeping long surfaces manageable on desktop and mobile.
          </p>
        </section>
      ))}
    </div>

    {children}
  </div>
))

ScrollableContainer.displayName = 'ScrollableContainer'

const meta = preview.meta({
  title: 'UI/ScrollToTopButton',
  component: ScrollToTopButton,
  parameters: { layout: 'fullscreen' },
})

export default meta

export const Showcase = meta.story({
  render: (args) => {
    const outerRef = useRef<HTMLDivElement>(null)
    const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null)

    useLayoutEffect(() => {
      if (outerRef.current) {
        setScrollParent(outerRef.current)
      }
    }, [])

    return (
      <ScrollSurface>
        <ScrollableContainer ref={outerRef}>
          <ScrollToTopButton
            {...args}
            scrollContainer={scrollParent}
            scrollThreshold={260}
            enableGlobalHotkey={false}
          />
        </ScrollableContainer>
      </ScrollSurface>
    )
  },
  args: {
    variant: 'solid',
  },
})
