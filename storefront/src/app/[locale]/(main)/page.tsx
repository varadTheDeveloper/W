import { BRAND } from "@config/brand"
import { HOME_CATEGORY_TILES } from "@config/categories"
import { listCategoryTree, listProductsFor } from "@lib/data/catalog"
import { format, getDictionary } from "@lib/i18n"
import { toLocale } from "@lib/i18n/config"
import { inCategory, inCollection, productBrand, productPrice, sortProducts } from "@lib/util/catalog"
import { formatINR } from "@lib/util/money"
import Hero, { Slide } from "@modules/home/components/hero"
import {
  BuildBanner,
  Brands,
  CategoryTiles,
  DealsBlock,
  LuckyDraw,
  NeedsTiles,
  PromoCards,
  Services,
  SocialProof,
  TrustBar,
  VisitStore,
  WhyUs,
} from "@modules/home/components/sections"
import ProductRail from "@modules/shop/product-rail"
import { HttpTypes } from "@medusajs/types"
import { Metadata } from "next"

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const t = getDictionary((await props.params).locale)
  return { title: { absolute: `${BRAND.name} | ${t.home.metaTitle}` }, description: t.footer.about }
}

const lowest = (list: HttpTypes.StoreProduct[]) =>
  Math.min(...list.map((p) => productPrice(p)?.price ?? Infinity))
const maxDiscount = (list: HttpTypes.StoreProduct[]) =>
  Math.max(0, ...list.map((p) => productPrice(p)?.discountPercent ?? 0))

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const locale = toLocale((await props.params).locale)
  const t = getDictionary(locale)
  const [products, categories] = await Promise.all([
    listProductsFor(locale).catch(() => []),
    listCategoryTree(locale).catch(() => []),
  ])

  const popular = (list: HttpTypes.StoreProduct[]) => sortProducts(list, "popular")
  const deals = popular(products.filter((p) => inCollection(p, "deals")))
  const diwali = products.filter((p) => inCollection(p, "diwali"))
  const bestsellers = popular(products.filter((p) => inCollection(p, "bestsellers")))
  const gaming = popular(products.filter((p) => inCategory(p, ["gaming-pcs", "complete-setups"])))
  const setups = products.filter((p) => inCategory(p, ["complete-setups"]))
  const laptops = popular(products.filter((p) => inCategory(p, ["gaming-laptops", "everyday-laptops", "business-laptops", "macbooks"])))
  const parts = popular(products.filter((p) => inCategory(p, ["processors", "graphics-cards", "motherboards", "power-supplies", "cabinets"])))
  const printers = popular(products.filter((p) => inCategory(p, ["ink-tank-printers", "laser-printers", "gaming-monitors", "office-monitors"])))
  const brands = [...new Set(products.map(productBrand).filter((b): b is string => !!b && b !== "Computer Warehouse"))].sort()

  const s = t.home.slides
  const diwaliOff = maxDiscount(diwali)
  const setupFrom = lowest(setups)
  const slides: Slide[] = [
    { key: "diwali", href: "/collections/diwali", ...s.diwali, sticker: diwaliOff ? format(t.home.upTo, { percent: diwaliOff }) : undefined },
    { key: "gaming", href: "/categories/gaming-pcs", ...s.gaming },
    {
      key: "setups",
      href: "/categories/complete-setups",
      ...s.setups,
      title: Number.isFinite(setupFrom) ? format(s.setups.title, { price: formatINR(setupFrom) }) : s.setups.title.replace(/\s*\S*\{price\}\S*/, ""),
    },
    { key: "openBox", href: "/collections/open-box", ...s.openBox },
  ]

  const byHandle = new Map(categories.map((c) => [c.handle, c]))
  const tiles = HOME_CATEGORY_TILES.map((h) => byHandle.get(h))
    .filter((c): c is HttpTypes.StoreProductCategory => !!c)
    .map((c) => ({ handle: c.handle, name: c.name }))

  return (
    <>
      <div className="content-container pt-3 small:pt-5">
        <div className="grid gap-3 small:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)] small:gap-4">
          <Hero slides={slides} />
          <PromoCards t={t} />
        </div>
      </div>
      <CategoryTiles title={t.home.categoriesTitle} tiles={tiles} />
      <TrustBar t={t} />
      <DealsBlock products={deals} locale={locale} t={t} />
      <ProductRail priority={false} title={t.home.bestsellers} subtitle={t.home.bestsellersSub} href="/collections/bestsellers" products={bestsellers} locale={locale} t={t} />
      <LuckyDraw t={t} />
      <NeedsTiles t={t} />
      <ProductRail title={t.home.gamingTitle} subtitle={t.home.gamingSub} href="/categories/gaming-pcs" products={gaming} locale={locale} t={t} />
      <BuildBanner t={t} />
      <ProductRail title={t.home.laptopsTitle} subtitle={t.home.laptopsSub} href="/categories/laptops" products={laptops} locale={locale} t={t} />
      <ProductRail title={t.home.partsTitle} subtitle={t.home.partsSub} href="/categories/components" products={parts} locale={locale} t={t} />
      <ProductRail title={t.home.printersTitle} subtitle={t.home.printersSub} href="/categories/printers" products={printers} locale={locale} t={t} />
      <Brands t={t} brands={brands} />
      <WhyUs t={t} />
      <Services t={t} />
      <SocialProof t={t} />
      <VisitStore t={t} locale={locale} />
    </>
  )
}
