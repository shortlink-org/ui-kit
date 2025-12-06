import { type ReactNode } from 'react'
import { AppHeaderBrand, LinkComponent } from '../types'
import { classNames } from '../utils'

interface HeaderBrandProps {
  brand: AppHeaderBrand
  LinkComponent?: LinkComponent
  hasNavigation?: boolean
}

export function HeaderBrand({ brand, LinkComponent, hasNavigation = false }: HeaderBrandProps) {
  const brandClassName =
    'group flex items-center gap-1.5 sm:gap-2 transition-all duration-200'
  const brandContent = (
    <>
      {brand.logo}
      <h1 className="font-bold tracking-wide text-white group-hover:text-gray-100 transition-all duration-200 text-base sm:text-lg whitespace-nowrap">
        {brand.name}
      </h1>
    </>
  )

  const renderLink = (href: string, children: ReactNode | string, linkClassName?: string) => {
    if (LinkComponent) {
      return (
        <LinkComponent href={href} className={linkClassName}>
          {children}
        </LinkComponent>
      )
    }
    return (
      <a href={href} className={linkClassName}>
        {children}
      </a>
    )
  }

  if (brand.render && brand.href) {
    return brand.render({ href: brand.href, children: brandContent, className: brandClassName })
  }

  if (brand.href) {
    return renderLink(brand.href, brandContent, brandClassName)
  }

  return (
    <div className={classNames(brandClassName, hasNavigation && 'ml-10 sm:ml-0')}>
      {brandContent}
    </div>
  )
}

