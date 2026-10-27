import { HttpTypes } from "@medusajs/types"
import type { LineDetails } from "@modules/bag/bag-view"
import { productImages, variantLabel } from "./catalog"

/**
 * Name, chosen configuration and picture of each bag or order line, looked up
 * in the catalogue (already in the page language). Lines whose product is gone
 * keep the name stored on the line.
 */
export function lineDetails(
  items: { id: string; product_id?: string | null; variant_id?: string | null }[],
  products: HttpTypes.StoreProduct[]
): Record<string, LineDetails> {
  const details: Record<string, LineDetails> = {}
  for (const item of items) {
    const product = products.find((p) => p.id === item.product_id)
    const variant = product?.variants?.find((v) => v.id === item.variant_id)
    if (!product || !variant) continue
    details[item.id] = {
      title: product.title ?? undefined,
      option: variantLabel(product, variant),
      image: productImages(product)[0],
      handle: product.handle ?? undefined,
    }
  }
  return details
}
