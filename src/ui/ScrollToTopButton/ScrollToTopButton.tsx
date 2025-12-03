import React, { useEffect, useState, useLayoutEffect } from 'react'
import { ArrowUpward } from '@mui/icons-material'
import clsx from 'clsx'

/**
 * A11y‑friendly, theme‑able «scroll‑to‑top» utility.
 *
 * – **IntersectionObserver first**: no scroll‑event spam.
 * – **Keyboard shortcut**: press *Home* to jump up.
 * – **Variants**: `solid` & `ghost`, easy to extend.
 * – **Container aware**: works in Storybook if you pass the scrollable div.
 */
export type ScrollToTopVariant = 'solid' | 'ghost'

export interface ScrollToTopButtonProps {
  /**
   * Scrollable element to observe. Omit for whole window.
   * Pass e.g. `ref.current` when inside modals or Storybook.
   */
  scrollContainer?: HTMLElement | Window | null
  /** How the button should look */
  variant?: ScrollToTopVariant
  /** Custom accessible label */
  label?: string
  /** Fallback pixel threshold for browsers *without* IntersectionObserver */
  scrollThreshold?: number
  /** Icon size (px) */
  iconSize?: number
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  scrollContainer = typeof window !== 'undefined' ? window : null,
  variant = 'solid',
  label = 'Scroll to top',
  scrollThreshold = 500,
  iconSize = 24,
}) => {
  // root element may be null on first render when ref is still empty → copy into state once it exists
  const [root, setRoot] = useState<HTMLElement | Window | null>(scrollContainer)
  const [isVisible, setIsVisible] = useState(false)

  // keep root in sync if the prop changes after mount (e.g. ref.current becomes defined)
  useLayoutEffect(() => {
    if (scrollContainer && scrollContainer !== root) setRoot(scrollContainer)
  }, [scrollContainer])

  // Show / hide by observing a 1‑px sentinel at the top of the scroll area
  useEffect(() => {
    if (!root) return

    const parent: HTMLElement = root === window ? document.body : (root as HTMLElement)
    const sentinel = document.createElement('div')
    sentinel.setAttribute('data-scrolltop-sentinel', 'true')
    sentinel.style.cssText =
      'position:absolute;top:0;left:0;height:1px;width:1px;pointer-events:none;'
    // ensure the sentinel sits at the real scroll start
    parent.prepend(sentinel)

    let tearDown: () => void = () => {}

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(!entry.isIntersecting),
        { root: root === window ? null : (root as HTMLElement), threshold: 0 },
      )
      observer.observe(sentinel)
      tearDown = () => observer.disconnect()
    } else {
      // ➡︎ Fallback for very old browsers – throttle with rAF
      let ticking = false
      const target = root as Window | HTMLElement
      const onScroll = () => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => {
          const scrollTop = target === window ? window.scrollY : (target as HTMLElement).scrollTop
          setIsVisible(scrollTop > scrollThreshold)
          ticking = false
        })
      }
      target.addEventListener('scroll', onScroll, { passive: true })
      tearDown = () => target.removeEventListener('scroll', onScroll)
    }

    return () => {
      tearDown()
      sentinel.remove()
    }
  }, [root, scrollThreshold])

  // global keyboard shortcut: Home → top
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Home') scrollToTop()
    }
    window.addEventListener('keyup', onKey)
    return () => window.removeEventListener('keyup', onKey)
  }, [root])

  const scrollToTop = () => {
    if (!root) return
    if (root === window) {
      ;(root as Window).scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      ;(root as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const buttonClass = clsx(
    'fixed bottom-5 right-5 z-[9999]',
    'flex items-center justify-center rounded-full p-3',
    'transition-all duration-300 ease-in-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'transform-gpu',
    isVisible
      ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
      : 'opacity-0 translate-y-2 scale-95 pointer-events-none',
    variant === 'solid'
      ? clsx(
          'bg-blue-600 dark:bg-blue-500 text-white',
          'shadow-lg hover:shadow-xl',
          'hover:bg-blue-700 dark:hover:bg-blue-600',
          'active:bg-blue-800 dark:active:bg-blue-700',
          'active:scale-95',
          'focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400'
        )
      : clsx(
          'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md',
          'text-blue-600 dark:text-blue-400',
          'ring-1 ring-blue-500/50 dark:ring-blue-400/50',
          'hover:bg-white dark:hover:bg-gray-800',
          'hover:ring-blue-500 dark:hover:ring-blue-400',
          'active:scale-95',
          'focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400'
        ),
  )

  return (
    <button onClick={scrollToTop} aria-label={label} type="button" className={buttonClass}>
      <ArrowUpward style={{ width: iconSize, height: iconSize }} />
    </button>
  )
}

export default ScrollToTopButton
