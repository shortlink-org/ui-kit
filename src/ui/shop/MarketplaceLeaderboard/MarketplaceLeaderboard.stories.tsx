import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../Button/Button'
import {
  MarketplaceLeaderboard,
  type LeaderboardEntry,
  type LeaderboardFilterId,
  type LeaderboardStat,
} from './'

function avatar(imageId: number): string {
  return `https://i.pravatar.cc/240?img=${imageId}`
}

const storefrontEntries: Record<LeaderboardFilterId, LeaderboardEntry[]> = {
  day: [
    {
      id: 'northstar',
      rank: 1,
      name: 'Northstar Atelier',
      subtitle: 'Premium home decor',
      avatarSrc: avatar(12),
      score: 128400,
      delta: 2,
      metric: '1.2k orders',
      note: 'Same-day delivery leader',
      verified: true,
      badge: { label: 'Top conversion', tone: 'accent' },
      accentColor: 'rgba(56, 189, 248, 0.28)',
    },
    {
      id: 'luma',
      rank: 2,
      name: 'Luma Skin Lab',
      subtitle: 'Beauty marketplace standout',
      avatarSrc: avatar(32),
      score: 121900,
      delta: 1,
      metric: '8.6% CVR',
      note: 'Best paid media ROAS',
      verified: true,
      badge: { label: 'Fast mover', tone: 'success' },
      accentColor: 'rgba(244, 114, 182, 0.24)',
    },
    {
      id: 'orbit',
      rank: 3,
      name: 'Orbit Run Club',
      subtitle: 'Sneakers and active gear',
      avatarSrc: avatar(20),
      score: 119300,
      delta: -1,
      metric: '934 units',
      note: 'Top basket size',
      badge: { label: 'Bundle king', tone: 'warning' },
      accentColor: 'rgba(52, 211, 153, 0.24)',
    },
    {
      id: 'atelier-noir',
      rank: 4,
      name: 'Atelier Noir',
      subtitle: 'Designer accessories',
      avatarSrc: avatar(48),
      score: 107200,
      delta: 3,
      metric: '17 live products',
      note: 'Campaign spike',
      verified: true,
    },
    {
      id: 'fields',
      rank: 5,
      name: 'Fields Pantry',
      subtitle: 'Gourmet grocery',
      avatarSrc: avatar(14),
      score: 101300,
      delta: 1,
      metric: '312 repeat buyers',
      note: 'Highest repeat rate',
    },
    {
      id: 'aurora',
      rank: 6,
      name: 'Aurora Frames',
      subtitle: 'Art and prints',
      avatarSrc: avatar(38),
      score: 94800,
      delta: -2,
      metric: '42% gross margin',
      note: 'Premium assortment',
    },
    {
      id: 'cinder',
      rank: 7,
      name: 'Cinder Supply',
      subtitle: 'Industrial style furniture',
      avatarSrc: avatar(5),
      score: 89200,
      delta: 0,
      metric: '79 AOV',
      note: 'Steady seller',
    },
    {
      id: 'sora',
      rank: 8,
      name: 'Sora Tea Studio',
      subtitle: 'Tea and ritual sets',
      avatarSrc: avatar(45),
      score: 84700,
      delta: 2,
      metric: '4.9 merchant rating',
      note: 'Review momentum',
    },
    {
      id: 'user',
      rank: 13,
      name: 'Your store',
      subtitle: 'Curated stationery',
      avatarSrc: avatar(55),
      score: 56300,
      delta: 4,
      metric: '18.2% growth',
      note: 'Current campaign',
      isCurrentUser: true,
      badge: { label: 'On the rise', tone: 'success' },
    },
  ],
  week: [
    {
      id: 'luma',
      rank: 1,
      name: 'Luma Skin Lab',
      subtitle: 'Beauty marketplace standout',
      avatarSrc: avatar(32),
      score: 824200,
      delta: 1,
      metric: '11.3k orders',
      note: 'Highest repeat purchase',
      verified: true,
      badge: { label: 'Best retention', tone: 'accent' },
      accentColor: 'rgba(244, 114, 182, 0.24)',
    },
    {
      id: 'northstar',
      rank: 2,
      name: 'Northstar Atelier',
      subtitle: 'Premium home decor',
      avatarSrc: avatar(12),
      score: 801100,
      delta: -1,
      metric: '9.8k orders',
      note: 'Strong cross-sell',
      verified: true,
      badge: { label: 'Big baskets', tone: 'warning' },
      accentColor: 'rgba(56, 189, 248, 0.28)',
    },
    {
      id: 'orbit',
      rank: 3,
      name: 'Orbit Run Club',
      subtitle: 'Sneakers and active gear',
      avatarSrc: avatar(20),
      score: 768000,
      delta: 2,
      metric: '6.4k units',
      note: 'Weekend spike',
      badge: { label: 'Momentum', tone: 'success' },
      accentColor: 'rgba(52, 211, 153, 0.24)',
    },
    {
      id: 'cinder',
      rank: 4,
      name: 'Cinder Supply',
      subtitle: 'Industrial style furniture',
      avatarSrc: avatar(5),
      score: 645400,
      delta: 1,
      metric: '92 AOV',
      note: 'High-ticket growth',
    },
    {
      id: 'atelier-noir',
      rank: 5,
      name: 'Atelier Noir',
      subtitle: 'Designer accessories',
      avatarSrc: avatar(48),
      score: 602300,
      delta: -2,
      metric: '28% promo mix',
      note: 'Luxury segment',
      verified: true,
    },
    {
      id: 'fields',
      rank: 6,
      name: 'Fields Pantry',
      subtitle: 'Gourmet grocery',
      avatarSrc: avatar(14),
      score: 589800,
      delta: 3,
      metric: '2.7k subscriptions',
      note: 'Subscription boost',
    },
    {
      id: 'sora',
      rank: 7,
      name: 'Sora Tea Studio',
      subtitle: 'Tea and ritual sets',
      avatarSrc: avatar(45),
      score: 521900,
      delta: 1,
      metric: '4.95 merchant rating',
      note: 'Community favorite',
    },
    {
      id: 'aurora',
      rank: 8,
      name: 'Aurora Frames',
      subtitle: 'Art and prints',
      avatarSrc: avatar(38),
      score: 497200,
      delta: -3,
      metric: '31% returning buyers',
      note: 'Collector audience',
    },
    {
      id: 'user',
      rank: 11,
      name: 'Your store',
      subtitle: 'Curated stationery',
      avatarSrc: avatar(55),
      score: 348900,
      delta: 2,
      metric: '7.1% CVR',
      note: 'Current campaign',
      isCurrentUser: true,
      badge: { label: 'Closing in', tone: 'success' },
    },
  ],
  month: [
    {
      id: 'northstar',
      rank: 1,
      name: 'Northstar Atelier',
      subtitle: 'Premium home decor',
      avatarSrc: avatar(12),
      score: 3210000,
      delta: 0,
      metric: '28.4k orders',
      note: 'Marketplace staple',
      verified: true,
      badge: { label: 'Marketplace icon', tone: 'accent' },
      accentColor: 'rgba(56, 189, 248, 0.28)',
    },
    {
      id: 'luma',
      rank: 2,
      name: 'Luma Skin Lab',
      subtitle: 'Beauty marketplace standout',
      avatarSrc: avatar(32),
      score: 3040000,
      delta: 0,
      metric: '23.9k orders',
      note: 'Retention leader',
      verified: true,
      badge: { label: 'Fan favorite', tone: 'success' },
      accentColor: 'rgba(244, 114, 182, 0.24)',
    },
    {
      id: 'orbit',
      rank: 3,
      name: 'Orbit Run Club',
      subtitle: 'Sneakers and active gear',
      avatarSrc: avatar(20),
      score: 2860000,
      delta: 1,
      metric: '18.1k units',
      note: 'Strong launch cycle',
      badge: { label: 'Seasonal peak', tone: 'warning' },
      accentColor: 'rgba(52, 211, 153, 0.24)',
    },
    {
      id: 'atelier-noir',
      rank: 4,
      name: 'Atelier Noir',
      subtitle: 'Designer accessories',
      avatarSrc: avatar(48),
      score: 2400000,
      delta: -1,
      metric: '52% margin',
      note: 'Luxury audience',
      verified: true,
    },
    {
      id: 'cinder',
      rank: 5,
      name: 'Cinder Supply',
      subtitle: 'Industrial style furniture',
      avatarSrc: avatar(5),
      score: 2180000,
      delta: 2,
      metric: '$182 AOV',
      note: 'High-ticket gain',
    },
    {
      id: 'fields',
      rank: 6,
      name: 'Fields Pantry',
      subtitle: 'Gourmet grocery',
      avatarSrc: avatar(14),
      score: 2070000,
      delta: -1,
      metric: '5.2k subscribers',
      note: 'Subscription engine',
    },
    {
      id: 'user',
      rank: 9,
      name: 'Your store',
      subtitle: 'Curated stationery',
      avatarSrc: avatar(55),
      score: 1620000,
      delta: 3,
      metric: '24% monthly growth',
      note: 'Current campaign',
      isCurrentUser: true,
      badge: { label: 'Breakout month', tone: 'success' },
    },
  ],
}

