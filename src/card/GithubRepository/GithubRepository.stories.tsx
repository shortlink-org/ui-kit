import type { Meta, StoryObj } from '@storybook/react-vite'
import { GithubRepository } from './GithubRepository'

const meta: Meta<typeof GithubRepository> = {
  title: 'Card/GithubRepository',
  component: GithubRepository,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof GithubRepository>

export const Default: Story = {
  args: {
    title: 'shortlink',
    url: 'https://github.com/shortlink-org/shortlink',
    description:
      'Core monorepo for ShortLink, including the application, shared UI kit, infrastructure, and supporting services.',
    meta: 'Monorepo',
    ctaText: 'Open on GitHub',
  },
}

export const RepositoryList: Story = {
  render: () => (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-14 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            Repositories
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-foreground)]">
            Repository cards in a realistic developer section
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--color-muted-foreground)]">
            Use the card as a compact entry point to source code, SDKs, docs,
            or internal tooling repositories.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          <GithubRepository
            title="shortlink"
            url="https://github.com/shortlink-org/shortlink"
            description="Main application monorepo with shared UI, storefront surfaces, backend services, and deployment assets."
            meta="Monorepo"
            ctaText="Open repository"
            accentColor="#2563eb"
            hoverColor="#06b6d4"
          />
          <GithubRepository
            title="shortlink-sdk"
            url="https://github.com/shortlink-org/shortlink-sdk"
            description="Client SDK for link creation, analytics retrieval, and campaign automation flows."
            meta="SDK"
            ctaText="Inspect SDK"
            accentColor="#0d9488"
            hoverColor="#22c55e"
          />
          <GithubRepository
            title="shortlink-docs"
            url="https://github.com/shortlink-org/shortlink-docs"
            description="Product documentation, API references, onboarding examples, and release notes."
            meta="Documentation"
            ctaText="Read docs source"
            accentColor="#ea580c"
            hoverColor="#f59e0b"
          />
        </div>
      </div>
    </div>
  ),
}
