import preview from '#.storybook/preview'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { ProfileIdentity } from './ProfileIdentity'

const meta = preview.meta({
  title: 'UI/ProfileIdentity',
  component: ProfileIdentity,
  parameters: {
    layout: 'fullscreen',
  },
})

export default meta

export const Showcase = meta.story({
  args: {
    avatarSrc:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
    name: 'Sara Salah',
    email: 'sara@shortlink.org',
    label: 'Workspace account',
    size: 'md',
  },
  render: (args) => (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e0f2fe_0%,#f8fafc_30%,#eef2ff_100%)] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_32px_120px_-60px_rgba(15,23,42,0.46)] backdrop-blur-xl sm:p-6">
        <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/85 p-5 shadow-[0_20px_60px_-44px_rgba(15,23,42,0.34)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700">
            Shared identity block
          </p>
          <div className="group mt-4 flex items-center justify-between gap-4 rounded-[1.4rem] border border-slate-200/80 bg-slate-50/90 px-4 py-4">
            <ProfileIdentity
              {...args}
              accessory={
                <span className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors duration-200 group-hover:border-slate-300 group-hover:text-slate-900">
                  <ChevronRightIcon className="size-4" />
                </span>
              }
            />
          </div>
        </div>
      </div>
    </div>
  ),
})
