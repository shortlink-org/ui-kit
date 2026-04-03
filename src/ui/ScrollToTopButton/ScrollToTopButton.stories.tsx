import React, { useLayoutEffect, useRef, useState } from 'react'
import preview from '#.storybook/preview'
import ScrollToTopButton from './ScrollToTopButton'

function ScrollSurface({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 py-8 text-[var(--color-foreground)] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="max-w-2xl space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
            ScrollToTopButton
          </p>
          <h2 className="text-xl font-semibold">Showcase</h2>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Scroll inside the panel — the floating action appears after you move
            past the top. Uses the container ref, not the window.
          </p>
        </header>

        <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)]">
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
    <div className="sticky top-0 z-10 mb-5 rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_96%,var(--color-muted)_4%)] px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
        Long surface
      </p>
      <p className="mt-1 text-sm font-semibold text-[var(--color-foreground)]">
        Scroll down to show the button
      </p>
    </div>

    <div className="space-y-4 pb-32">
      {Array.from({ length: 16 }).map((_, i) => (
        <section
          key={i}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
            Block {i + 1}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            Placeholder content so the list scrolls. The scroll-to-top control
            stays fixed to the viewport corner while this area moves.
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
  render: (args: React.ComponentProps<typeof ScrollToTopButton>) => {
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
