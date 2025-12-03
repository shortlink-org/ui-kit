import { Suspense, use } from 'react'
import preview from '#.storybook/preview'
import { TableWithSuspense } from './TableWithSuspense'
import { useAsyncData } from '../../utils/useAsyncData'

const meta = preview.meta({
  title: 'UI/Table/TableWithSuspense',
  component: TableWithSuspense,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
})

// Mock data fetcher
const fetchTableData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Item 1', status: 'Active' },
        { id: 2, name: 'Item 2', status: 'Pending' },
        { id: 3, name: 'Item 3', status: 'Active' },
      ])
    }, 1000) // Simulate loading delay
  })
}

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'status', header: 'Status' },
]

// Component that uses use() hook
const DataTable = () => {
  const dataPromise = useAsyncData('table-data', () => fetchTableData())
  const data = use(dataPromise) as any[]

  return <TableWithSuspense columns={columns} data={data} />
}

export const Default = meta.story({
  render: () => (
    <Suspense fallback={<div>Loading table data...</div>}>
      <DataTable />
    </Suspense>
  ),
})

export const WithCustomFallback = meta.story({
  render: () => (
    <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>⏳ Loading...</div>}>
      <DataTable />
    </Suspense>
  ),
})

