import preview from '#.storybook/preview'
import PriceTable, { type PriceTableProps } from './PriceTable'

const meta = preview.meta({
  title: 'Page/PriceTable',
  component: PriceTable,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    eyebrow: { control: 'text' },
    heading: { control: 'text' },
    lead: { control: 'text' },
    tiers: { control: 'object' },
  },
})

export default meta

function Template(args: PriceTableProps) {
  return <PriceTable {...args} />
}

export const Default = meta.story({
  render: Template,
  args: {
    eyebrow: 'Pricing',
    heading: 'Pick the plan that matches your launch stage',
    lead:
      'Cleaner tier comparison with billing animation, stronger feature hierarchy, and a clearer featured-plan treatment.',
    tiers: [
      {
        id: 'free',
        title: 'Free',
        subheader: 'Best option for solo creators and early experiments.',
        monthlyPrice: 0,
        features: [
          { id: 'free-1', text: '1 workspace' },
          { id: 'free-2', text: '10 branded links' },
          { id: 'free-3', text: 'Basic analytics' },
          { id: 'free-4', text: 'Community support' },
          { id: 'free-5', text: 'Manual exports' },
        ],
        buttonText: 'Sign up for free',
      },
      {
        id: 'pro',
        title: 'Pro',
        subheader: 'Most popular choice for growth teams and active campaigns.',
        monthlyPrice: 24,
        badge: 'Most popular',
        isFeatured: true,
        labelColor: '#0f172a',
        features: [
          { id: 'pro-1', text: 'Unlimited branded links' },
          { id: 'pro-2', text: 'Realtime analytics' },
          { id: 'pro-3', text: 'Audience segmentation' },
          { id: 'pro-4', text: 'Priority support' },
          { id: 'pro-5', text: 'Team collaboration' },
        ],
        buttonText: 'Get started',
      },
      {
        id: 'enterprise',
        title: 'Enterprise',
        subheader:
          'Best for multi-brand programs, security reviews, and custom rollouts.',
        monthlyPrice: 79,
        features: [
          { id: 'ent-1', text: 'Advanced permissions' },
          { id: 'ent-2', text: 'Custom SLAs' },
          { id: 'ent-3', text: 'SSO and audit trails' },
          { id: 'ent-4', text: 'Dedicated success manager' },
          { id: 'ent-5', text: 'Migration support' },
        ],
        buttonText: 'Contact us',
      },
    ],
  },
})
