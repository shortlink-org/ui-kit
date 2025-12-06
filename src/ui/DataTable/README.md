# DataTable Component

A custom data table component built on top of TanStack Table + TailwindCSS v4 with a unified API and consistent UX.

## Features

- ✅ **Sorting** - Click column headers to sort (ASC/DESC indicators)
- ✅ **Pagination** - Full pagination controls with page navigation
- ✅ **Column Visibility** - Toggle column visibility via dropdown
- ✅ **Per-column Filters** - Basic text filters for each column
- ✅ **Row Selection** - Checkbox-based row selection with bulk actions
- ✅ **CSV Export** - Export all data, current page, or selected rows
- ✅ **Row Actions** - Custom action buttons per row
- ✅ **Bulk Actions** - Bulk delete and export selected rows
- ✅ **Toolbar** - Create, delete, refresh, and export buttons
- ✅ **Responsive** - Mobile-friendly layout
- ✅ **Dark Mode** - Full dark mode support
- ✅ **TypeScript** - Fully typed with TypeScript

## Basic Usage

```tsx
import { DataTable, createDataTableColumnHelper } from '@/ui/DataTable'
import type { ColumnDef } from '@tanstack/react-table'

type User = {
  id: string
  name: string
  email: string
}

const columnHelper = createDataTableColumnHelper<User>()

const columns: ColumnDef<User, any>[] = [
  columnHelper.accessor('name', {
    header: 'Name',
    size: 150,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    size: 200,
  }),
]

function MyTable() {
  const data: User[] = [
    { id: '1', name: 'John', email: 'john@example.com' },
    { id: '2', name: 'Jane', email: 'jane@example.com' },
  ]

  return (
    <DataTable
      data={data}
      columns={columns}
      sorting={true}
      pagination={true}
      pageSize={10}
    />
  )
}
```

## Advanced Usage

### With Row Selection and Bulk Actions

```tsx
<DataTable
  data={data}
  columns={columns}
  enableRowSelection={true}
  enableBulkDelete={true}
  enableExport={true}
  onBulkDelete={(rows) => {
    // Handle bulk delete
    console.log('Deleting:', rows)
  }}
/>
```

### With Row Actions

```tsx
<DataTable
  data={data}
  columns={columns}
  renderRowActions={(row) => (
    <div className="flex gap-2">
      <button onClick={() => handleEdit(row)}>Edit</button>
      <button onClick={() => handleDelete(row)}>Delete</button>
    </div>
  )}
/>
```

### With Filters

```tsx
const columns: ColumnDef<User, any>[] = [
  columnHelper.accessor('name', {
    header: 'Name',
    enableColumnFilter: true, // Enable filtering for this column
  }),
]

<DataTable
  data={data}
  columns={columns}
  filters={true} // Enable filter row
/>
```

### With Custom Toolbar

```tsx
<DataTable
  data={data}
  columns={columns}
  enableCreate={true}
  enableRefresh={true}
  enableExport={true}
  onCreate={() => handleCreate()}
  onRefresh={() => handleRefresh()}
/>
```

## API Reference

### DataTableProps

| Prop                     | Type                              | Default  | Description                     |
| ------------------------ | --------------------------------- | -------- | ------------------------------- |
| `data`                   | `TData[]`                         | required | Array of data rows              |
| `columns`                | `ColumnDef<TData, any>[]`         | required | Column definitions              |
| `sorting`                | `boolean`                         | `true`   | Enable column sorting           |
| `pagination`             | `boolean`                         | `true`   | Enable pagination               |
| `filters`                | `boolean`                         | `false`  | Show filter row                 |
| `pageSize`               | `number`                          | `10`     | Rows per page                   |
| `onRowClick`             | `(row: TData) => void`            | -        | Callback when row is clicked    |
| `loading`                | `boolean`                         | `false`  | Show loading state              |
| `emptyMessage`           | `string`                          | -        | Custom empty state message      |
| `enableColumnVisibility` | `boolean`                         | `true`   | Show column visibility toggle   |
| `enableRowSelection`     | `boolean`                         | `false`  | Enable row selection checkboxes |
| `enableExport`           | `boolean`                         | `false`  | Show export buttons             |
| `enableCreate`           | `boolean`                         | `false`  | Show create button              |
| `enableBulkDelete`       | `boolean`                         | `false`  | Show bulk delete button         |
| `enableRefresh`          | `boolean`                         | `false`  | Show refresh button             |
| `onCreate`               | `() => void`                      | -        | Create button callback          |
| `onBulkDelete`           | `(rows: TData[]) => void`         | -        | Bulk delete callback            |
| `onRefresh`              | `() => void`                      | -        | Refresh button callback         |
| `renderRowActions`       | `(row: TData) => React.ReactNode` | -        | Custom row actions              |

## Styling

DataTable uses TailwindCSS v4 utility classes. All styling is done via className props and can be customized:

- Table borders: `border-gray-200 dark:border-gray-700`
- Hover effects: `hover:bg-neutral-100 dark:hover:bg-gray-700/50`
- Selected rows: `bg-indigo-50 dark:bg-indigo-900/20`
- Sticky header: `sticky top-0 z-10`

## Key Features

1. **No built-in modals** - You need to implement create/edit modals yourself for full control
2. **Simple API** - Explicit props instead of complex configuration objects
3. **No MUI dependencies** - Pure TailwindCSS styling
4. **Lightweight** - Only TanStack Table as dependency
5. **Full control** - Direct access to TanStack Table instance via `useDataTable` hook
6. **Type-safe** - Fully typed with TypeScript

## Examples

See `DataTable.stories.tsx` for complete examples including:

- Basic table
- With filters
- With row actions
- With bulk actions and selection
