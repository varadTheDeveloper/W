import { getProduct, listCategoryTree, listProductsFor } from "@lib/data/catalog"
import { getDictionary } from "@lib/i18n"
import { LOCALES, toLocale } from "@lib/i18n/config"
import { productBrand, productImages, productPrice, isProductInStock, sortProducts } from "@lib/util/catalog"
import { getBaseURL } from "@lib/util/env"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRightIcon } from "@modules/common/icons/ui"
import ProductRail from "@modules/shop/product-rail"
import ProductView from "@modules/shop/product/product-view"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = { params: Promise<{ locale: string; handle: string }> }

/** Product pages are built ahead of time in every language. */
export async function generateStaticParams() {
  try {
    const products = await listProductsFor("en")
    return LOCALES.flatMap((locale) => products.map((p) => ({ locale, handle: p.handle })))
  } catch (error) {
    console.error(`Could not list products to pre-build: ${error instanceof Error ? error.message : error}`)
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, handle } = await props.params
  const product = await getProduct(toLocale(locale), handle)
  if (!product) return {}
  const image = productImages(product)[0]
  return {
    title: product.title,
    description: product.description ?? undefined,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/products/${handle}`])),
    },
    openGraph: { title: product.title ?? undefined, images: image ? [image] : [] },
  }
}

export default async function ProductPage(props: Props) {
  const { locale: raw, handle } = await props.params
  const locale = toLocale(raw)
  const t = getDictionary(locale)
  const product = await getProduct(locale, handle)
  if (!product) notFound()

  const category = product.categories?.[0]
  // Same category first, then the rest of its parent category (e.g. other laptops)
  let related: Awaited<ReturnType<typeof listProductsFor>> = []
  if (category) {
    const tree = await listCategoryTree(locale)
    const parentId = tree.find((c) => c.id === category.id)?.parent_category_id
    const family = parentId ? [parentId, ...tree.filter((c) => c.parent_category_id === parentId).map((c) => c.id)] : [category.id]
    const list = (await listProductsFor(locale, { category_id: family })).filter((p) => p.id !== product.id)
    const same = (p: (typeof list)[number]) => (p.categories ?? []).some((c) => c.id === category.id)
    related = [...sortProducts(list.filter(same), "popular"), ...sortProducts(list.filter((p) => !same(p)), "popular")]
  }

  // Product facts for Google (price, stock, brand) as structured data
  const price = productPrice(product)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: productImages(product),
    description: product.description,
    sku: product.variants?.[0]?.sku ?? product.handle,
    brand: productBrand(product) ? { "@type": "Brand", name: productBrand(product) } : undefined,
    offers: price
      ? {
          "@type": "Offer",
          url: `${getBaseURL()}/${locale}/products/${handle}`,
          priceCurrency: "INR",
          price: price.price,
          availability: isProductInStock(product) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        }
      : undefined,
  }

  return (
    <div className="pb-24 small:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="content-container pb-6 pt-0 small:py-6">
        <nav aria-label="Breadcrumb" className="py-3 text-[13px] text-muted small:pb-5 small:pt-0">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <LocalizedClientLink href="/" className="hover:text-ink">
                {t.common.home}
              </LocalizedClientLink>
            </li>
            {category && (
              <li className="flex items-center gap-1">
                <ChevronRightIcon size={14} />
                <LocalizedClientLink href={`/categories/${category.handle}`} className="hover:text-ink">
                  {category.name}
                </LocalizedClientLink>
              </li>
            )}
            <li className="hidden items-center gap-1 small:flex">
              <ChevronRightIcon size={14} />
              <span aria-current="page" className="line-clamp-1 text-ink">
                {product.title}
              </span>
            </li>
          </ol>
        </nav>
        <ProductView product={product} />
      </div>
      <ProductRail title={t.product.youMayLike} href={category ? `/categories/${category.handle}` : undefined} products={related} locale={locale} t={t} />
    </div>
  )
}
