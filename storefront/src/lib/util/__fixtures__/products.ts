import { HttpTypes } from "@medusajs/types"

type V = { name: string; price: number; mrp: number; stock: number; specs?: Record<string, string> }

/** Builds a product shaped like the Medusa store API response. */
export function makeProduct(opts: {
  id: string
  title: string
  brand?: string
  condition?: string
  badge?: string
  option?: string
  variants: V[]
  specs?: Record<string, string>
  highlights?: string[]
  created?: string
  categories?: { name: string; handle: string }[]
  collections?: string[]
  images?: string[]
}): HttpTypes.StoreProduct {
  const option = { id: `${opts.id}-opt`, title: opts.option ?? "Model", values: opts.variants.map((v) => ({ value: v.name })) }
  return {
    id: opts.id,
    title: opts.title,
    handle: opts.id,
    created_at: opts.created ?? "2026-01-01T00:00:00Z",
    metadata: {
      brand: opts.brand,
      condition: opts.condition,
      badge: opts.badge,
      specs: opts.specs ?? {},
      highlights: opts.highlights ?? [],
      collections: opts.collections ?? [],
    },
    categories: (opts.categories ?? []).map((c, i) => ({ id: `cat-${i}`, ...c })),
    images: (opts.images ?? [`http://localhost:8000/products/${opts.id}.jpg`]).map((url) => ({ url })),
    options: [option],
    variants: opts.variants.map((v, i) => ({
      id: `${opts.id}-v${i}`,
      title: v.name,
      manage_inventory: true,
      allow_backorder: false,
      inventory_quantity: v.stock,
      metadata: v.specs ? { specs: v.specs } : null,
      options: [{ option_id: option.id, value: v.name }],
      calculated_price: { calculated_amount: v.price, original_amount: v.mrp },
    })),
  } as unknown as HttpTypes.StoreProduct
}

export const LAPTOP = makeProduct({
  id: "hp-15s",
  title: "HP 15s Laptop",
  brand: "HP",
  badge: "bestseller",
  option: "Configuration",
  created: "2026-03-01T00:00:00Z",
  categories: [{ name: "Everyday laptops", handle: "everyday-laptops" }],
  collections: ["deals"],
  specs: { display: "15.6-inch Full HD", os: "Windows 11 Home" },
  highlights: ["15.6\" FHD", "Windows 11"],
  variants: [
    { name: "Core i3 · 8GB · 512GB", price: 36990, mrp: 45999, stock: 6, specs: { processor: "Intel Core i3-1215U", ram: "8GB DDR4" } },
    { name: "Core i5 · 16GB · 512GB", price: 52990, mrp: 62999, stock: 0, specs: { processor: "Intel Core i5-1235U", ram: "16GB DDR4" } },
  ],
})

export const GPU = makeProduct({
  id: "rtx-3050",
  title: "GIGABYTE GeForce RTX 3050 6GB Graphics Card",
  brand: "Gigabyte",
  created: "2026-02-01T00:00:00Z",
  categories: [{ name: "Graphics cards", handle: "graphics-cards" }],
  specs: { chipset: "NVIDIA GeForce RTX 3050", memory: "6GB GDDR6" },
  variants: [{ name: "Standard", price: 18999, mrp: 24999, stock: 5 }],
})

export const MAC_MINI = makeProduct({
  id: "mac-mini",
  title: "Apple Mac mini M4 (Open Box)",
  brand: "Apple",
  condition: "open-box",
  categories: [{ name: "Mini PCs", handle: "mini-pcs" }],
  variants: [{ name: "16GB · 256GB", price: 47990, mrp: 47990, stock: 0 }],
})
