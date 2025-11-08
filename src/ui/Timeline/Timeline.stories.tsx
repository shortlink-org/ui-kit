import { BeakerIcon } from '@heroicons/react/20/solid'
import preview from '#.storybook/preview'

import Timeline, { TimelineProps } from './Timeline'

const meta = preview.meta({
  title: 'UI/Timeline',
  component: Timeline,
})

function Template(args: TimelineProps) {
  return <Timeline {...args} />
}

export const Default = meta.story({
  render: Template,

  args: {
    items: [
      {
        date: 'Apr 7, 2024',
        name: 'Mark Mikrol',
        action: 'opened the request',
        content:
          'Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.',
        icon: (
          <BeakerIcon width="16" height="16" className="fill-emerald-500" />
        ),
      },
      {
        date: 'Apr 7, 2024',
        name: 'Mark Mikrol',
        action: 'opened the request',
        content: 'Various versions have evolved over the years.',
        icon: <BeakerIcon width="16" height="16" className="fill-gray-500" />,
      },
      {
        date: 'Apr 7, 2024',
        name: 'Mark Mikrol',
        action: 'opened the request',
        content: 'Various versions have evolved over the years.',
        icon: <BeakerIcon width="16" height="16" className="fill-gray-500" />,
      },
      {
        date: 'Apr 7, 2024',
        name: 'Mark Mikrol',
        action: 'opened the request',
        content: 'Various versions have evolved over the years.',
        icon: <BeakerIcon width="16" height="16" className="fill-red-500" />,
      },
    ],
  },
})
