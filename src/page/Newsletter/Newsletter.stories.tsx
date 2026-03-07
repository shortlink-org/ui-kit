import { expect, fn, userEvent, within } from 'storybook/test'
import preview from '#.storybook/preview'
import { Newsletter } from './Newsletter'

const meta = preview.meta({
  title: 'Page/Newsletter',
  component: Newsletter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
  argTypes: {
    heading: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    disclaimer: {
      control: 'text',
    },
    emailPlaceholder: {
      control: 'text',
    },
    buttonText: {
      control: 'text',
    },
    loading: {
      control: 'boolean',
    },
  },
})

export default meta

export const Default = meta.story({
  args: {},
  play: async ({
    canvasElement,
    args,
  }: {
    canvasElement: HTMLElement
    args: { onSubmit?: (email: string) => void | Promise<void> }
  }) => {
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText('Enter your work email')
    const submitButton = canvas.getByRole('button', { name: 'Join the list' })

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.click(submitButton)

    await expect(args.onSubmit).toHaveBeenCalledWith('test@example.com')
  },
})
