"use client"

import { addToCart } from "@lib/data/cart"
import { useI18n } from "@lib/i18n/provider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CartIcon, CheckIcon } from "@modules/common/icons/ui"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

/**
 * Button under a product card: adds a single-variant product straight to the
 * cart; products with options (or sold out) link to the product page instead.
 */
export default function QuickAdd({ variantId, href, soldOut }: { variantId?: string; href: string; soldOut?: boolean }) {
  const { locale, t } = useI18n()
  const router = useRouter()
  const [added, setAdded] = useState(false)
  const [pending, start] = useTransition()
  const base = "flex h-9 w-full items-center justify-center gap-2 rounded-lg text-[13px] font-semibold transition-colors"

  if (!variantId) {
    return (
      <LocalizedClientLink href={href} className={`${base} border border-line text-ink hover:border-navy-900 hover:bg-navy-50`} tabIndex={-1}>
        {soldOut ? t.product.viewDetails : t.product.chooseOptions}
      </LocalizedClientLink>
    )
  }
  if (added) {
    return (
      <LocalizedClientLink href="/cart" prefetch={false} className={`${base} bg-saving text-white`} data-testid="quick-go-to-cart">
        <CheckIcon size={16} />
        {t.product.goToBag}
      </LocalizedClientLink>
    )
  }
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        start(async () => {
          try {
            await addToCart({ variantId, quantity: 1, locale })
            setAdded(true)
          } catch {
            // Stock may have run out: the product page shows the details
            router.push(`/${locale}${href}`)
          }
        })
      }
      className={`${base} bg-accent-400 text-navy-950 hover:bg-accent-300 disabled:opacity-70`}
      data-testid="quick-add"
    >
      <CartIcon size={16} strokeWidth={2} />
      {pending ? t.product.adding : t.product.addToBag}
    </button>
  )
}
