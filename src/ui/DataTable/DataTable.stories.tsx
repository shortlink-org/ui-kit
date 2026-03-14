import { useMemo, useState, type ReactNode } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import preview from '#.storybook/preview'
import { DataTable, type DataTableProps } from './DataTable'
import { createDataTableColumnHelper } from './columnConverter'
import {
  TrashIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline'
import { fn } from 'storybook/test'
import Header from '../../page/Header/Header'
import Button from '../Button/Button'

type LinkData = {
  url: string
  hash: string
  describe: string
  createdAt: string
}

const columnHelper = createDataTableColumnHelper<LinkData>()

const meta = preview.meta({
  title: 'UI/DataTable',
  component: DataTable as typeof DataTable,
})

function Template(args: DataTableProps<LinkData>) {
  return <DataTable<LinkData> {...args} />
}

type RowActionState = {
  action: 'add' | 'copy' | 'duplicate' | 'delete'
  row: LinkData
}

function RowActionButton({
  label,
  icon,
  onClick,
  variant = 'neutral',
}: {
  label: string
  icon: ReactNode
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'neutral' | 'danger'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        variant === 'danger'
          ? 'inline-flex cursor-pointer items-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 transition-colors duration-200 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/20 dark:text-rose-300 dark:hover:bg-rose-950/30'
          : 'inline-flex cursor-pointer items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs font-medium text-[var(--color-foreground)] transition-colors duration-200 hover:bg-[var(--color-muted)]'
      }
      title={label}
      aria-label={label}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </button>
  )
}

function WithRowActionsStory(args: DataTableProps<LinkData>) {
  const [rows, setRows] = useState<LinkData[]>(() => [...args.data])
  const [lastAction, setLastAction] = useState<RowActionState | null>(null)

  const createRow = (seed: number): LinkData => ({
    url: `https://new-link-${seed}.example.com`,
    hash: `new-${seed}`,
    describe: `Generated record ${seed}`,
    createdAt: Temporal.Now.instant().toString(),
  })

  const handleAdd = () => {
    const nextRow = createRow(rows.length + 1)
    setRows((current) => [nextRow, ...current])
    setLastAction({ action: 'add', row: nextRow })
    fn()('Add record', nextRow)
  }

  const renderRowActions = (row: LinkData) => (
    <div className="flex items-center justify-end gap-2">
      <RowActionButton
        label="Copy"
        icon={<ClipboardDocumentIcon className="h-4 w-4" />}
        onClick={async (event) => {
          event.stopPropagation()
          try {
            await navigator.clipboard.writeText(row.url)
          } catch {
            // Ignore clipboard errors in restricted browser contexts.
          }
          setLastAction({ action: 'copy', row })
          fn()('Copy record', row)
        }}
      />
      <RowActionButton
        label="Duplicate"
        icon={<DocumentDuplicateIcon className="h-4 w-4" />}
        onClick={(event) => {
          event.stopPropagation()
          const duplicateRow: LinkData = {
            ...row,
            hash: `${row.hash}-copy-${String(Temporal.Now.instant().epochMilliseconds).slice(-4)}`,
            url: row.url.replace('https://', 'https://copy-'),
            describe: `${row.describe} (Copy)`,
            createdAt: Temporal.Now.instant().toString(),
          }
          setRows((current) => [duplicateRow, ...current])
          setLastAction({ action: 'duplicate', row: duplicateRow })
          fn()('Duplicate record', duplicateRow)
        }}
      />
      <RowActionButton
        label="Delete"
        variant="danger"
        icon={<TrashIcon className="h-4 w-4" />}
        onClick={(event) => {
          event.stopPropagation()
          setRows((current) => current.filter((item) => item.hash !== row.hash))
          setLastAction({ action: 'delete', row })
          fn()('Delete record', row)
        }}
      />
    </div>
  )

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
      <Header
        title="Row-level actions"
        eyebrow="Operations console"
        description="Actions perform actual changes in the story: add creates a row, copy writes the URL to the clipboard, duplicate inserts a copy and delete removes the record."
        stats={[
          { label: 'Visible rows', value: rows.length },
          { label: 'Available actions', value: '4' },
        ]}
        primaryAction={{
          label: 'Add record',
          variant: 'primary',
          handler: handleAdd,
        }}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <DataTable<LinkData>
          {...args}
          data={rows}
          renderRowActions={renderRowActions}
        />
        <aside className="rounded-[1.15rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
            Last action
          </p>
          {lastAction ? (
            <div className="mt-3 space-y-2 text-sm text-[var(--color-foreground)]">
              <p className="font-semibold capitalize">{lastAction.action}</p>
              <p className="break-all text-[var(--color-muted-foreground)]">
                {lastAction.row.url}
              </p>
              <p className="font-mono text-xs text-[var(--color-muted-foreground)]">
                {lastAction.row.hash}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
              Add, copy, duplicate or delete a record to see the result here.
            </p>
          )}
        </aside>
      </div>
    </section>
  )
}

