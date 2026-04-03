export interface MoneyFormatOptions {
  /** ISO 4217 code, default `USD` */
  currency?: string
  /** BCP 47 locale for `Intl`, default `en-US` */
  locale?: string
}

/**
 * Parse display strings such as `$90.00`, `€32,50`, `1.234,56` into integer cents.
 * Returns `null` when no numeric amount can be read.
 */
export function parsePriceStringToCents(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  const withoutSymbol = trimmed.replace(/[^\d.,-]/g, '')
  if (!withoutSymbol) return null

  let normalized = withoutSymbol
  if (withoutSymbol.includes(',') && withoutSymbol.includes('.')) {
    normalized = withoutSymbol.replace(/\./g, '').replace(',', '.')
  } else if (/^\d+,\d{1,2}$/.test(withoutSymbol)) {
    normalized = withoutSymbol.replace(',', '.')
  }

  const n = parseFloat(normalized)
  if (Number.isNaN(n)) return null
  return Math.round(n * 100)
}

export function formatMoneyFromCents(
  cents: number,
  options?: MoneyFormatOptions,
): string {
  const currency = options?.currency ?? 'USD'
  const locale = options?.locale ?? 'en-US'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100)
}

export function getUnitPriceCents(item: {
  price: string
  unitPriceCents?: number
}): number | null {
  if (item.unitPriceCents != null) return item.unitPriceCents
  return parsePriceStringToCents(item.price)
}

export function getLineTotalCents(item: {
  price: string
  unitPriceCents?: number
  quantity: number
}): number | null {
  const unit = getUnitPriceCents(item)
  if (unit === null) return null
  return unit * item.quantity
}

export function sumBasketSubtotalCents(
  items: Array<{
    price: string
    unitPriceCents?: number
    quantity: number
  }>,
): { cents: number; allParsed: boolean } {
  let cents = 0
  let allParsed = true
  for (const item of items) {
    const line = getLineTotalCents(item)
    if (line === null) {
      allParsed = false
      continue
    }
    cents += line
  }
  return { cents, allParsed }
}

export function resolveBasketSubtotalDisplay(
  items: Array<{
    price: string
    unitPriceCents?: number
    quantity: number
    currency?: string
  }>,
  subtotalOverride?: string,
  options?: MoneyFormatOptions,
): string {
  if (subtotalOverride != null && subtotalOverride !== '') {
    return subtotalOverride
  }
  if (items.length === 0) {
    return formatMoneyFromCents(0, options)
  }
  const { cents, allParsed } = sumBasketSubtotalCents(items)
  if (!allParsed) {
    return '—'
  }
  const currency =
    options?.currency ?? items.find((i) => i.currency)?.currency ?? 'USD'
  return formatMoneyFromCents(cents, { ...options, currency })
}
