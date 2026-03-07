# GithubRepository

Repository link card for source-code sections, docs hubs, or developer portals.

## Usage

```tsx
import { GithubRepository } from '@shortlink-org/ui-kit'

export function Example() {
  return (
    <GithubRepository
      title="shortlink"
      url="https://github.com/shortlink-org/shortlink"
      description="Core monorepo for the product, shared UI, and supporting services."
      meta="Monorepo"
      ctaText="Open on GitHub"
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `url` | `string` | required | Repository URL |
| `title` | `string` | required | Card heading |
| `description` | `string` | built-in fallback | Supporting copy below the repo path |
| `accentColor` | `string` | `'#2563eb'` | Accent rail and primary visual color |
| `hoverColor` | `string` | `'#06b6d4'` | Secondary color for gradients and ambient glow |
| `meta` | `string` | `'Open source'` | Small label pill shown above the title |
| `ctaText` | `string` | `'View repository'` | CTA label shown on larger screens |
| `fullWidth` | `boolean` | `true` | Stretch card to full available width |
| `className` | `string` | `undefined` | Additional wrapper classes |

## Notes

- The repository path is derived automatically from the URL.
- The card opens the target in a new tab with `noopener noreferrer`.
- Best used in lists of engineering resources, SDK directories, or docs portals.
