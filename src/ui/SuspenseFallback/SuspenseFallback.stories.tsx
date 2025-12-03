import { Suspense } from 'react'
import preview from '#.storybook/preview'
import { SuspenseFallback, type SuspenseFallbackProps } from './SuspenseFallback'

const meta = preview.meta({
  title: 'UI/SuspenseFallback',
  component: SuspenseFallback,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    chromatic: { viewports: [375, 768, 1280, 1920] },
  },
})

// Component that suspends
const SuspendingComponent = () => {
  throw new Promise(() => {}) // Suspense will catch this
}

export const Default = meta.story({
  args: {
    message: 'Loading...',
  },
  render: (args: SuspenseFallbackProps) => <SuspenseFallback {...args} />,
})

export const CustomMessage = meta.story({
  args: {
    message: 'Загрузка данных...',
  },
  render: (args: SuspenseFallbackProps) => <SuspenseFallback {...args} />,
})

export const WithSuspense = meta.story({
  render: () => (
    <Suspense fallback={<SuspenseFallback message="Loading component..." />}>
      <SuspendingComponent />
    </Suspense>
  ),
})

export const NoMessage = meta.story({
  args: {
    message: '',
  },
  render: (args: SuspenseFallbackProps) => <SuspenseFallback {...args} />,
})

