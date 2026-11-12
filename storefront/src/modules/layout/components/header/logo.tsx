import { BRAND } from "@config/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * The shop's app icon: slanted "CW" on a signboard-yellow square. The letters are
 * Poppins Bold drawn as a path, so the icon looks the same everywhere (also the
 * browser-tab icon, src/app/icon.svg).
 */
export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <rect width="48" height="48" rx="12" fill="#ffc81f" />
      <path
        d="M15.17 17.03Q17.61 17.03 19.02 18.32Q20.44 19.6 20.47 21.83H16.8Q16.61 20.97 15.97 20.52Q15.33 20.07 14.37 20.07Q12.83 20.07 11.61 21.14Q10.39 22.22 9.94 24.01Q9.49 25.8 10.18 26.88Q10.87 27.95 12.41 27.95Q13.37 27.95 14.23 27.5Q15.09 27.05 15.71 26.19H19.38Q18.24 28.42 16.19 29.69Q14.13 30.97 11.7 30.97Q9.71 30.97 8.36 30.08Q7.01 29.2 6.53 27.62Q6.04 26.04 6.55 24.01Q7.05 21.98 8.33 20.39Q9.6 18.8 11.39 17.92Q13.18 17.03 15.17 17.03ZM41.71 17.18 34.73 30.87H30.69L30.75 21.86L26.25 30.87H22.21L22.15 17.18H25.72L25.21 27.15L30.13 17.18H33.79L33.65 27.15L38.12 17.18Z"
        fill="#0a1430"
      />
    </svg>
  )
}

/** Square icon + slanted "Computer Warehouse" with "Jalna Multi-brand +" under it. `tone` = the background it sits on. */
export function LogoLockup({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  const dark = tone === "dark"
  const extra = dark ? "text-accent-400" : "text-brand-600"
  return (
    <span className="flex items-center gap-2 small:gap-2.5" lang="en">
      <LogoMark size={36} className={`shrink-0 ${compact ? "" : "small:h-[42px] small:w-[42px]"}`} />
      <span className="flex flex-col italic leading-none">
        <span
          className={`whitespace-nowrap font-heading font-bold tracking-[-0.02em] ${dark ? "text-white" : "text-navy-900"} ${compact ? "text-[17px]" : "text-[16px] min-[360px]:text-[18px] small:text-[22px]"}`}
        >
          {BRAND.logo.name}
        </span>
        <span className={`mt-1 flex items-center gap-1 text-[10.5px] min-[360px]:text-[11px] font-semibold ${dark ? "text-navy-100" : "text-muted"} ${compact ? "" : "small:text-xs"}`}>
          {BRAND.logo.place}
          <span className={extra}>{BRAND.logo.extra}</span>
          <svg width="9" height="9" viewBox="0 0 12 12" aria-hidden="true" className={extra}>
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
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
