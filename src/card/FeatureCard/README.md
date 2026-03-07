# FeatureCard

Marketing-oriented feature card with layered gradients, subtle motion, and a flexible CTA API.

## Features

- Gradient-backed icon treatment
- Soft decorative background glow
- Hover lift and tilt with reduced-motion fallback
- Optional eyebrow, metric, and CTA
- Works as a single card or in a product-marketing grid

## Usage

```tsx
import { LinkIcon } from '@heroicons/react/24/outline'
import { FeatureCard } from '@shortlink-org/ui-kit'

export function Example() {
  return (
    <FeatureCard
      icon={<LinkIcon className="size-8" />}
      title="Branded links"
      description="Launch memorable campaign URLs without sacrificing trust or conversion."
      eyebrow="Acquisition"
      metric="48% higher CTR"
      linkText="Explore links"
      href="#"
      iconGradient={{ from: 'blue-500', to: 'cyan-600' }}
      decorationGradient={{ from: 'blue-500/10', to: 'cyan-500/5' }}
      linkColor="cyan"
    />
  )
}
```

## Grid Example

```tsx
import {
  ArrowPathIcon,
  ChartBarSquareIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'
import { FeatureCard } from '@shortlink-org/ui-kit'

export function FeatureGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <FeatureCard
        icon={<LinkIcon className="size-8" />}
        title="Branded links"
        description="Publish memorable short URLs for campaigns and creators."
        eyebrow="Acquisition"
        metric="48% higher CTR"
        href="#"
      />
      <FeatureCard
        icon={<ChartBarSquareIcon className="size-8" />}
        title="Live analytics"
        description="Track clicks, referrers, and conversion quality in one place."
        eyebrow="Insights"
        metric="Realtime"
        href="#"
        iconGradient={{ from: 'orange-500', to: 'red-600' }}
        decorationGradient={{ from: 'orange-500/10', to: 'red-500/5' }}
        linkColor="orange"
      />
      <FeatureCard
        icon={<ArrowPathIcon className="size-8" />}
        title="Fast sync"
        description="Keep routing rules aligned across teams and integrations."
        eyebrow="Operations"
        metric="12 integrations"
        href="#"
        iconGradient={{ from: 'green-500', to: 'teal-600' }}
        decorationGradient={{ from: 'green-500/10', to: 'teal-500/5' }}
        linkColor="teal"
      />
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | required | Icon element shown in the gradient tile |
| `title` | `string` | required | Card heading |
| `description` | `string` | required | Supporting copy |
| `linkText` | `string` | `'Learn more'` | CTA label |
| `onLinkClick` | `() => void` | `undefined` | CTA click handler for button mode |
| `href` | `string` | `undefined` | CTA href for link mode |
| `eyebrow` | `string` | `'Feature'` | Small category label above the title |
| `metric` | `string` | `undefined` | Optional compact KPI pill |
| `className` | `string` | `undefined` | Additional card classes |
| `iconGradient` | `{ from: GradientColor; to: GradientColor }` | `{ from: 'indigo-500', to: 'blue-600' }` | Gradient for the icon tile |
| `decorationGradient` | `{ from: DecorationColor; to: DecorationColor }` | `{ from: 'indigo-500/10', to: 'cyan-500/5' }` | Decorative ambient gradient |
| `linkColor` | `'indigo' \| 'purple' \| 'blue' \| 'green' \| 'red' \| 'yellow' \| 'pink' \| 'teal' \| 'cyan' \| 'orange'` | `'indigo'` | Semantic CTA color |

## Notes

- If both `href` and `onLinkClick` are omitted, the CTA is not rendered.
- Motion automatically softens when the user prefers reduced motion.
- The component is best used inside feature grids, pricing pages, and landing-page sections.
