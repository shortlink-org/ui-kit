import { type Table as TanStackTable } from '@tanstack/react-table'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { Button } from '@headlessui/react'
import './styles.css'

export interface PaginationProps<TData> {
  table: TanStackTable<TData>
  pageSizeOptions?: number[]
  mobilePageSizeControl?: boolean
}

const DEFAULT_PAGE_SIZES = [10, 20, 30, 50, 100]

export function Pagination<TData>({
  table,
  pageSizeOptions = DEFAULT_PAGE_SIZES,
  mobilePageSizeControl = true,
}: PaginationProps<TData>) {
  const {
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,
    previousPage,
    nextPage,
    setPageIndex,
    setPageSize,
    getState,
  } = table

  const { pagination } = getState()
  const currentPage = pagination.pageIndex + 1
  const totalPages = getPageCount()
  const currentPageSize = pagination.pageSize
  const totalRows = table.getRowCount()
  const startRow = pagination.pageIndex * pagination.pageSize + 1
  const endRow = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    totalRows,
  )
  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (page) => {
      if (page === 1 || page === totalPages) return false
      return page >= currentPage - 1 && page <= currentPage + 1
    },
  )

  if (totalPages <= 1 && currentPageSize >= totalRows) {
    return null
  }

  const pageButtonClassName = (isActive: boolean) =>
    clsx(
      'inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-sm font-semibold transition-[background-color,color,box-shadow] duration-200',
      isActive
        ? 'bg-slate-950 text-white shadow-[0_18px_48px_-34px_rgba(15,23,42,0.5)]'
        : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]',
    )

  const handlePageSizeChange = (value: string) => {
    const nextSize = Number(value)

    if (Number.isNaN(nextSize)) {
      return
    }

    setPageSize(nextSize)
    setPageIndex(0)
  }

  return (
    <div
      className="ui-pagination mt-6 rounded-[1.65rem] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_96%,white)] p-4 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.35)] sm:p-5"
      data-mobile-page-size-control={mobilePageSizeControl ? 'true' : 'false'}
    >
      {mobilePageSizeControl ? (
        <div className="ui-pagination__mobile rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-background)]/70 px-3 py-3">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
            <Button
              onClick={() => previousPage()}
              disabled={!getCanPreviousPage()}
              className={clsx(
                'inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm font-semibold text-[var(--color-foreground)]',
                'transition-[background-color,border-color,box-shadow] duration-200 hover:bg-[var(--color-muted)]',
                'disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-surface)]',
              )}
            >
              <ChevronLeftIcon className="h-4 w-4 rtl:-scale-x-100" />
              <span className="hidden min-[24rem]:inline">Previous</span>
            </Button>

            <div className="justify-self-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)]">
              <span>Page </span>
              <span className="font-semibold text-[var(--color-foreground)]">
                {currentPage}
              </span>
              <span> / {totalPages}</span>
            </div>

            <Button
              onClick={() => nextPage()}
              disabled={!getCanNextPage()}
              className={clsx(
                'inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm font-semibold text-[var(--color-foreground)]',
                'transition-[background-color,border-color,box-shadow] duration-200 hover:bg-[var(--color-muted)]',
                'disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-surface)]',
              )}
            >
              <span className="hidden min-[24rem]:inline">Next</span>
              <ChevronRightIcon className="h-4 w-4 rtl:-scale-x-100" />
            </Button>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5">
            <div className="min-w-0">
              <p className="text-sm text-[var(--color-muted-foreground)]">
                Showing <span className="font-medium">{startRow}</span> to{' '}
                <span className="font-medium">{endRow}</span> of{' '}
                <span className="font-medium">{totalRows}</span>
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
                Rows per page
              </p>
            </div>

            <div className="relative shrink-0">
              <span className="mb-1 block text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
                Rows
              </span>
              <select
                value={currentPageSize}
                onChange={(event) => handlePageSizeChange(event.target.value)}
                className="min-w-[6.5rem] cursor-pointer appearance-none rounded-full border border-slate-300 bg-white py-2 pr-9 pl-3 text-center text-sm font-semibold text-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                aria-label="Rows per page"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size} / page
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
            </div>
          </div>
        </div>
      ) : null}

      <div className="ui-pagination__desktop gap-4">
        <div className="ui-pagination__nav">
          <Button
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
            className={clsx(
              'ui-pagination__button',
              'inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold capitalize text-[var(--color-foreground)] md:w-auto',
              'transition-[background-color,border-color,box-shadow] duration-200 hover:bg-[var(--color-muted)] hover:shadow-[0_18px_48px_-36px_rgba(15,23,42,0.25)]',
              'disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-surface)]',
            )}
          >
            <ChevronLeftIcon className="h-5 w-5 rtl:-scale-x-100" />
            <span>Previous</span>
          </Button>

          <div className="ui-pagination__pages min-w-0 overflow-x-auto">
            <div className="ui-pagination__pages-desktop min-w-max items-center justify-center gap-2">
              <button
                onClick={() => setPageIndex(0)}
                className={pageButtonClassName(currentPage === 1)}
              >
                1
              </button>

              {currentPage > 3 ? (
                <span className="px-1 text-sm text-[var(--color-muted-foreground)]">
                  ...
                </span>
              ) : null}

              {visiblePages.map((page) => (
                <button
                  key={page}
                  onClick={() => setPageIndex(page - 1)}
                  className={pageButtonClassName(page === currentPage)}
                >
                  {page}
                </button>
              ))}

              {currentPage < totalPages - 2 ? (
                <span className="px-1 text-sm text-[var(--color-muted-foreground)]">
                  ...
                </span>
              ) : null}

              {totalPages > 1 ? (
                <button
                  onClick={() => setPageIndex(totalPages - 1)}
                  className={pageButtonClassName(currentPage === totalPages)}
                >
                  {totalPages}
                </button>
              ) : null}
            </div>

            <div className="ui-pagination__pages-compact inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-background)]/70 px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)]">
              <span>Page</span>
              <span className="rounded-full bg-slate-950 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                {currentPage}/{totalPages}
              </span>
            </div>
          </div>

          <Button
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
            className={clsx(
              'ui-pagination__button',
              'inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold capitalize text-[var(--color-foreground)] md:w-auto',
              'transition-[background-color,border-color,box-shadow] duration-200 hover:bg-[var(--color-muted)] hover:shadow-[0_18px_48px_-36px_rgba(15,23,42,0.25)]',
              'disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-surface)]',
            )}
          >
            <span>Next</span>
            <ChevronRightIcon className="h-5 w-5 rtl:-scale-x-100" />
          </Button>
        </div>

        <div className="ui-pagination__summary rounded-[1.3rem] border border-[var(--color-border)] bg-[var(--color-background)]/70 px-4 py-3">
          <div className="ui-pagination__summary-inner grid gap-3">
            <p className="text-sm leading-6 text-[var(--color-muted-foreground)]">
              Showing <span className="font-medium tabular-nums">{startRow}</span>{' '}
              to <span className="font-medium tabular-nums">{endRow}</span> of{' '}
              <span className="font-medium tabular-nums">{totalRows}</span>
            </p>
            <div className="ui-pagination__summary-controls flex items-center justify-between gap-3">
              <span className="whitespace-nowrap text-sm font-medium text-[var(--color-muted-foreground)]">
                Rows per page:
              </span>
              <div className="relative">
                <select
                  value={currentPageSize}
                  onChange={(event) => handlePageSizeChange(event.target.value)}
                  className="min-w-[6.5rem] cursor-pointer appearance-none rounded-full border border-slate-300 bg-white py-2 pr-9 pl-3 text-center text-sm font-semibold text-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                  aria-label="Rows per page"
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size} / page
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
