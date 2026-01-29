import { defineMain } from '@storybook/nextjs-vite/node'

export default defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/nextjs-vite',
  typescript: {
    check: false,
  },

  async viteFinal(config) {
    // Ensure NODE_ENV is aligned with Storybook mode
    const nodeEnv =
      config.mode === 'production' || process.env.NODE_ENV === 'production'
        ? 'production'
        : 'development'

    // CRITICAL: Preserve all Storybook internal definitions
    // Don't create a new object - modify existing one to preserve Storybook's defines
    if (!config.define) {
      config.define = {}
    }
    // Only add/update NODE_ENV, preserve all other Storybook definitions
    config.define['process.env.NODE_ENV'] = JSON.stringify(nodeEnv)

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
              deps.filter(
                dep =>
                  !dep.includes('vite-inject-mocker-entry.js') &&
                  !dep.includes('vite-inject-mocker')
              ),
          }
        : false

    // Let Storybook handle its own chunk splitting - don't interfere
    // This ensures all Storybook modules load correctly in production

    return config
  },
})
