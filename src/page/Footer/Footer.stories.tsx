import type { ComponentProps } from 'react'
import preview from '#.storybook/preview'
import { Footer } from './Footer'

const meta = preview.meta({
  title: 'Page/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
})

export default meta

export const StorefrontFooter = meta.story({
  args: {
    logoSlot: (
      <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-white">
          SL
        </span>
        <span className="text-sm font-semibold text-[var(--color-foreground)]">
          ShortLink Commerce
        </span>
      </div>
    ),
    description:
      'Launch branded commerce links, creator storefronts and campaign analytics from one workspace.',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Marketplace API', href: '/api' },
      { label: 'Docs', href: '/docs' },
      { label: 'Trust Center', href: '/trust' },
    ],
    socialLinks: [
      {
        name: 'X',
        href: 'https://x.com',
        iconPath:
          'M1417 428h-132q-18 272-138 512.5T823 1341q-197 196-472 259l-73-130q186-57 331-178 145-121 234.5-291.5T950 620H781V428h180q8-95 8-192V128h156v108q0 101-8 192h300z',
        viewBox: '0 0 1600 1600',
      },
      {
        name: 'GitHub',
        href: 'https://github.com/shortlink-org/shortlink',
        iconPath:
          'M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103z',
      },
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com',
        iconPath:
          'M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z',
      },
    ],
    copyright: '© 2026 ShortLink Commerce. Built for modern marketplace teams.',
  },
  render: (args: ComponentProps<typeof Footer>) => (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-6 pt-20 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)]/65 p-8 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.42)] backdrop-blur-xl">
        <div className="min-h-[28rem] rounded-[1.75rem] border border-dashed border-[var(--color-border)] bg-[var(--color-background)]/70" />
        <Footer {...args} />
      </div>
    </div>
  ),
})

export const DocsPortalFooter = meta.story({
  args: {
    description:
      'Engineering docs, SDK references and migration guides for internal and external teams.',
    links: [
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Changelog', href: '/docs/changelog' },
      { label: 'Status', href: '/status' },
      { label: 'Support', href: '/support' },
    ],
    socialLinks: [],
    copyright: '© 2026 ShortLink Platform',
    LinkComponent: ({
      href,
      children,
      className,
    }: {
      href: string
      children: React.ReactNode
      className?: string
    }) => (
      <a href={href} className={className}>
        {children}
      </a>
    ),
  },
  render: (args: ComponentProps<typeof Footer>) => (
    <div className="min-h-screen bg-[var(--color-background)] px-6 pt-20">
      <div className="mx-auto max-w-6xl">
        <Footer {...args} />
      </div>
    </div>
  ),
})
