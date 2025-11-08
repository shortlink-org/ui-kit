import Button from '@mui/material/Button'
import { fn, expect, within, userEvent } from 'storybook/test'
import preview from '#.storybook/preview'

const meta = preview.meta({
  title: 'UI/Button',
  component: Button,
  parameters: {
    chromatic: {
      // Visual testing configurations
      viewports: [375, 768, 1280, 1920]
    }
  },
  args: {
    onClick: fn(),
  },
})

function Template(args: any) {
  return <Button {...args}>Text</Button>
}

export const Default = meta.story({
  render: Template,
  args: {},
  // @ts-ignore
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Text' })
    await userEvent.click(button)
    await expect(button).toBeEnabled()
  },
  parameters: {
    jest: 'Button.test.tsx',
  },
})
