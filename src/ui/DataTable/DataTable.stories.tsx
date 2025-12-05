import React from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import preview from '#.storybook/preview'
import { DataTable, type DataTableProps } from './DataTable'
import { createDataTableColumnHelper } from './columnConverter'

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
