/**
 * Converts a hex color string to RGB values
 * @param hex - Hex color string (e.g., '#dd8448' or 'dd8448')
 * @returns RGB object with r, g, b values, or default orange color if invalid
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 221, g: 132, b: 72 } // Default orange color
}

/**
 * Lightens an RGB color by a given factor
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @param factor - Lightening factor (default: 1.2)
 * @returns Lightened RGB object
 */
export function lightenColor(
  r: number,
  g: number,
  b: number,
  factor: number = 1.2,
): { r: number; g: number; b: number } {
  return {
    r: Math.min(255, Math.round(r * factor)),
    g: Math.min(255, Math.round(g * factor)),
    b: Math.min(255, Math.round(b * factor)),
  }
}

