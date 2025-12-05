// .storybook/preview.tsx
import { definePreview } from '@storybook/nextjs-vite'
import { Provider as WrapBalancer } from 'react-wrap-balancer'
import clsx from 'clsx'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/caveat'
import '@fontsource/material-icons'

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import '../src/theme/styles.css'
import { theme } from '../src/theme/theme'

/**
 * Optional Jest results. If the file doesn't exist, we pass `undefined`
 * so the addon silently does nothing (no runtime error).
 * Using dynamic import with error handling for better compatibility.
 */
let testResults: any = undefined
try {
  // @ts-ignore – file may not exist in CI/locally
  const testResultsModule = await import('../test-results.json')
  testResults = testResultsModule.default || testResultsModule
} catch {
  // Silently ignore if file doesn't exist
  testResults = undefined
}

// Viewport presets for both Storybook viewport addon and Chromatic
const viewportPresets = {
  mobile: { name: 'mobile', styles: { width: '375px', height: '667px' } },
  tablet: { name: 'tablet', styles: { width: '768px', height: '1024px' } },
  desktop: { name: 'desktop', styles: { width: '1280px', height: '720px' } },
  wide: { name: 'wide', styles: { width: '1920px', height: '1080px' } },
}

const preview = definePreview({
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Viewport configuration for Storybook viewport addon
    viewport: {
      viewports: viewportPresets,
    },
    // Chromatic viewports (using same presets)
    chromatic: {
      delay: 1000,
      diffThreshold: 0.1,
      viewports: [
        { name: 'mobile', width: 375, height: 667 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'desktop', width: 1280, height: 720 },
        { name: 'wide', width: 1920, height: 1080 },
      ],
    },
    // Coverage results for addon-coverage
    ...(testResults && { coverageResults: testResults }),
    // Default layout for page components
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      options: {
        light: { name: 'light', value: '#ffffff' },
        gray: { name: 'gray', value: '#f5f5f5' },
      },
    },
  },

  /**
   * Global theme toolbar -> feeds NextThemeProvider
   */
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'system', title: 'System' },
        ],
      },
    },
  },

  decorators: [
    // Theme and provider decorator
    (Story, context) => {
      const forcedTheme =
        context.globals.theme === 'system' ? undefined : (context.globals.theme as 'light' | 'dark')

      return (
        // next-themes uses the `class` attribute to toggle `.dark`
        <NextThemeProvider enableSystem attribute="class" defaultTheme="light" forcedTheme={forcedTheme}>
          {/* MUI color-scheme script is safe here for Storybook */}
          <InitColorSchemeScript />
          <MuiThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <WrapBalancer>
                <Story />
              </WrapBalancer>
            </LocalizationProvider>
          </MuiThemeProvider>
        </NextThemeProvider>
      );
    },
    // Container decorator - only applies when container parameter is true
    // This allows components to opt-in to container wrapping instead of defaulting to it
    (Story, context) => {
      const shouldUseContainer = 
        context.parameters.container === true ||
        (context.parameters.layout !== 'fullscreen' && 
         context.parameters.fullscreen !== true &&
         context.parameters.container !== false)

      // If explicitly set to false or fullscreen, don't wrap
      if (context.parameters.container === false || 
          context.parameters.layout === 'fullscreen' || 
          context.parameters.fullscreen === true) {
        return <Story />
      }

      // Only apply container if explicitly requested
      if (!shouldUseContainer) {
        return <Story />
      }

      const containerWidth = context.parameters.containerWidth || 'max-w-2xl'
      const containerPadding = context.parameters.containerPadding || 'px-4 py-6'

      return (
        <div className={clsx('w-full', containerWidth, containerPadding)}>
          <Story />
        </div>
      )
    },
  ],

  tags: [],
}) as any

export default preview
