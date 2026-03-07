import { DisclosureButton } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '../utils'

export function MobileMenuButton() {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <DisclosureButton
        className={classNames(
          'focus-ring group relative inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-2',
          'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]',
        )}
      >
        <span className="absolute -inset-0.5" />
        <span className="sr-only">Open main menu</span>
        <Bars3Icon
          aria-hidden="true"
          className="block size-6 group-data-open:hidden"
        />
        <XMarkIcon
          aria-hidden="true"
          className="hidden size-6 group-data-open:block"
        />
      </DisclosureButton>
    </div>
  )
}