function WithHeaderAndBadgeStory(args: DataTableProps<LinkData>) {
  const initialRows = useMemo(() => args.data.slice(0, 8), [args.data])
  const [rows, setRows] = useState<LinkData[]>(initialRows)
  const [query, setQuery] = useState('')

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return rows
    }

    return rows.filter((row) =>
      [row.url, row.hash, row.describe].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    )
  }, [query, rows])

  const handleAddVendor = () => {
    const seed = rows.length + 1
    const nextRow: LinkData = {
      url: `https://vendor-${seed}.example.com`,
      hash: `vendor-${seed}`,
      describe: `Vendor profile ${seed}`,
      createdAt: Temporal.Now.instant().toString(),
    }

    setRows((current) => [nextRow, ...current])
    fn()('Add vendor', nextRow)
  }

  const totalCount = filteredRows.length

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
      <Header
        title="Customers"
        eyebrow="Vendor operations"
        description="Review vendor records, search across links and manage onboarding from one compact control surface."
        stats={[
          { label: 'Visible vendors', value: totalCount },
          { label: 'Monitored', value: '6' },
          { label: 'Pending review', value: '2' },
        ]}
        secondaryAction={{
          label: `${totalCount} vendors`,
          handler: () => undefined,
          customNode: (
            <span className="rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              {totalCount} vendors
            </span>
          ),
        }}
        primaryAction={{
          label: 'Add vendor',
          variant: 'primary',
          handler: handleAddVendor,
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.15rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)]">
        <div className="inline-flex overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]">
          <button
            type="button"
            className="cursor-pointer bg-[var(--color-muted)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)]"
          >
            View all
          </button>
          <button
            type="button"
            className="cursor-pointer px-4 py-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors duration-200 hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
          >
            Monitored
          </button>
          <button
            type="button"
            className="cursor-pointer px-4 py-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors duration-200 hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
          >
            Pending review
          </button>
        </div>

        <div className="flex w-full max-w-md items-center gap-3 sm:w-auto">
          <input
            type="search"
            placeholder="Search vendors"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-10 min-w-0 flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300/30"
          />
          <Button size="md" variant="secondary">
            Import
          </Button>
        </div>
      </div>

      <DataTable<LinkData> {...args} data={filteredRows} />
    </section>
  )
}

const sampleData: LinkData[] = Array.from({ length: 50 }, (_, i) => ({
  url: `https://example${i + 1}.com`,
  hash: `hash${i + 1}`,
  describe: `Description for link ${i + 1}`,
  createdAt: Temporal.Now.instant()
    .subtract({
      seconds: Math.floor(Math.random() * 30 * 24 * 60 * 60),
    })
    .toString(),
}))

export const Default = meta.story({
  render: Template,
  args: {
    data: sampleData.slice(0, 10),
    columns: [
      columnHelper.accessor('url', { header: 'URL', size: 200 }),
      columnHelper.accessor('hash', { header: 'Hash', size: 150 }),
      columnHelper.accessor('describe', { header: 'Description', size: 250 }),
    ] as ColumnDef<LinkData, unknown>[],
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
    ] as ColumnDef<LinkData, unknown>[],
    sorting: true,
    pagination: false,
    emptyMessage:
      'No vendors found. Your search did not match any vendors. Please try again or add a new vendor.',
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
        cell: (info) =>
          Temporal.Instant.from(info.getValue() as string).toLocaleString(
            undefined,
            { dateStyle: 'medium' },
          ),
      }),
    ] as ColumnDef<LinkData, unknown>[],
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
      columnHelper.accessor('url', {
        header: 'URL',
        size: 200,
        enableColumnFilter: true,
      }),
      columnHelper.accessor('hash', {
        header: 'Hash',
        size: 150,
        enableColumnFilter: true,
      }),
      columnHelper.accessor('describe', {
        header: 'Description',
        size: 250,
        enableColumnFilter: true,
      }),
    ] as ColumnDef<LinkData, unknown>[],
    sorting: true,
    pagination: true,
    filters: true,
    pageSize: 10,
  },
})

/**
 * Table with realistic row actions.
 * Demonstrates common enterprise actions for each record.
 */
export const WithRowActions = meta.story({
  render: WithRowActionsStory,
  args: {
    data: sampleData.slice(0, 10),
    columns: [
      columnHelper.accessor('url', { header: 'URL', size: 200 }),
      columnHelper.accessor('hash', { header: 'Hash', size: 150 }),
      columnHelper.accessor('describe', { header: 'Description', size: 250 }),
    ] as ColumnDef<LinkData, unknown>[],
    sorting: true,
    pagination: false,
  },
})

/**
 * Table with header, badge showing record count, and row actions.
 * Demonstrates a complete table layout with title, badge, and action buttons.
 */
export const WithHeaderAndBadge = meta.story({
  render: WithHeaderAndBadgeStory,
  args: {
    data: sampleData.slice(0, 10),
    columns: [
      columnHelper.accessor('url', { header: 'URL', size: 200 }),
      columnHelper.accessor('hash', { header: 'Hash', size: 150 }),
      columnHelper.accessor('describe', { header: 'Description', size: 250 }),
    ] as ColumnDef<LinkData, unknown>[],
    sorting: true,
    pagination: true,
    pageSize: 8,
  },
})
