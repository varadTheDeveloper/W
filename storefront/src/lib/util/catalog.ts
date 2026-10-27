import { HttpTypes } from "@medusajs/types"

// Pure helpers for product cards, filters and sorting. No React, no fetching,
// so they are easy to test (catalog.test.ts).
//
// Product facts set by the seed (and editable in the admin's metadata):
// brand, condition (new | open-box | refurbished), warranty_months, highlights[],
// specs {key: value}, badge, collections[], representative_photo.
// A variant may carry its own metadata.specs (e.g. a laptop's RAM and SSD).

export type Condition = "new" | "open-box" | "refurbished"
export const CONDITIONS: Condition[] = ["new", "open-box", "refurbished"]

type Meta = Record<string, unknown>
const meta = (x: { metadata?: Meta | null } | undefined): Meta => (x?.metadata ?? {}) as Meta

export function productBrand(product: HttpTypes.StoreProduct): string | undefined {
  const b = meta(product).brand
  return typeof b === "string" && b ? b : undefined
}

export function productCondition(product: HttpTypes.StoreProduct): Condition {
  const c = meta(product).condition
  return CONDITIONS.includes(c as Condition) ? (c as Condition) : "new"
}

export function warrantyMonths(product: HttpTypes.StoreProduct): number {
  const w = Number(meta(product).warranty_months)
  return Number.isFinite(w) && w > 0 ? w : 0
}

export function productHighlights(product: HttpTypes.StoreProduct): string[] {
  const h = meta(product).highlights
  return Array.isArray(h) ? h.filter((x): x is string => typeof x === "string") : []
}

export function productBadge(product: HttpTypes.StoreProduct): "bestseller" | "new" | "hot" | undefined {
  const b = meta(product).badge
  return b === "bestseller" || b === "new" || b === "hot" ? b : undefined
}

export function isRepresentativePhoto(product: HttpTypes.StoreProduct): boolean {
  return meta(product).representative_photo === true
}

function specsOf(x: { metadata?: Meta | null } | undefined): Record<string, string> {
  const s = meta(x).specs
  if (!s || typeof s !== "object") return {}
  return Object.fromEntries(Object.entries(s as Meta).filter(([, v]) => typeof v === "string" && v)) as Record<string, string>
}

/** Order of specs in tables; others follow in the order the catalogue lists them */
const SPEC_ORDER = [
  "processor", "cores", "socket", "chipset", "graphics", "ram", "memory", "storage", "display", "screenSize",
  "resolution", "refreshRate", "panel", "motherboard", "power", "wattage", "efficiency", "cooling", "cabinet",
  "monitor", "keyboardMouse", "printType", "functions", "connectivity", "ports", "os", "formFactor", "weight", "inBox",
]

/** Specifications of the product, with the chosen variant's own values (processor, RAM, storage…). */
export function productSpecs(
  product: HttpTypes.StoreProduct,
  variant?: HttpTypes.StoreProductVariant
): [string, string][] {
  const base = specsOf(product)
  const own = specsOf(variant ?? (product.variants?.length === 1 ? product.variants[0] : undefined))
  const rank = (k: string) => (SPEC_ORDER.includes(k) ? SPEC_ORDER.indexOf(k) : SPEC_ORDER.length)
  const keys = [...new Set([...Object.keys(own), ...Object.keys(base)])].sort((a, b) => rank(a) - rank(b))
  return keys.map((k) => [k, own[k] ?? base[k]])
}

/** The product's single option (e.g. "Configuration"), when it has more than one value. */
export function variantChoice(product: HttpTypes.StoreProduct): HttpTypes.StoreProductOption | undefined {
  const option = product.options?.[0]
  return option && (option.values?.length ?? 0) > 1 ? option : undefined
}

/** Option value of a variant (e.g. "Core i5 · 16GB · 512GB"), resolved through the product's option list. */
export function variantOption(
  product: HttpTypes.StoreProduct,
  variant: HttpTypes.StoreProductVariant,
  optionTitle?: string
): string | undefined {
  const option = optionTitle ? product.options?.find((o) => o.title === optionTitle) : product.options?.[0]
  if (!option) return undefined
  return variant.options?.find((o) => o.option_id === option.id)?.value
}

/** Name of the chosen configuration, shown in the bag and orders; empty for single-variant products. */
export function variantLabel(
  product: HttpTypes.StoreProduct,
  variant: HttpTypes.StoreProductVariant
): string | undefined {
  return variantChoice(product) ? variantOption(product, variant) : undefined
}

