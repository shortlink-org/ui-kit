import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import './styles.css'

export interface AddToCartButtonProps {
  /** Button text */
  text?: string
  /** Scale factor for the button */
  scale?: number
  /** Callback when item is added to cart */
  onAddToCart?: () => void | Promise<void>
  /** Show reveal animation */
  reveal?: boolean
  /** Custom class name */
  className?: string
  /** Aria label for accessibility */
  ariaLabel?: string
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  text = 'Add to cart',
  scale = 1,
  onAddToCart,
  reveal = false,
  className = '',
  ariaLabel = 'Add to cart',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const cartRef = useRef<HTMLSpanElement>(null)
  const itemRef = useRef<SVGRectElement>(null)
  const animatedBorderRef = useRef<HTMLSpanElement>(null)
  const staticBorderRef = useRef<HTMLSpanElement>(null)
  const completeBorderRef = useRef<HTMLSpanElement>(null)
  const dummyRef = useRef<HTMLSpanElement>(null)
  const checkRef = useRef<HTMLSpanElement>(null)

  const [adding, setAdding] = useState(false)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.setProperty('--scale', String(scale))
    }
  }, [scale])

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.dataset.reveal = String(reveal)
    }
  }, [reveal])

  useEffect(() => {
    if (itemRef.current && gsap && gsap.set) {
      gsap.set(itemRef.current, {
        y: -24,
      })
    }
  }, [])

  const handleAddToCart = async () => {
    if (running || !buttonRef.current) return

    setRunning(true)
    setAdding(true)

    const dummy = dummyRef.current
    const cart = cartRef.current
    const text = textRef.current
    const item = itemRef.current
    const staticBorder = staticBorderRef.current
    const animatedBorder = animatedBorderRef.current
    const completeBorder = completeBorderRef.current
    const check = checkRef.current
    const wrapper = wrapperRef.current

    if (
      !dummy ||
      !cart ||
      !text ||
      !item ||
      !staticBorder ||
      !animatedBorder ||
      !completeBorder ||
      !check ||
      !wrapper
    ) {
      setRunning(false)
      setAdding(false)
      return
    }

    const dummyRect = dummy.getBoundingClientRect()
    const cartRect = cart.getBoundingClientRect()
    const distance = {
      x: dummyRect.left - cartRect.left,
    }

    await onAddToCart?.()

    if (!gsap || !gsap.timeline) {
      setRunning(false)
      setAdding(false)
      return
    }

    gsap
      .timeline({
        onComplete: () => {
          setRunning(false)
          setAdding(false)
        },
      })
      .set(wrapper, {
        '--complete': 1,
      })
      .to(
        cart,
        {
          x: distance.x / scale,
          duration: 0.22,
        },
        0,
      )
      .to(
        cart,
        {
          rotate: -20,
          yoyo: true,
          repeat: 1,
          duration: 0.11,
        },
        0,
      )
      .to(
        text,
        {
          opacity: 0,
          x: distance.x / scale,
          duration: 0.22,
          filter: 'blur(6px)',
        },
        0,
      )
      .to(
        item,
        {
          y: 0,
          duration: 0.1,
          delay: 0.1,
        },
        '<',
      )
      .to(
        staticBorder,
        {
          opacity: 1,
          duration: 0.1,
        },
        '<',
      )
      .set(wrapper, {
        '--complete': 0,
      })
      .set(animatedBorder, {
        opacity: 0,
      })
      .to(
        cart,
        {
          x: (distance.x / scale) * 4,
          duration: 0.6,
          delay: 0.1,
        },
        '>',
      )
      .to(
        cart,
        {
          rotate: -30,
          duration: 0.1,
        },
        '<',
      )
      .to(
        completeBorder,
        {
          opacity: 1,
          duration: 0.22,
        },
        '<',
      )
      .to(
        check,
        {
          opacity: 1,
          yoyo: true,
          scale: 1.5,
          duration: 0.25,
          repeatDelay: 0.125,
          repeat: 1,
        },
        '<',
      )
      .set(text, {
        x: 0,
        xPercent: 0,
      })
      .set(cart, {
        x: -100,
        rotate: 0,
      })
      .set(item, {
        y: -24,
      })
      .to(
        [staticBorder, completeBorder],
        {
          opacity: 0,
          duration: 0.5,
          delay: 0.125,
        },
        '>',
      )
      .to(
        text,
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.22,
          filter: 'blur(0px)',
        },
        '<',
      )
      .to(
        cart,
        {
          x: 0,
        },
        '<',
      )
      .to(
        animatedBorder,
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.in',
        },
        '<',
      )
  }

  return (
    <div ref={wrapperRef} className={`atc-wrapper ${className}`}>
      <button
        ref={buttonRef}
        className="atc"
        aria-label={ariaLabel}
        data-adding={adding}
        onClick={handleAddToCart}
        disabled={running}
      >
        <span className="atc__content">
          <span ref={cartRef} className="atc__cart">
            <svg
              className="atc__icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect
                ref={itemRef}
                className="atc__cart-content"
                x="9"
                y="-1"
                width="10"
                height="10"
                fill="green"
                rx="2"
              />
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </span>
          <span ref={dummyRef} className="atc__cart--dummy">
            <svg
              className="atc__icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </span>
          <span ref={checkRef} className="atc__check">
            <svg
              className="atc__icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </span>
          <span ref={textRef} className="atc__text">
            {text}
          </span>
        </span>
        <span className="atc__border atc__border--animated atc__border--demo"></span>
        <span
          ref={animatedBorderRef}
          className="atc__border atc__border--animated"
        ></span>
        <span
          ref={staticBorderRef}
          className="atc__border atc__border--static"
        ></span>
        <span
          ref={completeBorderRef}
          className="atc__border atc__border--complete"
        ></span>
      </button>
    </div>
  )
}

export default AddToCartButton
