import * as React from 'react'
import gsap from 'gsap'
import { useReducedMotion } from 'motion/react'
import { defaultFormatScore } from './utils'

interface AnimatedMetricValueProps {
  value: number
  formatter?: (value: number) => string
  className?: string
}

export function AnimatedMetricValue({
  value,
  formatter = defaultFormatScore,
  className,
}: AnimatedMetricValueProps) {
  const prefersReducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = React.useState(value)
  const previousValueRef = React.useRef(value)

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value)
      previousValueRef.current = value
      return
    }

    const state = { current: previousValueRef.current }
    const animation = gsap.to(state, {
      current: value,
      duration: 0.8,
      ease: 'power3.out',
      onUpdate: () => {
        setDisplayValue(state.current)
      },
      onComplete: () => {
        previousValueRef.current = value
      },
    })

    return () => {
      animation.kill()
      previousValueRef.current = value
    }
  }, [prefersReducedMotion, value])

  return (
    <span className={className}>{formatter(Math.round(displayValue))}</span>
  )
}
