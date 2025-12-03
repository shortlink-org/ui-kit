import type { ComponentProps } from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import preview from '#.storybook/preview'

import ToggleDarkMode from './ToggleDarkMode'
import Header from '../../page/Header/Header'

const meta = preview.meta({
  title: 'UI/ToggleDarkMode',
  component: ToggleDarkMode,
  args: {
    id: 'toggle-dark-mode',
    checked: false,
  },
})

export const Default = meta.story({
  render: (args: ComponentProps<typeof ToggleDarkMode>) => {
    const [checked, setChecked] = useState(args.checked ?? false)
    return (
      <ToggleDarkMode
        {...args}
        checked={checked}
        onClick={() => setChecked(!checked)}
      />
    )
  },
})

export const WithHeader = meta.story({
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <>
        <Header title="Header" />
        <ToggleDarkMode
          id="toggle-dark-mode"
          checked={checked}
          onClick={() => setChecked(!checked)}
        />
        <Button variant="contained">Example MUI button</Button>
      </>
    )
  },
})
