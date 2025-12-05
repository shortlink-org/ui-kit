import * as React from 'react'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import type { Breadcrumb } from '../Breadcrumbs/Breadcrumbs'
import { ProductImageGallery } from '../ProductImageGallery/ProductImageGallery'
import type { ProductImage } from '../ProductImageGallery/ProductImageGallery'
import { ProductReviews } from '../ProductReviews/ProductReviews'
import { ProductColorSelector } from '../ProductColorSelector/ProductColorSelector'
import type { ProductColor } from '../ProductColorSelector/ProductColorSelector'
import { ProductSizeSelector } from '../ProductSizeSelector/ProductSizeSelector'
import type { ProductSize } from '../ProductSizeSelector/ProductSizeSelector'
import { ProductDescription } from '../ProductDescription/ProductDescription'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton'
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
  /** Size guide link */
  sizeGuideHref?: string
  /** Custom header slot (replaces breadcrumbs + title) */
  headerSlot?: React.ReactNode
  /** Custom action slot (replaces add to cart button) */
  actionSlot?: React.ReactNode
  /** Custom gallery slot (replaces ProductImageGallery) */
  gallerySlot?: React.ReactNode
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
  sizeGuideHref,
  headerSlot,
  actionSlot,
  gallerySlot,
  className,
}: ProductPageProps) {
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

        {gallerySlot ? gallerySlot : <ProductImageGallery images={images} />}

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
            <p className="text-3xl tracking-tight text-[var(--color-foreground)]">{price}</p>

            {reviews && (
              <ProductReviews
                average={reviews.average}
                totalCount={reviews.totalCount}
                href={reviews.href}
              />
            )}

            <form className="mt-10">
              <ProductColorSelector
                colors={colors}
                selectedColorId={selectedColorId}
                onColorChange={onColorChange}
              />

              <ProductSizeSelector
                sizes={sizes}
                selectedSizeId={selectedSizeId}
                onSizeChange={onSizeChange}
                sizeGuideHref={sizeGuideHref}
              />

              {actionSlot ? (
                <div className="mt-10">{actionSlot}</div>
              ) : (
                <div className="mt-10">
                  <AddToCartButton onAddToCart={onAddToCart} />
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

