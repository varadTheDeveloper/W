"use client"

import { format } from "@lib/i18n"
import { useI18n } from "@lib/i18n/provider"
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@modules/common/icons/ui"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

/**
 * Product photos on white.
 * Phones: swipe through full-width pictures with dots.
 * Computers: thumbnails on the left, a big picture that zooms where the mouse is.
 * Tap/click opens a full-screen view.
 */
export default function Gallery({ images, alt, badges }: { images: string[]; alt: string; badges?: React.ReactNode }) {
  const { t } = useI18n()
  const [active, setActive] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [lens, setLens] = useState<string | null>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!zoomOpen) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false)
      if (e.key === "ArrowRight") setActive((a) => Math.min(images.length - 1, a + 1))
      if (e.key === "ArrowLeft") setActive((a) => Math.max(0, a - 1))
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [zoomOpen, images.length])

  const onScroll = () => {
    const el = track.current
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  if (!images.length) {
    return <div className="aspect-square rounded-2xl bg-surface" />
  }

  const current = images[Math.min(active, images.length - 1)]

  return (
    <div>
      {/* Phones */}
      <div className="relative -mx-4 bg-white small:hidden">
        <div ref={track} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto" data-testid="gallery-track">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                setActive(i)
                setZoomOpen(true)
              }}
              className="relative aspect-square w-full shrink-0 snap-center"
              aria-label={t.product.zoom}
            >
              <Image src={src} alt={i === 0 ? alt : ""} fill priority={i === 0} sizes="100vw" className="object-contain p-6" />
            </button>
          ))}
        </div>
        {badges && <div className="pointer-events-none absolute left-4 top-3 flex flex-col items-start gap-1">{badges}</div>}
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5" aria-hidden="true">
            {images.map((src, i) => (
              <span key={src} className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-navy-900" : "w-1.5 bg-navy-900/25"}`} />
            ))}
          </div>
        )}
      </div>

      {/* Computers */}
      <div className="hidden gap-3 small:flex">
        {images.length > 1 && (
          <ul className="flex w-[72px] shrink-0 flex-col gap-2.5">
            {images.map((src, i) => (
              <li key={src}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`relative block aspect-square w-full overflow-hidden rounded-xl border-2 bg-white transition ${
                    i === active ? "border-accent-400 shadow-glow" : "border-line hover:border-navy-300"
                  }`}
                  aria-label={format(t.product.image, { n: i + 1, total: images.length })}
                  aria-current={i === active}
                >
                  <Image src={src} alt="" fill sizes="72px" className="object-contain p-1.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            setLens(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`)
          }}
          onMouseLeave={() => setLens(null)}
          className="relative aspect-square flex-1 cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-white"
          aria-label={t.product.zoom}
          data-testid="gallery-main"
        >
          <Image
            src={current}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1280px) 50vw, 640px"
            className="object-contain p-10 transition-transform duration-200"
            style={lens ? { transform: "scale(1.9)", transformOrigin: lens } : undefined}
          />
          {badges && <div className="pointer-events-none absolute left-4 top-4 flex flex-col items-start gap-1.5">{badges}</div>}
        </button>
      </div>

      {zoomOpen && (
        <div className="fixed inset-0 z-[120] flex flex-col bg-white" role="dialog" aria-modal="true" aria-label={alt}>
          <div className="flex h-14 items-center justify-between border-b border-line px-4">
            <span className="text-sm text-muted">{format(t.product.image, { n: active + 1, total: images.length })}</span>
            <button type="button" onClick={() => setZoomOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-surface" aria-label={t.common.close}>
              <CloseIcon />
            </button>
          </div>
          <div className="relative flex-1">
            <Image src={current} alt={alt} fill sizes="100vw" className="object-contain p-6" />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActive((a) => Math.max(0, a - 1))}
                  disabled={active === 0}
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white shadow-card disabled:opacity-30"
                  aria-label={t.common.previous}
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  onClick={() => setActive((a) => Math.min(images.length - 1, a + 1))}
                  disabled={active === images.length - 1}
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white shadow-card disabled:opacity-30"
                  aria-label={t.common.next}
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex justify-center gap-2 border-t border-line p-3">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative h-14 w-14 overflow-hidden rounded-lg border-2 ${i === active ? "border-accent-400" : "border-line"}`}
                  aria-label={format(t.product.image, { n: i + 1, total: images.length })}
                >
                  <Image src={src} alt="" fill sizes="56px" className="object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
