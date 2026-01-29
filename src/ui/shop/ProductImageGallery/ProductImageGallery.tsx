'use client'

import * as React from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassPlusIcon,
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  PanInfo,
} from 'motion/react'

export interface ProductImage {
  src: string
  alt: string
}

export type ProductImageGalleryVariant = 'grid' | 'carousel' | 'stack'

export interface ProductImageGalleryProps {
  /** Array of product images */
  images: ProductImage[]
  /** Display variant: 'grid' for grid layout, 'carousel' for carousel */
  variant?: ProductImageGalleryVariant
  /** Currently selected image index */
  selectedImageIndex?: number
  /** Callback when image selection changes */
  onImageChange?: (index: number) => void
  /** Enable zoom functionality */
  enableZoom?: boolean
  /** Custom className */
  className?: string
}

export function ProductImageGallery({
  images,
  variant = 'grid',
  selectedImageIndex: controlledSelectedIndex,
  onImageChange,
  enableZoom = false,
  className,
}: ProductImageGalleryProps) {
  const [internalSelectedIndex, setInternalSelectedIndex] = React.useState(0)
  const [zoomOpen, setZoomOpen] = React.useState(false)
  const [zoomImageIndex, setZoomImageIndex] = React.useState(0)

  const isControlled = controlledSelectedIndex !== undefined
  const selectedIndex = isControlled
    ? controlledSelectedIndex
    : internalSelectedIndex

  const handleImageChange = React.useCallback(
    (index: number) => {
      if (!isControlled) {
        setInternalSelectedIndex(index)
      }
      onImageChange?.(index)
    },
    [isControlled, onImageChange],
  )

  if (images.length === 0) {
    return null
  }

  const currentImage = images[selectedIndex] || images[0]

  // Carousel variant
  if (variant === 'carousel') {
    return (
      <div
        className={clsx(
          'mx-auto mt-6 max-w-2xl sm:px-6 lg:px-8',
          className,
        )}
      >
        <div className="relative">
          {/* Main image */}
          <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 lg:aspect-3/4">
            <img
              alt={currentImage.alt}
              src={currentImage.src}
              className="h-full w-full object-cover"
            />
            {enableZoom && (
              <button
                type="button"
                onClick={() => {
                  setZoomImageIndex(selectedIndex)
                  setZoomOpen(true)
                }}
                className="absolute bottom-4 right-4 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Zoom image"
              >
                <MagnifyingGlassPlusIcon
                  className="size-5 text-gray-900"
                  aria-hidden="true"
                />
              </button>
            )}

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    handleImageChange(
                      selectedIndex === 0
                        ? images.length - 1
                        : selectedIndex - 1,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon
                    className="size-6 text-gray-900"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleImageChange(
                      selectedIndex === images.length - 1
                        ? 0
                        : selectedIndex + 1,
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Next image"
                >
                  <ChevronRightIcon
                    className="size-6 text-gray-900"
                    aria-hidden="true"
                  />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail navigation */}
          {images.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleImageChange(index)}
                  className={clsx(
                    'relative flex-shrink-0 overflow-hidden rounded-lg',
                    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                    index === selectedIndex
                      ? 'ring-2 ring-indigo-500'
                      : 'opacity-60 hover:opacity-100',
                  )}
                  aria-label={`View image ${index + 1}: ${image.alt}`}
                >
                  <img
                    alt={image.alt}
                    src={image.src}
                    className="h-20 w-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Zoom modal */}
        {enableZoom && (
          <Dialog
            open={zoomOpen}
            onClose={() => setZoomOpen(false)}
            className="relative z-50"
          >
            <DialogBackdrop className="fixed inset-0 bg-black/90" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel className="relative max-w-7xl">
                  <button
                    type="button"
                    onClick={() => setZoomOpen(false)}
                    className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Close zoom"
                  >
                    <XMarkIcon className="size-6" aria-hidden="true" />
                  </button>

                  <div className="relative">
                    <img
                      alt={images[zoomImageIndex]?.alt || ''}
                      src={images[zoomImageIndex]?.src || ''}
                      className="max-h-[90vh] max-w-full object-contain"
                    />

                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setZoomImageIndex(
                              zoomImageIndex === 0
                                ? images.length - 1
                                : zoomImageIndex - 1,
                            )
                          }
                          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                          aria-label="Previous image"
                        >
                          <ChevronLeftIcon
                            className="size-8"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setZoomImageIndex(
                              zoomImageIndex === images.length - 1
                                ? 0
                                : zoomImageIndex + 1,
                            )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                          aria-label="Next image"
                        >
                          <ChevronRightIcon
                            className="size-8"
                            aria-hidden="true"
                          />
                        </button>
                      </>
                    )}
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    )
  }

  // Stack variant - swipeable card stack
  // @see https://motion.dev/tutorials/react-card-stack
  if (variant === 'stack') {
    return (
      <CardStack
        images={images}
        selectedIndex={selectedIndex}
        onImageChange={handleImageChange}
        enableZoom={enableZoom}
        zoomOpen={zoomOpen}
        setZoomOpen={setZoomOpen}
        zoomImageIndex={zoomImageIndex}
        setZoomImageIndex={setZoomImageIndex}
        className={className}
      />
    )
  }

  // Grid variant (default)
  const [mainImage, ...secondaryImages] = images

  return (
    <div
      className={clsx(
        'mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8',
        className,
      )}
    >
      {/* Main large image - hidden on mobile, shown on desktop */}
      {mainImage && (
        <div className="relative">
          <img
            alt={mainImage.alt}
            src={mainImage.src}
            className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden cursor-pointer"
            onClick={() => enableZoom && handleImageChange(0)}
          />
          {enableZoom && (
            <button
              type="button"
              onClick={() => {
                setZoomImageIndex(0)
                setZoomOpen(true)
              }}
              className="absolute bottom-4 right-4 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 max-lg:hidden"
              aria-label="Zoom image"
            >
              <MagnifyingGlassPlusIcon
                className="size-5 text-gray-900"
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      )}

      {/* Secondary images grid - hidden on mobile, shown on desktop */}
      {secondaryImages.length > 0 && (
        <>
          {secondaryImages.slice(0, 2).map((image, index) => (
            <div key={index} className="relative">
              <img
                alt={image.alt}
                src={image.src}
                className={clsx(
                  'aspect-3/2 size-full rounded-lg object-cover max-lg:hidden cursor-pointer',
                  index === 0 ? 'col-start-2' : 'col-start-2 row-start-2',
                )}
                onClick={() => enableZoom && handleImageChange(index + 1)}
              />
            </div>
          ))}
        </>
      )}

      {/* Mobile/Featured image - shown on all screens */}
      {currentImage && (
        <div className="relative">
          <img
            alt={currentImage.alt}
            src={currentImage.src}
            className="row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-3/4"
            onClick={() => enableZoom && handleImageChange(selectedIndex)}
          />
        </div>
      )}

      {/* Zoom modal for grid */}
      {enableZoom && (
        <Dialog
          open={zoomOpen}
          onClose={() => setZoomOpen(false)}
          className="relative z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/90" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="relative max-w-7xl">
                <button
                  type="button"
                  onClick={() => setZoomOpen(false)}
                  className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close zoom"
                >
                  <XMarkIcon className="size-6" aria-hidden="true" />
                </button>
                <img
                  alt={images[zoomImageIndex]?.alt || ''}
                  src={images[zoomImageIndex]?.src || ''}
                  className="max-h-[90vh] max-w-full object-contain"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  )
}

export default ProductImageGallery

// Card Stack Component for swipeable image gallery
// @see https://motion.dev/tutorials/react-card-stack
interface CardStackProps {
  images: ProductImage[]
  selectedIndex: number
  onImageChange: (index: number) => void
  enableZoom: boolean
  zoomOpen: boolean
  setZoomOpen: (open: boolean) => void
  zoomImageIndex: number
  setZoomImageIndex: (index: number) => void
  className?: string
}

function CardStack({
  images,
  selectedIndex,
  onImageChange,
  enableZoom,
  zoomOpen,
  setZoomOpen,
  zoomImageIndex,
  setZoomImageIndex,
  className,
}: CardStackProps) {
  const [exitDirection, setExitDirection] = React.useState<'left' | 'right' | null>(null)
  const [isAnimating, setIsAnimating] = React.useState(false)

  // Reorder images so current is on top
  const orderedImages = React.useMemo(() => {
    const result: Array<{ image: ProductImage; originalIndex: number }> = []
    for (let i = 0; i < images.length; i++) {
      const index = (selectedIndex + i) % images.length
      result.push({ image: images[index], originalIndex: index })
    }
    return result.reverse() // Reverse so first item renders on top
  }, [images, selectedIndex])

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return
    setIsAnimating(true)
    setExitDirection(direction)

    // Calculate next index
    const nextIndex =
      direction === 'left'
        ? (selectedIndex + 1) % images.length
        : (selectedIndex - 1 + images.length) % images.length

    // Wait for animation then update
    setTimeout(() => {
      onImageChange(nextIndex)
      setExitDirection(null)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div
      className={clsx(
        'mx-auto mt-6 px-4 sm:px-6 lg:px-8',
        className,
      )}
    >
      {/* Card stack container - constrained size */}
      <div className="relative mx-auto max-w-md aspect-square overflow-visible">
        {/* Stack of cards */}
        <div className="relative h-full w-full">
          {orderedImages.map(({ image, originalIndex }, stackIndex) => {
            const isTop = stackIndex === orderedImages.length - 1
            const depth = orderedImages.length - 1 - stackIndex

            return (
              <StackCard
                key={`${originalIndex}-${selectedIndex}`}
                image={image}
                isTop={isTop}
                depth={depth}
                totalCards={images.length}
                onSwipe={handleSwipe}
                exitDirection={isTop ? exitDirection : null}
                enableZoom={enableZoom}
                onZoom={() => {
                  setZoomImageIndex(originalIndex)
                  setZoomOpen(true)
                }}
              />
            )
          })}
        </div>

        {/* Navigation dots */}
        {images.length > 1 && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => !isAnimating && onImageChange(index)}
                className={clsx(
                  'h-2 rounded-full transition-all duration-300',
                  index === selectedIndex
                    ? 'w-6 bg-indigo-500'
                    : 'w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500',
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Swipe hint */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">
          Swipe or drag to browse
        </div>
      </div>

      {/* Zoom modal */}
      {enableZoom && (
        <Dialog
          open={zoomOpen}
          onClose={() => setZoomOpen(false)}
          className="relative z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/90" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="relative max-w-7xl">
                <button
                  type="button"
                  onClick={() => setZoomOpen(false)}
                  className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close zoom"
                >
                  <XMarkIcon className="size-6" aria-hidden="true" />
                </button>

                <div className="relative">
                  <img
                    alt={images[zoomImageIndex]?.alt || ''}
                    src={images[zoomImageIndex]?.src || ''}
                    className="max-h-[90vh] max-w-full object-contain"
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setZoomImageIndex(
                            zoomImageIndex === 0
                              ? images.length - 1
                              : zoomImageIndex - 1,
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Previous image"
                      >
                        <ChevronLeftIcon className="size-8" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setZoomImageIndex(
                            zoomImageIndex === images.length - 1
                              ? 0
                              : zoomImageIndex + 1,
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Next image"
                      >
                        <ChevronRightIcon className="size-8" aria-hidden="true" />
                      </button>
                    </>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  )
}

// Individual stack card with drag gesture
interface StackCardProps {
  image: ProductImage
  isTop: boolean
  depth: number
  totalCards: number
  onSwipe: (direction: 'left' | 'right') => void
  exitDirection: 'left' | 'right' | null
  enableZoom: boolean
  onZoom: () => void
}

function StackCard({
  image,
  isTop,
  depth,
  totalCards,
  onSwipe,
  exitDirection,
  enableZoom,
  onZoom,
}: StackCardProps) {
  const x = useMotionValue(0)

  // Rotate based on drag position
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15])

  // Scale and opacity for depth effect
  const scale = 1 - depth * 0.05
  const yOffset = depth * 8
  const opacity = 1 - depth * 0.15

  // Handle drag end
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100
    const velocity = info.velocity.x

    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 500) {
      const direction = info.offset.x > 0 ? 'right' : 'left'
      // Animate card off screen
      animate(x, direction === 'left' ? -400 : 400, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })
      onSwipe(direction)
    } else {
      // Snap back
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 })
    }
  }

  // Exit animation
  React.useEffect(() => {
    if (exitDirection && isTop) {
      animate(x, exitDirection === 'left' ? -400 : 400, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })
    }
  }, [exitDirection, isTop, x])

  return (
    <motion.div
      className={clsx(
        'absolute inset-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl',
        isTop ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none',
      )}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale,
        y: yOffset,
        opacity,
        zIndex: totalCards - depth,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
      whileDrag={{ cursor: 'grabbing' }}
    >
      <img
        alt={image.alt}
        src={image.src}
        className="h-full w-full object-cover pointer-events-none select-none"
        draggable={false}
      />

      {/* Swipe indicators */}
      {isTop && (
        <>
          <motion.div
            className="absolute inset-0 bg-green-500/20 flex items-center justify-center"
            style={{
              opacity: useTransform(x, [0, 100], [0, 1]),
            }}
          >
            <div className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
              Next →
            </div>
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-red-500/20 flex items-center justify-center"
            style={{
              opacity: useTransform(x, [-100, 0], [1, 0]),
            }}
          >
            <div className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
              ← Previous
            </div>
          </motion.div>
        </>
      )}

      {/* Zoom button */}
      {isTop && enableZoom && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onZoom()
          }}
          className="absolute bottom-4 right-4 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
          aria-label="Zoom image"
        >
          <MagnifyingGlassPlusIcon
            className="size-5 text-gray-900"
            aria-hidden="true"
          />
        </button>
      )}
    </motion.div>
  )
}
