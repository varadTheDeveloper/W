import { Dictionary } from "@lib/i18n"
import { Locale } from "@lib/i18n/config"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRightIcon } from "@modules/common/icons/ui"
import ProductCard from "./product-card"
import Scroller from "./scroller"

/** Section title with an optional line under it and a "View all" link. */
export function SectionHead({
  title,
  subtitle,
  href,
  t,
  extra,
  tone = "light",
}: {
  title: string
  subtitle?: string
  href?: string
  t: Dictionary
  extra?: React.ReactNode
  tone?: "light" | "dark"
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 small:mb-6">
      <div className="min-w-0">
        <h2 className={`heading-lg ${tone === "dark" ? "text-white" : ""}`}>{title}</h2>
        {subtitle && <p className={`mt-1 text-sm ${tone === "dark" ? "text-white/70" : "text-muted"}`}>{subtitle}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-4">
        {extra}
        {href && (
          <LocalizedClientLink
            href={href}
            className={`group flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
              tone === "dark" ? "bg-white/10 text-white hover:bg-white/20" : "bg-navy-50 text-navy-800 hover:bg-navy-100"
            }`}
          >
            {t.common.viewAll}
            <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
          </LocalizedClientLink>
        )}
      </div>
    </div>
  )
}

/** Sideways row of product cards with a heading and "View all". */
export default function ProductRail({
  title,
  subtitle,
  href,
  products,
  locale,
  t,
  priority = false,
  extra,
  max = 12,
}: {
  priority?: boolean
  title: string
  subtitle?: string
  href?: string
  products: HttpTypes.StoreProduct[]
  locale: Locale
  t: Dictionary
  extra?: React.ReactNode
  max?: number
}) {
  if (!products.length) return null
  return (
    <section className="content-container py-6 small:py-9">
      <SectionHead title={title} subtitle={subtitle} href={href} t={t} extra={extra} />
      <Rail products={products.slice(0, max)} locale={locale} t={t} priority={priority} label={title} />
    </section>
  )
}

/** Just the sliding row of cards (for sections with their own heading). */
export function Rail({
  products,
  locale,
  t,
  priority = false,
  label,
}: {
  products: HttpTypes.StoreProduct[]
  locale: Locale
  t: Dictionary
  priority?: boolean
  label: string
}) {
  return (
    <Scroller label={label}>
      {products.map((p, i) => (
        <li key={p.id} className="w-[46%] shrink-0 snap-start xsmall:w-[31%] small:w-[calc((100%-3rem)/4)] medium:w-[calc((100%-4rem)/5)]">
          <ProductCard product={p} locale={locale} t={t} priority={priority && i < 2} />
        </li>
      ))}
    </Scroller>
  )
}
