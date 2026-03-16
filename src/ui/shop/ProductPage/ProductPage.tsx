import * as React from 'react'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import type { Breadcrumb } from '../Breadcrumbs/Breadcrumbs'
import { ProductImageGallery } from '../ProductImageGallery/ProductImageGallery'
import type {
  ProductImage,
  ProductImageGalleryVariant,
} from '../ProductImageGallery/ProductImageGallery'
import { ProductReviews } from '../ProductReviews/ProductReviews'
import { ProductColorSelector } from '../ProductColorSelector/ProductColorSelector'
import type { ProductColor } from '../ProductColorSelector/ProductColorSelector'
import { ProductSizeSelector } from '../ProductSizeSelector/ProductSizeSelector'
import type { ProductSize } from '../ProductSizeSelector/ProductSizeSelector'
import { ProductDescription } from '../ProductDescription/ProductDescription'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton'
import { FamilyDialog } from '../../FamilyDialog/FamilyDialog'
import { clsx } from 'clsx'

export interface ProductPageProps {
  /** Product name */
  name: string
  /** Product price */
  price: string
  /** Product href */
  href?: string
  /** Breadcrumbs */
  breadcrumbs: Breadcrumb[]
  /** Product images */
  images: ProductImage[]
  /** Product colors */
  colors: ProductColor[]
  /** Product sizes */
  sizes: ProductSize[]
  /** Product description */
  description?: string
  /** Product highlights */
  highlights?: string[]
  /** Product details */
  details?: string
  /** Reviews data */
  reviews?: {
    href?: string
    average: number
    totalCount: number
  }
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
  /** Callback when Buy Now is clicked */
  onBuyNow?: () => void | Promise<void>
  /** Show Buy Now button */
  showBuyNow?: boolean
  /** Size guide link */
  sizeGuideHref?: string
  /** Custom header slot (replaces breadcrumbs + title) */
  headerSlot?: React.ReactNode
  /** Custom action slot (replaces add to cart button) */
  actionSlot?: React.ReactNode
  /** Custom gallery slot (replaces ProductImageGallery) */
  gallerySlot?: React.ReactNode
  /** Image gallery variant: 'grid' | 'carousel' | 'stack' */
  galleryVariant?: ProductImageGalleryVariant
  /** Enable zoom on images */
  enableZoom?: boolean
  /** Custom className */
  className?: string
}

export function ProductPage({
  name,
  price,
  href = '#',
  breadcrumbs,
  images,
  colors,
  sizes,
  description,
  highlights = [],
  details,
  reviews,
  selectedColorId,
  selectedSizeId,
  onColorChange,
  onSizeChange,
  onAddToCart,
  onBuyNow,
  showBuyNow = false,
  sizeGuideHref,
  headerSlot,
  actionSlot,
  gallerySlot,
  galleryVariant = 'grid',
  enableZoom = true,
  className,
}: ProductPageProps) {
  const selectedColor = colors.find((color) => color.id === selectedColorId)
  const selectedSize = sizes.find((size) => size.id === selectedSizeId)
  const hasColors = colors.length > 0
  const hasSizes = sizes.length > 0

  return (
    <div className={clsx('bg-[var(--color-background)]', className)}>
      <div className="pt-6">
        {headerSlot ? (
          headerSlot
        ) : (
          <Breadcrumbs
            breadcrumbs={[
              ...breadcrumbs,
              {
                id: 'product',
                name,
                href,
              },
            ]}
          />
        )}

        {gallerySlot ? (
          gallerySlot
        ) : (
          <ProductImageGallery
            images={images}
            variant={galleryVariant}
            enableZoom={enableZoom}
          />
        )}

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-[var(--color-border)] lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-3xl">
              {name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-[var(--color-foreground)]">
              {price}
            </p>

            {reviews && (
              <ProductReviews
                average={reviews.average}
                totalCount={reviews.totalCount}
                href={reviews.href}
              />
            )}

            <form className="mt-10">
              {hasColors ? (
                <ProductColorSelector
                  colors={colors}
                  selectedColorId={selectedColorId}
                  onColorChange={onColorChange}
                />
              ) : null}

              {hasSizes ? (
                <ProductSizeSelector
                  sizes={sizes}
                  selectedSizeId={selectedSizeId}
                  onSizeChange={onSizeChange}
                  sizeGuideHref={sizeGuideHref}
                />
              ) : null}

              {actionSlot ? (
                <div className="mt-10">{actionSlot}</div>
              ) : (
                <div className="mt-10 space-y-3">
                  <AddToCartButton onAddToCart={onAddToCart} />
                  {showBuyNow && (
                    <FamilyDialog
                      trigger="Buy Now"
                      eyebrow="Instant checkout"
                      title="Confirm Purchase"
                      description={`You're about to purchase "${name}" for ${price}. Proceed to checkout?`}
                      confirmText="Proceed to Checkout"
                      cancelText="Continue Shopping"
                      variant="success"
                      onConfirm={onBuyNow}
                      triggerClassName="w-full justify-center !bg-green-600 hover:!bg-green-700"
                    >
                      <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
                        <div className="rounded-[1.35rem] border border-emerald-200/70 bg-white/85 p-4 text-left">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-700">
                            Order summary
                          </p>
                          <p className="mt-3 text-sm font-semibold text-slate-950">
                            {name}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {selectedColor ? (
                              <span className="rounded-full bg-[var(--color-muted)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                                {selectedColor.name}
                              </span>
                            ) : null}
                            {selectedSize ? (
                              <span className="rounded-full bg-[var(--color-muted)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                                Size {selectedSize.name}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="rounded-[1.35rem] border border-slate-200/80 bg-slate-950 p-4 text-left text-slate-50">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-200">
                            Charge today
                          </p>
                          <p className="mt-3 text-2xl font-semibold tracking-tight">
                            {price}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            Secure checkout starts immediately after confirmation.
                          </p>
                        </div>
                      </div>
                    </FamilyDialog>
                  )}
                </div>
              )}
            </form>
          </div>

          <ProductDescription
            description={description}
            highlights={highlights}
            details={details}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductPage
