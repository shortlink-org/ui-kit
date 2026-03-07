import { motion } from 'motion/react'
import type { LeaderboardStat } from './types'
import { AnimatedMetricValue } from './AnimatedMetricValue'
import { StatCard } from '../../StatCard/StatCard'

interface LeaderboardStatCardProps {
  stat: LeaderboardStat
  formatScore?: (value: number) => string
}

export function LeaderboardStatCard({
  stat,
  formatScore,
}: LeaderboardStatCardProps) {
  const tone = stat.tone ?? 'neutral'

  return (
    <motion.div layout>
      <StatCard
        label={stat.label}
        change={stat.change}
        tone={tone}
        value={
          typeof stat.value === 'number' ? (
            <AnimatedMetricValue value={stat.value} formatter={formatScore} />
          ) : (
            stat.value
          )
        }
      />
    </motion.div>
  )
}
