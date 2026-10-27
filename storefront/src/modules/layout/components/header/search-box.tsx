"use client"

import { useI18n } from "@lib/i18n/provider"
import { formatINR } from "@lib/util/money"
import type { Suggestion } from "@lib/util/search"
import { SearchIcon } from "@modules/common/icons/ui"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"

/**
 * Search field with suggestions while typing. It is a plain form, so it works
 * before JavaScript loads. Results page: /{locale}/search?q=…
 */
export default function SearchBox({
  id,
  defaultValue = "",
  className = "",
  size = "md",
}: {
  id: string
  defaultValue?: string
  className?: string
  size?: "md" | "lg"
}) {
  const { locale, t } = useI18n()
  const router = useRouter()
  const listId = useId()
  const [q, setQ] = useState(defaultValue)
  const [items, setItems] = useState<Suggestion[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const boxRef = useRef<HTMLFormElement>(null)

  // Fetch suggestions shortly after typing stops
  useEffect(() => {
    const term = q.trim()
    if (term.length < 2) {
      setItems([])
      return
    }
    const ctrl = new AbortController()
    const timer = setTimeout(() => {
      fetch(`/api/suggest?locale=${locale}&q=${encodeURIComponent(term)}`, { signal: ctrl.signal })
        .then((r) => (r.ok ? r.json() : { items: [] }))
        .then((d: { items: Suggestion[] }) => {
          setItems(d.items)
          setActive(-1)
        })
        .catch(() => {})
    }, 180)
    return () => {
      clearTimeout(timer)
      ctrl.abort()
    }
  }, [q, locale])

  // Close when clicking elsewhere
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [])

  const show = open && items.length > 0
  const big = size === "lg"

  return (
    <form
      ref={boxRef}
      action={`/${locale}/search`}
      role="search"
      className={`relative ${className}`}
      onSubmit={(e) => {
        if (active >= 0 && items[active]) {
          e.preventDefault()
          setOpen(false)
          router.push(`/${locale}/products/${items[active].handle}`)
        }
      }}
    >
      <label htmlFor={id} className="sr-only">
        {t.common.search}
      </label>
      <div className="flex w-full overflow-hidden rounded-xl bg-white ring-1 ring-black/5 transition focus-within:ring-2 focus-within:ring-accent-400">
        <SearchIcon size={20} className={`pointer-events-none ml-3.5 shrink-0 self-center text-muted`} />
        <input
          id={id}
          type="search"
          name="q"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!show) return
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setActive((a) => Math.min(items.length - 1, a + 1))
            } else if (e.key === "ArrowUp") {
              e.preventDefault()
              setActive((a) => Math.max(-1, a - 1))
            } else if (e.key === "Escape") {
              setOpen(false)
            }
          }}
          placeholder={t.common.searchPlaceholder}
          enterKeyHint="search"
          autoComplete="off"
          role="combobox"
          aria-expanded={show}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          className={`w-full min-w-0 bg-transparent px-3 text-[15px] text-ink placeholder:text-muted focus:outline-none ${big ? "h-12" : "h-11"}`}
          data-testid="search-input"
        />
        <button
          type="submit"
          className={`flex shrink-0 items-center justify-center gap-2 bg-accent-400 px-4 font-semibold text-navy-950 transition-colors hover:bg-accent-300 small:px-5 ${big ? "h-12" : "h-11"}`}
          aria-label={t.common.searchButton}
        >
          <SearchIcon size={20} strokeWidth={2.2} />
          <span className="hidden text-sm large:inline">{t.common.searchButton}</span>
        </button>
      </div>

      {show && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-[60] mt-2 overflow-hidden rounded-xl border border-line bg-white py-1.5 text-ink shadow-lift"
        >
          {items.map((it, i) => (
            <li key={it.handle} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
              <Link
                href={`/${locale}/products/${it.handle}`}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 ${i === active ? "bg-navy-50" : "hover:bg-surface"}`}
              >
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-line bg-white">
                  {it.image && <Image src={it.image} alt="" fill sizes="44px" className="object-contain p-1" />}
                </span>
                <span className="line-clamp-2 flex-1 text-sm leading-snug">{it.title}</span>
                {it.price != null && <span className="shrink-0 text-sm font-semibold tabular">{formatINR(it.price)}</span>}
              </Link>
            </li>
          ))}
          <li>
            <button type="submit" className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-medium text-navy-700 hover:bg-surface">
              <SearchIcon size={16} />
              {t.common.search}: “{q.trim()}”
            </button>
          </li>
        </ul>
      )}
    </form>
  )
}