const storefrontStats: Record<LeaderboardFilterId, LeaderboardStat[]> = {
  day: [
    { id: 'gmv', label: 'Tracked GMV', value: 1920000, change: '+18%', tone: 'accent' },
    { id: 'buyers', label: 'Active buyers', value: 14820, change: '+9%', tone: 'success' },
    { id: 'conversion', label: 'Avg. conversion', value: '7.4%', change: '+0.6pp', tone: 'warning' },
    { id: 'campaigns', label: 'Campaigns live', value: 27, change: 'today', tone: 'neutral' },
  ],
  week: [
    { id: 'gmv', label: 'Tracked GMV', value: 12400000, change: '+26%', tone: 'accent' },
    { id: 'buyers', label: 'Active buyers', value: 58240, change: '+13%', tone: 'success' },
    { id: 'conversion', label: 'Avg. conversion', value: '6.8%', change: '+0.4pp', tone: 'warning' },
    { id: 'campaigns', label: 'Campaigns live', value: 64, change: 'this week', tone: 'neutral' },
  ],
  month: [
    { id: 'gmv', label: 'Tracked GMV', value: 48600000, change: '+41%', tone: 'accent' },
    { id: 'buyers', label: 'Active buyers', value: 201400, change: '+22%', tone: 'success' },
    { id: 'conversion', label: 'Avg. conversion', value: '6.4%', change: '+0.3pp', tone: 'warning' },
    { id: 'campaigns', label: 'Campaigns live', value: 112, change: 'this month', tone: 'neutral' },
  ],
}

