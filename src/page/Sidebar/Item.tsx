import * as React from 'react'
import Tooltip from '@mui/material/Tooltip'
import ActiveLink from './ActiveLink'

type AppProps = {
  mode: 'full' | 'mini'
  url: string
  icon: React.JSX.Element
  name: string
  activePath?: string
}

function getItem({ mode, url, icon, name, activePath }: AppProps) {
  const iconClassName =
    'text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
  let linkClassName =
    'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'

  if (mode === 'mini') {
    linkClassName += ' item-center justify-center'
  }

  const linkContent = (
    <div className={linkClassName} aria-label={mode === 'mini' ? name : undefined}>
      {React.cloneElement(icon, { className: iconClassName })}
      {mode === 'full' && <span className="ms-3">{name}</span>}
    </div>
  )

  return (
    <li key={url} className={'w-full'}>
      <ActiveLink 
        href={url} 
        passHref 
        activeClassName="md:text-blue-700"
        activePath={activePath}
      >
        {mode === 'mini' ? (
          <Tooltip title={name} placement={'right'}>
            {linkContent}
          </Tooltip>
        ) : (
          linkContent
        )}
      </ActiveLink>
    </li>
  )
}

export default getItem
