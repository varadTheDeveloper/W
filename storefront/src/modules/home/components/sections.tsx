import { BRAND, directionsUrl, instagramFollowers, whatsappLink } from "@config/brand"
import { CATEGORY_IMAGES, HOURS_TEXT } from "@config/categories"
import { Dictionary, format } from "@lib/i18n"
import { Locale } from "@lib/i18n/config"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  ArrowRightIcon,
  BadgeIcon,
  BuildingIcon,
  CameraIcon,
  CardIcon,
  CheckIcon,
  ClockIcon,
  CpuIcon,
  FlameIcon,
  GiftIcon,
  HeadsetIcon,
  InstagramIcon,
  PhoneIcon,
  PinIcon,
  ReceiptIcon,
  ShieldIcon,
  StarIcon,
  StoreIcon,
  TruckIcon,
  WhatsAppIcon,
  WrenchIcon,
} from "@modules/common/icons/ui"
import { Rail, SectionHead } from "@modules/shop/product-rail"
import Image from "next/image"
import Countdown from "./countdown"

const followers = `${instagramFollowers.toLocaleString("en-IN")}+`

/** Two cards beside the banner slider (computers) / under it (phones). */
export function PromoCards({ t }: { t: Dictionary }) {
  return (
    <div className="grid grid-cols-2 gap-3 small:grid-cols-1 small:grid-rows-2 small:gap-4">
      <LocalizedClientLink
        href="/custom-pc"
        className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-2xl bg-accent-400 p-4 text-navy-950 small:min-h-0 small:p-6"
      >
        <span className="relative z-10 small:max-w-[62%]">
          <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-navy-950 text-accent-400">
            <CpuIcon size={20} />
          </span>
          <span className="block font-heading text-[15px] font-bold leading-tight small:text-xl">{t.home.promoCustom.title}</span>
          <span className="mt-1 hidden text-sm text-navy-900/80 small:block">{t.home.promoCustom.text}</span>
        </span>
        <span className="relative z-10 mt-3 flex items-center gap-1 text-[13px] font-bold">
          {t.home.promoCustom.cta}
          <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
        <Image
          src="/hero/cabinet.webp"
          alt=""
          width={380}
          height={700}
          className="pointer-events-none absolute -bottom-4 -right-4 hidden h-[105%] w-auto transition-transform duration-500 group-hover:scale-105 small:block"
        />
      </LocalizedClientLink>
      <LocalizedClientLink
        href="/repair"
        className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-2xl bg-navy-900 p-4 text-white small:min-h-0 small:p-6"
      >
        <span className="relative z-10 small:max-w-[62%]">
          <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-accent-400 text-navy-950">
            <WrenchIcon size={19} />
          </span>
          <span className="block font-heading text-[15px] font-bold leading-tight small:text-xl">{t.home.promoRepair.title}</span>
          <span className="mt-1 hidden text-sm text-white/70 small:block">{t.home.promoRepair.text}</span>
        </span>
        <span className="relative z-10 mt-3 flex items-center gap-1 text-[13px] font-bold text-accent-300">
          {t.home.promoRepair.cta}
          <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
        <Image
          src="/hero/elitebook.webp"
          alt=""
          width={600}
          height={460}
          className="pointer-events-none absolute -bottom-2 -right-12 hidden h-[62%] w-auto transition-transform duration-500 group-hover:scale-105 small:block"
        />
      </LocalizedClientLink>
    </div>
  )
}

