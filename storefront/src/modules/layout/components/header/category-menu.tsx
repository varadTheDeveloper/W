"use client"

import { CATEGORY_IMAGES } from "@config/categories"
import { format } from "@lib/i18n"
import { useI18n } from "@lib/i18n/provider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRightIcon, ChevronDownIcon, ChevronRightIcon, GridIcon } from "@modules/common/icons/ui"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { CategoryIcon } from "./category-icon"
import type { NavCategory } from "./mobile-menu"

/** "All categories" button with a large panel: parents on the left, their sub-categories with pictures on the right. */
export default function CategoryMenu({ categories }: { categories: NavCategory[] }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(categories[0]?.handle)
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const pathname = usePathname()

  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onDown)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onDown)
    }
  }, [open])

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 160)
  }

  const parent = categories.find((c) => c.handle === current) ?? categories[0]

  return (
    <div ref={ref} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex h-9 items-center gap-2 whitespace-nowrap rounded-lg px-3 font-semibold transition-colors ${open ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-900 hover:bg-navy-100"}`}
        data-testid="all-categories"
      >
        <GridIcon size={18} />
        {t.common.allCategories}
        <ChevronDownIcon size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && parent && (
        <div className="absolute left-0 top-full z-50 mt-2 flex w-[860px] max-w-[calc(100vw-48px)] animate-fade-up overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
          <ul className="w-64 shrink-0 border-r border-line bg-surface/60 py-2">
            {categories.map((c) => {
              const on = c.handle === parent.handle
              return (
                <li key={c.handle}>
                  <LocalizedClientLink
                    href={`/categories/${c.handle}`}
                    onMouseEnter={() => setCurrent(c.handle)}
                    onFocus={() => setCurrent(c.handle)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-[14px] ${on ? "bg-white font-semibold text-navy-900" : "text-ink hover:bg-white"}`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${on ? "bg-accent-400 text-navy-950" : "bg-white text-navy-700 ring-1 ring-line"}`}>
                      <CategoryIcon handle={c.handle} size={18} />
                    </span>
                    <span className="flex-1">{c.name}</span>
                    <ChevronRightIcon size={16} className="text-muted" />
                  </LocalizedClientLink>
                </li>
              )
            })}
          </ul>
          <div className="flex-1 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-heading text-lg font-semibold">{parent.name}</p>
              <LocalizedClientLink href={`/categories/${parent.handle}`} className="flex items-center gap-1 text-sm font-semibold text-navy-700 hover:underline">
                {format(t.header.viewAllIn, { name: parent.name })}
                <ArrowRightIcon size={16} />
              </LocalizedClientLink>
            </div>
            <ul className="grid grid-cols-3 gap-3">
              {(parent.children.length ? parent.children : [{ handle: parent.handle, name: parent.name }]).map((child) => {
                const img = CATEGORY_IMAGES[child.handle]
                return (
                  <li key={child.handle}>
                    <LocalizedClientLink
                      href={`/categories/${child.handle}`}
                      className="group flex flex-col items-center gap-2 rounded-xl border border-line p-3 text-center text-[13px] font-medium transition hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-card"
                    >
                      <span className="relative h-24 w-full">
                        {img && <Image src={img} alt="" fill sizes="180px" className="object-contain transition-transform duration-300 group-hover:scale-105" />}
                      </span>
                      {child.name}
                    </LocalizedClientLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
