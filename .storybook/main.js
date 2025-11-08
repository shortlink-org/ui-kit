import { defineMain } from '@storybook/nextjs-vite/node'

export default defineMain({
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-docs'
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/nextjs-vite',
  features: {},
  typescript: {},
  docs: {},
})
