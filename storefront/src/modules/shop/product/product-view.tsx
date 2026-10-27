"use client"

import { BRAND, whatsappLink } from "@config/brand"
import { addToCart } from "@lib/data/cart"
import { format } from "@lib/i18n"
import { useI18n } from "@lib/i18n/provider"
import {
  isProductInStock,
  isRepresentativePhoto,
  isVariantInStock,
  productBadge,
  productBrand,
  productCondition,
  productHighlights,
  productImages,
  productPrice,
  variantChoice,
  variantOption,
  variantPrice,
  warrantyMonths,
} from "@lib/util/catalog"
import { formatINR } from "@lib/util/money"
import { warrantyText } from "@lib/util/warranty"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  BoltIcon,
  CardIcon,
  CartIcon,
  CashIcon,
  CheckIcon,
  ReceiptIcon,
  ShieldIcon,
  StoreIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@modules/common/icons/ui"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState, useTransition } from "react"
import Price from "../price"
import WishlistButton from "../wishlist-button"
import Gallery from "./gallery"
import PincodeCheck from "./pincode"

const LOW_STOCK = 3

export default function ProductView({
  product,
  details,
}: {
  product: HttpTypes.StoreProduct
  /** Server-rendered details block (key features, specifications…), shown under the buttons */
  details: React.ReactNode
}) {
  const { locale, t } = useI18n()
  const router = useRouter()
  const option = variantChoice(product)
  const variants = product.variants ?? []

  // Start on the cheapest variant that is in stock
  const firstInStock =
    [...variants].filter(isVariantInStock).sort((a, b) => (variantPrice(a)?.price ?? 0) - (variantPrice(b)?.price ?? 0))[0] ?? variants[0]

  const [variantId, setVariantId] = useState<string | undefined>(firstInStock?.id)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [adding, startAdding] = useTransition()
  const [buying, startBuying] = useTransition()
  const [url, setUrl] = useState("")
  const optionsRef = useRef<HTMLFieldSetElement>(null)

  useEffect(() => setUrl(window.location.href), [])

  const variant = variants.find((v) => v.id === variantId)
  const price = (variant && variantPrice(variant)) || productPrice(product)
  const stock = variant?.manage_inventory && !variant.allow_backorder ? variant.inventory_quantity ?? 0 : undefined
  const canBuy = !!variant && isVariantInStock(variant)
  const soldOut = variant ? !canBuy : !isProductInStock(product)

  const images = productImages(product)
  const brand = productBrand(product)
  const condition = productCondition(product)
  const badge = productBadge(product)
  const highlights = productHighlights(product)
  const warranty = warrantyMonths(product)
  const optionName = variant && option ? variantOption(product, variant) : undefined

  const add = (then?: () => void) => {
    setError(null)
    if (!variant) {
      optionsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      setError(t.product.pleaseChoose)
      return
    }
    const run = then ? startBuying : startAdding
    run(async () => {
      try {
        await addToCart({ variantId: variant.id, quantity: 1, locale })
        if (then) then()
        else setAdded(true)
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
      }
    })
  }
  const buyNow = () => add(() => router.push(`/${locale}/checkout`))

  const whatsappText = format(t.whatsapp.product, {
    title: product.title ?? "",
    option: optionName ? ` (${optionName})` : "",
    url,
  })

  const gallBadges = (
    <>
      {price && price.discountPercent >= 5 && <span className="badge bg-brand-600 text-white">-{price.discountPercent}%</span>}
      {condition !== "new" && <span className="badge bg-accent-400 text-navy-950">{t.conditions[condition]}</span>}
      {badge && <span className="badge bg-navy-900 text-white">{t.badges[badge]}</span>}
    </>
  )

  const benefits = [
    { icon: ShieldIcon, text: warrantyText(warranty, t) },
    { icon: ReceiptIcon, text: t.product.gstInvoice },
    BRAND.freeDeliveryFrom && price && price.price >= BRAND.freeDeliveryFrom
      ? { icon: TruckIcon, text: t.product.freeDelivery }
      : { icon: CashIcon, text: format(t.product.codUpTo, { amount: formatINR(BRAND.codMaxOrder) }) },
    { icon: StoreIcon, text: t.product.pickup },
  ]

  return (
    <div className="small:grid small:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] small:gap-10 large:gap-14">
      <div className="small:sticky small:top-[100px] small:self-start">
        <Gallery images={images} alt={product.title ?? ""} badges={gallBadges} />
        {isRepresentativePhoto(product) && <p className="mt-3 text-center text-xs text-muted">{t.product.representative}</p>}
      </div>

      <div className="mt-4 flex flex-col gap-5 small:mt-0">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {brand && (
              <LocalizedClientLink href={`/store?brand=${encodeURIComponent(brand)}`} className="rounded-md bg-navy-50 px-2 py-0.5 text-[12px] font-bold uppercase tracking-[0.08em] text-navy-700 hover:bg-navy-100">
                {brand}
              </LocalizedClientLink>
            )}
            <span className={`rounded-md px-2 py-0.5 text-[12px] font-semibold ${condition === "new" ? "bg-saving/10 text-saving" : "bg-accent-100 text-accent-700"}`} title={t.conditionNotes[condition]}>
              {t.conditions[condition]}
            </span>
          </div>
          <h1 className="font-heading text-[1.35rem] font-bold leading-snug text-ink small:text-[1.75rem]" data-testid="pdp-title">
            {product.title}
          </h1>
          {condition !== "new" && <p className="mt-1 text-sm text-muted">{t.conditionNotes[condition]}</p>}
          {highlights.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {highlights.map((h) => (
                <li key={h} className="rounded-lg border border-line bg-white px-2.5 py-1 text-[12.5px] font-medium text-ink">
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-white p-4 small:p-5">
          {price && <Price info={price} t={t} size="lg" />}
          <p className="mt-2 text-xs text-muted">
            {t.product.inclTaxes} · {t.product.gstInvoice}
          </p>
          <p className="mt-3 flex items-center gap-2 text-[13px] text-navy-800">
            <CardIcon size={17} className="text-navy-600" />
            {t.product.emi}
          </p>
          <p className="mt-2 text-[13px]" aria-live="polite">
            {soldOut ? (
              <span className="font-semibold text-danger">{t.product.outOfStock}</span>
            ) : stock !== undefined && stock <= LOW_STOCK ? (
              <span className="flex items-center gap-1.5 font-semibold text-[#c2410c]" data-testid="low-stock">
                <BoltIcon size={15} />
                {format(t.product.onlyLeft, { count: stock })}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-semibold text-saving">
                <CheckIcon size={15} strokeWidth={2.6} />
                {t.product.inStock}
              </span>
            )}
          </p>
        </div>

        {option && (
          <fieldset ref={optionsRef}>
            <legend className="mb-2.5 text-sm font-semibold">{format(t.product.choose, { option: option.title })}</legend>
            <div className="grid gap-2 xsmall:grid-cols-2" role="radiogroup" aria-label={option.title}>
              {variants.map((v) => {
                const on = v.id === variantId
                const available = isVariantInStock(v)
                const vp = variantPrice(v)
                return (
                  <button
                    key={v.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    disabled={!available}
                    onClick={() => {
                      setVariantId(v.id)
                      setAdded(false)
                      setError(null)
                    }}
                    className={`relative flex flex-col items-start gap-0.5 rounded-xl border-2 px-3.5 py-2.5 text-left transition ${
                      on ? "border-navy-900 bg-navy-50/60" : available ? "border-line bg-white hover:border-navy-300" : "cursor-not-allowed border-line bg-surface opacity-60"
                    }`}
                    data-testid={`variant-${v.id}`}
                  >
                    <span className="text-[13.5px] font-semibold leading-snug">{variantOption(product, v)}</span>
                    <span className="text-[13px] tabular text-muted">
                      {vp ? formatINR(vp.price) : ""}
                      {!available && ` · ${t.product.soldOut}`}
                    </span>
                    {on && (
                      <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-white">
                        <CheckIcon size={12} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </fieldset>
        )}

        {/* Buttons: inline on computers, fixed above the bottom bar on phones */}
        <div className="fixed inset-x-0 bottom-14 z-30 border-t border-line bg-white/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(11,19,36,0.08)] backdrop-blur small:static small:border-0 small:bg-transparent small:p-0 small:shadow-none">
          <div className="flex gap-2.5">
            {added ? (
              <LocalizedClientLink href="/cart" prefetch={false} className="btn-dark flex-1" data-testid="go-to-bag">
                <CheckIcon size={20} />
                {t.product.goToBag}
              </LocalizedClientLink>
            ) : (
              <button type="button" onClick={() => add()} disabled={adding || buying || soldOut} className="btn-primary flex-1" data-testid="add-product-button">
                <CartIcon size={20} strokeWidth={2} />
                {soldOut ? t.product.outOfStock : adding ? t.product.adding : t.product.addToBag}
              </button>
            )}
            {!soldOut && (
              <button type="button" onClick={buyNow} disabled={adding || buying} className="btn-accent flex-1" data-testid="buy-now">
                <BoltIcon size={19} />
                {buying ? t.common.loading : t.product.buyNow}
              </button>
            )}
            <span className="hidden small:block">
              <WishlistButton handle={product.handle!} variant="button" />
            </span>
          </div>
          {error && (
            <p className="mt-2 text-sm text-danger" role="alert">
              {error}
            </p>
          )}
        </div>

        <ul className="grid grid-cols-2 gap-2">
          {benefits.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2.5 rounded-xl bg-surface px-3 py-2.5 text-[12.5px] font-medium leading-snug">
              <Icon size={20} className="shrink-0 text-navy-700" />
              {text}
            </li>
          ))}
        </ul>

        <PincodeCheck />

        <a
          href={whatsappLink(whatsappText)}
          target="_blank"
          rel="noopener"
          className="group flex items-center gap-3 rounded-2xl border border-[#25d366]/40 bg-[#25d366]/[0.07] p-4 transition hover:bg-[#25d366]/[0.12]"
          data-testid="product-whatsapp"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-white">
            <WhatsAppIcon size={24} />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-semibold">{t.product.askTitle}</span>
            <span className="block text-[12.5px] text-muted">{t.product.askText}</span>
          </span>
          <span className="text-sm font-semibold text-[#128c4a] group-hover:underline">{t.common.chatOnWhatsApp}</span>
        </a>

        {details}
      </div>
    </div>
  )
}
