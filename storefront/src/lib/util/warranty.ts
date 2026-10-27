import { Dictionary, format } from "@lib/i18n"

/** "3 years warranty", "1 year warranty", "5 months warranty" in the page language */
export function warrantyText(months: number, t: Dictionary): string {
  if (!months) return t.product.noWarranty
  if (months === 12) return t.product.warrantyYear
  if (months % 12 === 0) return format(t.product.warrantyYears, { count: months / 12 })
  return format(t.product.warrantyMonths, { count: months })
}
