import { Dictionary, format } from "@lib/i18n"
import { Locale } from "@lib/i18n/config"
import {
  activeFilterCount,
  buildFacets,
  matchesFilters,
  parseFilters,
  parseSort,
  sortProducts,
} from "@lib/util/catalog"
import { HttpTypes } from "@medusajs/types"
import { CATEGORY_IMAGES } from "@config/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRightIcon, SearchIcon } from "@modules/common/icons/ui"
import Image from "next/image"
import ListingFilters, { SortSelect } from "./filters"
import ProductGrid from "./product-grid"

const PAGE_SIZE = 24

export type Crumb = { label: string; href?: string }

/** Shared page body for categories, collections, all products and search. */
export default function Listing({
  title,
  path,
  crumbs,
  products,
  searchParams,
  locale,
  t,
  subcategories = [],
}: {
  title: string
  /** This page's address without the language, e.g. /categories/men */
  path: string
  crumbs: Crumb[]
  products: HttpTypes.StoreProduct[]
  searchParams: Record<string, string | string[] | undefined>
  locale: Locale
  t: Dictionary
  subcategories?: { handle: string; name: string }[]
}) {
  const filters = parseFilters(searchParams)
  const sort = parseSort(searchParams)
  const page = Math.max(1, parseInt(String(searchParams.page ?? "1"), 10) || 1)

  const keep = typeof searchParams.q === "string" ? { q: searchParams.q } : undefined
  const facets = buildFacets(products)
  const matching = sortProducts(products.filter((p) => matchesFilters(p, filters)), sort)
  const shown = matching.slice(0, page * PAGE_SIZE)

  const moreParams = new URLSearchParams()
  Object.entries(searchParams).forEach(([k, v]) => {
    if (k !== "page" && typeof v === "string") moreParams.set(k, v)
  })
  moreParams.set("page", String(page + 1))

  return (
    <div className="content-container py-4 small:py-6">
      <nav aria-label="Breadcrumb" className="mb-3 text-[13px] text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {crumbs.map((c, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRightIcon size={14} />}
              {c.href ? (
                <LocalizedClientLink href={c.href} className="hover:text-ink">
                  {c.label}
                </LocalizedClientLink>
              ) : (
                <span aria-current="page" className="text-ink">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mb-4 flex flex-wrap items-end justify-between gap-2 small:mb-5">
        <h1 className="heading-lg" data-testid="listing-title">
          {title}{" "}
          <span className="ml-1 align-middle font-sans text-sm font-normal text-muted" data-testid="result-count">
            {matching.length === 1 ? t.listing.resultsOne : format(t.listing.results, { count: matching.length })}
          </span>
        </h1>
        <SortSelect sort={sort} filters={filters} keep={keep} />
      </div>

      {subcategories.length > 0 && (
        <ul className="no-scrollbar -mx-4 mb-5 flex gap-2.5 overflow-x-auto px-4 small:mx-0 small:px-0">
          {subcategories.map((s) => (
            <li key={s.handle} className="shrink-0">
              <LocalizedClientLink
                href={`/categories/${s.handle}`}
                className="flex h-14 items-center gap-2.5 rounded-2xl border border-line bg-white pl-1.5 pr-4 text-[13.5px] font-semibold transition hover:border-navy-300 hover:shadow-card"
              >
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white">
                  {CATEGORY_IMAGES[s.handle] && <Image src={CATEGORY_IMAGES[s.handle]} alt="" fill sizes="44px" className="object-contain p-0.5" />}
                </span>
                {s.name}
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
      )}

      <div className="small:grid small:grid-cols-[240px_1fr] small:gap-6">
        <ListingFilters facets={facets} filters={filters} sort={sort} total={matching.length} keep={keep} />
        <div>
          {shown.length > 0 ? (
            <ProductGrid products={shown} locale={locale} t={t} />
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-muted">
                <SearchIcon size={26} />
              </span>
              <p className="text-muted">{t.listing.noResults}</p>
              {activeFilterCount(filters) > 0 && (
                <LocalizedClientLink href={path} className="btn-outline">
                  {t.listing.clearFilters}
                </LocalizedClientLink>
              )}
            </div>
          )}
          {matching.length > shown.length && (
            <div className="mt-8 flex justify-center">
              <a href={`?${moreParams.toString()}`} className="btn-outline px-12" rel="nofollow">
                {t.listing.loadMore}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
