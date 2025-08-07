import React from 'react'
import { Preview } from '@storybook/react'
import { Provider } from 'react-wrap-balancer'
import { withTests } from '@storybook/addon-jest'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/caveat'
import '@fontsource/material-icons'
import { ThemeProvider } from '@mui/material/styles'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import { ThemeProvider as ThemeProviderNext } from 'next-themes'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import '../src/theme/styles.css'
import { theme } from '../src/theme/theme'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    chromatic: {
      // Visual testing configurations
      delay: 1000,
      diffThreshold: 0.1,
      viewports: [
        { name: 'mobile', width: 375, height: 667 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'desktop', width: 1280, height: 720 },
        { name: 'wide', width: 1920, height: 1080 }
      ]
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#f5f5f5' }
      ]
    },
  },
  decorators: [
    withTests({
      results: (() => {
        try {
          return require('../test-results.json');
        } catch (error) {
          console.warn('Test results file not found. Run "pnpm test:generate-output" to generate test results.');
          return {};
        }
      })(),
    }),
    (Story) => {
      return (
        // @ts-ignore
        (<ThemeProviderNext
          enableSystem
          attribute="class"
          defaultTheme={'light'}
        >
          <ThemeProvider theme={theme}>
            <InitColorSchemeScript />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Provider>
                <Story />
              </Provider>
            </LocalizationProvider>
          </ThemeProvider>
        </ThemeProviderNext>)
      );
    },
  ],

  tags: []
}

export default preview
