import * as React from 'react'
import clsx from 'clsx'
import { Sidebar, type SidebarProps } from './Sidebar'
import { SecondaryMenu, type SecondaryMenuProps } from './SecondaryMenu'

export type SidebarShellProps = {
  sidebar: Omit<SidebarProps, 'embedded'>
  secondaryMenu: Omit<SecondaryMenuProps, 'embedded'>
  children?: React.ReactNode
  secondaryCollapsed?: boolean
  onSecondaryCollapsedChange?: (collapsed: boolean) => void
  className?: string
  rowClassName?: string
}

const PRIMARY_MINI_W = '7rem'
const SECONDARY_MINI_W = '7rem'
const PRIMARY_EXPANDED_W = 'min(360px, 36vw)'

export function SidebarShell({
  sidebar: sidebarProps,
  secondaryMenu: secondaryMenuProps,
  children,
  secondaryCollapsed: secondaryCollapsedProp,
  onSecondaryCollapsedChange,
  className,
  rowClassName,
}: SidebarShellProps) {
  const {
    onCollapsedChange: sidebarOnCollapsedChange,
    ...sidebarRest
  } = sidebarProps

  const isSecondaryControlled = secondaryCollapsedProp !== undefined
  const [secondaryCollapsedLocal, setSecondaryCollapsedLocal] =
    React.useState(false)

  const secondaryCollapsed = isSecondaryControlled
    ? secondaryCollapsedProp
    : secondaryCollapsedLocal

  const isPrimaryCollapsedControlled = sidebarRest.collapsed !== undefined
  const [primaryCollapsedLocal, setPrimaryCollapsedLocal] = React.useState(
    () =>
      Boolean(
        sidebarRest.collapsed ?? (sidebarRest.mode === 'mini'),
      ),
  )

  const primaryCollapsed = isPrimaryCollapsedControlled
    ? Boolean(sidebarRest.collapsed)
    : primaryCollapsedLocal

  const sidebarModeRef = React.useRef(sidebarRest.mode)
  React.useEffect(() => {
    if (sidebarModeRef.current !== sidebarRest.mode) {
      sidebarModeRef.current = sidebarRest.mode
      if (!isPrimaryCollapsedControlled) {
        setPrimaryCollapsedLocal(sidebarRest.mode === 'mini')
      }
    }
  }, [sidebarRest.mode, isPrimaryCollapsedControlled])

  const handleSecondaryCollapsedChange = React.useCallback(
    (collapsed: boolean) => {
      if (!isSecondaryControlled) {
        setSecondaryCollapsedLocal(collapsed)
      }
      onSecondaryCollapsedChange?.(collapsed)
    },
    [isSecondaryControlled, onSecondaryCollapsedChange],
  )

  return (
    <div className={clsx(className)}>
      <div
        className={clsx(
          'relative mx-auto max-w-7xl overflow-visible px-4 py-2',
          rowClassName,
        )}
      >
        <div className="relative flex h-[calc(100vh-5rem)] items-stretch">
          <div
            className="relative z-10 shrink-0 overflow-hidden rounded-l-[1.75rem] rounded-r-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_16px_44px_-28px_rgba(15,23,42,0.38)] transition-[width] duration-300 ease-out"
            style={{
              width: primaryCollapsed ? PRIMARY_MINI_W : PRIMARY_EXPANDED_W,
            }}
          >
            <Sidebar
              {...sidebarRest}
              embedded
              onCollapsedChange={(collapsed) => {
                if (!isPrimaryCollapsedControlled) {
                  setPrimaryCollapsedLocal(collapsed)
                }
                sidebarOnCollapsedChange?.(collapsed)
              }}
              className={clsx(
                sidebarRest.className,
                '[&_nav]:pr-11 [&>div>div>div.mt-auto]:pl-2.5 [&>div>div>div.mt-auto]:pr-11',
              )}
            />
          </div>

          <div
            className={clsx(
              'relative z-20 shrink-0 overflow-hidden rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_22px_56px_-32px_rgba(15,23,42,0.48)] transition-[width] duration-300 ease-out',
              primaryCollapsed && secondaryCollapsed
                ? '-ml-4'
                : primaryCollapsed || secondaryCollapsed
                  ? '-ml-7'
                  : '-ml-10',
            )}
            style={{
              width: secondaryCollapsed ? SECONDARY_MINI_W : PRIMARY_EXPANDED_W,
            }}
          >
            <SecondaryMenu
              {...secondaryMenuProps}
              embedded
              collapsed={secondaryCollapsed}
              onCollapsedChange={(collapsed) => {
                handleSecondaryCollapsedChange(collapsed)
                secondaryMenuProps.onCollapsedChange?.(collapsed)
              }}
              className={clsx('h-full min-h-0', secondaryMenuProps.className)}
            />
          </div>

          {children ? (
            <div className="relative z-10 ml-4 min-h-0 min-w-0 flex-1 overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.4)]">
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default SidebarShell
