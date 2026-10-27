import { BRAND, directionsUrl, whatsappLink } from "@config/brand"
import { HOURS_TEXT } from "@config/categories"
import { Dictionary, format } from "@lib/i18n"
import { Locale } from "@lib/i18n/config"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@modules/common/icons/ui"
import { LogoLockup } from "../../components/header/logo"
import { NavCategory } from "../../components/header/mobile-menu"

const PAYMENTS = ["UPI", "RuPay", "Visa", "Mastercard", "Net banking", "EMI", "COD"]

export default function Footer({
  t,
  locale,
  categories,
}: {
  t: Dictionary
  locale: Locale
  categories: NavCategory[]
}) {
  const hours = HOURS_TEXT[locale] ?? HOURS_TEXT.en
  const help = [
    { href: "/contact", label: t.footer.contactUs },
    { href: "/account/orders", label: t.footer.trackOrder },
    { href: "/shipping", label: t.footer.shipping },
    { href: "/returns-policy", label: t.footer.returns },
    { href: "/faq", label: t.footer.faq },
  ]
  const company = [
    { href: "/about", label: t.footer.aboutUs },
    { href: "/custom-pc", label: t.footer.customPc },
    { href: "/repair", label: t.footer.repair },
    { href: "/business", label: t.footer.business },
    { href: "/collections/deals", label: t.header.deals },
  ]
  const legal = [
    { href: "/privacy", label: t.footer.privacy },
    { href: "/terms", label: t.footer.terms },
    { href: "/grievance", label: t.footer.grievance },
    { href: "/credits", label: t.credits.title },
  ]

  return (
    <footer className="mt-16 bg-navy-950 pb-20 text-white small:pb-0">
      <div className="h-1 bg-gradient-to-r from-accent-400 via-brand-500 to-accent-400" aria-hidden="true" />
      <div className="content-container grid grid-cols-2 gap-x-6 gap-y-10 py-12 small:grid-cols-[1.4fr_1fr_1fr_1fr] small:py-16">
        <div className="col-span-2 small:col-span-1">
          <LogoLockup />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">{t.footer.about}</p>
          <p className="mt-2 font-heading text-sm font-semibold text-accent-300">{BRAND.tagline[locale]}</p>
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            <li className="flex gap-3">
              <PinIcon size={18} className="mt-0.5 shrink-0 text-accent-400" />
              <a href={directionsUrl} target="_blank" rel="noopener" className="hover:text-white">
                {BRAND.address.line1}, {BRAND.address.line2}, {BRAND.address.city}
              </a>
            </li>
            <li className="flex gap-3">
              <ClockIcon size={18} className="mt-0.5 shrink-0 text-accent-400" />
              {format(t.header.openDaily, hours)}
            </li>
            <li className="flex gap-3">
              <PhoneIcon size={18} className="mt-0.5 shrink-0 text-accent-400" />
              <span className="flex flex-wrap gap-x-3 gap-y-1">
                {BRAND.phones.map((p) => (
                  <a key={p.number} href={`tel:+91${p.number}`} className="tabular hover:text-white">
                    {p.number.slice(0, 5)} {p.number.slice(5)}
                  </a>
                ))}
              </span>
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-2">
            <a href={whatsappLink(t.whatsapp.general)} target="_blank" rel="noopener" aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#25d366] hover:bg-white/20">
              <WhatsAppIcon size={20} />
            </a>
            {BRAND.instagram.map((a) => (
              <a key={a.handle} href={a.url} target="_blank" rel="noopener" aria-label={`Instagram @${a.handle}`} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20">
                <InstagramIcon size={19} />
              </a>
            ))}
            <a href={BRAND.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20">
              <FacebookIcon size={19} />
            </a>
          </div>
        </div>
        <FooterList title={t.footer.shop} links={categories.map((c) => ({ href: `/categories/${c.handle}`, label: c.name }))} />
        <FooterList title={t.footer.help} links={help} />
        <div className="space-y-10">
          <FooterList title={t.footer.company} links={company} />
          <FooterList title={t.footer.legal} links={legal} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="content-container flex flex-col gap-4 py-6 small:flex-row small:items-center small:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-white/50">{t.footer.weAccept}</span>
            {PAYMENTS.map((p) => (
              <span key={p} className="rounded-md bg-white/10 px-2 py-1 text-[11px] font-semibold tracking-wide text-white/85">
                {p}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-xs text-white/50 small:items-end">
            <p>{format(t.footer.rights, { year: new Date().getFullYear(), brand: BRAND.name })}</p>
            <a href={BRAND.sourceCodeUrl} className="hover:text-white" rel="noopener">
              {t.footer.sourceCode}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterList({ title, links }: { title: string; links: { href?: string; label: string }[] }) {
  return (
    <div>
      <p className="mb-4 font-heading text-sm font-semibold text-white">{title}</p>
      <ul className="space-y-2.5 text-sm text-white/65">
        {links.map((l) => (
          <li key={l.label}>
            {l.href ? (
              <LocalizedClientLink href={l.href} className="transition-colors hover:text-accent-300">
                {l.label}
              </LocalizedClientLink>
            ) : (
              <span>{l.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
