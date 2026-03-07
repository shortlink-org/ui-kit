import { AppHeaderBrand } from './types'

export const defaultBrand: AppHeaderBrand = {
  name: 'Shortlink',
  logo: (
    <div className="flex h-9 w-9 items-center justify-center rounded-[1rem] bg-linear-to-br from-sky-500 to-cyan-600 text-white shadow-[0_18px_40px_-24px_rgba(14,165,233,0.9)] transition-transform duration-200 group-hover:scale-105">
      <span className="text-sm font-bold">S</span>
    </div>
  ),
  href: '/',
}
