import { defineMain } from '@storybook/nextjs-vite/node'

export default defineMain({
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/nextjs-vite',
  features: {},
  typescript: {},
  docs: {},

  async viteFinal(config) {
    // Ensure NODE_ENV is aligned with Storybook mode
    const nodeEnv =
      config.mode === 'production' || process.env.NODE_ENV === 'production'
        ? 'production'
        : 'development'

    // Make sure React (and other libs) see the correct NODE_ENV
    config.define = {
      ...(config.define ?? {}),
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }

    // Ensure React is properly resolved and deduplicated
    config.resolve = config.resolve ?? {}
    config.resolve.dedupe = config.resolve.dedupe ?? []

    if (!config.resolve.dedupe.includes('react')) {
      config.resolve.dedupe.push('react')
    }
    if (!config.resolve.dedupe.includes('react-dom')) {
      config.resolve.dedupe.push('react-dom')
    }

    // Build-related tweaks
    config.build = config.build ?? {}

    // Configure module preload to exclude vite-inject-mocker-entry.js
    // This avoids warnings about unused preloaded resources
    config.build.modulePreload =
      config.build.modulePreload !== false
        ? {
            resolveDependencies: (_filename, deps) =>
              deps.filter(dep => !dep.includes('vite-inject-mocker-entry.js')),
          }
        : false

    // Optimize chunk splitting for better performance
    config.build.rollupOptions = config.build.rollupOptions ?? {}
    config.build.rollupOptions.output =
      config.build.rollupOptions.output ?? {}

    const originalManualChunks =
      config.build.rollupOptions.output.manualChunks

    config.build.rollupOptions.output.manualChunks = id => {
      // Respect existing manualChunks function if present
      if (typeof originalManualChunks === 'function') {
        const result = originalManualChunks(id)
        if (result) return result
      }

      // Only split node_modules; app code stays as is
      if (!id.includes('node_modules')) {
        return undefined
      }

      // MUI packages
      if (
        id.includes('@mui/material') ||
        id.includes('@mui/system') ||
        id.includes('@mui/styled-engine')
      ) {
        return 'mui'
      }
      if (id.includes('@mui/icons-material')) {
        return 'mui-icons'
      }
      if (id.includes('@mui/x-date-pickers')) {
        return 'mui-date-pickers'
      }

      // TanStack packages
      if (id.includes('@tanstack/react-table')) {
        return 'tanstack-table'
      }
      if (id.includes('@tanstack/react-virtual')) {
        return 'tanstack-virtual'
      }

      // GSAP
      if (id.includes('gsap')) {
        return 'gsap'
      }

      // Fonts
      if (id.includes('@fontsource')) {
        return 'fonts'
      }

      // React DOM
      if (id.includes('react-dom')) {
        return 'react-dom'
      }

      // Default vendor chunk
      return 'vendor'
    }

    // Increase chunk size warning limit (KB)
    config.build.chunkSizeWarningLimit = 1000

    return config
  },
})
