import { DisclosureButton } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '../utils'

export function MobileMenuButton() {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <DisclosureButton
        className={classNames(
          'group relative inline-flex items-center justify-center rounded-md p-2',
          'text-white/70 hover:bg-white/10 hover:text-white',
          'focus:outline-2 focus:-outline-offset-1 focus:outline-white/50'
        )}
      >
        <span className="absolute -inset-0.5" />
        <span className="sr-only">Open main menu</span>
        <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
        <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
      </DisclosureButton>
    </div>
  )
}

