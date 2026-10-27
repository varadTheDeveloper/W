import { describe, expect, it } from "vitest"
import { GPU, LAPTOP, MAC_MINI } from "./__fixtures__/products"
import {
  buildFacets,
  EMPTY_FILTERS,
  filtersToQuery,
  hasPriceRange,
  inCollection,
  isProductInStock,
  matchesFilters,
  parseFilters,
  parseSort,
  productCondition,
  productImages,
  productPrice,
  productSpecs,
  shopImage,
  sortProducts,
  stockLeft,
  variantChoice,
  variantLabel,
} from "./catalog"

const all = [LAPTOP, GPU, MAC_MINI]
const ids = (list: typeof all) => list.map((p) => p.id)

describe("prices", () => {
  it("returns the lowest selling price with its MRP and rounded % off", () => {
    expect(productPrice(LAPTOP)).toEqual({ price: 36990, mrp: 45999, discountPercent: 20 })
    expect(hasPriceRange(LAPTOP)).toBe(true)
    expect(hasPriceRange(GPU)).toBe(false)
  })

  it("shows no discount when price equals MRP", () => {
    expect(productPrice(MAC_MINI)).toEqual({ price: 47990, mrp: 47990, discountPercent: 0 })
  })
})

describe("product facts", () => {
  it("reads condition, defaulting to new", () => {
    expect(productCondition(MAC_MINI)).toBe("open-box")
    expect(productCondition(GPU)).toBe("new")
  })

  it("puts the chosen configuration's specs in the usual order", () => {
    const [i3] = LAPTOP.variants!
    expect(productSpecs(LAPTOP, i3).map(([k]) => k)).toEqual(["processor", "ram", "display", "os"])
    expect(productSpecs(LAPTOP, i3)[0][1]).toBe("Intel Core i3-1215U")
    // Single-variant products use their only variant
    expect(productSpecs(GPU).map(([k]) => k)).toEqual(["chipset", "memory"])
  })

  it("only offers a choice when there are several configurations", () => {
    expect(variantChoice(LAPTOP)?.title).toBe("Configuration")
    expect(variantChoice(GPU)).toBeUndefined()
    expect(variantLabel(LAPTOP, LAPTOP.variants![1])).toBe("Core i5 · 16GB · 512GB")
    expect(variantLabel(GPU, GPU.variants![0])).toBeUndefined()
  })

  it("counts stock across configurations", () => {
    expect(stockLeft(LAPTOP)).toBe(6)
    expect(isProductInStock(MAC_MINI)).toBe(false)
  })

  it("serves the shop's own photos as local files", () => {
    expect(shopImage("http://localhost:8000/products/hp-15s.jpg")).toBe("/products/hp-15s.jpg")
    expect(shopImage("https://shop.example.in/products/a.jpg")).toBe("/products/a.jpg")
    expect(shopImage("https://api.example.in/static/upload.jpg")).toBe("https://api.example.in/static/upload.jpg")
    expect(productImages(GPU)).toEqual(["/products/rtx-3050.jpg"])
  })
})

describe("filters", () => {
  it("reads filters from the address and ignores unknown values", () => {
    expect(parseFilters({ brand: "HP,Apple", condition: ["open-box", "broken"], price: "30000-49999,bogus", stock: "1" })).toEqual({
      brand: ["HP", "Apple"],
      condition: ["open-box"],
      price: ["30000-49999"],
      stock: ["1"],
    })
    expect(parseSort({ sort: "price-asc" })).toBe("price-asc")
    expect(parseSort({ sort: "hack" })).toBe("popular")
  })

  it("writes filters back to the address, keeping extra values", () => {
    expect(filtersToQuery({ ...EMPTY_FILTERS, brand: ["HP", "MSI"] }, "discount", { q: "laptop" })).toBe(
      "?q=laptop&brand=HP%2CMSI&sort=discount"
    )
    expect(filtersToQuery(EMPTY_FILTERS, "popular")).toBe("")
  })

  it("combines groups with AND and values with OR", () => {
    expect(ids(all.filter((p) => matchesFilters(p, { ...EMPTY_FILTERS, brand: ["HP", "Apple"], price: ["30000-49999"] })))).toEqual([
      "hp-15s",
      "mac-mini",
    ])
    expect(ids(all.filter((p) => matchesFilters(p, { ...EMPTY_FILTERS, stock: ["1"] })))).toEqual(["hp-15s", "rtx-3050"])
    expect(ids(all.filter((p) => matchesFilters(p, { ...EMPTY_FILTERS, condition: ["open-box"] })))).toEqual(["mac-mini"])
  })

  it("counts facets from the full list", () => {
    const facets = buildFacets(all)
    expect(facets.brand.map((b) => b.value)).toEqual(["Apple", "Gigabyte", "HP"])
    expect(facets.condition).toEqual([
      { value: "new", count: 2 },
      { value: "open-box", count: 1 },
    ])
    expect(facets.price.map((p) => p.value)).toEqual(["15000-29999", "30000-49999"])
    expect(facets.stock).toEqual([{ value: "1", count: 2 }])
  })
})

describe("sorting", () => {
  it("sorts by popularity, newest, price and discount", () => {
    expect(ids(sortProducts(all, "popular"))[0]).toBe("hp-15s")
    expect(ids(sortProducts(all, "popular")).at(-1)).toBe("mac-mini") // sold out last
    expect(ids(sortProducts(all, "newest"))).toEqual(["hp-15s", "rtx-3050", "mac-mini"])
    expect(ids(sortProducts(all, "price-asc"))).toEqual(["rtx-3050", "hp-15s", "mac-mini"])
    expect(ids(sortProducts(all, "discount"))).toEqual(["rtx-3050", "hp-15s", "mac-mini"])
  })
})

describe("collections", () => {
  it("uses the extra collection handles in metadata", () => {
    expect(inCollection(LAPTOP, "deals")).toBe(true)
    expect(inCollection(GPU, "deals")).toBe(false)
  })
})
