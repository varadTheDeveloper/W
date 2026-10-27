import { listProductsFor } from "@lib/data/catalog"
import { getDictionary } from "@lib/i18n"
import { toLocale } from "@lib/i18n/config"
import { inCategory, sortProducts } from "@lib/util/catalog"
import ServiceHero from "@modules/services/service-hero"
import WhatsAppForm from "@modules/services/whatsapp-form"
import ProductRail from "@modules/shop/product-rail"
import { Metadata } from "next"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const t = getDictionary((await props.params).locale)
  return { title: t.pages.customPc.title, description: t.pages.customPc.intro }
}

const BUDGETS = ["₹25,000 – ₹40,000", "₹40,000 – ₹60,000", "₹60,000 – ₹90,000", "₹90,000 – ₹1,50,000", "₹1,50,000+"]

export default async function CustomPcPage(props: Props) {
  const locale = toLocale((await props.params).locale)
  const t = getDictionary(locale)
  const c = t.pages.customPc
  const builds = sortProducts((await listProductsFor(locale).catch(() => [])).filter((p) => inCategory(p, ["gaming-pcs"])), "popular")
  const steps = [c.steps.share, c.steps.quote, c.steps.build, c.steps.deliver]

  return (
    <>
      <ServiceHero t={t} eyebrow={t.header.customPc} title={c.title} intro={c.intro} image="/hero/pc-gaming.webp" />
      <section className="content-container py-8 small:py-10">
        <div className="grid gap-6 large:grid-cols-[1fr_1.1fr]">
          <ol className="grid content-start gap-3 xsmall:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-white p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-400 font-heading text-lg font-bold text-navy-950">{i + 1}</span>
                <p className="mt-3 font-heading font-semibold">{s.title}</p>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="card p-5 small:p-7">
            <WhatsAppForm
              testId="custom-pc-form"
              template={c.message}
              submit={c.send}
              fields={[
                { name: "budget", label: c.budget, type: "choice", options: BUDGETS.map((b) => ({ value: b, label: b })) },
                {
                  name: "use",
                  label: c.use,
                  type: "choice",
                  multiple: true,
                  options: (Object.keys(c.uses) as (keyof typeof c.uses)[]).map((k) => ({ value: k, label: c.uses[k] })),
                },
                {
                  name: "platform",
                  label: c.platform,
                  type: "choice",
                  options: (Object.keys(c.platforms) as (keyof typeof c.platforms)[]).map((k) => ({ value: k, label: c.platforms[k] })),
                },
                { name: "setup", label: c.monitor, type: "choice", options: [{ value: "yes", label: c.yes }, { value: "no", label: c.no }] },
                { name: "notes", label: c.notes, type: "textarea" },
                { name: "name", label: c.name, type: "text", required: true },
                { name: "city", label: c.city, type: "text" },
              ]}
            />
          </div>
        </div>
      </section>
      <ProductRail title={c.examplesTitle} href="/categories/gaming-pcs" products={builds} locale={locale} t={t} />
    </>
  )
}
