import { Meta } from '@storybook/nextjs-vite'

import Sidebar from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Page/Sidebar',
  component: Sidebar,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta

export const Default = {
  args: {
    mode: 'full',
  },

  render: (args: any) => {
    let className = 'h-screen w-96'

    if (args.mode === 'mini') {
      className = 'h-screen w-14'
    }

    return (
      <div className={className}>
        <Sidebar {...args} />
      </div>
    )
  },

  argTypes: {
    mode: {
      control: {
        type: 'select',
      },
      options: ['full', 'mini'],
    },
  },
}