export function CategoryTiles({ title, tiles }: { title: string; tiles: { handle: string; name: string }[] }) {
  if (!tiles.length) return null
  return (
    <section className="content-container py-6 small:py-8">
      <h2 className="heading-lg mb-5">{title}</h2>
      <ul className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 small:mx-0 small:grid small:grid-cols-5 small:gap-4 small:overflow-visible small:px-0 large:grid-cols-10">
        {tiles.map((tile) => (
          <li key={tile.handle} className="w-[23%] shrink-0 xsmall:w-[18%] small:w-auto">
            <LocalizedClientLink href={`/categories/${tile.handle}`} className="group flex flex-col items-center gap-2 text-center">
              <span className="relative block aspect-square w-full overflow-hidden rounded-2xl border border-line bg-white transition duration-300 group-hover:-translate-y-1 group-hover:border-accent-400 group-hover:shadow-lift">
                {CATEGORY_IMAGES[tile.handle] && (
                  <Image
                    src={CATEGORY_IMAGES[tile.handle]}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 25vw, 130px"
                    className="object-contain p-2.5 mix-blend-multiply transition-transform duration-500 group-hover:scale-110 small:p-3"
                  />
                )}
              </span>
              <span className="line-clamp-2 text-[12.5px] font-semibold leading-tight text-ink small:text-[13.5px]">{tile.name}</span>
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function TrustBar({ t }: { t: Dictionary }) {
  const items = [
    { icon: StarIcon, title: format(t.home.trust.google, { rating: BRAND.google.rating }), sub: format(t.home.trust.googleSub, { count: BRAND.google.reviews }), href: BRAND.map.placeUrl, star: true },
    { icon: InstagramIcon, title: format(t.home.trust.instagram, { count: followers }), sub: t.home.trust.instagramSub, href: BRAND.instagram[0].url },
    { icon: TruckIcon, title: t.home.trust.delivery, sub: format(t.home.trust.deliverySub, { amount: (BRAND.freeDeliveryFrom ?? 0).toLocaleString("en-IN") }) },
    { icon: ReceiptIcon, title: t.home.trust.gst, sub: t.home.trust.gstSub },
    { icon: ShieldIcon, title: t.home.trust.warranty, sub: t.home.trust.warrantySub },
    { icon: CardIcon, title: t.home.trust.emi, sub: t.home.trust.emiSub },
  ]
  return (
    <section className="content-container py-3">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line xsmall:grid-cols-3 large:grid-cols-6">
        {items.map(({ icon: Icon, title, sub, href, star }) => {
          const body = (
            <>
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${star ? "bg-accent-100 text-accent-700" : "bg-navy-50 text-navy-700"}`}>
                <Icon size={20} fill={star ? "currentColor" : "none"} />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold leading-tight text-ink">{title}</span>
                <span className="block text-[12px] text-muted">{sub}</span>
              </span>
            </>
          )
          return (
            <li key={title} className="bg-white">
              {href ? (
                <a href={href} target="_blank" rel="noopener" className="flex h-full items-center gap-3 p-3.5 hover:bg-surface/60">
                  {body}
                </a>
              ) : (
                <div className="flex h-full items-center gap-3 p-3.5">{body}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function DealsBlock({ products, locale, t }: { products: HttpTypes.StoreProduct[]; locale: Locale; t: Dictionary }) {
  if (!products.length) return null
  return (
    <section className="content-container py-6 small:py-9">
      <div className="rounded-3xl bg-[linear-gradient(135deg,#fff1f1_0%,#fff8e1_100%)] p-4 ring-1 ring-brand-100 small:p-7">
        <div className="mb-5 flex flex-col gap-3 small:mb-6 small:flex-row small:items-end small:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-[0_8px_20px_-6px_rgba(200,16,46,0.6)]">
              <FlameIcon size={24} />
            </span>
            <div>
              <h2 className="heading-lg">{t.home.deals.title}</h2>
              <p className="text-sm text-muted">{t.home.deals.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Countdown />
            <LocalizedClientLink href="/collections/deals" className="flex items-center gap-1 whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-brand-700 ring-1 ring-brand-100 hover:bg-brand-50">
              {t.common.viewAll}
              <ArrowRightIcon size={15} />
            </LocalizedClientLink>
          </div>
        </div>
        <Rail products={products} locale={locale} t={t} label={t.home.deals.title} />
      </div>
    </section>
  )
}

export function LuckyDraw({ t }: { t: Dictionary }) {
  return (
    <section className="content-container py-3">
      <div className="relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl bg-[linear-gradient(110deg,#5c0715_0%,#a30d25_45%,#e3262f_100%)] p-5 text-white small:flex-row small:items-center small:justify-between small:px-8 small:py-6">
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,200,31,0.45),transparent_65%)]" />
        <div className="relative flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-400 text-navy-950">
            <GiftIcon size={26} />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-300">{t.home.luckyDraw.eyebrow}</p>
            <p className="font-heading text-lg font-bold leading-tight small:text-2xl">{t.home.luckyDraw.title}</p>
            <p className="mt-0.5 text-sm text-white/80">{t.home.luckyDraw.text}</p>
          </div>
        </div>
        <a href={BRAND.instagram[1].url} target="_blank" rel="noopener" className="btn-primary relative h-11 shrink-0 px-5">
          <InstagramIcon size={18} />
          {t.home.luckyDraw.cta}
        </a>
      </div>
    </section>
  )
}

export function NeedsTiles({ t }: { t: Dictionary }) {
  const tiles = [
    { key: "students", href: "/categories/everyday-laptops", img: "/products/hp-15s.jpg", tone: "from-sky-50 to-white" },
    { key: "gaming", href: "/categories/gaming-pcs", img: "/products/pc-gaming-intel.jpg", tone: "from-violet-50 to-white" },
    { key: "office", href: "/categories/complete-setups", img: "/products/setup-trading.jpg", tone: "from-amber-50 to-white" },
    { key: "creators", href: "/categories/desktops", img: "/products/apple-macbook-air-13.jpg", tone: "from-rose-50 to-white" },
  ] as const
  return (
    <section className="content-container py-6 small:py-9">
      <h2 className="heading-lg mb-5">{t.home.needsTitle}</h2>
      <ul className="grid grid-cols-2 gap-3 small:grid-cols-4 small:gap-4">
        {tiles.map((tile) => {
          const text = t.home.needs[tile.key]
          return (
            <li key={tile.key}>
              <LocalizedClientLink
                href={tile.href}
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-gradient-to-b ${tile.tone} transition hover:-translate-y-0.5 hover:shadow-lift`}
              >
                <span className="p-4 pb-0 small:p-5 small:pb-0">
                  <span className="block font-heading text-[15px] font-bold leading-tight small:text-lg">{text.title}</span>
                  <span className="mt-1 block text-[12.5px] text-muted small:text-sm">{text.text}</span>
                </span>
                <span className="relative mt-2 block aspect-[4/3] w-full">
                  <Image src={tile.img} alt="" fill sizes="(max-width: 1024px) 50vw, 300px" className="object-contain p-3 mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
                </span>
              </LocalizedClientLink>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function BuildBanner({ t }: { t: Dictionary }) {
  const b = t.home.buildBanner
  return (
    <section className="content-container py-6 small:py-9">
      <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-8 text-white small:px-12 small:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute right-[10%] top-[-20%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.5),transparent_65%)]" />
          <div className="absolute bottom-[-30%] right-[30%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.4),transparent_65%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        <div className="relative grid items-center gap-8 small:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-accent-400 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.12em] text-navy-950">{b.eyebrow}</p>
            <h2 className="heading-xl max-w-xl">{b.title}</h2>
            <p className="mt-3 max-w-xl text-white/75">{b.text}</p>
            <ul className="mt-5 grid gap-2.5 text-sm xsmall:grid-cols-3">
              {Object.values(b.points).map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-saving text-white">
                    <CheckIcon size={13} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <LocalizedClientLink href="/custom-pc" className="btn-primary">
                <CpuIcon size={19} />
                {b.cta}
              </LocalizedClientLink>
              <a href={whatsappLink(t.whatsapp.general)} target="_blank" rel="noopener" className="btn-whatsapp">
                <WhatsAppIcon size={19} />
                {t.common.chatOnWhatsApp}
              </a>
            </div>
          </div>
          <div className="relative mx-auto h-64 w-full max-w-md small:h-80">
            <Image src="/hero/pc-gaming.webp" alt="" fill sizes="420px" className="object-contain drop-shadow-[0_30px_40px_rgba(124,58,237,0.45)]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function Brands({ t, brands }: { t: Dictionary; brands: string[] }) {
  if (!brands.length) return null
  return (
    <section className="content-container py-6 small:py-9">
      <SectionHead title={t.home.brandsTitle} subtitle={t.home.brandsSub} t={t} />
      <ul className="grid grid-cols-3 gap-2.5 xsmall:grid-cols-4 small:grid-cols-6 small:gap-3">
        {brands.map((b) => (
          <li key={b}>
            <LocalizedClientLink
              href={`/store?brand=${encodeURIComponent(b)}`}
              className="flex h-16 items-center justify-center rounded-xl border border-line bg-white font-heading text-[17px] font-bold tracking-tight text-navy-900 transition hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-card small:h-20 small:text-xl"
            >
              {b}
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function WhyUs({ t }: { t: Dictionary }) {
  const why = t.home.why
  const items = [
    { icon: BadgeIcon, ...why.genuine },
    { icon: CpuIcon, ...why.tested },
    { icon: ShieldIcon, ...why.warranty },
    { icon: CardIcon, ...why.payments },
    { icon: TruckIcon, ...why.delivery },
    { icon: HeadsetIcon, ...why.service },
  ]
  const steps = [t.home.steps.choose, t.home.steps.pay, t.home.steps.receive]
  return (
    <section className="content-container py-6 small:py-9">
      <div className="grid gap-4 large:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-line bg-white p-5 small:p-8">
          <h2 className="heading-lg mb-6">{t.home.whyTitle}</h2>
          <ul className="grid gap-x-6 gap-y-5 xsmall:grid-cols-2 small:grid-cols-3">
            {items.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-100 text-navy-900">
                  <Icon size={22} />
                </span>
                <span>
                  <span className="block font-semibold leading-snug">{title}</span>
                  <span className="mt-0.5 block text-sm text-muted">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-navy-900 p-5 text-white small:p-8">
          <h2 className="heading-lg mb-6 text-white">{t.home.stepsTitle}</h2>
          <ol className="space-y-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-400 font-heading text-lg font-bold text-navy-950">{i + 1}</span>
                <span>
                  <span className="block font-semibold">{s.title}</span>
                  <span className="text-sm text-white/70">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function Services({ t }: { t: Dictionary }) {
  const s = t.home.services
  const items = [
    { icon: WrenchIcon, href: "/repair", ...s.repair },
    { icon: CpuIcon, href: "/custom-pc", ...s.custom },
    { icon: BuildingIcon, href: "/business", ...s.business },
    { icon: CameraIcon, href: null, ...s.cctv },
  ]
  return (
    <section className="content-container py-6 small:py-9">
      <SectionHead title={t.home.servicesTitle} t={t} />
      <ul className="grid gap-3 xsmall:grid-cols-2 small:gap-4 large:grid-cols-4">
        {items.map(({ icon: Icon, href, title, text }) => {
          const inner = (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-accent-400 transition group-hover:bg-accent-400 group-hover:text-navy-950">
                <Icon size={24} />
              </span>
              <span className="mt-4 block font-heading text-lg font-semibold">{title}</span>
              <span className="mt-1 block flex-1 text-sm text-muted">{text}</span>
              <span className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-navy-700">
                {href ? t.common.learnMore : t.home.servicesCta}
                <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </>
          )
          const cls = "group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-navy-100 hover:shadow-lift"
          return (
            <li key={title}>
              {href ? (
                <LocalizedClientLink href={href} className={cls}>
                  {inner}
                </LocalizedClientLink>
              ) : (
                <a href={whatsappLink(`${t.whatsapp.general} (${title})`)} target="_blank" rel="noopener" className={cls}>
                  {inner}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function SocialProof({ t }: { t: Dictionary }) {
  return (
    <section className="content-container py-6 small:py-9">
      <div className="grid gap-4 small:grid-cols-[1.5fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(120deg,#4f1d96_0%,#c026d3_50%,#f59e0b_100%)] p-6 text-white small:p-8">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border-[30px] border-white/10" />
          <InstagramIcon size={34} />
          <h2 className="mt-3 font-heading text-xl font-bold leading-tight small:text-2xl">{t.home.socialTitle}</h2>
          <p className="mt-2 max-w-lg text-white/85">{t.home.socialText}</p>
          <ul className="mt-6 flex flex-col gap-3 xsmall:flex-row">
            {BRAND.instagram.map((a) => (
              <li key={a.handle} className="flex-1">
                <a href={a.url} target="_blank" rel="noopener" className="flex items-center justify-between gap-3 rounded-2xl bg-white/15 p-3.5 backdrop-blur transition hover:bg-white/25">
                  <span>
                    <span className="block text-sm font-semibold">@{a.handle}</span>
                    <span className="block text-xs text-white/80">{format(t.home.trust.instagram, { count: `${a.followers.toLocaleString("en-IN")}+` })}</span>
                  </span>
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#a21caf]">{t.home.follow}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between rounded-3xl border border-line bg-white p-6 small:p-8">
          <div>
            <h2 className="heading-md">{t.home.reviewsTitle}</h2>
            <div className="mt-4 flex items-end gap-3">
              <span className="font-heading text-5xl font-bold tabular text-navy-900">{BRAND.google.rating}</span>
              <span className="pb-1.5">
                <span className="flex text-accent-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} size={20} fill="currentColor" />
                  ))}
                </span>
                <span className="text-sm text-muted">Google</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">{format(t.home.reviewsText, { rating: BRAND.google.rating, count: BRAND.google.reviews })}</p>
          </div>
          <a href={BRAND.map.placeUrl} target="_blank" rel="noopener" className="btn-outline mt-6 h-11">
            {t.home.readReviews}
            <ArrowRightIcon size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

export function VisitStore({ t, locale }: { t: Dictionary; locale: Locale }) {
  const hours = HOURS_TEXT[locale] ?? HOURS_TEXT.en
  return (
    <section className="content-container py-6 small:py-9">
      <div className="grid overflow-hidden rounded-3xl border border-line bg-white small:grid-cols-[1fr_1.2fr]">
        <div className="p-6 small:p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-400 text-navy-950">
            <StoreIcon size={24} />
          </span>
          <h2 className="heading-lg mt-4">{t.home.storeTitle}</h2>
          <p className="mt-2 text-muted">{t.home.storeText}</p>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex gap-3">
              <PinIcon size={20} className="mt-0.5 shrink-0 text-brand-600" />
              <div>
                <dt className="font-semibold">{t.home.addressLabel}</dt>
                <dd className="text-muted">
                  {BRAND.address.line1}, {BRAND.address.line2}, {BRAND.address.city}
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <ClockIcon size={20} className="mt-0.5 shrink-0 text-brand-600" />
              <div>
                <dt className="font-semibold">{t.home.hoursLabel}</dt>
                <dd className="text-muted">
                  {hours.from} – {hours.to}
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <PhoneIcon size={20} className="mt-0.5 shrink-0 text-brand-600" />
              <div>
                <dt className="font-semibold">{t.home.phoneLabel}</dt>
                <dd className="flex flex-wrap gap-x-4 text-muted">
                  {BRAND.phones.map((p) => (
                    <a key={p.number} href={`tel:+91${p.number}`} className="tabular hover:text-ink">
                      {p.number.slice(0, 5)} {p.number.slice(5)} ({p.name.split(" ")[0]})
                    </a>
                  ))}
                </dd>
              </div>
            </div>
          </dl>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={directionsUrl} target="_blank" rel="noopener" className="btn-dark h-11 px-5">
              <PinIcon size={18} />
              {t.common.getDirections}
            </a>
            <a href={whatsappLink(t.whatsapp.general)} target="_blank" rel="noopener" className="btn-whatsapp h-11 px-5">
              <WhatsAppIcon size={18} />
              {t.common.whatsapp}
            </a>
          </div>
        </div>
        <div className="relative min-h-[280px] bg-[#e8eef6]">
          {/* Shown until (or if) the map loads */}
          <a
            href={BRAND.map.placeUrl}
            target="_blank"
            rel="noopener"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-navy-800 [background-image:linear-gradient(#d5dfec_1px,transparent_1px),linear-gradient(90deg,#d5dfec_1px,transparent_1px)] [background-size:32px_32px]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lift">
              <PinIcon size={28} />
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-card">{BRAND.name}</span>
          </a>
          <iframe
            title={t.home.mapTitle}
            src={`https://www.google.com/maps?q=${BRAND.map.lat},${BRAND.map.lng}&z=17&output=embed`}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

