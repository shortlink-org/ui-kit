import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react'
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
  /**
   * Enable global Home key shortcut. Default: true.
   * Set to false when button is in isolated scroll containers (modals, Storybook)
   * to prevent intercepting keys for entire app.
   */
  enableGlobalHotkey?: boolean
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  scrollContainer = typeof window !== 'undefined' ? window : null,
  variant = 'solid',
  label = 'Scroll to top',
  scrollThreshold = 500,
  iconSize = 24,
  enableGlobalHotkey = true,
}) => {
  // root element may be null on first render when ref is still empty → copy into state once it exists
  const [root, setRoot] = useState<HTMLElement | Window | null>(scrollContainer)
  const [isVisible, setIsVisible] = useState(false)

  // keep root in sync if the prop changes after mount (e.g. ref.current becomes defined)
  useLayoutEffect(() => {
    if (scrollContainer && scrollContainer !== root) setRoot(scrollContainer)
  }, [scrollContainer, root])

  const scrollToTop = useCallback(() => {
    if (!root) return
    if (root === window) {
      ;(root as Window).scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      ;(root as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [root])

  // Show / hide by observing a 1‑px sentinel at the top of the scroll area
  useEffect(() => {
    if (!root) return

    const parent: HTMLElement = root === window ? document.documentElement : (root as HTMLElement)
    
    // Check if sentinel already exists (for multiple buttons)
    let sentinel = parent.querySelector('[data-scrolltop-sentinel="true"]') as HTMLElement
    if (!sentinel) {
      sentinel = document.createElement('div')
      sentinel.setAttribute('data-scrolltop-sentinel', 'true')
      sentinel.style.cssText =
        'position:absolute;top:0;left:0;height:1px;width:1px;pointer-events:none;'
      // Insert at the beginning, but only if it doesn't exist
      parent.insertBefore(sentinel, parent.firstChild)
    }

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
      // Only remove sentinel if no other instances are using it
      // Check if there are other sentinels or if this is the last one
      const allSentinels = document.querySelectorAll('[data-scrolltop-sentinel="true"]')
      if (allSentinels.length === 1 && allSentinels[0] === sentinel) {
        sentinel.remove()
      }
    }
  }, [root, scrollThreshold])

  // keyboard shortcut: Home → top
  useEffect(() => {
    if (!root) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Home') {
        // If global hotkey is disabled, only handle when focused on the scroll container
        if (!enableGlobalHotkey) {
          // Check if the active element is within the scroll container
          const activeElement = document.activeElement
          if (root === window) {
            // For window, only handle if no modal/dialog is open
            if (activeElement && activeElement.closest('[role="dialog"]')) {
              return
            }
          } else {
            // For container, only handle if focus is within it
            const container = root as HTMLElement
            if (activeElement && !container.contains(activeElement)) {
              return
            }
          }
        }
        scrollToTop()
      }
    }

    const target = enableGlobalHotkey ? window : (root === window ? window : root as HTMLElement)
    const handler = onKey as (e: Event) => void
    target.addEventListener('keyup', handler)
    return () => target.removeEventListener('keyup', handler)
  }, [root, enableGlobalHotkey, scrollToTop])

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
