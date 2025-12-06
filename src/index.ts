// theme exports
export { theme } from './theme/theme'
// Import global styles - consumers get styles automatically
import './theme/styles.css'

// Components exports
export { Button } from './ui/Button/Button'
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  IconPosition,
} from './ui/Button/Button'
export { ToggleDarkMode } from './ui/ToggleDarkMode/ToggleDarkMode'
export { GithubRepository } from './card/GithubRepository/GithubRepository'
export { FeatureCard } from './card/FeatureCard/FeatureCard'
export { ElectricBorderCard } from './card/ElectricBorderCard/ElectricBorderCard'
export { Timeline } from './ui/Timeline/Timeline'
// DataTable - компонент для работы с таблицами
export { DataTable } from './ui/DataTable/DataTable'
export type { DataTableProps } from './ui/DataTable/DataTable'
export { DataTableWithSuspense } from './ui/DataTable/DataTableWithSuspense'
export type { DataTableWithSuspenseProps } from './ui/DataTable/DataTableWithSuspense'
export { DataTableWithErrorBoundary } from './ui/DataTable/DataTableWithErrorBoundary'
export type { DataTableWithErrorBoundaryProps } from './ui/DataTable/DataTableWithErrorBoundary'
export { useDataTable } from './ui/DataTable/useDataTable'
export { createDataTableColumnHelper } from './ui/DataTable/columnConverter'
export { Pagination } from './ui/Pagination/Pagination'
export type { PaginationProps } from './ui/Pagination/Pagination'
export { default as ScrollToTopButton } from './ui/ScrollToTopButton/ScrollToTopButton'

// React 19 Async Components
export { ErrorBoundary } from './ui/ErrorBoundary/ErrorBoundary'
export type { ErrorBoundaryProps } from './ui/ErrorBoundary/ErrorBoundary'
export { SuspenseFallback } from './ui/SuspenseFallback/SuspenseFallback'
export type { SuspenseFallbackProps } from './ui/SuspenseFallback/SuspenseFallback'
export { FeedbackPanel } from './ui/FeedbackPanel/FeedbackPanel'
export type {
  FeedbackPanelProps,
  FeedbackVariant,
} from './ui/FeedbackPanel/FeedbackPanel'

// Skeleton
export { Skeleton } from './ui/Skeleton/Skeleton'
export type { SkeletonProps } from './ui/Skeleton/Skeleton'
export { CardSkeleton } from './ui/Skeleton/CardSkeleton'
export type { CardSkeletonProps } from './ui/Skeleton/CardSkeleton'

// Input
export { default as SearchForm } from './ui/SearchForm/SearchForm'

// FlyoutMenu
export { FlyoutMenu } from './ui/FlyoutMenu/FlyoutMenu'
export type {
  FlyoutMenuProps,
  FlyoutMenuItem,
  FlyoutMenuCallToAction,
  FlyoutMenuSection,
  FlyoutMenuSections,
} from './ui/FlyoutMenu/FlyoutMenu'

// Drawer
export { Drawer } from './ui/Drawer/Drawer'
export type {
  DrawerProps,
  DrawerPosition,
  DrawerSize,
} from './ui/Drawer/Drawer'

// Shop
export { AddToCartButton } from './ui/shop/AddToCartButton/AddToCartButton'
export type { AddToCartButtonProps } from './ui/shop/AddToCartButton/AddToCartButton'
export { Breadcrumbs } from './ui/shop/Breadcrumbs/Breadcrumbs'
export type {
  BreadcrumbsProps,
  Breadcrumb,
} from './ui/shop/Breadcrumbs/Breadcrumbs'
export { ProductImageGallery } from './ui/shop/ProductImageGallery/ProductImageGallery'
export type {
  ProductImageGalleryProps,
  ProductImage,
} from './ui/shop/ProductImageGallery/ProductImageGallery'
export { ProductReviews } from './ui/shop/ProductReviews/ProductReviews'
export type { ProductReviewsProps } from './ui/shop/ProductReviews/ProductReviews'
export { ProductColorSelector } from './ui/shop/ProductColorSelector/ProductColorSelector'
export type {
  ProductColorSelectorProps,
  ProductColor,
} from './ui/shop/ProductColorSelector/ProductColorSelector'
export { ProductSizeSelector } from './ui/shop/ProductSizeSelector/ProductSizeSelector'
export type {
  ProductSizeSelectorProps,
  ProductSize,
} from './ui/shop/ProductSizeSelector/ProductSizeSelector'
export { ProductDescription } from './ui/shop/ProductDescription/ProductDescription'
export type { ProductDescriptionProps } from './ui/shop/ProductDescription/ProductDescription'
export { ProductPage } from './ui/shop/ProductPage/ProductPage'
export type { ProductPageProps } from './ui/shop/ProductPage/ProductPage'
export { ProductGrid } from './ui/shop/ProductGrid/ProductGrid'
export type {
  ProductGridProps,
  Product,
  ProductBadge,
  ProductPrice,
  ProductCTA,
  ProductInventory,
  Breakpoint,
} from './ui/shop/ProductGrid/ProductGrid'
export { Basket } from './ui/shop/Basket/Basket'
export type { BasketProps } from './ui/shop/Basket/Basket'
export { BasketItem } from './ui/shop/Basket/BasketItem/BasketItem'
export type {
  BasketItemProps,
  BasketItem as BasketItemData,
} from './ui/shop/Basket/BasketItem/BasketItem'
export { BasketSummary } from './ui/shop/Basket/BasketSummary/BasketSummary'
export type { BasketSummaryProps } from './ui/shop/Basket/BasketSummary/BasketSummary'
export { ProductQuickView } from './ui/shop/ProductQuickView/ProductQuickView'
export type {
  ProductQuickViewProps,
  ProductQuickViewData,
} from './ui/shop/ProductQuickView/ProductQuickView'

// Layout exports
export { Header } from './page/Header/Header'
export { AppHeader } from './page/AppHeader/AppHeader'
export type {
  AppHeaderProps,
  AppHeaderBrand,
  AppHeaderMenuItem,
  AppHeaderNavigationItem,
  AppHeaderNotification,
  AppHeaderProfile,
} from './page/AppHeader/AppHeader'
export { Sidebar } from './page/Sidebar/Sidebar'
export type {
  SidebarProps,
  SidebarItem,
  SidebarSection,
  SidebarCollapsibleSection,
  SidebarSimpleSection,
} from './page/Sidebar/Sidebar'
export { SecondaryMenu } from './page/Sidebar/SecondaryMenu'
export type {
  SecondaryMenuItem,
  SecondaryMenuProps,
} from './page/Sidebar/SecondaryMenu'
export { PriceTable } from './page/PriceTable/PriceTable'
export { MultiColumnLayout } from './page/MultiColumnLayout/MultiColumnLayout'
export { Newsletter } from './page/Newsletter/Newsletter'
export type {
  NewsletterProps,
  NewsletterFeature,
} from './page/Newsletter/Newsletter'
export { Footer } from './page/Footer/Footer'
export type { FooterProps, FooterLink, SocialLink } from './page/Footer/Footer'

// Utils
export { useAsyncData, clearPromiseCache } from './utils/useAsyncData'
export { useControllableState } from './utils/useControllableState'
