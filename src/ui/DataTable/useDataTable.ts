import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  type ColumnDef,
  type TableOptions,
  type SortingState,
  type ColumnVisibilityState,
  type PaginationState,
  type ColumnSizingState,
  type ColumnPinningState,
  type ColumnOrderState,
  type ExpandedState,
  type GroupingState,
} from '@tanstack/react-table'
import { useState, useMemo } from 'react'

export interface UseDataTableOptions<TData> {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  sorting?: boolean
  pagination?: boolean
  filters?: boolean
  globalFilter?: boolean
  pageSize?: number
  enableColumnVisibility?: boolean
  enableRowSelection?: boolean
  enableColumnResizing?: boolean
  enableColumnPinning?: boolean
  enableColumnOrdering?: boolean
  enableGrouping?: boolean
  enableExpanding?: boolean
  columnResizeMode?: 'onChange' | 'onEnd'
  initialState?: {
    sorting?: SortingState
    columnVisibility?: ColumnVisibilityState
    pagination?: Partial<PaginationState>
    globalFilter?: string
    columnSizing?: ColumnSizingState
    columnPinning?: ColumnPinningState
    columnOrder?: ColumnOrderState
    expanded?: ExpandedState
    grouping?: GroupingState
  }
}

export function useDataTable<TData>({
  data,
  columns,
  sorting = true,
  pagination = true,
  filters = false,
  globalFilter = false,
  pageSize = 10,
  enableColumnVisibility = true,
  enableRowSelection = false,
  enableColumnResizing = false,
  enableColumnPinning = false,
  enableColumnOrdering = false,
  enableGrouping = false,
  enableExpanding = false,
  columnResizeMode = 'onChange',
  initialState,
}: UseDataTableOptions<TData>) {
  // Sorting state
  const [sortingState, setSortingState] = useState<SortingState>(
    initialState?.sorting ?? []
  )

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>(
    initialState?.columnVisibility ?? {}
  )

  // Column sizing state
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>(
    initialState?.columnSizing ?? {}
  )

  // Column pinning state
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(
    initialState?.columnPinning ?? { left: [], right: [] }
  )

  // Column ordering state
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    initialState?.columnOrder ?? []
  )

  // Expanded state
  const [expanded, setExpanded] = useState<ExpandedState>(
    initialState?.expanded ?? {}
  )

  // Grouping state
  const [grouping, setGrouping] = useState<GroupingState>(
    initialState?.grouping ?? []
  )

  // Global filter state (only if enabled)
  const [globalFilterState, setGlobalFilterState] = useState<string>(
    initialState?.globalFilter ?? ''
  )

  // Pagination state
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: initialState?.pagination?.pageIndex ?? 0,
    pageSize: initialState?.pagination?.pageSize ?? pageSize,
  })

  // Row selection state (if enabled)
  const [rowSelection, setRowSelection] = useState({})

  // Build table options
  const tableOptions: TableOptions<TData> = useMemo(
    () => ({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      ...(sorting && {
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSortingState,
        enableSorting: true,
      }),
      ...(pagination && {
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPaginationState,
        enablePagination: true,
      }),
      // Filtered row model handles both column filters and global filters
      ...((filters || globalFilter) && {
        getFilteredRowModel: getFilteredRowModel(),
        ...(filters && { enableColumnFilters: true }),
        ...(globalFilter && {
          enableGlobalFilter: true,
          globalFilterFn: 'includesString',
          onGlobalFilterChange: setGlobalFilterState,
        }),
      }),
      ...(enableGrouping && {
        getGroupedRowModel: getGroupedRowModel(),
        onGroupingChange: setGrouping,
        enableGrouping: true,
      }),
      ...(enableExpanding && {
        getExpandedRowModel: getExpandedRowModel(),
        onExpandedChange: setExpanded,
        enableExpanding: true,
      }),
      ...(enableColumnVisibility && {
        onColumnVisibilityChange: setColumnVisibility,
        enableHiding: true,
      }),
      ...(enableColumnResizing && {
        onColumnSizingChange: setColumnSizing,
        enableColumnResizing: true,
        columnResizeMode,
      }),
      ...(enableColumnPinning && {
        onColumnPinningChange: setColumnPinning,
        enablePinning: true,
      }),
      ...(enableColumnOrdering && {
        onColumnOrderChange: setColumnOrder,
        enableColumnOrdering: true,
      }),
      ...(enableRowSelection && {
        onRowSelectionChange: setRowSelection,
        enableRowSelection: true,
      }),
      state: {
        ...(sorting && { sorting: sortingState }),
        ...(pagination && { pagination: paginationState }),
        ...(enableColumnVisibility && { columnVisibility }),
        ...(enableColumnResizing && { columnSizing }),
        ...(enableColumnPinning && { columnPinning }),
        ...(enableColumnOrdering && { columnOrder }),
        ...(enableGrouping && { grouping }),
        ...(enableExpanding && { expanded }),
        ...(enableRowSelection && { rowSelection }),
        ...(globalFilter && { globalFilter: globalFilterState }),
      },
    }),
    [
      data,
      columns,
      sorting,
      pagination,
      filters,
      globalFilter,
      enableColumnVisibility,
      enableColumnResizing,
      enableColumnPinning,
      enableColumnOrdering,
      enableGrouping,
      enableExpanding,
      enableRowSelection,
      columnResizeMode,
      sortingState,
      columnVisibility,
      columnSizing,
      columnPinning,
      columnOrder,
      grouping,
      expanded,
      paginationState,
      globalFilterState,
      rowSelection,
      pageSize,
    ]
  )

  const table = useReactTable(tableOptions)

  return {
    table,
    sorting: sortingState,
    setSorting: setSortingState,
    columnVisibility,
    setColumnVisibility,
    columnSizing,
    setColumnSizing,
    columnPinning,
    setColumnPinning,
    columnOrder,
    setColumnOrder,
    expanded,
    setExpanded,
    grouping,
    setGrouping,
    pagination: paginationState,
    setPagination: setPaginationState,
    rowSelection,
    setRowSelection,
    globalFilterState,
    setGlobalFilterState,
  }
}

