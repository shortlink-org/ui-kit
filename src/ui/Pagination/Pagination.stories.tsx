import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import preview from '#.storybook/preview'
import { Pagination } from './Pagination'
import { createDataTableColumnHelper } from '../DataTable/columnConverter'

type SampleData = {
  id: number
  name: string
  email: string
  role: string
}

const columnHelper = createDataTableColumnHelper<SampleData>()

const columns = [
  columnHelper.accessor('name', { header: 'Name', size: 150 }),
  columnHelper.accessor('email', { header: 'Email', size: 200 }),
  columnHelper.accessor('role', { header: 'Role', size: 150 }),
] as ColumnDef<SampleData, unknown>[]

const sampleData: SampleData[] = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
}))

function PaginationWrapper({
  pageSize = 10,
  pageIndex = 0,
  pageSizeOptions,
  mobilePageSizeControl = true,
}: {
  pageSize?: number
  pageIndex?: number
  pageSizeOptions?: number[]
  mobilePageSizeControl?: boolean
}) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
        pageIndex,
      },
    },
  })

  return (
    <Pagination
      table={table}
      pageSizeOptions={pageSizeOptions}
      mobilePageSizeControl={mobilePageSizeControl}
    />
  )
}

const meta = preview.meta({
  title: 'UI/Pagination',
  component: Pagination as typeof Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1280, 1600],
    },
  },
})

export default meta

export const Showcase = meta.story({
  render: () => (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e0f2fe_0%,#f8fafc_34%,#eef2ff_100%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_32px_120px_-60px_rgba(15,23,42,0.48)] backdrop-blur-xl sm:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-700">
            Data navigation
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            Pagination inside a modern analytics workspace
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
            The showcase keeps a single story, but still covers first, middle,
            last and large-page-count states in a realistic page shell.
          </p>
        </div>

        <div className="mt-8 space-y-10">
          <section className="rounded-[1.6rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_55px_-42px_rgba(15,23,42,0.4)]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  First page
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                  Standard account list
                </p>
              </div>
              <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                15 pages
              </span>
            </div>
            <PaginationWrapper pageSize={10} pageIndex={0} />
          </section>

          <section className="rounded-[1.6rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_55px_-42px_rgba(15,23,42,0.4)]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Mid-stream
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                  Operators reviewing page 5
                </p>
              </div>
              <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                dense state
              </span>
            </div>
            <PaginationWrapper pageSize={10} pageIndex={4} />
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_55px_-42px_rgba(15,23,42,0.4)]">
              <div className="mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Last page
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                  End-of-list state
                </p>
              </div>
              <PaginationWrapper pageSize={10} pageIndex={14} />
            </div>

            <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_55px_-42px_rgba(15,23,42,0.4)]">
              <div className="mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Long navigation
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                  Large dataset with ellipsis
                </p>
              </div>
              <PaginationWrapper pageSize={5} pageIndex={10} />
            </div>
          </section>

          <section className="rounded-[1.6rem] border border-slate-200/80 bg-slate-950 p-5 text-slate-50 shadow-[0_24px_70px_-44px_rgba(15,23,42,0.55)]">
            <div className="mb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-200">
                Custom density
              </p>
              <p className="mt-1 text-lg font-semibold tracking-tight">
                Alternate page-size controls
              </p>
            </div>
            <PaginationWrapper
              pageSize={10}
              pageIndex={0}
              pageSizeOptions={[5, 10, 25, 50, 100]}
            />
          </section>
        </div>
      </div>
    </div>
  ),
})
