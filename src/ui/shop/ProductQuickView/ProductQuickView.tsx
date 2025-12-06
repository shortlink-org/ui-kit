import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
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

export interface ProductQuickViewProps {
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
  /** Custom className */
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
}: ProductQuickViewProps) {
  return (
    <Dialog open={open} onClose={onClose} className={clsx('relative z-10', className)}>
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:block dark:bg-gray-900/75"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-2xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white dark:bg-gray-900 px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-300 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="aspect-2/3 w-full rounded-lg bg-gray-100 dark:bg-gray-800 object-cover sm:col-span-4 lg:col-span-5"
                />

                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:pr-12">
                    {product.name}
                  </h2>

                  <section aria-labelledby="information-heading" className="mt-2">
                    <h3 id="information-heading" className="sr-only">Product information</h3>
                    <p className="text-2xl text-gray-900 dark:text-white">{product.price}</p>

                    {/* Reviews */}
                    {product.rating !== undefined && product.reviewCount !== undefined && (
                      <div className="mt-6">
                        <ProductReviews
                          average={product.rating}
                          totalCount={product.reviewCount}
                          href={product.reviewsHref}
                        />
                      </div>
                    )}
                  </section>

                  <section aria-labelledby="options-heading" className="mt-10">
                    <h3 id="options-heading" className="sr-only">Product options</h3>
                    <form>
                      {/* Colors */}
                      <ProductColorSelector
                        colors={product.colors}
                        selectedColorId={selectedColorId}
                        onColorChange={onColorChange}
                      />

                      {/* Sizes */}
                      <ProductSizeSelector
                        sizes={product.sizes}
                        selectedSizeId={selectedSizeId}
                        onSizeChange={onSizeChange}
                        sizeGuideHref={sizeGuideHref}
                      />

                      {/* Add to cart */}
                      <div className="mt-6">
                        <AddToCartButton onAddToCart={onAddToCart} />
                      </div>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ProductQuickView

