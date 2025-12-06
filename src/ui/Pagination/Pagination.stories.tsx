import { useReactTable, getCoreRowModel, getPaginationRowModel, type ColumnDef } from '@tanstack/react-table'
import preview from '#.storybook/preview'
import { Pagination } from './Pagination'
import { createDataTableColumnHelper } from '../DataTable/columnConverter'

type SampleData = {
  id: number
  name: string
  email: string
  role: string
}

const columnHelper = createDataTableColumnHelper<SampleData>()

const columns = [
  columnHelper.accessor('name', { header: 'Name', size: 150 }),
  columnHelper.accessor('email', { header: 'Email', size: 200 }),
  columnHelper.accessor('role', { header: 'Role', size: 150 }),
] as ColumnDef<SampleData, unknown>[]

const sampleData: SampleData[] = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
}))

function PaginationWrapper({
  pageSize = 10,
  pageIndex = 0,
  pageSizeOptions,
  mobilePageSizeControl = true,
}: {
  pageSize?: number
  pageIndex?: number
  pageSizeOptions?: number[]
  mobilePageSizeControl?: boolean
}) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
        pageIndex,
      },
    },
  })

  return <Pagination table={table} pageSizeOptions={pageSizeOptions} mobilePageSizeControl={mobilePageSizeControl} />
}

const meta = preview.meta({
  title: 'UI/Pagination',
  component: Pagination as typeof Pagination,
  tags: ['autodocs'],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1920],
    },
  },
})

export default meta

/**
 * Default pagination component with 10 items per page.
 * Shows navigation buttons, page numbers, and row count information.
 */
export const Default = meta.story({
  render: () => <PaginationWrapper pageSize={10} pageIndex={0} />,
})

/**
 * Pagination with custom page size options.
 * Allows users to choose from different page sizes.
 */
export const CustomPageSizes = meta.story({
  render: () => <PaginationWrapper pageSize={20} pageIndex={0} pageSizeOptions={[5, 10, 20, 50, 100]} />,
})

/**
 * Pagination on a different page (page 5).
 * Demonstrates pagination in the middle of a dataset.
 */
export const MiddlePage = meta.story({
  render: () => <PaginationWrapper pageSize={10} pageIndex={4} />, // Page 5 (0-indexed: 4)
})

/**
 * Pagination on the last page.
 * Shows disabled "Next" button state.
 */
export const LastPage = meta.story({
  render: () => <PaginationWrapper pageSize={10} pageIndex={14} />, // Last page for 150 items with page size 10
})

/**
 * Pagination with large dataset.
 * Shows ellipsis when there are many pages.
 */
export const LargeDataset = meta.story({
  render: () => <PaginationWrapper pageSize={5} pageIndex={10} />, // Page 11 with 150 items = 30 pages
})

/**
 * Pagination without mobile page size control.
 * Useful when you want to hide the mobile dropdown.
 */
export const WithoutMobileControl = meta.story({
  render: () => <PaginationWrapper pageSize={10} pageIndex={0} mobilePageSizeControl={false} />,
})

/**
 * Responsive pagination behavior.
 * Shows how pagination adapts to different screen sizes.
 */
export const Responsive = meta.story({
  render: () => {
    return (
      <div className="space-y-8 p-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Mobile View ({'<'} 768px)</h3>
          <div className="max-w-sm border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <PaginationWrapper pageSize={10} pageIndex={0} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Desktop View (≥ 768px)</h3>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <PaginationWrapper pageSize={10} pageIndex={0} />
          </div>
        </div>
      </div>
    )
  },
})

/**
 * Showcase of all pagination states and features.
 * Comprehensive demonstration of the component capabilities.
 */
export const Showcase = meta.story({
  render: () => (
    <div className="space-y-12 p-8">
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">First Page</h3>
        <PaginationWrapper pageSize={10} pageIndex={0} />
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Middle Page (Page 5)</h3>
        <PaginationWrapper pageSize={10} pageIndex={4} />
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Last Page</h3>
        <PaginationWrapper pageSize={10} pageIndex={14} />
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Large Dataset (30 pages)</h3>
        <PaginationWrapper pageSize={5} pageIndex={10} />
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Custom Page Sizes</h3>
        <PaginationWrapper pageSize={10} pageIndex={0} pageSizeOptions={[5, 10, 25, 50, 100]} />
      </section>
    </div>
  ),
})
