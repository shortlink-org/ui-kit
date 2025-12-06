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
    // Ensure React runs in development mode for Storybook dev
    config.define = {
      ...config.define,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }
    
    // Ensure React is properly resolved and deduplicated
    config.resolve = config.resolve || {}
    config.resolve.dedupe = config.resolve.dedupe || []
    if (!config.resolve.dedupe.includes('react')) {
      config.resolve.dedupe.push('react')
    }
    if (!config.resolve.dedupe.includes('react-dom')) {
      config.resolve.dedupe.push('react-dom')
    }
    
    // Optimize chunk splitting for better performance
    config.build = config.build || {}
    config.build.rollupOptions = config.build.rollupOptions || {}
    config.build.rollupOptions.output = config.build.rollupOptions.output || {}
    
    const originalManualChunks = config.build.rollupOptions.output.manualChunks
    
    config.build.rollupOptions.output.manualChunks = (id) => {
      // Use original manualChunks if it's a function
      if (typeof originalManualChunks === 'function') {
        const result = originalManualChunks(id)
        if (result) return result
      } else if (originalManualChunks && typeof originalManualChunks === 'object') {
        // Handle object case if needed
      }
      
      // Split large vendor libraries into separate chunks
      if (id.includes('node_modules')) {
        // MUI packages
        if (id.includes('@mui/material') || id.includes('@mui/system') || id.includes('@mui/styled-engine')) {
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
        
        // Font packages
        if (id.includes('@fontsource')) {
          return 'fonts'
        }
        
        // Other large dependencies
        if (id.includes('react-dom')) {
          return 'react-dom'
        }
        
        // Default vendor chunk for other node_modules
        return 'vendor'
      }
    }
    
    // Increase chunk size warning limit to 1000 KB (optional)
    config.build.chunkSizeWarningLimit = 1000
    
    return config
  },
})
