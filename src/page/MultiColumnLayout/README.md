# MultiColumnLayout

Responsive application shell for dashboards, admin surfaces and marketplace control centers.

## Features

- Supports one to many columns with optional responsive `span`
- Sticky columns for navigation or insight rails
- Mobile drawer support for hidden side panels
- Works well with `Sidebar`, `SecondaryMenu`, `Header` and `AppHeader`
- Supports seamless joined rails with `gap="none"` and card-based shells with spaced gaps

## Usage

```tsx
import {
  AppHeader,
  Header,
  MultiColumnLayout,
  Sidebar,
  SecondaryMenu,
} from '@shortlink-org/ui-kit'

export function WorkspacePage() {
  return (
    <>
      <AppHeader navigation={[{ name: 'Overview', href: '/dashboard' }]} />
      <MultiColumnLayout
        gap="none"
        stackAt="xl"
        minHeight="min-h-[calc(100vh-5rem)]"
        mobileDrawer={{
          columns: [0, 1],
          title: 'Navigation',
          triggerLabel: 'Open navigation',
        }}
        columns={[
          {
            id: 'sidebar',
            content: <Sidebar mode="full" activePath="/dashboard" />,
            sticky: true,
            stickyOffset: '5rem',
          },
          {
            id: 'section-menu',
            content: (
              <SecondaryMenu
                title="Overview"
                activePath="/dashboard/revenue"
                items={[
                  { url: '/dashboard/revenue', name: 'Revenue' },
                  { url: '/dashboard/funnel', name: 'Conversion funnel' },
                ]}
              />
            ),
            sticky: true,
            stickyOffset: '5rem',
          },
          {
            id: 'content',
            span: { xl: 2 },
            content: (
              <div className="p-5">
                <Header title="Revenue command center" />
              </div>
            ),
          },
        ]}
      />
    </>
  )
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `ColumnConfig[]` | required | Ordered column configuration |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Space between columns and shell padding mode |
| `stackAt` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'lg'` | Breakpoint where columns stop stacking |
| `minHeight` | `string` | `'min-h-screen'` | Minimum height utility classes |
| `containerClassName` | `string` | built-in shell classes | Outer shell appearance |
| `className` | `string` | `''` | Additional wrapper classes |
| `dataTestId` | `string` | `undefined` | Test selector |
| `mobileDrawer` | `MobileDrawerConfig` | `undefined` | Mobile panel behavior for hidden columns |

## ColumnConfig

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | `ReactNode` | required | Column content |
| `id` | `string` | `undefined` | Stable key |
| `span` | `number \| ColumnSpan` | `1` | Width ratio for the column |
| `className` | `string` | `undefined` | Additional classes applied to the inner column shell |
| `sticky` | `boolean` | `false` | Makes the column sticky |
| `stickyOffset` | `string` | `'0'` | Sticky top offset |

## Notes

- Use `gap="none"` when adjacent navigation rails should feel like one joined workspace.
- Use `mobileDrawer.columns` for rails that should collapse on smaller screens while keeping the main content visible.
