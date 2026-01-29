/**
 * Vitest setup file for Storybook tests
 * This file applies Storybook's preview configuration to Vitest tests
 * 
 * @see https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
 */
import { setProjectAnnotations } from '@storybook/nextjs-vite'
import { beforeAll } from 'vitest'
import preview from './preview'

// Apply project annotations from preview.tsx
const annotations = setProjectAnnotations([preview])

// Run beforeAll hook to set up project annotations
beforeAll(annotations.beforeAll)
