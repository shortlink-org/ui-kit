import { XMarkIcon } from '@heroicons/react/24/outline'
import { Drawer } from '../../Drawer/Drawer'
import type { DrawerProps } from '../../Drawer/Drawer'
import { ProductReviews } from '../ProductReviews/ProductReviews'
import { ProductColorSelector } from '../ProductColorSelector/ProductColorSelector'
import type { ProductColor } from '../ProductColorSelector/ProductColorSelector'
import { ProductSizeSelector } from '../ProductSizeSelector/ProductSizeSelector'
import type { ProductSize } from '../ProductSizeSelector/ProductSizeSelector'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton'
import { clsx } from 'clsx'

export interface ProductQuickViewData {
  /** Product name */
  name: string
  /** Product price */
  price: string
  /** Product rating (0-5) */
  rating?: number
  /** Number of reviews */
  reviewCount?: number
  /** Link to reviews */
  reviewsHref?: string
  /** Product href */
  href?: string
  /** Product image source */
  imageSrc: string
  /** Product image alt text */
  imageAlt: string
  /** Available colors */
  colors: ProductColor[]
  /** Available sizes */
  sizes: ProductSize[]
}

export interface ProductQuickViewProps
  extends Omit<
    DrawerProps,
    'title' | 'children' | 'open' | 'onClose' | 'showCloseButton' | 'closeIcon'
  > {
  /** Whether the quick view is open */
  open: boolean
  /** Callback when the quick view should close */
  onClose: (open: boolean) => void
  /** Product data */
  product: ProductQuickViewData
  /** Selected color ID */
  selectedColorId?: string
  /** Selected size ID */
  selectedSizeId?: string | number
  /** Callback when color changes */
  onColorChange?: (colorId: string) => void
  /** Callback when size changes */
  onSizeChange?: (sizeId: string | number) => void
  /** Callback when add to cart is clicked */
  onAddToCart?: () => void | Promise<void>
  /** Size guide link */
  sizeGuideHref?: string
  /** Custom className for the drawer panel */
  className?: string
}

export function ProductQuickView({
  open,
  onClose,
  product,
  selectedColorId,
  selectedSizeId,
  onColorChange,
  onSizeChange,
  onAddToCart,
  sizeGuideHref,
  className,
  position,
  size,
  ...drawerProps
}: ProductQuickViewProps) {
  const effectivePosition = position ?? 'right'
  const effectiveSize =
    size ?? (effectivePosition === 'bottom' ? 'full' : 'xl')
  const isBottomSheet = effectivePosition === 'bottom'
  const hasColors = product.colors.length > 0
  const hasSizes = product.sizes.length > 0

  return (
    <Drawer
      {...drawerProps}
      open={open}
      onClose={onClose}
      position={effectivePosition}
      size={effectiveSize}
      showCloseButton={false}
      contentClassName={clsx('!px-0 !py-0', drawerProps.contentClassName)}
      panelClassName={clsx(
        isBottomSheet && 'rounded-t-[1.35rem]',
        className,
        drawerProps.panelClassName,
      )}
    >
      <div
        className={clsx(
          'relative flex w-full flex-col',
          isBottomSheet &&
            'min-h-0 flex-1 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:px-5 sm:pt-4',
          !isBottomSheet &&
            'px-4 pb-8 pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8',
        )}
      >
        <button
          type="button"
          onClick={() => onClose(false)}
          className={clsx(
            'absolute z-10 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-white/10 dark:hover:text-gray-200',
            isBottomSheet
              ? 'right-3 top-1 sm:right-4 sm:top-3'
              : 'right-4 top-4 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8',
          )}
        >
          <span className="sr-only">Close</span>
          <XMarkIcon aria-hidden="true" className="size-6" />
        </button>

        <div
          className={clsx(
            'grid w-full items-start',
            isBottomSheet
              ? 'max-sm:grid-cols-[minmax(0,40%)_minmax(0,1fr)] max-sm:gap-x-3 max-sm:gap-y-3 sm:grid-cols-12 sm:gap-x-6 sm:gap-y-6 lg:gap-x-8'
              : 'grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8',
          )}
        >
          <img
            alt={product.imageAlt}
            src={product.imageSrc}
            className={clsx(
              'w-full rounded-lg bg-gray-100 object-cover dark:bg-gray-800',
              'aspect-2/3 sm:col-span-4 lg:col-span-5',
              isBottomSheet &&
                'max-sm:aspect-auto max-sm:max-h-[min(38vh,210px)] max-sm:min-h-0 max-sm:self-start',
            )}
          />

          <div
            className={clsx(
              'min-w-0 sm:col-span-8 lg:col-span-7',
              isBottomSheet && 'max-sm:col-span-1',
            )}
          >
            <h2
              className={clsx(
                'font-bold text-gray-900 dark:text-white',
                isBottomSheet
                  ? 'text-lg leading-snug sm:pr-10 sm:text-2xl'
                  : 'text-2xl sm:pr-12',
              )}
            >
              {product.name}
            </h2>

            <section aria-labelledby="information-heading" className="mt-1.5 sm:mt-2">
              <h3 id="information-heading" className="sr-only">
                Product information
              </h3>
              <p
                className={clsx(
                  'text-gray-900 dark:text-white',
                  isBottomSheet ? 'text-xl tabular-nums sm:text-2xl' : 'text-2xl',
                )}
              >
                {product.price}
              </p>

              {/* Reviews */}
              {product.rating !== undefined &&
                product.reviewCount !== undefined && (
                  <div
                    className={clsx(
                      isBottomSheet ? 'mt-3 sm:mt-6' : 'mt-6',
                    )}
                  >
                    <ProductReviews
                      average={product.rating}
                      totalCount={product.reviewCount}
                      href={product.reviewsHref}
                    />
                  </div>
                )}
            </section>

            <section
              aria-labelledby="options-heading"
              className={clsx(
                isBottomSheet ? 'mt-5 sm:mt-10' : 'mt-10',
              )}
            >
              <h3 id="options-heading" className="sr-only">
                Product options
              </h3>
              <form>
                {/* Colors */}
                {hasColors ? (
                  <ProductColorSelector
                    colors={product.colors}
                    selectedColorId={selectedColorId}
                    onColorChange={onColorChange}
                  />
                ) : null}

                {/* Sizes */}
                {hasSizes ? (
                  <ProductSizeSelector
                    sizes={product.sizes}
                    selectedSizeId={selectedSizeId}
                    onSizeChange={onSizeChange}
                    sizeGuideHref={sizeGuideHref}
                  />
                ) : null}

                {/* Add to cart */}
                <div className={clsx(isBottomSheet ? 'mt-4 sm:mt-6' : 'mt-6')}>
                  <AddToCartButton onAddToCart={onAddToCart} />
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default ProductQuickView
