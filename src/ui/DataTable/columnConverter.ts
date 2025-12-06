/**
 * Helper to create a column helper for a specific data type
 *
 * This is a convenience wrapper around TanStack Table's createColumnHelper.
 * Use this when defining columns for DataTable.
 *
 * @example
 * ```tsx
 * const columnHelper = createDataTableColumnHelper<User>()
 *
 * const columns = [
 *   columnHelper.accessor('name', {
 *     header: 'Name',
 *   }),
 *   columnHelper.accessor('email', {
 *     header: 'Email',
 *   }),
 * ]
 * ```
 */
import { createColumnHelper } from '@tanstack/react-table'

export function createDataTableColumnHelper<
  TData extends Record<string, unknown>,
>() {
  return createColumnHelper<TData>()
}