const productMomentumEntries: LeaderboardEntry[] = [
  {
    id: 'prod-1',
    rank: 1,
    name: 'Monaco Runner Pro',
    subtitle: 'Sneakers / Men',
    avatarSrc:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=320&q=80',
    score: 13420,
    scoreDisplay: '13.4k',
    delta: 4,
    metric: '2.3k wishlists',
    note: 'Drop winner',
    badge: { label: 'Trending', tone: 'accent' },
  },
  {
    id: 'prod-2',
    rank: 2,
    name: 'Cloud Knit Set',
    subtitle: 'Apparel / Women',
    avatarSrc:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=320&q=80',
    score: 12880,
    scoreDisplay: '12.9k',
    delta: 2,
    metric: '8.8% CVR',
    note: 'Bundle growth',
    badge: { label: 'High conversion', tone: 'success' },
  },
  {
    id: 'prod-3',
    rank: 3,
    name: 'Stoneware Pour Set',
    subtitle: 'Home / Kitchen',
    avatarSrc:
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=320&q=80',
    score: 11940,
    scoreDisplay: '11.9k',
    delta: -1,
    metric: '1.9k saves',
    note: 'Creator collab',
    badge: { label: 'Giftable', tone: 'warning' },
  },
  {
    id: 'prod-4',
    rank: 4,
    name: 'Glow Serum Duo',
    subtitle: 'Beauty / Skincare',
    avatarSrc:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=320&q=80',
    score: 10520,
    scoreDisplay: '10.5k',
    delta: 5,
    metric: '1.2k subscriptions',
    note: 'Strong retention',
  },
  {
    id: 'prod-5',
    rank: 5,
    name: 'Contour Lamp',
    subtitle: 'Home / Decor',
    avatarSrc:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=320&q=80',
    score: 9830,
    scoreDisplay: '9.8k',
    delta: 1,
    metric: '$148 AOV',
    note: 'Premium ticket',
  },
]

