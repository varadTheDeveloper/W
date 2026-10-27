import { listProductsFor } from "@lib/data/catalog"
import { isLocale } from "@lib/i18n/config"
import { productImages, productPrice } from "@lib/util/catalog"
import { searchProducts, Suggestion } from "@lib/util/search"
import { NextRequest, NextResponse } from "next/server"

/**
 * Search suggestions while typing: GET /api/suggest?q=rtx&locale=mr.
 * Uses the same cached catalogue and search as the results page.
 */
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").slice(0, 80)
  const raw = req.nextUrl.searchParams.get("locale")
  const locale = isLocale(raw) ? raw : "mr"
  if (q.trim().length < 2) return NextResponse.json({ items: [] })

  const [products, english] = await Promise.all([
    listProductsFor(locale).catch(() => []),
    locale === "en" ? Promise.resolve(undefined) : listProductsFor("en").catch(() => undefined),
  ])
  const items: Suggestion[] = searchProducts(products, q, english)
    .slice(0, 6)
    .map((p) => {
      const price = productPrice(p)
      return {
        handle: p.handle!,
        title: p.title ?? "",
        image: productImages(p)[0],
        price: price?.price,
        mrp: price?.mrp,
      }
    })
  return NextResponse.json({ items }, { headers: { "Cache-Control": "public, max-age=60" } })
}
