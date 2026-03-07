# Header

Page-level header block for dashboards, control centers and content-heavy workspace views.

## Features

- Supports `eyebrow`, `description` and KPI `stats`
- Built-in primary and secondary actions
- Uses the same surface and accent language as `AppHeader`, `Sidebar` and `MultiColumnLayout`
- Works as a compact title bar or as a full overview panel

## Usage

```tsx
import { Header } from '@shortlink-org/ui-kit'

export function RevenueHeader() {
  return (
    <Header
      eyebrow="Revenue cockpit"
      title="Catalog growth and campaign performance"
      description="Track demand, merchandising changes and campaign pacing from one place."
      stats={[
        { label: 'Gross revenue', value: '$482K' },
        { label: 'Conversion lift', value: '+18.4%' },
        { label: 'Open tests', value: '12' },
      ]}
      secondaryAction={{
        label: 'Export report',
        handler: () => undefined,
        variant: 'secondary',
      }}
      primaryAction={{
        label: 'Launch campaign',
        handler: () => undefined,
        variant: 'primary',
      }}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | required | Main page title |
| `eyebrow` | `string` | `undefined` | Small label above the title |
| `description` | `ReactNode` | `undefined` | Supporting copy below the title |
| `stats` | `HeaderStat[]` | `[]` | Compact KPI cards rendered under the description |
| `primaryAction` | `HeaderAction` | `undefined` | Main action shown on the right |
| `secondaryAction` | `HeaderAction` | `undefined` | Supporting action shown before the primary one |
| `className` | `string` | `undefined` | Additional wrapper classes |

## Notes

- `customNode` on an action overrides the built-in button rendering.
- The component is intentionally heavier than a plain heading row and is best used when the page needs context or KPIs.
