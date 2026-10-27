"use client"

import { whatsappLink } from "@config/brand"
import { useI18n } from "@lib/i18n/provider"
import { WhatsAppIcon } from "@modules/common/icons/ui"
import { usePathname } from "next/navigation"

/** Round WhatsApp button in the corner of every shop page (above the phone bottom bar). */
export default function WhatsAppFloat() {
  const { t } = useI18n()
  const pathname = usePathname()
  // Product pages have their own buy bar and WhatsApp button on phones
  const onProduct = pathname.includes("/products/")

  return (
    <a
      href={whatsappLink(t.whatsapp.general)}
      target="_blank"
      rel="noopener"
      className={`group fixed right-4 z-40 flex items-center gap-2 rounded-full bg-[#25d366] p-3 text-white shadow-lift transition-transform hover:scale-105 small:bottom-6 small:right-6 small:py-3 small:pl-3 small:pr-5 ${
        onProduct ? "bottom-36 hidden small:flex" : "bottom-20 flex"
      } animate-pulse-ring`}
      aria-label={t.common.chatOnWhatsApp}
      data-testid="whatsapp-float"
    >
      <WhatsAppIcon size={28} />
      <span className="hidden text-sm font-semibold small:inline">{t.whatsapp.float}</span>
    </a>
  )
}
