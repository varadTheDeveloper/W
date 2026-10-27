import { BRAND } from "@config/brand"
import { Dictionary, format } from "@lib/i18n"
import { productBrand, productCondition, productHighlights, productSpecs, warrantyMonths } from "@lib/util/catalog"
import { warrantyText } from "@lib/util/warranty"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CheckIcon, ChevronDownIcon } from "@modules/common/icons/ui"

function Section({ title, open, children, id }: { title: string; open?: boolean; children: React.ReactNode; id?: string }) {
  return (
    <details open={open} className="group border-b border-line last:border-0" id={id}>
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 font-heading text-[15px] font-semibold small:px-5 [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDownIcon size={18} className="text-muted transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-5 text-sm leading-relaxed text-muted small:px-5">{children}</div>
    </details>
  )
}

/**
 * Key features, specifications (with the first variant's own values; the
 * configuration picker above shows the others), description, warranty and returns.
 */
export default function ProductDetails({ product, t }: { product: HttpTypes.StoreProduct; t: Dictionary }) {
  const highlights = productHighlights(product)
  const specs = productSpecs(product)
  const brand = productBrand(product)
  const condition = productCondition(product)
  const label = (key: string) => (t.specs as Record<string, string>)[key] ?? key

  const rows: [string, string][] = [
    ...(brand ? [[t.product.brand, brand] as [string, string]] : []),
    [t.product.condition, t.conditions[condition]],
    ...specs.map(([k, v]) => [label(k), v] as [string, string]),
    [t.product.warranty, warrantyText(warrantyMonths(product), t)],
  ]

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white" data-testid="product-details">
      {highlights.length > 0 && (
        <Section title={t.product.highlights} open>
          <ul className="grid gap-2 xsmall:grid-cols-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-ink">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-saving text-white">
                  <CheckIcon size={10} strokeWidth={3.5} />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </Section>
      )}
      <Section title={t.product.specifications} open id="specifications">
        <table className="w-full text-[13.5px]">
          <tbody>
            {rows.map(([k, v], i) => (
              <tr key={k} className={i % 2 ? "" : "bg-surface/70"}>
                <th scope="row" className="w-[38%] rounded-l-lg px-3 py-2.5 text-left align-top font-medium text-muted">
                  {k}
                </th>
                <td className="rounded-r-lg px-3 py-2.5 align-top font-medium text-ink">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
      {product.description && (
        <Section title={t.product.description}>
          <p className="whitespace-pre-line text-ink/85">{product.description}</p>
        </Section>
      )}
      <Section title={t.product.returns}>
        <p>{format(t.product.returnsText, { days: BRAND.returnDays })}</p>
        <LocalizedClientLink href="/returns-policy" className="mt-2 inline-block font-medium text-navy-700 underline underline-offset-4" data-testid="returns-policy-link">
          {t.product.returnsPolicy}
        </LocalizedClientLink>
      </Section>
    </div>
  )
}
