import { BRAND } from "@config/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * The shop's emblem, after the one on its signboard: a monitor with a gear.
 * Yellow screen frame, red gear.
 */
export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <rect x="2.5" y="4" width="35" height="24.5" rx="4.5" fill="#ffc81f" />
      <rect x="5.5" y="7" width="29" height="18.5" rx="2.5" fill="#0a1430" />
      <path
        d="M24.97 13.89 L26.96 14.15 L26.96 17.85 L24.97 18.11 L26.23 19.62 L23.62 22.23 L22.03 21.01 L21.85 22.96 L18.15 22.96 L17.89 20.97 L16.38 22.23 L13.77 19.62 L14.99 18.03 L13.04 17.85 L13.04 14.15 L15.03 13.89 L13.77 12.38 L16.38 9.77 L17.97 10.99 L18.15 9.04 L21.85 9.04 L22.11 11.03 L23.62 9.77 L26.23 12.38 Z"
        fill="#e3262f"
      />
      <circle cx="20" cy="16" r="2.4" fill="#0a1430" />
      <path d="M17 28.5h6l1.2 4.5h-8.4z" fill="#ffc81f" />
      <rect x="11" y="33" width="18" height="3" rx="1.5" fill="#ffc81f" />
    </svg>
  )
}

/** Emblem + "COMPUTER WAREHOUSE · JALNA" text logo. `tone` = the background it sits on. */
export function LogoLockup({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  const main = tone === "dark" ? "text-white" : "text-navy-900"
  const top = tone === "dark" ? "text-accent-400" : "text-accent-700"
  return (
    <span className="flex items-center gap-2.5" lang="en">
      <LogoMark size={compact ? 34 : 42} className="shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`flex items-center gap-1.5 font-heading text-[10.5px] font-semibold tracking-[0.28em] ${top} ${compact ? "" : "small:text-[11.5px]"}`}>
          {BRAND.logo.top}
          <span className="rounded-[4px] bg-brand-600 px-1 py-[2px] text-[8.5px] font-bold tracking-[0.16em] text-white">{BRAND.logo.place}</span>
        </span>
        <span className={`mt-1 font-heading text-[19px] font-bold tracking-[0.04em] ${main} ${compact ? "" : "small:text-[22px]"}`}>
          {BRAND.logo.middle}
        </span>
      </span>
    </span>
  )
}

export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <LocalizedClientLink href="/" className="shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-accent-400" data-testid="nav-store-link" aria-label={BRAND.name}>
      <LogoLockup tone={tone} />
    </LocalizedClientLink>
  )
}
