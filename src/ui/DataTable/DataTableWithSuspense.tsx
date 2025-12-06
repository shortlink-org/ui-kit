import React, { Suspense } from 'react'
import { DataTable, type DataTableProps } from './DataTable'

export interface DataTableWithSuspenseProps<
  TData extends Record<string, unknown> = Record<string, unknown>,
> extends DataTableProps<TData> {
  suspenseFallback?: React.ReactNode
  suspenseMessage?: string
}

/**
 * DataTable component wrapped with Suspense boundary.
 * Use this when your data fetching uses React 19's use() hook with promises.
 *
 * @example
 * ```tsx
 * function MyDataTable() {
 *   const dataPromise = useAsyncData('table-data', () => fetchTableData())
 *   const data = use(dataPromise)
 *
 *   return (
 *     <DataTableWithSuspense
 *       columns={columns}
 *       data={data}
 *       suspenseMessage="Loading table data..."
 *     />
 *   )
 * }
 * ```
 */
export function DataTableWithSuspense<
  TData extends Record<string, unknown> = Record<string, unknown>,
>({ suspenseFallback, ...dataTableProps }: DataTableWithSuspenseProps<TData>) {
  return (
    <Suspense
      fallback={
        suspenseFallback || (
          <div className="p-4">
            <DataTable {...dataTableProps} data={[]} loading={true} />
          </div>
        )
      }
    >
      <DataTable {...dataTableProps} />
    </Suspense>
  )
}

export default DataTableWithSuspense
