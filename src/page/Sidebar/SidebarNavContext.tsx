import * as React from 'react'

export type SidebarItemPresentation = 'rail' | 'flyout'

export const SidebarNavContext = React.createContext<{
  itemPresentation: SidebarItemPresentation
}>({ itemPresentation: 'rail' })
