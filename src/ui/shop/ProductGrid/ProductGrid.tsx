import * as React from 'react'
import { clsx } from 'clsx'
import { motion, useSpring, useMotionValue } from 'motion/react'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton'
import { Skeleton } from '../../Skeleton/Skeleton'
import { HeartIcon, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid'

export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl'

export interface ProductBadge {
  /** Badge label */
  label: string
  /** Badge tone/color */
  tone?: 'info' | 'success' | 'warning' | 'error' | 'neutral'
  /** Optional icon */
  icon?: React.ReactNode
}

export interface ProductPrice {
  /** Current price */
  current: number
  /** Original price (if on sale) */
  original?: number
  /** Currency code (ISO 4217) */
  currency?: string
  /** Locale for price formatting */
  locale?: string
  /** Discount percentage (automatically calculated if original is provided) */
  discount?: number
}

export interface ProductCTA {
  /** Quick view callback */
  onQuickView?: () => void
  /** Add to favorites callback */
  onFavorite?: (isFavorite: boolean) => void
  /** Rating value (1-5) */
  rating?: number
  /** Review count */
  reviewCount?: number
}

export interface ProductInventory {
  /** Inventory status */
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'preorder'
  /** Stock quantity (optional) */
  quantity?: number
}

export interface Product {
  id: number | string
  name: string
  href: string
  imageSrc: string
  imageAlt: string
  /** Price information */
  price: ProductPrice | string
  /** Color/variant information */
  color?: string
  /** Additional product information */
  description?: string
  /** Custom badges (replaces legacy badge/onSale) */
  badges?: ProductBadge[]
  /** Legacy: Badge or label text (deprecated, use badges) */
  badge?: string
  /** Legacy: Whether product is on sale (deprecated, use badges) */
  onSale?: boolean
  /** Legacy: Original price if on sale (deprecated, use price.original) */
  originalPrice?: string
  /** CTA actions */
  cta?: ProductCTA
  /** Inventory status */
  inventory?: ProductInventory
  /** Callback when add to cart is clicked */
  onAddToCart?: () => void | Promise<void>
  /** Whether product is favorite */
  isFavorite?: boolean
}

export interface ProductGridProps {
  /** Array of products to display */
  products: Product[]
  /** Grid title */
  title?: string
  /** Custom className */
  className?: string
  /** Custom className for the grid container */
  gridClassName?: string
  /** Custom className for individual product cards */
  productClassName?: string
  /** Number of columns per breakpoint */
  columns?: Partial<Record<Breakpoint, number>>
  /** Vertical spacing (padding-y) */
  spacingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /** Horizontal spacing (padding-x) */
  spacingX?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /** Loading state */
  loading?: boolean
  /** Number of skeleton cards to show when loading */
  skeletonCount?: number
  /** Callback when product is clicked */
  onProductClick?: (product: Product) => void
  /** Aspect ratio for product images on mobile */
  aspectMobile?: string
  /** Aspect ratio for product images on desktop */
  aspectDesktop?: string
}

const breakpointMap: Record<Breakpoint, string> = {
  base: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}

const defaultColumns: Record<Breakpoint, number> = {
  base: 1,
  sm: 2,
  md: 2,
  lg: 3,
  xl: 4,
}

const spacingMap = {
  none: { y: 'py-0', x: 'px-0' },
  sm: { y: 'py-8', x: 'px-4' },
  md: { y: 'py-12 sm:py-16', x: 'px-4 sm:px-6' },
  lg: { y: 'py-16 sm:py-24', x: 'px-4 sm:px-6 lg:px-8' },
  xl: { y: 'py-24 sm:py-32', x: 'px-6 sm:px-8 lg:px-12' },
}

const badgeToneMap = {
  info: 'bg-blue-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  error: 'bg-red-600',
  neutral: 'bg-gray-600',
}

export function ProductGrid({
  products,
  title,
  className,
  gridClassName,
  productClassName,
  columns = defaultColumns,
  spacingY = 'lg',
  spacingX = 'md',
  loading = false,
  skeletonCount = 8,
  onProductClick,
  aspectMobile = '4/5',
  aspectDesktop = '4/5',
}: ProductGridProps) {
  const effectiveColumns = { ...defaultColumns, ...columns }

  const handleProductClick = (product: Product) => {
    onProductClick?.(product)
  }

  // Generate grid columns using CSS custom properties
  const gridId = React.useId().replace(/:/g, '-')
  const generateGridStyles = (): string => {
    const mediaQueries: string[] = []

    Object.entries(effectiveColumns).forEach(([bp, count]) => {
      if (bp === 'base') {
        return // Handled by default grid-cols-1
      }

      const breakpointValue = breakpointMap[bp as Breakpoint]
      mediaQueries.push(`
        @media (min-width: ${breakpointValue}) {
          [data-grid-id="${gridId}"] {
            grid-template-columns: repeat(${count}, minmax(0, 1fr));
          }
        }
      `)
    })

    return mediaQueries.join('\n')
  }

  const generateGridClasses = (): string => {
    return clsx('grid grid-cols-1 gap-x-6 gap-y-16 lg:gap-x-8', gridClassName)
  }

  // Format price
  const formatPrice = (
    price: ProductPrice | string,
  ): { formatted: string; original?: string; discount?: number } => {
    if (typeof price === 'string') {
      return { formatted: price }
    }

    const locale = price.locale || 'en-US'
    const currency = price.currency || 'USD'
    const formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(price.current)

    let original: string | undefined
    let discount: number | undefined

    if (price.original && price.original > price.current) {
      original = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      }).format(price.original)

      discount =
        price.discount ||
        Math.round(((price.original - price.current) / price.original) * 100)
    }

    return { formatted, original, discount }
  }

  // Get badges for product
  const getProductBadges = (product: Product): ProductBadge[] => {
    const badges: ProductBadge[] = []

    // Legacy support: convert onSale to badge
    if (product.onSale && !product.badges?.some((b) => b.label === 'Sale')) {
      badges.push({ label: 'Sale', tone: 'error' })
    }

    // Legacy support: convert badge prop to badges
    if (
      product.badge &&
      !product.badges?.some((b) => b.label === product.badge)
    ) {
      badges.push({ label: product.badge, tone: 'info' })
    }

    // Add custom badges
    if (product.badges) {
      badges.push(...product.badges)
    }

    // Add inventory badge if out of stock
    if (product.inventory?.status === 'out_of_stock') {
      badges.push({ label: 'Out of stock', tone: 'neutral' })
    } else if (product.inventory?.status === 'low_stock') {
      badges.push({ label: 'Low stock', tone: 'warning' })
    } else if (product.inventory?.status === 'preorder') {
      badges.push({ label: 'Preorder', tone: 'info' })
    }

    return badges
  }

  const spacing = spacingMap[spacingY]
  const spacingXValue = spacingMap[spacingX]

  return (
    <div className={clsx('bg-[var(--color-background)]', className)}>
      <style>{generateGridStyles()}</style>
      <div
        className={clsx(
          'mx-auto max-w-2xl lg:max-w-7xl',
          spacing.y,
          spacingXValue.x,
        )}
      >
        {title && (
          <h2
            className={clsx(
              'font-bold tracking-tight text-[var(--color-foreground)]',
              'text-xl sm:text-2xl lg:text-3xl',
              'mb-6 sm:mb-8',
            )}
          >
            {title}
          </h2>
        )}
        <div data-grid-id={gridId} className={generateGridClasses()}>
          {loading
            ? Array.from({ length: skeletonCount }).map((_, index) => (
                <ProductCardSkeleton
                  key={`skeleton-${index}`}
                  aspectMobile={aspectMobile}
                  aspectDesktop={aspectDesktop}
                />
              ))
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className={productClassName}
                  aspectMobile={aspectMobile}
                  aspectDesktop={aspectDesktop}
                  formatPrice={formatPrice}
                  getProductBadges={getProductBadges}
                  onProductClick={handleProductClick}
                />
              ))}
        </div>
      </div>
    </div>
  )
}

