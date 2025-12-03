import React from 'react'
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary'
import { Table, type TableProps } from './Table'

export interface TableWithErrorBoundaryProps extends TableProps {
  errorFallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

/**
 * Table component wrapped with ErrorBoundary.
 * Catches errors thrown in transitions (React 19 Actions) and other component errors.
 * 
 * @example
 * ```tsx
 * <TableWithErrorBoundary
 *   columns={columns}
 *   data={data}
 *   onError={(error) => console.error('Table error:', error)}
 * />
 * ```
 */
export const TableWithErrorBoundary: React.FC<TableWithErrorBoundaryProps> = ({
  errorFallback,
  onError,
  ...tableProps
}) => {
  return (
    <ErrorBoundary fallback={errorFallback} onError={onError}>
      <Table {...tableProps} />
    </ErrorBoundary>
  )
}

export default TableWithErrorBoundary

