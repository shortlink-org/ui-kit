import React, { useLayoutEffect, useRef, useState } from 'react'
import preview from '#.storybook/preview'
import ScrollToTopButton from './ScrollToTopButton'

/* ---------- Meta ---------- */

const meta = preview.meta({
  title: 'UI/ScrollToTopButton',
  component: ScrollToTopButton,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    scrollThreshold: {
      control: { type: 'number', min: 0, max: 2_000, step: 50 },
      description: 'Pixels scrolled before the button shows',
    },
  },
})

/* ---------- Helper container ---------- */

const ScrollableContainer = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => (
  <div
    ref={ref}
    style={{
      height: '300vh',
      overflowY: 'auto',
      position: 'relative',
      padding: 20,
    }}
  >
    <h1>Scroll to trigger the button</h1>
    <p>The button appears once you pass the threshold.</p>

    {Array.from({ length: 20 }).map((_, i) => (
      <section
        key={i}
        style={{
          margin: '20px 0',
          padding: 20,
          background: '#f5f5f5',
          borderRadius: 8,
        }}
      >
        <h3>Section {i + 1}</h3>
        <p>Keep scrolling…</p>
      </section>
    ))}

    {children}
  </div>
))
ScrollableContainer.displayName = 'ScrollableContainer'

/* ---------- Template ---------- */

const render = (args: React.ComponentProps<typeof ScrollToTopButton>) => {
  const outerRef = useRef<HTMLDivElement>(null)
  const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null)

  // Wait until the div mounts, then store it in state so the story re-renders
  useLayoutEffect(() => {
    if (outerRef.current) setScrollParent(outerRef.current)
  }, [])

  return (
    <ScrollableContainer ref={outerRef}>
      <ScrollToTopButton {...args} scrollContainer={scrollParent} />
    </ScrollableContainer>
  )
}

/* ---------- Stories ---------- */

export const Default = meta.story({
  render,
  args: { scrollThreshold: 500 },
})

export const AlwaysVisible = meta.story({
  render,
  args: { scrollThreshold: 100 },
  parameters: {
    docs: { description: { story: 'Appears after scrolling only 100 px.' } },
  },
})

export const EarlyAppearance = meta.story({
  render,
  args: { scrollThreshold: 200 },
  parameters: {
    docs: { description: { story: 'Appears after 200 px.' } },
  },
})

export const LateAppearance = meta.story({
  render,
  args: { scrollThreshold: 1_000 },
  parameters: {
    docs: { description: { story: 'Appears after a full 1 000 px.' } },
  },
})