// Product Card Component
interface ProductCardProps {
  product: Product
  className?: string
  aspectMobile: string
  aspectDesktop: string
  formatPrice: (price: ProductPrice | string) => {
    formatted: string
    original?: string
    discount?: number
  }
  getProductBadges: (product: Product) => ProductBadge[]
  onProductClick: (product: Product) => void
}

function ProductCard({
  product,
  className,
  aspectMobile,
  aspectDesktop,
  formatPrice,
  getProductBadges,
  onProductClick,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = React.useState(
    product.isFavorite || false,
  )
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const cardId = React.useId().replace(/:/g, '-')
  const cardRef = React.useRef<HTMLDivElement>(null)

  const { formatted, original, discount } = formatPrice(product.price)
  const badges = getProductBadges(product)
  const isOutOfStock = product.inventory?.status === 'out_of_stock'

  // Tilt effect using Motion springs
  // @see https://motion.dev/tutorials/react-tilt-card
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    // Max tilt of 10 degrees
    const maxTilt = 10
    rotateY.set((mouseX / (rect.width / 2)) * maxTilt)
    rotateX.set(-(mouseY / (rect.height / 2)) * maxTilt)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newFavoriteState = !isFavorite
    setIsFavorite(newFavoriteState)
    product.cta?.onFavorite?.(newFavoriteState)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    product.cta?.onQuickView?.()
  }

  return (
    <>
      <style>{`
        [data-card-id="${cardId}"] .product-image-container {
          aspect-ratio: ${aspectMobile};
        }
        @media (min-width: 1024px) {
          [data-card-id="${cardId}"] .product-image-container {
            aspect-ratio: ${aspectDesktop};
          }
        }
      `}</style>
      <motion.div
        ref={cardRef}
        data-card-id={cardId}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformPerspective: 1000,
        }}
        className={clsx(
          'group relative flex flex-col h-full',
          'bg-[var(--color-surface)] rounded-lg overflow-hidden',
          'transition-shadow duration-200 hover:shadow-lg',
          className,
        )}
      >
        {/* Image container */}
        <div className="relative w-full overflow-hidden bg-[var(--color-muted)] product-image-container">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-[var(--color-muted-foreground)]/20" />
          )}
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={clsx(
              'w-full h-full object-cover transition-transform duration-300',
              'group-hover:scale-105',
              !imageLoaded && 'opacity-0',
              imageLoaded && 'opacity-100',
            )}
          />

          {/* Badges */}
          {badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col gap-2">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className={clsx(
                    'rounded px-2 py-1 text-xs font-semibold text-white',
                    badgeToneMap[badge.tone || 'neutral'],
                    badge.icon && 'flex items-center gap-1',
                  )}
                  aria-live="polite"
                >
                  {badge.icon}
                  {badge.label}
                </span>
              ))}
            </div>
          )}

          {/* CTA Actions overlay */}
          <div
            className={clsx(
              'absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-200',
              'group-hover:opacity-100 group-focus-within:opacity-100',
              'flex items-center justify-center gap-2',
            )}
          >
            {product.cta?.onQuickView && (
              <button
                onClick={handleQuickView}
                className="rounded-full bg-[var(--color-surface)] p-2 text-[var(--color-foreground)] hover:bg-[var(--color-surface-hover)] focus-ring"
                aria-label={`Quick view ${product.name}`}
              >
                <EyeIcon className="size-5" aria-hidden="true" />
              </button>
            )}
            {product.cta?.onFavorite && (
              <button
                onClick={handleFavorite}
                className={clsx(
                  'rounded-full bg-[var(--color-surface)] p-2 transition-colors focus-ring',
                  isFavorite
                    ? 'text-red-600'
                    : 'text-[var(--color-foreground)]',
                  'hover:bg-[var(--color-surface-hover)]',
                )}
                aria-label={
                  isFavorite
                    ? `Remove ${product.name} from favorites`
                    : `Add ${product.name} to favorites`
                }
              >
                {isFavorite ? (
                  <HeartSolidIcon className="size-5" aria-hidden="true" />
                ) : (
                  <HeartIcon className="size-5" aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col flex-1 p-4">
          <h3 className="text-sm font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-muted-foreground)]">
            <a
              href={product.href}
              onClick={(e) => {
                e.preventDefault()
                onProductClick(product)
              }}
              className="focus-ring rounded"
            >
              {product.name}
            </a>
          </h3>

          {product.description && (
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)] line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Rating */}
          {product.cta?.rating && (
            <div className="mt-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-400" aria-hidden="true">
                  {star <= Math.round(product.cta!.rating!) ? (
                    <StarSolidIcon className="size-4" />
                  ) : (
                    <StarIcon className="size-4" />
                  )}
                </span>
              ))}
              {product.cta.reviewCount && (
                <span className="ml-1 text-xs text-[var(--color-muted-foreground)]">
                  ({product.cta.reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Price and Add to Cart */}
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-base font-semibold text-[var(--color-foreground)]">
                {formatted}
              </span>
              {original && (
                <>
                  <span className="text-sm text-[var(--color-muted-foreground)] line-through">
                    {original}
                  </span>
                  {discount && (
                    <span
                      className="text-xs text-red-600 dark:text-red-400"
                      aria-label={`${discount}% off`}
                    >
                      -{discount}%
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="flex-shrink-0">
              {product.onAddToCart && (
                <AddToCartButton
                  text="Add to cart"
                  onAddToCart={product.onAddToCart}
                  ariaLabel={`Add ${product.name} to cart`}
                  scale={0.75}
                />
              )}
            </div>
          </div>
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-background)]/80 rounded-lg">
            <span className="px-4 py-2 text-sm font-semibold text-[var(--color-foreground)] bg-[var(--color-surface)] rounded border-2 border-[var(--color-border)]">
              Out of stock
            </span>
          </div>
        )}
      </motion.div>
    </>
  )
}

// Skeleton Component
interface ProductCardSkeletonProps {
  aspectMobile: string
  aspectDesktop: string
}

function ProductCardSkeleton({
  aspectMobile,
  aspectDesktop,
}: ProductCardSkeletonProps) {
  const skeletonId = React.useId().replace(/:/g, '-')

  return (
    <>
      <style>{`
        [data-skeleton-id="${skeletonId}"] .skeleton-image {
          aspect-ratio: ${aspectMobile};
        }
        @media (min-width: 1024px) {
          [data-skeleton-id="${skeletonId}"] .skeleton-image {
            aspect-ratio: ${aspectDesktop};
          }
        }
      `}</style>
      <div
        data-skeleton-id={skeletonId}
        className="flex flex-col h-full bg-[var(--color-surface)] rounded-lg overflow-hidden"
      >
        <Skeleton className="w-full skeleton-image" />
        <div className="flex flex-col flex-1 p-4 space-y-3">
          <Skeleton height={16} width="80%" />
          <Skeleton height={12} width="60%" />
          <div className="flex gap-1 mt-2">
            <Skeleton height={12} width={12} circular />
            <Skeleton height={12} width={12} circular />
            <Skeleton height={12} width={12} circular />
            <Skeleton height={12} width={12} circular />
            <Skeleton height={12} width={12} circular />
          </div>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <Skeleton height={20} width={60} />
            <Skeleton height={32} width={100} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductGrid
