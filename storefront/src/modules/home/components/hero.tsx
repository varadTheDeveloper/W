"use client"

import { format } from "@lib/i18n"
import { useI18n } from "@lib/i18n/provider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@modules/common/icons/ui"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

export type Slide = {
  key: "diwali" | "gaming" | "setups" | "openBox"
  href: string
  eyebrow: string
  title: string
  text: string
  cta: string
  /** Small round sticker, e.g. "Up to 25% off" */
  sticker?: string
}

const DELAY = 6500

/** Banner slider at the top of the home page: swipe, arrows, dots, pauses on hover. */
export default function Hero({ slides }: { slides: Slide[] }) {
  const { t } = useI18n()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hover, setHover] = useState(false)
  const startX = useRef<number | null>(null)
  const count = slides.length

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])

  useEffect(() => {
    // No moving banners for people who asked their phone for less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false)
  }, [])

  useEffect(() => {
    if (!playing || hover || count < 2) return
    const timer = setTimeout(() => go(index + 1), DELAY)
    return () => clearTimeout(timer)
  }, [index, playing, hover, count, go])

  return (
    <section
      className="relative overflow-hidden rounded-2xl small:rounded-3xl"
      aria-roledescription="carousel"
      aria-label={slides[0]?.eyebrow}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return
        const dx = e.clientX - startX.current
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
        startX.current = null
      }}
    >
      <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,0.8,0.24,1)]" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div
            key={s.key}
            className="w-full shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={format(t.common.slide, { n: i + 1, total: count })}
            aria-hidden={i !== index}
            inert={i !== index}
          >
            <SlideView slide={s} active={i === index} priority={i === 0} />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 small:flex"
            aria-label={t.common.previous}
          >
            <ChevronLeftIcon size={22} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 small:flex"
            aria-label={t.common.next}
          >
            <ChevronRightIcon size={22} />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/25 px-2.5 py-1.5 backdrop-blur small:bottom-4">
            {slides.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-accent-400" : "w-2 bg-white/60 hover:bg-white"}`}
                aria-label={format(t.common.slide, { n: i + 1, total: count })}
                aria-current={i === index}
              />
            ))}
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="ml-1 flex h-5 w-5 items-center justify-center text-white/80 hover:text-white"
              aria-label={playing ? t.common.pause : t.common.play}
            >
              {playing ? <PauseIcon size={14} /> : <PlayIcon size={12} />}
            </button>
          </div>
        </>
      )}
    </section>
  )
}

const THEMES: Record<Slide["key"], { bg: string; dark: boolean }> = {
  diwali: { bg: "bg-[linear-gradient(115deg,#0a1430_0%,#2b0f3a_52%,#6a0a1c_100%)]", dark: true },
  gaming: { bg: "bg-[#060c1a]", dark: true },
  setups: { bg: "bg-[linear-gradient(115deg,#fff8dc_0%,#ffe9a3_55%,#ffd24d_100%)]", dark: false },
  openBox: { bg: "bg-[linear-gradient(115deg,#10204a_0%,#0a1430_60%,#060c1a_100%)]", dark: true },
}

function SlideView({ slide, active, priority }: { slide: Slide; active: boolean; priority: boolean }) {
  const theme = THEMES[slide.key]
  const dark = theme.dark
  return (
    <div className={`relative h-[430px] overflow-hidden xsmall:h-[400px] small:h-[420px] ${theme.bg}`}>
      <Decor kind={slide.key} />
      <div className="relative z-10 flex h-full flex-col justify-start p-6 pt-7 small:max-w-[54%] small:justify-center small:p-12">
        <span
          className={`mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.12em] ${
            dark ? "bg-accent-400 text-navy-950" : "bg-brand-600 text-white"
          } ${active ? "animate-fade-up" : ""}`}
        >
          {slide.eyebrow}
        </span>
        <h2
          className={`font-heading text-[1.6rem] font-bold leading-[1.12] tracking-tight xsmall:text-[2rem] small:text-[2.6rem] ${dark ? "text-white" : "text-navy-950"} ${
            active ? "animate-fade-up [animation-delay:80ms]" : ""
          }`}
        >
          {slide.title}
        </h2>
        <p className={`mt-3 max-w-md text-[14px] leading-relaxed small:text-base ${dark ? "text-white/75" : "text-navy-800"} ${active ? "animate-fade-up [animation-delay:160ms]" : ""}`}>
          {slide.text}
        </p>
        <LocalizedClientLink
          href={slide.href}
          tabIndex={active ? undefined : -1}
          className={`${dark ? "btn-primary" : "btn-dark"} group mt-5 h-11 w-fit px-5 small:mt-7 small:h-12 small:px-6 ${active ? "animate-fade-up [animation-delay:240ms]" : ""}`}
        >
          {slide.cta}
          <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-1" />
        </LocalizedClientLink>
      </div>
      <Art kind={slide.key} priority={priority} active={active} />
      {slide.sticker && (
        <span
          className={`absolute bottom-6 left-5 z-20 flex h-[72px] w-[72px] rotate-[-10deg] items-center px-2 small:bottom-auto small:left-auto small:right-8 small:top-8 justify-center rounded-full text-center font-heading text-[13px] font-bold leading-tight shadow-lift small:h-24 small:w-24 small:text-base ${
            dark ? "bg-brand-600 text-white ring-4 ring-accent-400/70" : "bg-navy-900 text-accent-300 ring-4 ring-white/70"
          }`}
        >
          {slide.sticker}
        </span>
      )}
    </div>
  )
}

/** Background shapes and lights for each slide (pure CSS) */
function Decor({ kind }: { kind: Slide["key"] }) {
  if (kind === "diwali") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,184,0,0.35),transparent_65%)]" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(227,38,47,0.35),transparent_65%)]" />
        {/* String of festival lights */}
        <div className="absolute inset-x-0 top-0 flex justify-around px-6">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="mt-2 h-2 w-2 rounded-full bg-accent-300 shadow-[0_0_12px_4px_rgba(255,200,31,0.55)]"
              style={{ transform: `translateY(${Math.sin(i / 1.6) * 6 + 6}px)`, opacity: 0.55 + (i % 3) * 0.15 }}
            />
          ))}
        </div>
      </div>
    )
  }
  if (kind === "gaming") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]" />
        <div className="absolute right-[8%] top-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.55),transparent_65%)]" />
        <div className="absolute right-[30%] top-1/2 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.45),transparent_65%)]" />
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,200,31,0.18),transparent_65%)]" />
      </div>
    )
  }
  if (kind === "setups") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-10 -top-24 h-[28rem] w-[28rem] rounded-full border-[42px] border-white/35" />
        <div className="absolute bottom-[-6rem] right-[38%] h-64 w-64 rounded-full bg-white/40 blur-2xl" />
      </div>
    )
  }
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute -right-16 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full border-[2px] border-dashed border-accent-400/30" />
      <div className="absolute right-[6%] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,200,31,0.25),transparent_65%)]" />
    </div>
  )
}

type Layer = { src: string; w: number; h: number; className: string }

/** Product cut-outs for each slide, placed for phones (bottom) and computers (right). */
const ART: Record<Slide["key"], Layer[]> = {
  diwali: [
    { src: "/hero/cabinet.webp", w: 380, h: 700, className: "right-[4%] bottom-[-4%] h-[46%] small:right-[4%] small:bottom-[-2%] small:h-[74%]" },
    { src: "/hero/laptop-victus.webp", w: 560, h: 520, className: "right-[28%] bottom-[3%] h-[34%] small:right-[19%] small:bottom-[5%] small:h-[48%]" },
    { src: "/hero/printer.webp", w: 470, h: 420, className: "right-[60%] bottom-[3%] hidden h-[24%] xsmall:block small:right-[36%] small:bottom-[6%] small:h-[26%]" },
  ],
  gaming: [
    { src: "/hero/monitor-gaming.webp", w: 640, h: 600, className: "right-[24%] bottom-[4%] h-[46%] small:right-[16%] small:bottom-[8%] small:h-[78%]" },
    { src: "/hero/cabinet.webp", w: 380, h: 700, className: "right-[3%] bottom-[-2%] h-[50%] small:right-[3%] small:h-[86%]" },
    { src: "/hero/gpu.webp", w: 520, h: 360, className: "left-[6%] bottom-[3%] h-[16%] small:left-auto small:right-[40%] small:bottom-[4%] small:h-[22%]" },
  ],
  setups: [{ src: "/hero/setup-office.webp", w: 860, h: 640, className: "right-[2%] bottom-[2%] h-[46%] small:right-[4%] small:bottom-[6%] small:h-[84%]" }],
  openBox: [
    { src: "/hero/macbook.webp", w: 610, h: 460, className: "right-[30%] bottom-[6%] h-[34%] small:right-[24%] small:bottom-[16%] small:h-[50%]" },
    { src: "/hero/elitebook.webp", w: 600, h: 460, className: "right-[3%] bottom-[2%] h-[30%] small:right-[4%] small:bottom-[8%] small:h-[46%]" },
    { src: "/hero/mac-mini.webp", w: 560, h: 300, className: "right-[62%] bottom-[3%] hidden h-[14%] xsmall:block small:right-[52%] small:bottom-[8%] small:h-[18%]" },
  ],
}

function Art({ kind, priority, active }: { kind: Slide["key"]; priority: boolean; active: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {ART[kind].map((l, i) => (
        <Image
          key={l.src + i}
          src={l.src}
          alt=""
          width={l.w}
          height={l.h}
          priority={priority && i === 0}
          sizes="(max-width: 1024px) 50vw, 420px"
          className={`absolute w-auto object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.35)] transition duration-700 ${l.className} ${
            active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: `${150 + i * 120}ms` }}
        />
      ))}
    </div>
  )
}
