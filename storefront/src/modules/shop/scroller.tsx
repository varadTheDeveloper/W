"use client"

import { useI18n } from "@lib/i18n/provider"
import { ChevronLeftIcon, ChevronRightIcon } from "@modules/common/icons/ui"
import { useCallback, useEffect, useRef, useState } from "react"

/** Sideways list with arrow buttons on computers; phones swipe. */
export default function Scroller({ children, label }: { children: React.ReactNode; label: string }) {
  const { t } = useI18n()
  const ref = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
  }, [])

  useEffect(() => {
    update()
    const el = ref.current
    el?.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el?.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [update])

  const go = (dir: 1 | -1) => {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" })
  }

  const arrow =
    "absolute top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-lift transition hover:scale-105 hover:bg-navy-900 hover:text-white disabled:pointer-events-none disabled:opacity-0 small:flex"

  return (
    <div className="relative">
      <ul
        ref={ref}
        aria-label={label}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 small:mx-0 small:scroll-px-0 small:gap-4 small:px-0"
      >
        {children}
      </ul>
      <button type="button" onClick={() => go(-1)} disabled={edges.start} className={`${arrow} -left-4`} aria-label={t.common.previous}>
        <ChevronLeftIcon size={22} />
      </button>
      <button type="button" onClick={() => go(1)} disabled={edges.end} className={`${arrow} -right-4`} aria-label={t.common.next}>
        <ChevronRightIcon size={22} />
      </button>
    </div>
  )
}
