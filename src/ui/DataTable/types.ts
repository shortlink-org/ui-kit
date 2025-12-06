/**
 * Type definitions for DataTable column meta
 */

import type React from 'react'
import type { Column } from '@tanstack/react-table'

export interface DataTableColumnMeta {
  /**
   * Custom className for header cell
   */
  headerClassName?: string

  /**
   * Custom className for data cell
   */
  cellClassName?: string

  /**
   * Custom className (fallback for backward compatibility)
   */
  className?: string

  /**
   * Custom filter component
   * @param props - Filter component props
   */
  filterComponent?: <TData, TValue>(props: {
    column: Column<TData, TValue>
    density?: 'compact' | 'normal' | 'comfortable'
  }) => React.ReactNode
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> extends DataTableColumnMeta {}
}
