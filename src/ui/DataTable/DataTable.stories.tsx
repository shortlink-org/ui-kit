import React from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import preview from '#.storybook/preview'
import { DataTable, type DataTableProps } from './DataTable'
import { createDataTableColumnHelper } from './columnConverter'
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'
import { fn } from 'storybook/test'
import Header from '../../page/Header/Header'

type LinkData = {
  url: string
  hash: string
  describe: string
  createdAt: string
}

const columnHelper = createDataTableColumnHelper<LinkData>()

const meta = preview.meta({
  title: 'UI/DataTable',
  component: DataTable as any,
})

function Template(args: DataTableProps<LinkData>) {
  return <DataTable<LinkData> {...args} />
}

const sampleData: LinkData[] = Array.from({ length: 50 }, (_, i) => ({
  url: `https://example${i + 1}.com`,
  hash: `hash${i + 1}`,
  describe: `Description for link ${i + 1}`,
  createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
}))

export const Default = meta.story({
  render: Template,
  args: {
    data: sampleData.slice(0, 10),
    columns: [
      columnHelper.accessor('url', { header: 'URL', size: 200 }),
      columnHelper.accessor('hash', { header: 'Hash', size: 150 }),
      columnHelper.accessor('describe', { header: 'Description', size: 250 }),
    ] as ColumnDef<LinkData, any>[],
    sorting: true,
    pagination: false,
  },
})

/**
 * Empty state with vendor-style messaging and actions.
 */
export const EmptyStateView = meta.story({
  render: Template,
  args: {
    data: [],
    columns: [
      columnHelper.accessor('url', { header: 'URL', size: 200 }),
      columnHelper.accessor('hash', { header: 'Hash', size: 150 }),
      columnHelper.accessor('describe', { header: 'Description', size: 250 }),
    ] as ColumnDef<LinkData, any>[],
    sorting: true,
    pagination: false,
    emptyMessage: 'No vendors found. Your search did not match any vendors. Please try again or add a new vendor.',
  },
})

export const WithPagination = meta.story({
  render: Template,
  args: {
    data: sampleData,
    columns: [
      columnHelper.accessor('url', { header: 'URL', size: 200 }),
      columnHelper.accessor('hash', { header: 'Hash', size: 150 }),
      columnHelper.accessor('describe', { header: 'Description', size: 250 }),
      columnHelper.accessor('createdAt', {
        header: 'Created',
        size: 150,
        cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
      }),
    ] as ColumnDef<LinkData, any>[],
    sorting: true,
    pagination: true,
    pageSize: 10,
  },
})

export const WithFilters = meta.story({
  render: Template,
  args: {
    data: sampleData.slice(0, 20),
    columns: [
      columnHelper.accessor('url', { header: 'URL', size: 200, enableColumnFilter: true }),
      columnHelper.accessor('hash', { header: 'Hash', size: 150, enableColumnFilter: true }),
      columnHelper.accessor('describe', { header: 'Description', size: 250, enableColumnFilter: true }),
    ] as ColumnDef<LinkData, any>[],
    sorting: true,
    pagination: true,
    filters: true,
    pageSize: 10,
  },
})

/**
 * Table with row actions - edit, delete, and view buttons.
 * Demonstrates custom action buttons for each row using renderRowActions prop.
 */
export const WithRowActions = meta.story({
  render: Template,
  args: {
    data: sampleData.slice(0, 10),
    columns: [
      columnHelper.accessor('url', { header: 'URL', size: 200 }),
      columnHelper.accessor('hash', { header: 'Hash', size: 150 }),
      columnHelper.accessor('describe', { header: 'Description', size: 250 }),
    ] as ColumnDef<LinkData, any>[],
    sorting: true,
    pagination: false,
    renderRowActions: (row) => (
      <div className="flex items-center gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation()
            fn()('Edit', row)
          }}
          className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Редактировать"
          aria-label="Редактировать"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            fn()('View', row)
          }}
          className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Просмотреть"
          aria-label="Просмотреть"
        >
          <EyeIcon className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            fn()('Delete', row)
          }}
          className="px-1 py-1 text-red-500 transition-colors duration-200 rounded-lg dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          title="Удалить"
          aria-label="Удалить"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    ),
  },
})

/**
 * Table with header, badge showing record count, and row actions.
 * Demonstrates a complete table layout with title, badge, and action buttons.
 */
export const WithHeaderAndBadge = meta.story({
  render: (args: DataTableProps<LinkData>) => {
    const totalCount = args.data.length || 240
    
    return (
      <section className="container px-4 mx-auto space-y-4">
        <Header
          title="Customers"
          secondaryAction={{
            customNode: (
              <div className="flex items-center gap-x-3">
                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                  {totalCount} vendors
                </span>
                <button
                  type="button"
                  className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700"
                  onClick={() => fn()('Import')}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_3098_154395)">
                      <path
                        d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                        stroke="currentColor"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3098_154395">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Import</span>
                </button>
              </div>
            ),
          }}
          primaryAction={{
            label: 'Add vendor',
            variant: 'primary',
            handler: () => fn()('Add vendor'),
          }}
        />
        <p className="text-sm text-gray-500 dark:text-gray-300">
          These companies have purchased in the last 12 months.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
              View all
            </button>
            <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Monitored
            </button>
            <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Unmonitored
            </button>
          </div>
          <div className="relative flex items-center">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>

        <div className="flex items-center text-center border rounded-lg h-64 dark:border-gray-700">
          <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
            <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h1 className="mt-3 text-lg text-gray-800 dark:text-white">No vendors found</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Your search did not match any vendors. Please try again or create a new vendor.
            </p>
            <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
              <button
                className="w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                onClick={() => fn()('Clear Search')}
              >
                Clear Search
              </button>
              <button
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                onClick={() => fn()('Add vendor')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Add vendor</span>
              </button>
            </div>
          </div>
        </div>

        <DataTable<LinkData> {...args} />
      </section>
    )
  },
  args: {
    data: sampleData.slice(0, 10),
    columns: [
      columnHelper.accessor('url', { header: 'URL', size: 200 }),
      columnHelper.accessor('hash', { header: 'Hash', size: 150 }),
      columnHelper.accessor('describe', { header: 'Description', size: 250 }),
    ] as ColumnDef<LinkData, any>[],
    sorting: true,
    pagination: true,
    pageSize: 10,
    renderRowActions: (row) => (
      <div className="flex items-center gap-x-6">
        <button
          onClick={(e) => {
            e.stopPropagation()
            fn()('Delete', row)
          }}
          className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
          title="Удалить"
          aria-label="Удалить"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            fn()('Edit', row)
          }}
          className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
          title="Редактировать"
          aria-label="Редактировать"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
      </div>
    ),
  },
})
