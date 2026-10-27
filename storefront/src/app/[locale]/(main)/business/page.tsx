import { getDictionary } from "@lib/i18n"
import { toLocale } from "@lib/i18n/config"
import { BuildingIcon, HeadsetIcon, ReceiptIcon, WrenchIcon } from "@modules/common/icons/ui"
import ServiceHero from "@modules/services/service-hero"
import WhatsAppForm from "@modules/services/whatsapp-form"
import { Metadata } from "next"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const t = getDictionary((await props.params).locale)
  return { title: t.pages.business.title, description: t.pages.business.intro }
}

export default async function BusinessPage(props: Props) {
  const locale = toLocale((await props.params).locale)
  const t = getDictionary(locale)
  const b = t.pages.business
  const points = [
    { icon: BuildingIcon, ...b.points.bulk },
    { icon: ReceiptIcon, ...b.points.gst },
    { icon: WrenchIcon, ...b.points.install },
    { icon: HeadsetIcon, ...b.points.support },
  ]

  return (
    <>
      <ServiceHero t={t} eyebrow={t.header.business} title={b.title} intro={b.intro} image="/hero/setup-trading.webp" />
      <section className="content-container py-8 small:py-10">
        <div className="grid gap-6 large:grid-cols-[1fr_1.1fr]">
          <div>
            <ul className="grid gap-3 xsmall:grid-cols-2">
              {points.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl border border-line bg-white p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-900 text-accent-400">
                    <Icon size={22} />
                  </span>
                  <p className="mt-3 font-heading font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-muted">{text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-2xl bg-accent-100 p-4 text-sm font-medium text-navy-900">{b.recent}</p>
          </div>
          <div className="card p-5 small:p-7">
            <WhatsAppForm
              testId="business-form"
              template={b.message}
              submit={b.send}
              fields={[
                { name: "org", label: b.org, type: "text", required: true },
                { name: "need", label: b.need, type: "textarea", required: true },
                { name: "quantity", label: b.quantity, type: "text" },
                { name: "city", label: b.city, type: "text" },
                { name: "name", label: b.name, type: "text", required: true },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  )
}
