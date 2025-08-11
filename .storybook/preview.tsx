// .storybook/preview.tsx
import React from 'react'
import type { Preview } from '@storybook/react'
import { Provider as WrapBalancer } from 'react-wrap-balancer'
import { withTests } from '@storybook/addon-jest'

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
 * Optional Jest results. If the file doesn’t exist, we pass `undefined`
 * so the addon silently does nothing (no runtime error).
 * Vite will inline JSON when present.
 */
// @ts-ignore – file may not exist in CI/locally
import testResults from '../test-results.json?url'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
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
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#f5f5f5' },
      ],
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
    // Show jest results if available
    withTests(
      // @ts-ignore – URL import gives us a path string; addon accepts undefined/empty too
      testResults ? { results: testResults } : {}
    ),

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
                <div className="w-full max-w-2xl px-4 py-6">
                  <Story />
                </div>
              </WrapBalancer>
            </LocalizationProvider>
          </MuiThemeProvider>
        </NextThemeProvider>
      )
    },
  ],

  tags: [],
}

export default preview
