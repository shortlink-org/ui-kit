import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react'
import { ArrowUpIcon } from '@heroicons/react/24/outline'
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
  /**
   * Extra classes for the button (e.g. override `bottom` / `right` spacing).
   * Default inset uses safe-area env() + responsive gaps.
   */
  className?: string
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  scrollContainer = typeof window !== 'undefined' ? window : null,
  variant = 'solid',
  label = 'Scroll to top',
  scrollThreshold = 500,
  iconSize = 22,
  enableGlobalHotkey = true,
  className,
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

    const parent: HTMLElement =
      root === window ? document.documentElement : (root as HTMLElement)

    // Check if sentinel already exists (for multiple buttons)
    let sentinel = parent.querySelector(
      '[data-scrolltop-sentinel="true"]',
    ) as HTMLElement
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
          const scrollTop =
            target === window
              ? window.scrollY
              : (target as HTMLElement).scrollTop
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
      const allSentinels = document.querySelectorAll(
        '[data-scrolltop-sentinel="true"]',
      )
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

    const target = enableGlobalHotkey
      ? window
      : root === window
        ? window
        : (root as HTMLElement)
    const handler = onKey as (e: Event) => void
    target.addEventListener('keyup', handler)
    return () => target.removeEventListener('keyup', handler)
  }, [root, enableGlobalHotkey, scrollToTop])

  const buttonClass = clsx(
    'fixed z-[9999]',
    'right-[max(1rem,env(safe-area-inset-right,0px))]',
    'bottom-[max(1rem,env(safe-area-inset-bottom,0px))]',
    'sm:right-6 sm:bottom-6',
    'md:right-8 md:bottom-8',
    'inline-flex size-12 cursor-pointer items-center justify-center rounded-2xl md:size-14',
    'transition-[transform,opacity,box-shadow,background-color,border-color] duration-300 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]',
    'transform-gpu',
    isVisible
      ? 'pointer-events-auto translate-y-0 opacity-100'
      : 'pointer-events-none translate-y-3 opacity-0',
    variant === 'solid' &&
      clsx(
        'border border-white/15 bg-[var(--color-primary-600)] text-white',
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_8px_24px_-6px_color-mix(in_srgb,var(--color-primary-600)_45%,transparent),0_2px_6px_rgba(15,23,42,0.08)]',
        'hover:-translate-y-px hover:bg-[var(--color-primary-500)]',
        'hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_14px_36px_-8px_color-mix(in_srgb,var(--color-primary-500)_50%,transparent)]',
        'active:translate-y-0 active:scale-[0.97]',
      ),
    variant === 'ghost' &&
      clsx(
        'border border-[var(--color-border)] bg-[var(--color-surface)]/90 text-[var(--color-primary-600)]',
        'shadow-sm backdrop-blur-xl',
        'dark:border-white/10 dark:bg-[color-mix(in_srgb,var(--color-surface)_85%,transparent)] dark:text-[var(--color-primary-400)]',
        'dark:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55)]',
        'hover:-translate-y-px hover:border-[color-mix(in_srgb,var(--color-primary-400)_22%,var(--color-border))] hover:bg-[var(--color-surface)]',
        'hover:text-[var(--color-primary-700)] dark:hover:text-[var(--color-primary-300)]',
        'active:translate-y-0 active:scale-[0.97]',
      ),
    className,
  )

  return (
    <button
      onClick={scrollToTop}
      aria-label={label}
      type="button"
      className={buttonClass}
    >
      <ArrowUpIcon
        className="relative shrink-0 text-current"
        strokeWidth={2}
        aria-hidden
        style={{ width: iconSize, height: iconSize }}
      />
    </button>
  )
}

export default ScrollToTopButton
