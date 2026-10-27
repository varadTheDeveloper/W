"use client"

import { format } from "@lib/i18n"
import { useI18n } from "@lib/i18n/provider"
import {
  activeFilterCount,
  EMPTY_FILTERS,
  Facets,
  Filters,
  filtersToQuery,
  PRICE_BUCKETS,
  SORT_KEYS,
  SortKey,
} from "@lib/util/catalog"
import { CheckIcon, CloseIcon, FilterIcon, SortIcon } from "@modules/common/icons/ui"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

type Group = keyof Filters

/** Filters and sort, kept in the address bar so results can be shared and survive reloads. */
export default function ListingFilters({
  facets,
  filters,
  sort,
  total,
  keep = {},
}: {
  facets: Facets
  filters: Filters
  sort: SortKey
  total: number
  /** Other query values to keep, e.g. the search words */
  keep?: Record<string, string>
}) {
  const { t } = useI18n()
  const router = useRouter()
  const pathname = usePathname()
  const [pending, startTransition] = useTransition()
  const [sheet, setSheet] = useState<null | "filters" | "sort">(null)

  const go = (next: Filters, nextSort: SortKey = sort) =>
    startTransition(() => router.push(`${pathname}${filtersToQuery(next, nextSort, keep)}`, { scroll: false }))

  const toggle = (group: Group, value: string) => {
    const has = filters[group].includes(value)
    go({ ...filters, [group]: has ? filters[group].filter((v) => v !== value) : [...filters[group], value] })
  }

  const clear = () => go(EMPTY_FILTERS)

  useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [sheet])

  const sortLabels: Record<SortKey, string> = {
    popular: t.listing.sort.popular,
    newest: t.listing.sort.newest,
    "price-asc": t.listing.sort.priceAsc,
    "price-desc": t.listing.sort.priceDesc,
    discount: t.listing.sort.discount,
  }

  const groups = (
    <FilterGroups facets={facets} filters={filters} onToggle={toggle} />
  )
  const count = activeFilterCount(filters)

  return (
    <>
      {/* Phones: sticky Sort / Filter bar with bottom sheets */}
      <div className="sticky top-[108px] z-30 -mx-4 mb-4 grid grid-cols-2 border-y border-line bg-white small:hidden">
        <button type="button" onClick={() => setSheet("sort")} className="flex h-12 items-center justify-center gap-2 border-r border-line text-sm font-medium">
          <SortIcon size={18} />
          {t.listing.sortBy}
        </button>
        <button type="button" onClick={() => setSheet("filters")} className="flex h-12 items-center justify-center gap-2 text-sm font-medium" data-testid="open-filters">
          <FilterIcon size={18} />
          {t.listing.filters}
          {count > 0 && <span className="rounded-full bg-accent-400 px-2 text-xs font-bold text-navy-950">{count}</span>}
        </button>
      </div>

      {sheet && (
        <div className="fixed inset-0 z-[100] small:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSheet(null)} />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-3xl bg-white">
            <div className="flex h-14 items-center justify-between border-b border-line px-4">
              <span className="font-heading text-lg font-semibold">{sheet === "sort" ? t.listing.sortBy : t.listing.filters}</span>
              <button type="button" onClick={() => setSheet(null)} className="flex h-10 w-10 items-center justify-center" aria-label={t.common.close}>
                <CloseIcon />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {sheet === "sort" ? (
                <ul>
                  {SORT_KEYS.map((key) => (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => {
                          setSheet(null)
                          go(filters, key)
                        }}
                        className="flex w-full items-center justify-between py-3.5 text-left"
                      >
                        {sortLabels[key]}
                        {key === sort && <CheckIcon size={18} />}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                groups
              )}
            </div>
            {sheet === "filters" && (
              <div className="grid grid-cols-2 gap-3 border-t border-line p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <button type="button" onClick={clear} className="btn-outline" disabled={!count}>
                  {t.listing.clearFilters}
                </button>
                <button type="button" onClick={() => setSheet(null)} className="btn-primary" data-testid="apply-filters">
                  {pending ? t.common.loading : format(t.listing.apply, { count: total })}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Computers: sidebar */}
      <aside className="hidden self-start rounded-2xl border border-line bg-white px-4 py-3 small:sticky small:top-[96px] small:block" aria-label={t.listing.filters}>
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h2 className="flex items-center gap-2 font-heading text-[15px] font-semibold">
            <FilterIcon size={17} />
            {t.listing.filters}
          </h2>
          {count > 0 && (
            <button type="button" onClick={clear} className="text-[13px] font-semibold text-brand-600 hover:underline">
              {t.listing.clearFilters}
            </button>
          )}
        </div>
        <div className={pending ? "opacity-60" : ""}>{groups}</div>
      </aside>
    </>
  )
}

/** Desktop sort dropdown, shown above the grid. */
export function SortSelect({
  sort,
  filters,
  keep = {},
}: {
  sort: SortKey
  filters: Filters
  keep?: Record<string, string>
}) {
  const { t } = useI18n()
  const router = useRouter()
  const pathname = usePathname()
  const labels: Record<SortKey, string> = {
    popular: t.listing.sort.popular,
    newest: t.listing.sort.newest,
    "price-asc": t.listing.sort.priceAsc,
    "price-desc": t.listing.sort.priceDesc,
    discount: t.listing.sort.discount,
  }
  return (
    <label className="hidden items-center gap-2 text-sm small:flex">
      <span className="text-muted">{t.listing.sortBy}</span>
      <select
        value={sort}
        onChange={(e) => router.push(`${pathname}${filtersToQuery(filters, e.target.value as SortKey, keep)}`, { scroll: false })}
        className="h-10 rounded-xl border border-line bg-white px-3 font-medium focus:border-navy-900 focus:outline-none"
        data-testid="sort-select"
      >
        {SORT_KEYS.map((key) => (
          <option key={key} value={key}>
            {labels[key]}
          </option>
        ))}
      </select>
    </label>
  )
}

function FilterGroups({
  facets,
  filters,
  onToggle,
}: {
  facets: Facets
  filters: Filters
  onToggle: (group: Group, value: string) => void
}) {
  const { t } = useI18n()

  const priceLabel = (key: string) => {
    const b = PRICE_BUCKETS.find((x) => x.key === key)!
    const n = (x: number) => x.toLocaleString("en-IN")
    if (b.min === 0) return format(t.listing.filter.under, { amount: n(b.max + 1) })
    if (b.max === Infinity) return format(t.listing.filter.above, { amount: n(b.min) })
    return format(t.listing.filter.between, { min: n(b.min), max: n(b.max) })
  }

  const group = (key: Group, title: string, label: (v: string) => string) =>
    facets[key].length > 0 && (
      <div role="group" aria-label={title} className="py-4">
        <p className="mb-3 text-sm font-semibold">{title}</p>
        <div className="flex flex-col gap-2.5">
          {facets[key].map(({ value, count }) => (
            <Check key={value} checked={filters[key].includes(value)} onChange={() => onToggle(key, value)} testId={`filter-${key}-${value}`}>
              <span className="flex-1">{label(value)}</span>
              <span className="text-xs text-muted">{count}</span>
            </Check>
          ))}
        </div>
      </div>
    )

  return (
    <div className="divide-y divide-line">
      {group("stock", t.listing.filter.availability, () => t.listing.filter.inStock)}
      {group("brand", t.listing.filter.brand, (v) => v)}
      {group("price", t.listing.filter.price, priceLabel)}
      {group("condition", t.listing.filter.condition, (v) => t.conditions[v as keyof typeof t.conditions] ?? v)}
    </div>
  )
}

function Check({
  checked,
  onChange,
  children,
  testId,
}: {
  checked: boolean
  onChange: () => void
  children: React.ReactNode
  testId?: string
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-[18px] w-[18px] rounded accent-navy-900" data-testid={testId} />
      {children}
    </label>
  )
}
