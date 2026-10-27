import { retrieveCart } from "@lib/data/cart"
import { Dictionary } from "@lib/i18n"
import { CartIcon } from "@modules/common/icons/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export async function bagCount(): Promise<number> {
  const cart = await retrieveCart().catch(() => null)
  return cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0
}

export default async function BagLink({ t }: { t: Dictionary }) {
  const count = await bagCount()
  return (
    <LocalizedClientLink
      href="/cart"
      prefetch={false}
      className="relative flex h-10 items-center gap-2 rounded-xl px-2 hover:bg-white/10 small:px-2.5"
      data-testid="nav-cart-link"
      aria-label={`${t.common.bag} (${count})`}
    >
      <span className="relative">
        <CartIcon size={26} />
        {count > 0 && (
          <span
            className="absolute -right-2 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent-400 px-1 text-[11px] font-bold text-navy-950 ring-2 ring-navy-900"
            data-testid="bag-count"
          >
            {count}
          </span>
        )}
      </span>
      <span className="hidden text-[13px] font-semibold small:inline">{t.common.bag}</span>
    </LocalizedClientLink>
  )
}
