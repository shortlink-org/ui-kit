import React from 'react'
import preview from '#.storybook/preview'
import { TableWithErrorBoundary, type TableWithErrorBoundaryProps } from './TableWithErrorBoundary'

const meta = preview.meta({
  title: 'UI/Table/TableWithErrorBoundary',
  component: TableWithErrorBoundary,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
})

const mockData = [
  { id: 1, name: 'Item 1', status: 'Active' },
  { id: 2, name: 'Item 2', status: 'Pending' },
  { id: 3, name: 'Item 3', status: 'Active' },
]

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'status', header: 'Status' },
]

export const Default = meta.story({
  args: {
    columns,
    data: mockData,
  },
  render: (args: TableWithErrorBoundaryProps) => <TableWithErrorBoundary {...args} />,
})

export const WithCustomErrorFallback = meta.story({
  args: {
    columns,
    data: mockData,
    errorFallback: (
      <div style={{ padding: '20px', border: '2px solid red', borderRadius: '8px' }}>
        <h3>Table Error</h3>
        <p>Something went wrong with the table. Please try again later.</p>
      </div>
    ),
  },
  render: (args: TableWithErrorBoundaryProps) => <TableWithErrorBoundary {...args} />,
})

export const WithOnErrorCallback = meta.story({
  args: {
    columns,
    data: mockData,
    onError: (error: Error, errorInfo: React.ErrorInfo) => {
      console.log('Table error caught:', error)
      console.log('Error info:', errorInfo)
      // In real app, you would send this to error tracking service
    },
  },
  render: (args: TableWithErrorBoundaryProps) => <TableWithErrorBoundary {...args} />,
})

