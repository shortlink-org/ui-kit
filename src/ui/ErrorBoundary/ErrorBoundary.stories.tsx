import React from 'react'
import preview from '#.storybook/preview'
import { ErrorBoundary } from './ErrorBoundary'
import type { ErrorBoundaryProps } from './ErrorBoundary'

const meta = preview.meta({
  title: 'UI/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    chromatic: { viewports: [375, 768, 1280, 1920] },
  },
})

// Component that throws an error
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('This is a test error for ErrorBoundary')
  }
  return <div style={{ padding: '20px', background: '#f0f0f0' }}>No error - component works fine</div>
}

export const Default = meta.story({
  args: {
    children: <ThrowError shouldThrow={false} />,
  },
  render: (args: ErrorBoundaryProps) => <ErrorBoundary {...args} />,
})

export const WithError = meta.story({
  args: {
    children: <ThrowError shouldThrow />,
  },
  render: (args: ErrorBoundaryProps) => <ErrorBoundary {...args} />,
})

export const CustomFallback = meta.story({
  args: {
    children: <ThrowError shouldThrow />,
    fallback: (
      <div style={{ padding: '20px', border: '2px solid red', borderRadius: '8px' }}>
        <h3>Custom Error Message</h3>
        <p>Something went wrong, but we're handling it gracefully!</p>
      </div>
    ),
  },
  render: (args: ErrorBoundaryProps) => <ErrorBoundary {...args} />,
})

export const WithOnErrorCallback = meta.story({
  args: {
    children: <ThrowError shouldThrow />,
    onError: (error: Error, errorInfo: React.ErrorInfo) => {
      console.log('Error caught:', error)
      console.log('Error info:', errorInfo)
    },
  },
  render: (args: ErrorBoundaryProps) => <ErrorBoundary {...args} />,
})

