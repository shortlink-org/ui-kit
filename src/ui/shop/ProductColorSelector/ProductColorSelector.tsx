import * as React from 'react'
import { RadioGroup, Radio } from '@headlessui/react'
import { clsx } from 'clsx'

export interface ProductColor {
  id: string
  name: string
  /** Hex color code (e.g., "#FF5733") */
  hex?: string
  /** Optional: Custom CSS classes for the color button (deprecated: use hex instead) */
  classes?: string
}

export interface ProductColorSelectorProps {
  /** Array of available colors */
  colors: ProductColor[]
  /** Selected color ID */
  selectedColorId?: string
  /** Callback when color is selected */
  onColorChange?: (colorId: string) => void
  /** Name attribute for the radio group */
  name?: string
  /** Custom className */
  className?: string
}

export function ProductColorSelector({
  colors,
  selectedColorId,
  onColorChange,
  name = 'color',
  className,
}: ProductColorSelectorProps) {
  const handleChange = (colorId: string) => {
    onColorChange?.(colorId)
  }

  return (
    <div className={className}>
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Color</h3>
      <RadioGroup
        value={selectedColorId}
        onChange={(value) => handleChange(value)}
        name={name}
        className="mt-4"
        aria-label="Choose a color"
      >
        <div className="flex items-center gap-x-3">
          {colors.map((color) => {
            // Generate style from hex color, or fallback to classes for backward compatibility
            const colorStyle: React.CSSProperties = color.hex
              ? { backgroundColor: color.hex }
              : {}

            return (
              <Radio
                key={color.id}
                value={color.id}
                style={colorStyle}
                className={clsx(
                  !color.hex && color.classes, // Only use classes if hex is not provided
                  'size-8 rounded-full forced-color-adjust-none',
                  'focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-indigo-600',
                  'data-checked:outline-2 data-checked:outline-offset-2 data-checked:outline-black/20',
                  'cursor-pointer border border-gray-300 dark:border-gray-600'
                )}
                aria-label={color.name}
              />
            )
          })}
        </div>
      </RadioGroup>
    </div>
  )
}

export default ProductColorSelector

