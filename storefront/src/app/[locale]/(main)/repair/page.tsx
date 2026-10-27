import { BRAND, directionsUrl } from "@config/brand"
import { HOURS_TEXT } from "@config/categories"
import { format, getDictionary } from "@lib/i18n"
import { toLocale } from "@lib/i18n/config"
import { CheckIcon, PinIcon } from "@modules/common/icons/ui"
import ServiceHero from "@modules/services/service-hero"
import WhatsAppForm from "@modules/services/whatsapp-form"
import { Metadata } from "next"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const t = getDictionary((await props.params).locale)
  return { title: t.pages.repair.title, description: t.pages.repair.intro }
}

export default async function RepairPage(props: Props) {
  const locale = toLocale((await props.params).locale)
  const t = getDictionary(locale)
  const r = t.pages.repair
  const hours = HOURS_TEXT[locale] ?? HOURS_TEXT.en

  return (
    <>
      <ServiceHero t={t} eyebrow={t.header.repair} title={r.title} intro={r.intro} image="/hero/elitebook.webp" />
      <section className="content-container py-8 small:py-10">
        <div className="grid gap-6 large:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="heading-md mb-4">{r.servicesTitle}</h2>
            <ul className="grid gap-2.5 xsmall:grid-cols-2">
              {Object.values(r.items).map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm font-medium">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-400 text-navy-950">
                    <CheckIcon size={14} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a href={directionsUrl} target="_blank" rel="noopener" className="mt-5 flex items-start gap-3 rounded-2xl bg-navy-50 p-4 text-sm text-navy-900 hover:bg-navy-100">
              <PinIcon size={20} className="mt-0.5 shrink-0 text-brand-600" />
              <span>
                <span className="block font-semibold">{format(r.note, hours)}</span>
                {BRAND.address.line1}, {BRAND.address.line2}
              </span>
            </a>
          </div>
          <div className="card p-5 small:p-7">
            <WhatsAppForm
              testId="repair-form"
              template={r.message}
              submit={r.send}
              fields={[
                {
                  name: "device",
                  label: r.device,
                  type: "choice",
                  options: (Object.keys(r.devices) as (keyof typeof r.devices)[]).map((k) => ({ value: k, label: r.devices[k] })),
                },
                { name: "brand", label: r.brand, type: "text", placeholder: "HP 15s, Dell Inspiron…" },
                { name: "problem", label: r.problem, type: "textarea", required: true },
                { name: "name", label: r.name, type: "text", required: true },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  )
}
