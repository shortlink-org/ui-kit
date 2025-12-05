# ElectricBorderCard

A dramatic card component with an animated electric border effect using SVG filters and turbulence animations.

## Features

- ⚡ Animated electric border effect
- 🎨 Customizable border color
- 📏 Adjustable width and height
- 🏷️ Optional badge component
- ✨ Glassmorphism effects
- 🌈 Multiple glow layers for depth
- 📱 Responsive design

## Installation

```bash
npm install @shortlink-org/ui-kit
# or
pnpm add @shortlink-org/ui-kit
```

## Usage

### Basic Example

```tsx
import { ElectricBorderCard } from '@shortlink-org/ui-kit'

function App() {
  return (
    <ElectricBorderCard
      badge="Dramatic"
      title="Electric Border"
      description="In case you'd like to emphasize something very dramatically."
    />
  )
}
```

### Custom Color

```tsx
<ElectricBorderCard
  badge="Premium"
  title="Custom Electric Border"
  description="You can customize the border color to match your brand."
  borderColor="#3b82f6"
/>
```

### Custom Size

```tsx
<ElectricBorderCard
  badge="Large"
  title="Custom Sized Card"
  description="You can customize both width and height of the card."
  borderColor="#f97316"
  width={400}
  height={600}
/>
```

### Without Badge

```tsx
<ElectricBorderCard
  title="Electric Border"
  description="Card without a badge. The badge prop is optional."
/>
```

### With Children

```tsx
<ElectricBorderCard
  badge="Interactive"
  title="Card with Children"
  description="You can add custom content as children."
  borderColor="#ec4899"
>
  <div style={{ marginTop: '16px', padding: '16px' }}>
    <p>Custom content here</p>
  </div>
</ElectricBorderCard>
```

## Props

| Prop          | Type        | Default     | Description                          |
| ------------- | ----------- | ----------- | ------------------------------------ |
| `badge`       | `string`    | `'Dramatic'`| Badge text displayed at the top      |
| `title`       | `string`    | **Required**| Card title                           |
| `description` | `string`    | **Required**| Card description                     |
| `children`    | `ReactNode` | `undefined` | Optional children content            |
| `borderColor` | `string`    | `'#dd8448'` | Border color in hex format           |
| `width`       | `number`    | `350`       | Card width in pixels                 |
| `height`      | `number`    | `500`       | Card height in pixels                |

## Styling

The component uses CSS Modules for styling. The border animation is achieved through SVG filters with turbulence effects that create a dynamic, electric-like border animation.

### CSS Variables

The component uses CSS custom properties that can be customized:

- `--electric-border-color`: Main border color
- `--electric-border-rgb`: RGB values of the border color
- `--card-width`: Card width
- `--card-height`: Card height

## Animation

The electric border effect is created using:

- SVG `feTurbulence` filters for noise generation
- Multiple animated `feOffset` filters for movement
- `feDisplacementMap` for the distortion effect
- Multiple glow layers with blur effects
- Overlay effects with blend modes

The animation runs continuously with a 6-second duration and creates a flowing, electric-like effect around the border.

## Browser Support

This component uses modern CSS features including:

- CSS `oklch()` color function (with fallbacks)
- CSS `mask-image` and `mask-composite`
- SVG filters and animations
- CSS `mix-blend-mode`

For best results, use a modern browser that supports these features.

## Examples

Check out the Storybook stories for more examples:

```bash
pnpm storybook
```

## License

MIT

