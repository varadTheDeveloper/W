import { describe, expect, it } from "vitest"
import { GPU, LAPTOP, MAC_MINI, makeProduct } from "./__fixtures__/products"
import { normalize, searchProducts } from "./search"

const ids = (list: { id: string }[]) => list.map((p) => p.id)

describe("search", () => {
  const all = [LAPTOP, GPU, MAC_MINI]

  it("normalises case and punctuation but keeps Devanagari", () => {
    expect(normalize("  RTX-3050, 6GB! ")).toBe("rtx 3050 6gb")
    expect(normalize("लॅपटॉप")).toBe("लॅपटॉप")
  })

  it("finds by title, brand, category, specs and configuration", () => {
    expect(ids(searchProducts(all, "laptop"))).toEqual(["hp-15s"])
    expect(ids(searchProducts(all, "gigabyte"))).toEqual(["rtx-3050"])
    expect(ids(searchProducts(all, "graphics cards"))).toEqual(["rtx-3050"])
    expect(ids(searchProducts(all, "i5"))).toEqual(["hp-15s"]) // from a configuration's specs
    expect(ids(searchProducts(all, "6gb"))).toEqual(["rtx-3050"])
  })

  it("forgives one typo in longer words", () => {
    expect(ids(searchProducts(all, "lapptop"))).toEqual(["hp-15s"])
  })

  it("needs every word to match", () => {
    expect(ids(searchProducts(all, "apple laptop"))).toEqual([])
    expect(searchProducts(all, "   ")).toEqual([])
  })

  it("matches the English version of a translated catalogue", () => {
    const marathi = makeProduct({ id: "hp-15s", title: "HP 15s लॅपटॉप", variants: [] })
    const english = makeProduct({ id: "hp-15s", title: "HP 15s Laptop", variants: [] })
    expect(ids(searchProducts([marathi], "laptop", [english]))).toEqual(["hp-15s"])
    expect(ids(searchProducts([marathi], "लॅपटॉप"))).toEqual(["hp-15s"])
  })
})
