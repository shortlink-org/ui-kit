import React from 'react'
import { DataTable, type DataTableProps } from './DataTable'
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary'
import type { ErrorBoundaryProps } from '../ErrorBoundary/ErrorBoundary'

export interface DataTableWithErrorBoundaryProps<TData extends Record<string, unknown> = Record<string, unknown>>
  extends DataTableProps<TData> {
  errorFallback?: ErrorBoundaryProps['fallback']
  onError?: ErrorBoundaryProps['onError']
}

/**
 * DataTable component wrapped with ErrorBoundary.
 * Catches errors thrown in transitions (React 19 Actions) and other component errors.
 * 
 * @example
 * ```tsx
 * <DataTableWithErrorBoundary
 *   columns={columns}
 *   data={data}
 *   onError={(error) => console.error('Table error:', error)}
 * />
 * ```
 */
export function DataTableWithErrorBoundary<TData extends Record<string, unknown> = Record<string, unknown>>({
  errorFallback,
  onError,
  ...dataTableProps
}: DataTableWithErrorBoundaryProps<TData>) {
  return (
    <ErrorBoundary fallback={errorFallback} onError={onError}>
      <DataTable {...dataTableProps} />
    </ErrorBoundary>
  )
}

export default DataTableWithErrorBoundary

