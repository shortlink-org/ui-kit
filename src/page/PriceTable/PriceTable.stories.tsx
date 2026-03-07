import preview from '#.storybook/preview'
import PriceTable, { TiersProps } from './PriceTable'

const meta = preview.meta({
  title: 'Page/PriceTable',
  component: PriceTable,
  parameters: {
    layout: 'fullscreen',
  },
})

export default meta

function Template(args: TiersProps) {
  return <PriceTable {...args} />
}

export const Default = meta.story({
  render: Template,
  args: {
    tiers: [
      {
        title: 'Free',
        subheader: 'Best option for solo creators and early experiments.',
        monthlyPrice: 0,
        description: [
          '1 workspace',
          '10 branded links',
          'Basic analytics',
          'Community support',
          'Manual exports',
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
      },
      {
        title: 'Pro',
        subheader: 'Most popular choice for growth teams and active campaigns.',
        monthlyPrice: 24,
        badge: 'Most popular',
        isFeatured: true,
        labelColor: '#0f172a',
        description: [
          'Unlimited branded links',
          'Realtime analytics',
          'Audience segmentation',
          'Priority support',
          'Team collaboration',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
      },
      {
        title: 'Enterprise',
        subheader:
          'Best for multi-brand programs, security reviews, and custom rollouts.',
        monthlyPrice: 79,
        description: [
          'Advanced permissions',
          'Custom SLAs',
          'SSO and audit trails',
          'Dedicated success manager',
          'Migration support',
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
      },
    ],
  },
})
