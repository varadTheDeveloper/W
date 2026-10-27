"use client"

import { BRAND, whatsappLink } from "@config/brand"
import { CATEGORY_IMAGES } from "@config/categories"
import { LOCALES, LOCALE_NAMES } from "@lib/i18n/config"
import { useI18n } from "@lib/i18n/provider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  ChevronDownIcon,
  CloseIcon,
  FlameIcon,
  MenuIcon,
  PhoneIcon,
  WhatsAppIcon,
  WrenchIcon,
  BoxIcon,
  BuildingIcon,
  CpuIcon,
} from "@modules/common/icons/ui"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { CategoryIcon } from "./category-icon"
import { useLocaleHref } from "./language-switcher"
import { LogoLockup } from "./logo"

export type NavCategory = {
  handle: string
  name: string
  children: { handle: string; name: string }[]
}

/** Slide-in menu for phones: categories with pictures, shop links, contact and language. */
export default function MobileMenu({ categories }: { categories: NavCategory[] }) {
  const { locale, t } = useI18n()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const pathname = usePathname()
  const hrefFor = useLocaleHref()

  // Close when the page changes
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const quick = [
    { href: "/collections/deals", label: t.header.deals, icon: FlameIcon, tone: "text-brand-600 bg-brand-50" },
    { href: "/collections/open-box", label: t.header.openBox, icon: BoxIcon, tone: "text-navy-700 bg-navy-50" },
    { href: "/custom-pc", label: t.header.customPc, icon: CpuIcon, tone: "text-navy-700 bg-navy-50" },
    { href: "/repair", label: t.header.repair, icon: WrenchIcon, tone: "text-navy-700 bg-navy-50" },
    { href: "/business", label: t.header.business, icon: BuildingIcon, tone: "text-navy-700 bg-navy-50" },
  ]

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="-ml-1.5 flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/10 small:hidden"
        aria-label={t.common.menu}
        aria-expanded={open}
        data-testid="mobile-menu-button"
      >
        <MenuIcon />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] small:hidden" role="dialog" aria-modal="true" aria-label={t.common.menu}>
          <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
          <nav className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm animate-fade-in-right flex-col overflow-y-auto bg-white text-ink shadow-xl">
            <div className="flex h-16 shrink-0 items-center justify-between bg-navy-900 px-4">
              <LogoLockup compact />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white hover:bg-white/10"
                aria-label={t.common.close}
              >
                <CloseIcon />
              </button>
            </div>

            <ul className="grid grid-cols-2 gap-2 p-3">
              {quick.map(({ href, label, icon: Icon, tone }) => (
                <li key={href}>
                  <LocalizedClientLink href={href} className="flex h-12 items-center gap-2 rounded-xl border border-line px-3 text-[13px] font-semibold">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${tone}`}>
                      <Icon size={16} />
                    </span>
                    <span className="leading-tight">{label}</span>
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>

            <p className="eyebrow px-4 pb-1 pt-2">{t.common.categories}</p>
            <ul className="flex-1 px-2 pb-2">
              {categories.map((cat) => {
                const isOpen = expanded === cat.handle
                return (
                  <li key={cat.handle} className="border-b border-line/70 last:border-0">
                    <div className="flex items-center">
                      <LocalizedClientLink href={`/categories/${cat.handle}`} className="flex flex-1 items-center gap-3 px-2 py-3 text-[15px] font-medium">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-navy-700">
                          <CategoryIcon handle={cat.handle} size={19} />
                        </span>
                        {cat.name}
                      </LocalizedClientLink>
                      {cat.children.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : cat.handle)}
                          aria-expanded={isOpen}
                          aria-label={cat.name}
                          className="flex h-11 w-11 items-center justify-center rounded-xl text-muted hover:bg-surface"
                        >
                          <ChevronDownIcon size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    {isOpen && (
                      <ul className="grid grid-cols-3 gap-2 px-2 pb-3">
                        {cat.children.map((child) => (
                          <li key={child.handle}>
                            <LocalizedClientLink
                              href={`/categories/${child.handle}`}
                              className="flex h-full flex-col items-center gap-1.5 rounded-xl border border-line p-2 text-center text-[12px] font-medium leading-tight"
                            >
                              <span className="relative h-12 w-full">
                                {CATEGORY_IMAGES[child.handle] && (
                                  <Image src={CATEGORY_IMAGES[child.handle]} alt="" fill sizes="90px" className="object-contain" />
                                )}
                              </span>
                              {child.name}
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="space-y-3 border-t border-line bg-surface/70 p-4">
              <div className="grid grid-cols-2 gap-2">
                <a href={whatsappLink(t.whatsapp.general)} target="_blank" rel="noopener" className="btn-whatsapp h-11 rounded-xl px-3 text-sm">
                  <WhatsAppIcon size={18} />
                  {t.common.whatsapp}
                </a>
                <a href={`tel:+91${BRAND.phones[0].number}`} className="btn-outline h-11 px-3 text-sm">
                  <PhoneIcon size={17} />
                  {t.common.call}
                </a>
              </div>
              <div>
                <p className="mb-2 text-sm text-muted">{t.common.language}</p>
                <div className="flex gap-2">
                  {LOCALES.map((code) => (
                    <Link key={code} href={hrefFor(code)} lang={code} className={`chip h-10 flex-1 ${code === locale ? "chip-active" : ""}`}>
                      {LOCALE_NAMES[code]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
