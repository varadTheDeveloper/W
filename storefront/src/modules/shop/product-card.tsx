import { BRAND } from "@config/brand"
import { Dictionary, format } from "@lib/i18n"
import { Locale } from "@lib/i18n/config"
import {
  hasPriceRange,
  imageAlt,
  isProductInStock,
  productBadge,
  productBrand,
  productCondition,
  productHighlights,
  productImages,
  productPrice,
  stockLeft,
  variantChoice,
} from "@lib/util/catalog"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import Price from "./price"
import QuickAdd from "./quick-add"
import WishlistButton from "./wishlist-button"

const LOW_STOCK = 3

export default function ProductCard({
  product,
  t,
  priority = false,
  headingLevel = "h3",
}: {
  product: HttpTypes.StoreProduct
  /** Page language (the card's texts come from `t`) */
  locale?: Locale
  t: Dictionary
  priority?: boolean
  /** h2 on listing pages (under the h1), h3 inside titled rails */
  headingLevel?: "h2" | "h3"
}) {
  const Heading = headingLevel
  const [image, hoverImage] = productImages(product)
  const price = productPrice(product)
  const inStock = isProductInStock(product)
  const left = stockLeft(product)
  const badge = productBadge(product)
  const condition = productCondition(product)
  const brand = productBrand(product)
  const highlights = productHighlights(product).slice(0, 3)
  const single = !variantChoice(product) && product.variants?.length === 1 ? product.variants[0] : undefined
  const href = `/products/${product.handle}`

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-white transition duration-300 hover:-translate-y-0.5 hover:border-navy-100 hover:shadow-lift"
      data-testid="product-card"
    >
      <LocalizedClientLink href={href} className="flex flex-1 flex-col" aria-label={product.title ?? undefined}>
        <div className="relative aspect-square overflow-hidden bg-white">
          {image && (
            <Image
              src={image}
              alt={imageAlt(product, image) ?? product.title ?? ""}
              fill
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
              className={`object-contain p-4 mix-blend-multiply transition duration-500 small:p-5 ${hoverImage ? "small:group-hover:opacity-0" : "group-hover:scale-105"}`}
            />
          )}
          {hoverImage && (
            <Image
              src={hoverImage}
              alt=""
              fill
              sizes="240px"
              className="hidden object-contain p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 small:block"
            />
          )}
          <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1">
            {price && price.discountPercent >= 5 && (
              <span className="badge bg-brand-600 text-white">-{price.discountPercent}%</span>
            )}
            {condition !== "new" && <span className="badge bg-accent-400 text-navy-950">{t.conditions[condition]}</span>}
            {badge && <span className="badge bg-navy-900 text-white">{t.badges[badge]}</span>}
          </div>
          {!inStock && (
            <span className="absolute inset-x-3 bottom-3 rounded-lg bg-white/95 py-1.5 text-center text-xs font-semibold text-muted ring-1 ring-line">
              {t.product.outOfStock}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 border-t border-line/60 px-3 pb-3 pt-2.5 small:px-4">
          {brand && <p className="truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{brand}</p>}
          <Heading className="line-clamp-2 min-h-[2.5rem] text-[13.5px] font-medium leading-5 text-ink group-hover:text-navy-700 small:text-[14px]" data-testid="product-title">
            {product.title}
          </Heading>
          {highlights.length > 0 && (
            <p className="line-clamp-1 text-[12px] text-muted">{highlights.join(" · ")}</p>
          )}
          <div className="mt-auto pt-1">
            {price && <Price info={price} t={t} from={hasPriceRange(product)} />}
            <p className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[12px]">
              {inStock ? (
                left !== undefined && left <= LOW_STOCK ? (
                  <span className="font-medium text-[#c2410c]">{format(t.product.onlyLeft, { count: left })}</span>
                ) : (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-saving" aria-hidden="true" />
                    <span className="text-saving">{t.product.inStock}</span>
                  </>
                )
              ) : (
                <span className="text-muted">{t.product.soldOut}</span>
              )}
              {inStock && price && BRAND.freeDeliveryFrom && price.price >= BRAND.freeDeliveryFrom && (
                <span className="hidden truncate text-muted xsmall:inline">· {t.product.freeDelivery}</span>
              )}
            </p>
          </div>
        </div>
      </LocalizedClientLink>
      <div className="px-3 pb-3 small:px-4 small:pb-4">
        <QuickAdd variantId={inStock ? single?.id : undefined} href={href} soldOut={!inStock} />
      </div>
      <WishlistButton handle={product.handle!} />
    </div>
  )
}
