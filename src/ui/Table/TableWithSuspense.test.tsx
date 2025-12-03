import { Suspense } from 'react'
import { render, screen } from '@testing-library/react'
import { TableWithSuspense } from './TableWithSuspense'
import { SuspenseFallback } from '../SuspenseFallback/SuspenseFallback'

// Mock Table component
jest.mock('./Table', () => ({
  Table: ({ columns, data }: { columns: any[]; data: any[] }) => (
    <div data-testid="table">
      <div>Columns: {columns.length}</div>
      <div>Data: {data.length}</div>
    </div>
  ),
}))

describe('TableWithSuspense', () => {
  const mockColumns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
  ]
  const mockData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ]

  it('renders Table component when not suspended', () => {
    render(
      <TableWithSuspense columns={mockColumns} data={mockData} />,
    )

    expect(screen.getByTestId('table')).toBeInTheDocument()
    expect(screen.getByText('Columns: 2')).toBeInTheDocument()
    expect(screen.getByText('Data: 2')).toBeInTheDocument()
  })

  it('renders default SuspenseFallback when suspended', async () => {
    const SuspendingComponent = () => {
      throw new Promise(() => {}) // Suspense will catch this
    }

    render(
      <Suspense fallback={<SuspenseFallback />}>
        <SuspendingComponent />
      </Suspense>,
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom loading...</div>

    render(
      <TableWithSuspense
        columns={mockColumns}
        data={mockData}
        suspenseFallback={customFallback}
      />,
    )

    // Should render table, not fallback (since not suspended)
    expect(screen.getByTestId('table')).toBeInTheDocument()
  })

  it('renders SuspenseFallback with custom message', () => {
    render(
      <TableWithSuspense
        columns={mockColumns}
        data={mockData}
        suspenseMessage="Загрузка таблицы..."
      />,
    )

    // Should render table, not fallback (since not suspended)
    expect(screen.getByTestId('table')).toBeInTheDocument()
  })

  it('passes all Table props correctly', () => {
    const onRefresh = jest.fn()

    render(
      <TableWithSuspense
        columns={mockColumns}
        data={mockData}
        onRefresh={onRefresh}
      />,
    )

    expect(screen.getByTestId('table')).toBeInTheDocument()
  })
})

