import React, { Suspense } from 'react'
import { Table, type TableProps } from './Table'
import { SuspenseFallback } from '../SuspenseFallback/SuspenseFallback'

export interface TableWithSuspenseProps extends TableProps {
  suspenseFallback?: React.ReactNode
  suspenseMessage?: string
}

/**
 * Table component wrapped with Suspense boundary.
 * Use this when your data fetching uses React 19's use() hook with promises.
 * 
 * @example
 * ```tsx
 * function DataTable() {
 *   const dataPromise = useAsyncData('table-data', () => fetchTableData())
 *   const data = use(dataPromise)
 *   
 *   return (
 *     <TableWithSuspense
 *       columns={columns}
 *       data={data}
 *       suspenseMessage="Loading table data..."
 *     />
 *   )
 * }
 * ```
 */
export const TableWithSuspense: React.FC<TableWithSuspenseProps> = ({
  suspenseFallback,
  suspenseMessage,
  ...tableProps
}) => {
  return (
    <Suspense
      fallback={
        suspenseFallback || <SuspenseFallback message={suspenseMessage} />
      }
    >
      <Table {...tableProps} />
    </Suspense>
  )
}

export default TableWithSuspense