export function isVariantInStock(variant: HttpTypes.StoreProductVariant): boolean {
  if (!variant.manage_inventory || variant.allow_backorder) return true
  return (variant.inventory_quantity ?? 0) > 0
}

/** Items left, or undefined when stock is not tracked */
export function stockLeft(product: HttpTypes.StoreProduct): number | undefined {
  const tracked = (product.variants ?? []).filter((v) => v.manage_inventory && !v.allow_backorder)
  if (!tracked.length || tracked.length < (product.variants?.length ?? 0)) return undefined
  return tracked.reduce((sum, v) => sum + Math.max(0, v.inventory_quantity ?? 0), 0)
}

export type PriceInfo = {
  price: number
  mrp: number
  discountPercent: number
}

export function variantPrice(variant: HttpTypes.StoreProductVariant): PriceInfo | null {
  const cp = variant.calculated_price
  if (!cp || cp.calculated_amount == null) return null
  const price = cp.calculated_amount
  const mrp = Math.max(cp.original_amount ?? price, price)
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0
  return { price, mrp, discountPercent }
}

/** Lowest selling price of the product, with its MRP. */
export function productPrice(product: HttpTypes.StoreProduct): PriceInfo | null {
  let best: PriceInfo | null = null
  for (const v of product.variants ?? []) {
    const p = variantPrice(v)
    if (p && (!best || p.price < best.price)) best = p
  }
  return best
}

/** True when the product has variants at different prices ("from ₹…") */
export function hasPriceRange(product: HttpTypes.StoreProduct): boolean {
  const prices = new Set((product.variants ?? []).map((v) => variantPrice(v)?.price).filter((p) => p != null))
  return prices.size > 1
}

export function isProductInStock(product: HttpTypes.StoreProduct): boolean {
  return (product.variants ?? []).some(isVariantInStock)
}

/**
 * Photos that ship with the shop (public/products) are stored in the catalogue
 * with the shop's full address, so the admin panel can show them. On the site
 * they are served as local files: faster, and no image download from ourselves.
 */
export function shopImage(url: string): string {
  try {
    const { pathname } = new URL(url)
    return pathname.startsWith("/products/") ? pathname : url
  } catch {
    return url
  }
}

/** All product photos, main photo first. */
export function productImages(product: HttpTypes.StoreProduct): string[] {
  const all = (product.images ?? []).map((i) => i.url).filter(Boolean)
  if (all.length) return all.map(shopImage)
  return product.thumbnail ? [shopImage(product.thumbnail)] : []
}

/** Alt text saved with a picture, if any. */
export function imageAlt(product: HttpTypes.StoreProduct, url: string): string | undefined {
  const alt = product.images?.find((i) => shopImage(i.url) === url)?.metadata?.alt
  return typeof alt === "string" ? alt : undefined
}

// ----- Filters -----

export const PRICE_BUCKETS = [
  { key: "0-4999", min: 0, max: 4999 },
  { key: "5000-14999", min: 5000, max: 14999 },
  { key: "15000-29999", min: 15000, max: 29999 },
  { key: "30000-49999", min: 30000, max: 49999 },
  { key: "50000-79999", min: 50000, max: 79999 },
  { key: "80000-", min: 80000, max: Infinity },
] as const

export type SortKey = "popular" | "newest" | "price-asc" | "price-desc" | "discount"
export const SORT_KEYS: SortKey[] = ["popular", "newest", "price-asc", "price-desc", "discount"]

export type Filters = {
  brand: string[]
  condition: string[]
  price: string[]
  /** ["1"] = in stock only */
  stock: string[]
}

export const FILTER_GROUPS = ["brand", "condition", "price", "stock"] as const
export const EMPTY_FILTERS: Filters = { brand: [], condition: [], price: [], stock: [] }

type SearchParams = Record<string, string | string[] | undefined>

function list(value: string | string[] | undefined): string[] {
  if (!value) return []
  return (Array.isArray(value) ? value : value.split(","))
    .flatMap((v) => v.split(","))
    .map((v) => v.trim())
    .filter(Boolean)
}

export function parseFilters(params: SearchParams): Filters {
  return {
    brand: list(params.brand),
    condition: list(params.condition).filter((c) => CONDITIONS.includes(c as Condition)),
    price: list(params.price).filter((p) => PRICE_BUCKETS.some((b) => b.key === p)),
    stock: list(params.stock).filter((s) => s === "1"),
  }
}

export function parseSort(params: SearchParams): SortKey {
  const sort = Array.isArray(params.sort) ? params.sort[0] : params.sort
  return SORT_KEYS.includes(sort as SortKey) ? (sort as SortKey) : "popular"
}

