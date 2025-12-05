import Balancer from 'react-wrap-balancer'
import { ReactNode } from 'react'
import { Button } from '../../ui/Button/Button'

export interface HeaderAction {
  /** Action label text */
  label: string
  /** Click handler */
  handler: () => void
  /** Button variant style */
  variant?: 'primary' | 'secondary'
  /** Custom ReactNode to render instead of default button (overrides label/variant) */
  customNode?: ReactNode
}

export interface HeaderProps {
  /** Page title */
  title: string
  /** Primary action (rendered on the right, typically the main action) */
  primaryAction?: HeaderAction
  /** Secondary action (rendered before primary action) */
  secondaryAction?: HeaderAction
}

export function Header({ title, primaryAction, secondaryAction }: HeaderProps) {
  const renderAction = (action: HeaderAction | undefined) => {
    if (!action) return null

    if (action.customNode) {
      return action.customNode
    }

    return (
      <Button
        variant={action.variant || 'secondary'}
        size="md"
        onClick={action.handler}
        className={action.variant !== 'primary' ? 'mr-3' : ''}
      >
        {action.label}
      </Button>
    )
  }

  const hasActions = primaryAction || secondaryAction

  return (
    <div className="my-6 lg:my-10 container px-6 mx-auto flex flex-col md:flex-row items-center justify-between pb-4 border-b border-gray-300 dark:border-gray-700 transition-colors duration-500">
      <div>
        <h4 className="text-2xl md:text-3xl font-bold leading-tight dark:text-white transition-colors duration-500">
          <Balancer>{title}</Balancer>
        </h4>
      </div>
      {hasActions && (
        <div className="mt-6 md:mt-0">
          {renderAction(secondaryAction)}
          {renderAction(primaryAction)}
        </div>
      )}
    </div>
  )
}

export default Header