const sellerContestEntries: LeaderboardEntry[] = [
  {
    id: 'seller-1',
    rank: 1,
    name: 'Vanta Goods',
    subtitle: 'Seller sprint leaderboard',
    avatarSrc: avatar(11),
    score: 280000,
    scoreDisplay: '$280k',
    delta: 1,
    metric: '94 quality score',
    note: '72h flash sale',
    badge: { label: 'Campaign leader', tone: 'accent' },
  },
  {
    id: 'seller-2',
    rank: 2,
    name: 'Common Thread',
    subtitle: 'Seller sprint leaderboard',
    avatarSrc: avatar(21),
    score: 268000,
    scoreDisplay: '$268k',
    delta: -1,
    metric: '88 quality score',
    note: 'Email-driven lift',
  },
  {
    id: 'seller-3',
    rank: 3,
    name: 'Monday Ritual',
    subtitle: 'Seller sprint leaderboard',
    avatarSrc: avatar(31),
    score: 252000,
    scoreDisplay: '$252k',
    delta: 3,
    metric: '11% add-to-cart rate',
    note: 'Creative refresh',
    badge: { label: 'Biggest jump', tone: 'success' },
  },
  {
    id: 'seller-4',
    rank: 4,
    name: 'Your store',
    subtitle: 'Seller sprint leaderboard',
    avatarSrc: avatar(55),
    score: 241000,
    scoreDisplay: '$241k',
    delta: 2,
    metric: '86 quality score',
    note: 'Current campaign',
    isCurrentUser: true,
    verified: true,
    badge: { label: 'Prize zone', tone: 'success' },
  },
  {
    id: 'seller-5',
    rank: 5,
    name: 'Metric House',
    subtitle: 'Seller sprint leaderboard',
    avatarSrc: avatar(36),
    score: 228000,
    scoreDisplay: '$228k',
    delta: -2,
    metric: '88% fulfillment SLA',
    note: 'Operationally strong',
  },
  {
    id: 'seller-6',
    rank: 6,
    name: 'Daybreak Goods',
    subtitle: 'Seller sprint leaderboard',
    avatarSrc: avatar(43),
    score: 214000,
    scoreDisplay: '$214k',
    delta: 0,
    metric: '17.8% growth',
    note: 'Steady pace',
  },
]

const loyaltyEntries: LeaderboardEntry[] = [
  {
    id: 'buyer-1',
    rank: 1,
    name: 'Maya Brooks',
    subtitle: 'Platinum buyer',
    avatarSrc: avatar(17),
    score: 9320,
    scoreDisplay: '9,320 pts',
    delta: 1,
    metric: '42 completed orders',
    note: 'Free express unlocked',
    badge: { label: 'VIP', tone: 'accent' },
  },
  {
    id: 'buyer-2',
    rank: 2,
    name: 'Jonah Hall',
    subtitle: 'Gold buyer',
    avatarSrc: avatar(24),
    score: 9180,
    scoreDisplay: '9,180 pts',
    delta: -1,
    metric: '38 completed orders',
    note: 'Big order volume',
  },
  {
    id: 'buyer-3',
    rank: 3,
    name: 'Priya Nair',
    subtitle: 'Gold buyer',
    avatarSrc: avatar(28),
    score: 8870,
    scoreDisplay: '8,870 pts',
    delta: 2,
    metric: '31 completed orders',
    note: 'Referral points',
  },
  {
    id: 'buyer-4',
    rank: 4,
    name: 'Your account',
    subtitle: 'Silver buyer',
    avatarSrc: avatar(54),
    score: 6110,
    scoreDisplay: '6,110 pts',
    delta: 3,
    metric: '19 completed orders',
    note: '500 pts to Gold',
    isCurrentUser: true,
    badge: { label: 'Almost there', tone: 'success' },
  },
  {
    id: 'buyer-5',
    rank: 5,
    name: 'Elena Frost',
    subtitle: 'Silver buyer',
    avatarSrc: avatar(52),
    score: 5920,
    scoreDisplay: '5,920 pts',
    delta: -2,
    metric: '21 completed orders',
    note: 'Seasonal dip',
  },
]

const meta: Meta<typeof MarketplaceLeaderboard> = {
  title: 'Shop/MarketplaceLeaderboard',
  component: MarketplaceLeaderboard,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [390, 768, 1200, 1440],
    },
  },
}

export default meta
type Story = StoryObj<typeof MarketplaceLeaderboard>

function StorefrontShowcaseRender() {
  const [selectedFilter, setSelectedFilter] =
    React.useState<LeaderboardFilterId>('week')

  return (
    <div className="bg-[var(--color-background)] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <MarketplaceLeaderboard
          eyebrow="Marketplace pulse"
          title="See which sellers are winning the storefront right now"
          description="A storefront-ready leaderboard for homepage hero sections, campaign dashboards and category showcases. It combines podium ranking, momentum, current-user highlighting and live performance chips in one block."
          scoreLabel="GMV"
          entries={storefrontEntries[selectedFilter]}
          stats={storefrontStats[selectedFilter]}
          filters={[
            { id: 'day', label: 'Today', count: 24 },
            { id: 'week', label: 'This week', count: 64 },
            { id: 'month', label: 'This month', count: 112 },
          ]}
          selectedFilterId={selectedFilter}
          onFilterChange={setSelectedFilter}
          visibleRows={8}
          headerAction={
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">Share leaderboard</Button>
              <Button>View seller campaign</Button>
            </div>
          }
        />
      </div>
    </div>
  )
}

