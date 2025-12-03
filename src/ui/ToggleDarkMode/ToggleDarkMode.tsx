import React from 'react'

import './styles.css'

type ToggleDarkModeProps = {
  id: string
  checked?: boolean
  onClick?: () => void
  ariaLabel?: string
}

export const ToggleDarkMode: React.FC<ToggleDarkModeProps> = ({
  id,
  checked = false,
  onClick,
  ariaLabel = 'Toggle',
}) => {
  const handleChange = () => {
    onClick?.()
  }

  return (
    <div id={id} className="toggleWrapper">
      <input
        type="checkbox"
        className="dn"
        id={id}
        onChange={handleChange}
        checked={checked}
        aria-label={ariaLabel}
      />
      <label htmlFor={id} className="toggle">
        <span className="toggle__handler">
          <span className="crater crater--1" />
          <span className="crater crater--2" />
          <span className="crater crater--3" />
        </span>
        <span className="star star--1" />
        <span className="star star--2" />
        <span className="star star--3" />
        <span className="star star--4" />
        <span className="star star--5" />
        <span className="star star--6" />
      </label>
    </div>
  )
}

export default ToggleDarkMode
