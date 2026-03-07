# Sidebar

Workspace navigation rail for admin panels, marketplace back offices and multi-column application shells.

## Features

- Supports `full` and `mini` modes
- Grouped navigation with collapsible sections
- Compatible with `activePath` outside Next.js routing contexts
- Designed to pair with `SecondaryMenu` and `MultiColumnLayout`
- Keeps legacy `renderItem`, `footerSlot`, `variant`, `width` and `height` support

## Usage

```tsx
import {
  MegaphoneIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { Sidebar } from '@shortlink-org/ui-kit'

const sections = [
  {
    type: 'simple' as const,
    items: [
      { url: '/dashboard', icon: <SparklesIcon />, name: 'Overview' },
      { url: '/catalog', icon: <ShoppingBagIcon />, name: 'Catalog' },
    ],
  },
  {
    type: 'collapsible' as const,
    icon: MegaphoneIcon,
    title: 'Growth',
    items: [
      { url: '/growth/campaigns', icon: <MegaphoneIcon />, name: 'Campaigns' },
    ],
  },
]

export function WorkspaceSidebar() {
  return (
    <Sidebar
      mode="full"
      activePath="/growth/campaigns"
      sections={sections}
      variant="scrollable"
    />
  )
}
```

## Secondary Menu

```tsx
import { SecondaryMenu } from '@shortlink-org/ui-kit'

export function SectionMenu() {
  return (
    <SecondaryMenu
      title="Campaigns"
      activePath="/growth/campaigns/live"
      items={[
        { url: '/growth/campaigns/live', name: 'Live campaigns', badge: '6' },
        { url: '/growth/campaigns/creative', name: 'Creative tests' },
      ]}
    />
  )
}
```

## Sidebar Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `'full' \| 'mini'` | `'full'` | Main visual mode |
| `sections` | `SidebarSection[]` | built-in defaults | Navigation structure |
| `activePath` | `string` | `undefined` | Active route for Storybook, tests or custom routers |
| `collapsed` | `boolean` | `false` | Forces mini rail behavior |
| `variant` | `'sticky' \| 'scrollable'` | `'scrollable'` | Sidebar positioning behavior |
| `footerSlot` | `ReactNode` | built-in footer | Custom footer area |
| `renderItem` | function | `undefined` | Override per-item rendering while keeping active state information |
| `width` | `string \| number` | `undefined` | Custom outer width |
| `height` | `string \| number` | `undefined` | Custom outer height |
| `className` | `string` | `undefined` | Additional outer classes |

## SecondaryMenu Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `undefined` | Single-section heading |
| `items` | `SecondaryMenuItem[]` | `undefined` | Flat item list |
| `sections` | `SecondaryMenuSection[]` | `undefined` | Multi-section navigation structure |
| `activePath` | `string` | `undefined` | Active route |
| `mode` | `'list' \| 'dropdown'` | `'list'` | List or mobile dropdown presentation |
| `sticky` | `boolean` | `false` | Makes the menu sticky |
| `LinkComponent` | component | `undefined` | Custom link renderer |

## Notes

- `Sidebar` is intended as the primary workspace rail, while `SecondaryMenu` handles section-level navigation.
- In multi-column shells, a common pairing is `Sidebar` on the left, `SecondaryMenu` in the middle, and page content on the right.
