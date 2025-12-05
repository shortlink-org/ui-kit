import { fn, expect, within, userEvent } from 'storybook/test'
import preview from '#.storybook/preview'
import { Newsletter } from './Newsletter'
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

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
      description: 'Main heading text',
      control: 'text',
    },
    description: {
      description: 'Description text',
      control: 'text',
    },
    emailPlaceholder: {
      description: 'Email input placeholder',
      control: 'text',
    },
    buttonText: {
      description: 'Subscribe button text',
      control: 'text',
    },
    loading: {
      description: 'Loading state',
      control: 'boolean',
    },
  },
})

export default meta

export const Default = meta.story({
  args: {},
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText('Enter your email')
    const subscribeButton = canvas.getByRole('button', { name: 'Subscribe' })

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.click(subscribeButton)
    await expect(args.onSubmit).toHaveBeenCalledWith('test@example.com')
  },
})

export const CustomContent = meta.story({
  args: {
    heading: 'Stay in the loop',
    description: 'Join thousands of subscribers and never miss an update.',
    emailPlaceholder: 'Your email address',
    buttonText: 'Join Now',
  },
})

export const WithCustomFeatures = meta.story({
  args: {
    features: [
      {
        icon: <CalendarDaysIcon className="h-6 w-6" />,
        title: 'Weekly articles',
        description:
          'Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.',
      },
      {
        icon: <HandRaisedIcon className="h-6 w-6" />,
        title: 'No spam',
        description:
          'Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.',
      },
    ],
  },
})

export const Loading = meta.story({
  args: {
    loading: true,
  },
})

export const WithCustomSubmit = meta.story({
  args: {
    onSubmit: async (email) => {
      console.log('Subscribing:', email)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert(`Successfully subscribed: ${email}`)
    },
  },
})

export const Minimal = meta.story({
  args: {
    features: [],
    heading: 'Get updates',
    description: 'Subscribe to receive our latest news.',
  },
})

