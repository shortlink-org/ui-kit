import type { ComponentProps } from 'react'
import preview from '#.storybook/preview'

import Header from './Header'

const meta = preview.meta({
  title: 'Page/Header',
  component: Header,
})

export const Default = meta.story({
  args: { title: 'Header' },
  render: (args: ComponentProps<typeof Header>) => <Header {...args} />,
})
