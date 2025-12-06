import type { Meta, StoryObj } from '@storybook/react-vite'
import { ElectricBorderCard } from './ElectricBorderCard'

const meta: Meta<typeof ElectricBorderCard> = {
  title: 'Card/ElectricBorderCard',
  component: ElectricBorderCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0a0a0a',
        },
      ],
    },
  },
  argTypes: {
    badge: {
      description: 'Badge text displayed at the top',
      control: 'text',
    },
    title: {
      description: 'Card title',
      control: 'text',
    },
    description: {
      description: 'Card description',
      control: 'text',
    },
    borderColor: {
      description: 'Border color in hex format',
      control: 'color',
    },
    width: {
      description: 'Card width in pixels',
      control: { type: 'number', min: 200, max: 800, step: 10 },
    },
    height: {
      description: 'Card height in pixels',
      control: { type: 'number', min: 300, max: 1000, step: 10 },
    },
  },
}

export default meta
type Story = StoryObj<typeof ElectricBorderCard>

export const Default: Story = {
  args: {
    badge: 'Dramatic',
    title: 'Electric Border',
    description: "In case you'd like to emphasize something very dramatically.",
  },
}

export const PremiumFeature: Story = {
  args: {
    badge: 'Premium',
    title: 'Advanced Analytics',
    description:
      'Get real-time insights into your data with our advanced analytics dashboard. Track performance, monitor trends, and make data-driven decisions.',
    borderColor: '#3b82f6',
    children: (
      <div
        style={{
          marginTop: '24px',
          padding: '20px',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <span style={{ color: '#fafafa', fontSize: '14px', opacity: 0.8 }}>
            Monthly Reports
          </span>
          <span
            style={{ color: '#60a5fa', fontSize: '14px', fontWeight: '600' }}
          >
            Unlimited
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <span style={{ color: '#fafafa', fontSize: '14px', opacity: 0.8 }}>
            Data Retention
          </span>
          <span
            style={{ color: '#60a5fa', fontSize: '14px', fontWeight: '600' }}
          >
            2 Years
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#fafafa', fontSize: '14px', opacity: 0.8 }}>
            Export Formats
          </span>
          <span
            style={{ color: '#60a5fa', fontSize: '14px', fontWeight: '600' }}
          >
            PDF, CSV, JSON
          </span>
        </div>
      </div>
    ),
  },
}

export const PricingCard: Story = {
  args: {
    badge: 'Popular',
    title: 'Pro Plan',
    description:
      'Perfect for growing teams that need advanced features and priority support.',
    borderColor: '#a855f7',
    width: '22rem',
    children: (
      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              marginBottom: '8px',
            }}
          >
            <span
              style={{ color: '#fafafa', fontSize: '48px', fontWeight: '700' }}
            >
              $49
            </span>
            <span style={{ color: '#a855f7', fontSize: '18px', opacity: 0.8 }}>
              /month
            </span>
          </div>
          <p
            style={{
              color: '#fafafa',
              fontSize: '14px',
              opacity: 0.6,
              margin: 0,
            }}
          >
            Billed annually or $59 month-to-month
          </p>
        </div>
        <div
          style={{
            padding: '16px',
            background: 'rgba(168, 85, 247, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(168, 85, 247, 0.2)',
          }}
        >
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {[
              'Up to 10 team members',
              'Unlimited projects',
              'Advanced integrations',
              'Priority support',
              'Custom branding',
            ].map((feature) => (
              <li
                key={feature}
                style={{
                  color: '#fafafa',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ color: '#a855f7' }}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <button
          style={{
            width: '100%',
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Get Started
        </button>
      </div>
    ),
  },
}

export const ProductShowcase: Story = {
  args: {
    badge: 'New',
    title: 'AI-Powered Assistant',
    description:
      'Revolutionary AI assistant that understands context and provides intelligent responses. Built with state-of-the-art language models.',
    borderColor: '#22c55e',
    width: '24rem',
    children: (
      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div
          style={{
            padding: '16px',
            background: 'rgba(34, 197, 94, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span style={{ color: '#fafafa', fontSize: '14px', opacity: 0.8 }}>
              Accuracy Rate
            </span>
            <span
              style={{ color: '#22c55e', fontSize: '14px', fontWeight: '600' }}
            >
              98.7%
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(34, 197, 94, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '98.7%',
                height: '100%',
                background: '#22c55e',
                borderRadius: '4px',
              }}
            ></div>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          <div
            style={{
              padding: '12px',
              background: 'rgba(34, 197, 94, 0.05)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                color: '#22c55e',
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '4px',
              }}
            >
              50ms
            </div>
            <div style={{ color: '#fafafa', fontSize: '12px', opacity: 0.7 }}>
              Avg Response
            </div>
          </div>
          <div
            style={{
              padding: '12px',
              background: 'rgba(34, 197, 94, 0.05)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                color: '#22c55e',
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '4px',
              }}
            >
              24/7
            </div>
            <div style={{ color: '#fafafa', fontSize: '12px', opacity: 0.7 }}>
              Available
            </div>
          </div>
        </div>
      </div>
    ),
  },
}

export const StatusCard: Story = {
  args: {
    badge: 'Active',
    title: 'System Status',
    description:
      'All systems operational. All services are running smoothly with optimal performance.',
    borderColor: '#22c55e',
    width: '20rem',
    children: (
      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {[
          { service: 'API Server', status: 'Operational', latency: '12ms' },
          { service: 'Database', status: 'Operational', latency: '5ms' },
          { service: 'CDN', status: 'Operational', latency: '45ms' },
          { service: 'Cache Layer', status: 'Operational', latency: '2ms' },
        ].map((item) => (
          <div
            key={item.service}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              background: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}
          >
            <div>
              <div
                style={{
                  color: '#fafafa',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '4px',
                }}
              >
                {item.service}
              </div>
              <div style={{ color: '#22c55e', fontSize: '12px' }}>
                {item.status}
              </div>
            </div>
            <div style={{ color: '#fafafa', fontSize: '14px', opacity: 0.7 }}>
              {item.latency}
            </div>
          </div>
        ))}
      </div>
    ),
  },
}

export const AchievementCard: Story = {
  args: {
    badge: 'Milestone',
    title: '100K Users Reached',
    description:
      'Thank you to all our users for making this incredible milestone possible!',
    borderColor: '#f97316',
    children: (
      <div
        style={{
          marginTop: '24px',
          padding: '20px',
          background: 'rgba(249, 115, 22, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(249, 115, 22, 0.2)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: '#f97316',
            fontSize: '64px',
            fontWeight: '700',
            lineHeight: '1',
            marginBottom: '16px',
          }}
        >
          100,000+
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginTop: '20px',
          }}
        >
          <div>
            <div
              style={{
                color: '#fafafa',
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '4px',
              }}
            >
              45
            </div>
            <div style={{ color: '#fafafa', fontSize: '12px', opacity: 0.7 }}>
              Countries
            </div>
          </div>
          <div>
            <div
              style={{
                color: '#fafafa',
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '4px',
              }}
            >
              98%
            </div>
            <div style={{ color: '#fafafa', fontSize: '12px', opacity: 0.7 }}>
              Satisfaction
            </div>
          </div>
        </div>
      </div>
    ),
  },
}

export const CustomColorScheme: Story = {
  args: {
    badge: 'Limited Edition',
    title: 'Cyberpunk Theme',
    description:
      'Experience our platform with this exclusive cyberpunk-inspired color scheme.',
    borderColor: '#ec4899',
    width: '22rem',
    children: (
      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {[
          { label: 'Primary', color: '#ec4899' },
          { label: 'Secondary', color: '#a855f7' },
          { label: 'Accent', color: '#3b82f6' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              background: 'rgba(236, 72, 153, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(236, 72, 153, 0.2)',
            }}
          >
            <span style={{ color: '#fafafa', fontSize: '14px' }}>
              {item.label}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  background: item.color,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              ></div>
              <span
                style={{ color: '#fafafa', fontSize: '14px', opacity: 0.7 }}
              >
                {item.color}
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
}

export const MinimalDesign: Story = {
  args: {
    title: 'Clean & Simple',
    description:
      'Sometimes less is more. A minimal design without a badge for a cleaner look.',
    borderColor: '#8b5cf6',
    width: '20rem',
  },
}

export const WideFormat: Story = {
  args: {
    badge: 'Dashboard',
    title: 'Real-Time Analytics',
    description:
      'Monitor your key metrics in real-time with our comprehensive analytics dashboard. Track performance, identify trends, and make informed decisions.',
    borderColor: '#06b6d4',
    width: '100%',
    height: 'auto',
    style: { maxWidth: '600px', minHeight: '400px' },
    children: (
      <div
        style={{
          marginTop: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {[
          { metric: 'Total Users', value: '24,583', change: '+12%' },
          { metric: 'Active Now', value: '1,247', change: '+5%' },
          { metric: 'Revenue', value: '$48.2K', change: '+18%' },
        ].map((item) => (
          <div
            key={item.metric}
            style={{
              padding: '16px',
              background: 'rgba(6, 182, 212, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(6, 182, 212, 0.2)',
            }}
          >
            <div
              style={{
                color: '#fafafa',
                fontSize: '12px',
                opacity: 0.7,
                marginBottom: '8px',
              }}
            >
              {item.metric}
            </div>
            <div
              style={{
                color: '#06b6d4',
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '4px',
              }}
            >
              {item.value}
            </div>
            <div style={{ color: '#22c55e', fontSize: '12px' }}>
              {item.change}
            </div>
          </div>
        ))}
      </div>
    ),
  },
}
