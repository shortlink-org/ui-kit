import { type Table as TanStackTable } from '@tanstack/react-table'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'

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

  if (totalPages <= 1 && currentPageSize >= totalRows) {
    return null
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      {/* Mobile: Show range and page size control */}
      {mobilePageSizeControl && (
        <div className="flex sm:hidden items-center justify-between w-full">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{startRow}</span> to{' '}
            <span className="font-medium">{endRow}</span> of{' '}
            <span className="font-medium">{totalRows}</span>
          </span>
          <Menu as="div" className="relative">
            <MenuButton
              className={clsx(
                'inline-flex items-center justify-center rounded-md p-2',
                'text-gray-700 dark:text-gray-300',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                'transition-all duration-200',
              )}
            >
              <EllipsisVerticalIcon className="w-5 h-5" />
            </MenuButton>
            <MenuItems
              transition
              anchor="top"
              className={clsx(
                'absolute bottom-full right-0 mb-2 z-10 w-32 origin-bottom-right rounded-md',
                'bg-white dark:bg-gray-800 shadow-lg',
                'ring-1 ring-black/5 dark:ring-white/10',
                'focus:outline-none',
                'transition data-closed:scale-95 data-closed:transform data-closed:opacity-0',
                'data-enter:duration-100 data-enter:ease-out',
                'data-leave:duration-75 data-leave:ease-in',
              )}
            >
              <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                Rows per page
              </div>
              {pageSizeOptions.map((size) => (
                <MenuItem key={size}>
                  <button
                    onClick={() => {
                      setPageSize(size)
                      setPageIndex(0)
                    }}
                    className={clsx(
                      'w-full text-left px-3 py-2 text-sm',
                      'text-gray-700 dark:text-gray-300',
                      'data-focus:bg-gray-100 dark:data-focus:bg-gray-700',
                      currentPageSize === size &&
                        'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
                    )}
                  >
                    {size}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
          className={clsx(
            'flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200',
            'bg-white border border-gray-300 dark:border-gray-700 rounded-md gap-x-2',
            'hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white',
          )}
        >
          <ChevronLeftIcon className="w-5 h-5 rtl:-scale-x-100" />
          <span className="hidden sm:inline">previous</span>
        </Button>

        <div className="items-center hidden md:flex gap-x-3">
          {/* Always show first page */}
          <button
            onClick={() => setPageIndex(0)}
            className={clsx(
              'px-2 py-1 text-sm rounded-md transition-colors duration-200',
              currentPage === 1
                ? 'text-blue-500 dark:bg-gray-800 bg-blue-100/60'
                : 'text-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 hover:bg-gray-100',
            )}
          >
            1
          </button>

          {/* Show pages around current page */}
          {currentPage > 3 && (
            <span className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400">
              ...
            </span>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (page === 1 || page === totalPages) return false
              return page >= currentPage - 1 && page <= currentPage + 1
            })
            .map((page) => (
              <button
                key={page}
                onClick={() => setPageIndex(page - 1)}
                className={clsx(
                  'px-2 py-1 text-sm rounded-md transition-colors duration-200',
                  page === currentPage
                    ? 'text-blue-500 dark:bg-gray-800 bg-blue-100/60'
                    : 'text-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 hover:bg-gray-100',
                )}
              >
                {page}
              </button>
            ))}

          {/* Show ellipsis if needed */}
          {currentPage < totalPages - 2 && (
            <span className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400">
              ...
            </span>
          )}

          {/* Always show last page if more than 1 page */}
          {totalPages > 1 && (
            <button
              onClick={() => setPageIndex(totalPages - 1)}
              className={clsx(
                'px-2 py-1 text-sm rounded-md transition-colors duration-200',
                currentPage === totalPages
                  ? 'text-blue-500 dark:bg-gray-800 bg-blue-100/60'
                  : 'text-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 hover:bg-gray-100',
              )}
            >
              {totalPages}
            </button>
          )}
        </div>

        <Button
          onClick={() => nextPage()}
          disabled={!getCanNextPage()}
          className={clsx(
            'flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200',
            'bg-white border border-gray-300 dark:border-gray-700 rounded-md gap-x-2',
            'hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white',
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon className="w-5 h-5 rtl:-scale-x-100" />
        </Button>
      </div>

      {/* Desktop: Show range and page size control */}
      <div className="hidden sm:flex items-center gap-4">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-medium">{startRow}</span> to{' '}
          <span className="font-medium">{endRow}</span> of{' '}
          <span className="font-medium">{totalRows}</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Rows per page:
          </span>
          <Menu as="div" className="relative">
            <MenuButton
              className={clsx(
                'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium',
                'text-gray-700 dark:text-gray-300',
                'border border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-800',
                'hover:bg-gray-50 dark:hover:bg-gray-700',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                'transition-all duration-200',
                'min-w-[70px]',
              )}
            >
              {currentPageSize}
            </MenuButton>
            <MenuItems
              transition
              className={clsx(
                'absolute bottom-full right-0 mb-2 z-10 w-20 origin-bottom-right rounded-md',
                'bg-white dark:bg-gray-800 shadow-lg',
                'ring-1 ring-black/5 dark:ring-white/10',
                'focus:outline-none',
                'transition data-closed:scale-95 data-closed:transform data-closed:opacity-0',
                'data-enter:duration-100 data-enter:ease-out',
                'data-leave:duration-75 data-leave:ease-in',
              )}
            >
              {pageSizeOptions.map((size) => (
                <MenuItem key={size}>
                  <button
                    onClick={() => {
                      setPageSize(size)
                      setPageIndex(0)
                    }}
                    className={clsx(
                      'w-full text-left px-3 py-2 text-sm',
                      'text-gray-700 dark:text-gray-300',
                      'data-focus:bg-gray-100 dark:data-focus:bg-gray-700',
                      currentPageSize === size &&
                        'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
                    )}
                  >
                    {size}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  )
}
