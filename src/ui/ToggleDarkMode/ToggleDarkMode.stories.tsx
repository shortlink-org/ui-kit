import type { ComponentProps } from 'react'
import Button from '@mui/material/Button'
import preview from '#.storybook/preview'

import ToggleDarkMode from './ToggleDarkMode'
import Header from '../../page/Header/Header'

const meta = preview.meta({
  title: 'UI/ToggleDarkMode',
  component: ToggleDarkMode,
  args: {
    id: 'toggle-dark-mode',
  },
})

export const Default = meta.story({
  render: (args: ComponentProps<typeof ToggleDarkMode>) => <ToggleDarkMode {...args} />,
})

export const WithHeader = meta.story({
  render: () => (
    <>
      <Header title="Header" />
      <ToggleDarkMode id="toggle-dark-mode" />
      <Button variant="contained">Example MUI button</Button>
    </>
  ),
})
