import { AppHeaderBrand } from './types'

export const defaultBrand: AppHeaderBrand = {
  name: 'Shortlink',
  logo: (
    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-900/30 dark:bg-indigo-400/20 rounded-lg flex items-center justify-center group-hover:bg-indigo-900/40 dark:group-hover:bg-indigo-400/30 transition-all duration-200">
      <span className="text-white font-bold text-xs sm:text-sm">S</span>
    </div>
  ),
  href: '/',
}

