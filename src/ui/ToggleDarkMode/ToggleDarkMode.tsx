import React, { useId } from 'react'
import { useControllableState } from '../../utils/useControllableState'

import './styles.css'

type ToggleDarkModeProps = {
  id?: string
  /** Controlled value */
  checked?: boolean
  /** Default value for uncontrolled mode */
  defaultChecked?: boolean
  /** Callback when toggle state changes (receives new checked state) */
  onChange?: (checked: boolean) => void
  /** Legacy onClick handler (deprecated: use onChange instead) */
  onClick?: () => void
  /** Custom accessible label */
  ariaLabel?: string
}

export const ToggleDarkMode: React.FC<ToggleDarkModeProps> = ({
  id,
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  onClick,
  ariaLabel = 'Toggle dark mode',
}) => {
  const inputId = useId()
  const finalInputId = id ? `${id}-input` : inputId
  const wrapperId = id || `toggle-wrapper-${inputId}`

  const [checked, setChecked] = useControllableState({
    value: checkedProp,
    defaultValue: defaultChecked,
    onChange,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked
    setChecked(newChecked)
    // Support legacy onClick for backward compatibility
    if (onClick && !onChange) {
      onClick()
    }
  }

  return (
    <div id={wrapperId} data-component="toggle-dark-mode">
      <input
        type="checkbox"
        id={finalInputId}
        onChange={handleChange}
        checked={checked}
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
      />
      <label htmlFor={finalInputId} data-toggle-track>
        <span data-toggle-handler>
          <span data-crater="1" />
          <span data-crater="2" />
          <span data-crater="3" />
        </span>
        <span data-star="1" />
        <span data-star="2" />
        <span data-star="3" />
        <span data-star="4" />
        <span data-star="5" />
        <span data-star="6" />
      </label>
    </div>
  )
}

export default ToggleDarkMode