function SystemStatesRender() {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false)
    }, 1400)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div className="bg-[var(--color-background)] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[110rem] gap-6 2xl:grid-cols-2">
        <div className="min-w-0">
          <MarketplaceLeaderboard
            eyebrow="Seller campaign"
            title="Loading into a live leaderboard state"
            description="System behavior while campaign metrics load in from analytics."
            scoreLabel="GMV"
            entries={storefrontEntries.week}
            stats={storefrontStats.week}
            loading={loading}
            visibleRows={6}
            headerAction={<Button variant="outline">Campaign settings</Button>}
          />
        </div>

        <div className="min-w-0">
          <MarketplaceLeaderboard
            eyebrow="Season kickoff"
            title="Leaderboard without participants yet"
            description="Pre-launch empty state for campaign pages and leaderboard shells."
            scoreLabel="GMV"
            entries={[]}
            emptyTitle="Campaign starts tomorrow"
            emptyDescription="Invite sellers and schedule the launch. Once the first tracked orders land, rankings will populate automatically."
            headerAction={<Button>Invite sellers</Button>}
          />
        </div>
      </div>
    </div>
  )
}

export const StorefrontShowcase: Story = {
  render: StorefrontShowcaseRender,
}

export const CategoryMomentum: Story = {
  render: () => (
    <div className="bg-[var(--color-background)] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <MarketplaceLeaderboard
          eyebrow="Category heatmap"
          title="Top products driving category momentum"
          description="A category page leaderboard focused on product movement. Useful below a merchandising hero or inside a trend-focused collection page."
          scoreLabel="Orders"
          entries={productMomentumEntries}
          stats={[
            { id: 'orders', label: 'Orders in motion', value: 48200, change: '+31%', tone: 'accent' },
            { id: 'wishlists', label: 'Wishlists added', value: 11200, change: '+18%', tone: 'success' },
            { id: 'sellthrough', label: 'Sell-through', value: '73%', change: '+8pp', tone: 'warning' },
          ]}
          filters={[
            { id: 'all', label: 'All categories', count: 156 },
            { id: 'sneakers', label: 'Sneakers', count: 41 },
            { id: 'home', label: 'Home', count: 39 },
            { id: 'beauty', label: 'Beauty', count: 25 },
          ]}
          selectedFilterId="all"
          visibleRows={5}
          headerAction={<Button>Launch collection</Button>}
        />
      </div>
    </div>
  ),
}

export const SellerCampaignRace: Story = {
  render: () => (
    <div className="bg-[var(--color-background)] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <MarketplaceLeaderboard
          eyebrow="Seller contest"
          title="Contest leaderboard for merchant campaign dashboards"
          description="A realistic seller competition scene with prize-zone framing, current-user highlighting and momentum movement. Designed for marketplace incentive programs."
          scoreLabel="Revenue"
          entries={sellerContestEntries}
          stats={[
            { id: 'prize', label: 'Prize pool', value: '$25k', change: 'live', tone: 'accent' },
            { id: 'participants', label: 'Active sellers', value: 42, change: '+7', tone: 'success' },
            { id: 'deadline', label: 'Ends in', value: '2d 14h', change: 'urgent', tone: 'warning' },
          ]}
          visibleRows={6}
          headerAction={
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">Rules</Button>
              <Button>Boost my placement</Button>
            </div>
          }
        />
      </div>
    </div>
  ),
}

export const LoyaltyMobileExperience: Story = {
  render: () => (
    <div className="bg-[var(--color-background)] px-4 py-10">
      <div className="mx-auto max-w-md">
        <MarketplaceLeaderboard
          eyebrow="Loyalty ranking"
          title="Compact mobile leaderboard"
          description="A mobile-first loyalty leaderboard for customer profile or app-home surfaces."
          scoreLabel="Points"
          entries={loyaltyEntries}
          mobileRankingLayout="horizontal"
          stats={[
            { id: 'members', label: 'Ranked buyers', value: 2840, change: '+11%', tone: 'accent' },
            { id: 'unlock', label: 'Next reward', value: 'Gold tier', change: '500 pts left', tone: 'success' },
          ]}
          visibleRows={4}
          headerAction={<Button size="sm" className="w-full">See rewards</Button>}
        />
      </div>
    </div>
  ),
}

export const SystemStates: Story = {
  render: SystemStatesRender,
}
