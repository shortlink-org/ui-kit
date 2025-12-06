import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * Hook for managing controlled/uncontrolled component state.
 * Similar to Radix UI's useControllableState pattern.
 *
 * @param props - Configuration object
 * @param props.value - Controlled value (if provided, component is controlled)
 * @param props.defaultValue - Default value for uncontrolled mode
 * @param props.onChange - Callback when value changes
 * @returns [state, setState] tuple
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * const [checked, setChecked] = useControllableState({
 *   defaultValue: false,
 *   onChange: (value) => console.log(value)
 * })
 *
 * // Controlled
 * const [checked, setChecked] = useControllableState({
 *   value: props.checked,
 *   onChange: props.onChange
 * })
 * ```
 */
export function useControllableState<T>({
  value: valueProp,
  defaultValue,
  onChange,
}: {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}): [T, (value: T | ((prev: T) => T)) => void] {
  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = useState<T>(() => {
    if (isControlled) {
      return valueProp!
    }
    return defaultValue as T
  })

  const value = isControlled ? valueProp! : internalValue
  const onChangeRef = useRef(onChange)

  // Keep onChange ref up to date
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const nextValue =
        typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(value)
          : newValue

      if (!isControlled) {
        setInternalValue(nextValue)
      }

      onChangeRef.current?.(nextValue)
    },
    [isControlled, value],
  )

  return [value, setValue]
}
