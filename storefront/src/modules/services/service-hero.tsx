import { Dictionary } from "@lib/i18n"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRightIcon } from "@modules/common/icons/ui"
import Image from "next/image"

/** Dark banner at the top of the service pages (custom PC, repair, business). */
export default function ServiceHero({
  t,
  title,
  intro,
  image,
  eyebrow,
}: {
  t: Dictionary
  title: string
  intro: string
  image: string
  eyebrow: string
}) {
  return (
    <section className="content-container pt-4 small:pt-6">
      <nav aria-label="Breadcrumb" className="mb-3 text-[13px] text-muted">
        <ol className="flex items-center gap-1">
          <li>
            <LocalizedClientLink href="/" className="hover:text-ink">
              {t.common.home}
            </LocalizedClientLink>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRightIcon size={14} />
            <span aria-current="page" className="text-ink">
              {title}
            </span>
          </li>
        </ol>
      </nav>
      <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-8 text-white small:px-12 small:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute right-[12%] top-[-30%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,200,31,0.28),transparent_65%)]" />
          <div className="absolute bottom-[-40%] right-[35%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(227,38,47,0.3),transparent_65%)]" />
        </div>
        <div className="relative grid items-center gap-6 small:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-accent-400 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.12em] text-navy-950">{eyebrow}</p>
            <h1 className="heading-xl">{title}</h1>
            <p className="mt-3 max-w-xl text-white/75">{intro}</p>
          </div>
          <div className="relative hidden h-56 small:block">
            <Image src={image} alt="" fill sizes="400px" className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)]" priority />
          </div>
        </div>
      </div>
    </section>
  )
}