export function filtersToQuery(
  filters: Filters,
  sort: SortKey,
  keep: Record<string, string> = {}
): string {
  const q = new URLSearchParams(keep)
  for (const key of FILTER_GROUPS) {
    if (filters[key].length) q.set(key, filters[key].join(","))
  }
  if (sort !== "popular") q.set("sort", sort)
  const s = q.toString()
  return s ? `?${s}` : ""
}

export function activeFilterCount(filters: Filters): number {
  return FILTER_GROUPS.reduce((n, k) => n + filters[k].length, 0)
}

function inBucket(price: number, key: string): boolean {
  const b = PRICE_BUCKETS.find((x) => x.key === key)
  return !!b && price >= b.min && price <= b.max
}

/** A product matches when every active filter group matches (values inside a group are OR). */
export function matchesFilters(product: HttpTypes.StoreProduct, f: Filters): boolean {
  if (f.brand.length) {
    const brand = productBrand(product)
    if (!brand || !f.brand.includes(brand)) return false
  }
  if (f.condition.length && !f.condition.includes(productCondition(product))) return false
  if (f.stock.length && !isProductInStock(product)) return false
  if (f.price.length) {
    const p = productPrice(product)
    if (!p || !f.price.some((key) => inBucket(p.price, key))) return false
  }
  return true
}

const BADGE_RANK = { bestseller: 3, hot: 2, new: 1 } as const

/** Popularity: bestsellers, then hot deals and new arrivals, in stock before sold out. */
function popularity(p: HttpTypes.StoreProduct): number {
  const badge = productBadge(p)
  return (isProductInStock(p) ? 10 : 0) + (badge ? BADGE_RANK[badge] : 0)
}

export function sortProducts(
  products: HttpTypes.StoreProduct[],
  sort: SortKey
): HttpTypes.StoreProduct[] {
  const price = (p: HttpTypes.StoreProduct) => productPrice(p)?.price ?? Infinity
  const discount = (p: HttpTypes.StoreProduct) => productPrice(p)?.discountPercent ?? 0
  const created = (p: HttpTypes.StoreProduct) => new Date(p.created_at ?? 0).getTime()
  const sorted = [...products]
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => price(a) - price(b))
    case "price-desc":
      return sorted.sort((a, b) => price(b) - price(a))
    case "discount":
      return sorted.sort((a, b) => discount(b) - discount(a))
    case "newest":
      return sorted.sort((a, b) => created(b) - created(a))
    default:
      return sorted.sort((a, b) => popularity(b) - popularity(a))
  }
}

export type Facets = Record<keyof Filters, { value: string; count: number }[]>

/** Filter choices with product counts, built from the unfiltered list. */
export function buildFacets(products: HttpTypes.StoreProduct[]): Facets {
  const count = (values: string[]) => {
    const m = new Map<string, number>()
    values.forEach((v) => m.set(v, (m.get(v) ?? 0) + 1))
    return m
  }
  const toList = (m: Map<string, number>) => [...m.entries()].map(([value, count]) => ({ value, count }))
  const brands = count(products.map(productBrand).filter((b): b is string => !!b))
  const conditions = count(products.map(productCondition))
  const prices = count(
    products.flatMap((p) => {
      const price = productPrice(p)?.price
      return price == null ? [] : PRICE_BUCKETS.filter((b) => inBucket(price, b.key)).map((b) => b.key)
    })
  )
  const inStock = products.filter(isProductInStock).length
  return {
    brand: toList(brands).sort((a, b) => a.value.localeCompare(b.value)),
    condition: CONDITIONS.filter((c) => conditions.has(c)).map((c) => ({ value: c, count: conditions.get(c)! })),
    price: PRICE_BUCKETS.filter((b) => prices.has(b.key)).map((b) => ({ value: b.key, count: prices.get(b.key)! })),
    stock: inStock ? [{ value: "1", count: inStock }] : [],
  }
}

/**
 * Medusa gives a product one collection; the catalogue also lists extra
 * collection handles in metadata.collections. Either one counts.
 */
export function inCollection(product: HttpTypes.StoreProduct, handle: string): boolean {
  const extra = product.metadata?.collections
  return (
    product.collection?.handle === handle ||
    (Array.isArray(extra) && extra.includes(handle))
  )
}

export function inCategory(product: HttpTypes.StoreProduct, handles: string[]): boolean {
  return (product.categories ?? []).some((c) => handles.includes(c.handle))
}
