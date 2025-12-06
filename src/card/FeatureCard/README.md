# FeatureCard

Beautiful feature card component with smooth animations and customizable styling.

## Features

- 🎨 Customizable gradient colors
- ✨ Smooth hover animations
- 🌓 Dark mode support
- 📱 Responsive design
- ♿ Accessible

## Installation

```bash
npm install @shortlink-org/ui-kit
# or
pnpm add @shortlink-org/ui-kit
```

## Usage

### Basic Example

```tsx
import { FeatureCard } from '@shortlink-org/ui-kit'

function App() {
  const LinkIcon = (
    <svg
      className="w-8 h-8 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  )

  return (
    <FeatureCard
      icon={LinkIcon}
      title="URL Shortener"
      description="Free custom URL Shortener with many features that gives you better quality for links shortening."
      linkText="Learn more"
      onLinkClick={() => console.log('Learn more clicked')}
    />
  )
}
```

### Without Link

```tsx
<FeatureCard
  icon={<YourIcon />}
  title="Feature Title"
  description="Feature description without a call-to-action link."
/>
```

### Custom Colors

```tsx
<FeatureCard
  icon={<YourIcon />}
  title="Custom Colors"
  description="Use custom gradient colors for the icon and decoration."
  linkText="Get started"
  onLinkClick={() => console.log('Get started')}
  iconGradient={{ from: 'pink-500', to: 'rose-600' }}
  decorationGradient={{ from: 'pink-500/5', to: 'rose-500/5' }}
  linkColor="pink-600 dark:text-pink-400"
/>
```

### Multiple Cards Layout

```tsx
function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard
        icon={<LinkIcon />}
        title="URL Shortener"
        description="Shorten your links easily."
        onLinkClick={() => console.log('URL Shortener')}
      />
      <FeatureCard
        icon={<ChartIcon />}
        title="Analytics"
        description="Track your link performance."
        onLinkClick={() => console.log('Analytics')}
        iconGradient={{ from: 'purple-500', to: 'pink-600' }}
      />
      <FeatureCard
        icon={<SyncIcon />}
        title="Syncing"
        description="Sync across all devices."
        onLinkClick={() => console.log('Syncing')}
        iconGradient={{ from: 'pink-500', to: 'rose-600' }}
      />
    </div>
  )
}
```

## Props

| Prop                 | Type                           | Default                                        | Description                        |
| -------------------- | ------------------------------ | ---------------------------------------------- | ---------------------------------- |
| `icon`               | `ReactNode`                    | **Required**                                   | Icon element (SVG or component)    |
| `title`              | `string`                       | **Required**                                   | Card title                         |
| `description`        | `string`                       | **Required**                                   | Card description                   |
| `linkText`           | `string`                       | `'Learn more'`                                 | Optional link text                 |
| `onLinkClick`        | `() => void`                   | `undefined`                                    | Optional link click handler        |
| `iconGradient`       | `{ from: string, to: string }` | `{ from: 'indigo-500', to: 'purple-600' }`     | Icon background gradient colors    |
| `decorationGradient` | `{ from: string, to: string }` | `{ from: 'indigo-500/5', to: 'purple-500/5' }` | Background decoration gradient     |
| `linkColor`          | `string`                       | `'indigo-600 dark:text-indigo-400'`            | Link text color (Tailwind classes) |

## Styling

The component uses Tailwind CSS for styling. Make sure you have Tailwind CSS configured in your project.

### Required Tailwind Config

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      // Your custom theme
    },
  },
}
```

## Animations

The card includes several smooth animations:

- **Hover lift**: Card slightly lifts up on hover
- **Icon rotation**: Icon rotates 3 degrees on hover
- **Icon scale**: Icon scales up slightly on hover
- **Link slide**: "Learn more" link slides to the right on hover
- **Background scale**: Decorative background scales up on hover
- **Shadow transition**: Shadow increases on hover

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- ARIA labels for interactive elements

## Examples

Check out the Storybook stories for more examples:

```bash
pnpm storybook
```

## License

MIT
