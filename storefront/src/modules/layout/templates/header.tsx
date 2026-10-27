import { BRAND, whatsappLink } from "@config/brand"
import { HOURS_TEXT, NAV_CATEGORIES } from "@config/categories"
import { listCategoryTree } from "@lib/data/catalog"
import { Dictionary, format } from "@lib/i18n"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  ClockIcon,
  FlameIcon,
  PhoneIcon,
  PinIcon,
  ReceiptIcon,
  TruckIcon,
  UserIcon,
  WhatsAppIcon,
} from "@modules/common/icons/ui"
import { Suspense } from "react"
import BagLink from "../components/header/bag-link"
import CategoryMenu from "../components/header/category-menu"
import LanguageSwitcher from "../components/header/language-switcher"
import Logo from "../components/header/logo"
import MobileMenu, { NavCategory } from "../components/header/mobile-menu"
import SearchBox from "../components/header/search-box"
import WishlistLink from "../components/header/wishlist-link"

export async function navCategories(locale: string): Promise<NavCategory[]> {
  const all = await listCategoryTree(locale).catch(() => [])
  return all
    .filter((c) => !c.parent_category_id)
    .map((c) => ({
      handle: c.handle,
      name: c.name,
      children: all
        .filter((child) => child.parent_category_id === c.id)
        .map((child) => ({ handle: child.handle, name: child.name })),
    }))
}

/** Every category, parents and children, by handle (for nav links that point at a child, e.g. gaming PCs) */
function findCategory(categories: NavCategory[], handle: string) {
  for (const c of categories) {
    if (c.handle === handle) return { handle: c.handle, name: c.name }
    const child = c.children.find((x) => x.handle === handle)
    if (child) return child
  }
}

const phone = BRAND.phones[0].number
const prettyPhone = `${phone.slice(0, 5)} ${phone.slice(5)}`

export default async function Header({
  locale,
  t,
  customerName,
}: {
  locale: string
  t: Dictionary
  customerName?: string | null
}) {
  const categories = await navCategories(locale)
  const hours = HOURS_TEXT[locale] ?? HOURS_TEXT.en
  const navLinks = NAV_CATEGORIES.map((h) => findCategory(categories, h)).filter(Boolean) as { handle: string; name: string }[]

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
      >
        {t.common.skipToContent}
      </a>

      {/* Info strip */}
      <div className="bg-navy-950 text-[12px] text-white/80">
        <div className="content-container flex h-8 items-center justify-between gap-6">
          <p className="flex min-w-0 items-center gap-5">
            <span className="flex items-center gap-1.5">
              <PinIcon size={14} className="text-accent-400" />
              {t.header.storeArea}
            </span>
            <span className="hidden items-center gap-1.5 xsmall:flex">
              <ClockIcon size={14} className="text-accent-400" />
              {format(t.header.openDaily, hours)}
            </span>
          </p>
          <p className="hidden items-center gap-5 medium:flex">
            {BRAND.freeDeliveryFrom && (
              <span className="flex items-center gap-1.5">
                <TruckIcon size={15} className="text-accent-400" />
                {format(t.header.freeDelivery, { amount: BRAND.freeDeliveryFrom.toLocaleString("en-IN") })}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <ReceiptIcon size={14} className="text-accent-400" />
              {t.header.gstInvoice}
            </span>
          </p>
          <div className="flex items-center gap-4">
            <a href={`tel:+91${phone}`} className="hidden items-center gap-1.5 font-medium text-white hover:text-accent-300 small:flex">
              <PhoneIcon size={14} className="text-accent-400" />
              {prettyPhone}
            </a>
            <Suspense fallback={<div className="h-8 w-16" />}>
              <LanguageSwitcher tone="dark" />
            </Suspense>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-navy-900 text-white shadow-[0_1px_0_rgba(255,255,255,0.06)]">
        <div className="content-container flex h-14 items-center gap-2 small:h-[76px] small:gap-6">
          <Suspense fallback={<div className="h-10 w-10 small:hidden" />}>
            <MobileMenu categories={categories} />
          </Suspense>
          <Logo />
          <SearchBox id="header-search" className="hidden flex-1 small:block" />
          <nav className="ml-auto flex items-center gap-0.5 small:ml-0 small:gap-1" aria-label={t.common.account}>
            <a
              href={whatsappLink(t.whatsapp.general)}
              target="_blank"
              rel="noopener"
              className="hidden items-center gap-2 rounded-xl px-2.5 py-1.5 hover:bg-white/10 medium:flex"
            >
              <WhatsAppIcon size={26} className="text-[#25d366]" />
              <span className="flex flex-col leading-tight">
                <span className="text-[11px] text-white/60">{t.header.help}</span>
                <span className="text-[13px] font-semibold">{t.common.whatsapp}</span>
              </span>
            </a>
            <LocalizedClientLink
              href="/account"
              prefetch={false}
              className="hidden items-center gap-2 rounded-xl px-2.5 py-1.5 hover:bg-white/10 small:flex"
              data-testid="nav-account-link"
              aria-label={t.common.account}
            >
              <UserIcon size={24} />
              <span className="flex flex-col leading-tight">
                <span className="text-[11px] text-white/60">{t.common.hello}{customerName ? `, ${customerName}` : ""}</span>
                <span className="text-[13px] font-semibold">{customerName ? t.common.account : t.common.signIn}</span>
              </span>
            </LocalizedClientLink>
            <WishlistLink className="hidden small:flex" />
            <Suspense fallback={<div className="h-10 w-10" />}>
              <BagLink t={t} />
            </Suspense>
          </nav>
        </div>
        <div className="content-container pb-2.5 small:hidden">
          <SearchBox id="header-search-phone" />
        </div>
      </header>

      {/* Category bar (computers) */}
      <nav className="relative z-40 hidden border-b border-line bg-white small:block" aria-label={t.common.categories}>
        <div className="content-container flex h-12 items-center gap-1 text-[14px] font-medium text-ink">
          <CategoryMenu categories={categories} />
          <span className="mx-2 h-5 w-px bg-line" aria-hidden="true" />
          <ul className="flex min-w-0 items-center gap-1 overflow-hidden">
            {navLinks.map((c) => (
              <li key={c.handle} className="shrink-0">
                <LocalizedClientLink href={`/categories/${c.handle}`} className="flex h-9 items-center rounded-lg px-3 hover:bg-surface">
                  {c.name}
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
          <ul className="ml-auto flex shrink-0 items-center gap-1">
            <li>
              <LocalizedClientLink href="/collections/deals" className="flex h-9 items-center gap-1.5 rounded-lg px-3 font-semibold text-brand-600 hover:bg-brand-50">
                <FlameIcon size={17} />
                {t.header.deals}
              </LocalizedClientLink>
            </li>
            <li className="hidden medium:block">
              <LocalizedClientLink href="/collections/open-box" className="flex h-9 items-center rounded-lg px-3 hover:bg-surface">
                {t.header.openBox}
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink href="/custom-pc" className="flex h-9 items-center rounded-lg px-3 hover:bg-surface">
                {t.header.customPc}
              </LocalizedClientLink>
            </li>
            <li className="hidden large:block">
              <LocalizedClientLink href="/repair" className="flex h-9 items-center rounded-lg px-3 hover:bg-surface">
                {t.header.repair}
              </LocalizedClientLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
