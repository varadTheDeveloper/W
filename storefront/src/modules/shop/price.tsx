import { Dictionary, format } from "@lib/i18n"
import { PriceInfo } from "@lib/util/catalog"
import { formatINR } from "@lib/util/money"

/** ₹46,500  ₹54,999  15% off — selling price, MRP struck through, saving in green. */
export default function Price({
  info,
  t,
  size = "sm",
  from = false,
}: {
  info: PriceInfo
  t: Dictionary
  size?: "sm" | "lg"
  /** Several configurations at different prices: show "From ₹…" */
  from?: boolean
}) {
  const big = size === "lg"
  const amount = formatINR(info.price)
  return (
    <p className={`flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ${big ? "" : "leading-tight"}`} data-testid="product-price" data-amount={info.price}>
      <span className={`font-heading font-bold tabular text-ink ${big ? "text-[1.9rem] leading-none" : "text-[17px]"}`}>
        {from ? format(t.common.from, { price: amount }) : amount}
      </span>
      {info.discountPercent > 0 && (
        <>
          <span className={`tabular text-muted line-through ${big ? "text-base" : "text-[12.5px]"}`}>
            <span className="sr-only">{t.product.mrp} </span>
            {formatINR(info.mrp)}
          </span>
          <span className={`font-semibold text-saving ${big ? "text-base" : "text-[12.5px]"}`}>
            {format(t.product.off, { percent: info.discountPercent })}
          </span>
        </>
      )}
    </p>
  )
}
