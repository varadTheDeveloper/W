// Small line icons used across the shop (24px grid, inherit text colour).
type IconProps = React.SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 24, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export const SearchIcon = (p: IconProps) => (
  <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>
)
export const UserIcon = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></Icon>
)
export const HeartIcon = (p: IconProps) => (
  <Icon {...p}><path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-4 5 5 0 0 1 9 4c-2 4.6-9 9-9 9Z" /></Icon>
)
export const BagIcon = (p: IconProps) => (
  <Icon {...p}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></Icon>
)
export const MenuIcon = (p: IconProps) => (
  <Icon {...p}><path d="M4 6h16M4 12h16M4 18h16" /></Icon>
)
export const HomeIcon = (p: IconProps) => (
  <Icon {...p}><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10" /></Icon>
)
export const GridIcon = (p: IconProps) => (
  <Icon {...p}><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></Icon>
)
export const CloseIcon = (p: IconProps) => (
  <Icon {...p}><path d="M6 6l12 12M18 6 6 18" /></Icon>
)
export const ChevronRightIcon = (p: IconProps) => (
  <Icon {...p}><path d="m9 6 6 6-6 6" /></Icon>
)
export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}><path d="m6 9 6 6 6-6" /></Icon>
)
export const TruckIcon = (p: IconProps) => (
  <Icon {...p}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></Icon>
)
export const ReturnIcon = (p: IconProps) => (
  <Icon {...p}><path d="M4 10h11a5 5 0 0 1 0 10H8" /><path d="m8 6-4 4 4 4" /></Icon>
)
export const ShieldIcon = (p: IconProps) => (
  <Icon {...p}><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></Icon>
)
export const CashIcon = (p: IconProps) => (
  <Icon {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 9v.01M18 15v.01" /></Icon>
)
export const BadgeIcon = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" /></Icon>
)
export const FilterIcon = (p: IconProps) => (
  <Icon {...p}><path d="M4 6h16M7 12h10M10 18h4" /></Icon>
)
export const SortIcon = (p: IconProps) => (
  <Icon {...p}><path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4" /></Icon>
)
export const CheckIcon = (p: IconProps) => (
  <Icon {...p}><path d="m5 12 5 5 9-10" /></Icon>
)
export const RulerIcon = (p: IconProps) => (
  <Icon {...p}><rect x="2" y="8" width="20" height="8" rx="1.5" /><path d="M6 8v3M10 8v4M14 8v3M18 8v4" /></Icon>
)
export const PinIcon = (p: IconProps) => (
  <Icon {...p}><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" /><circle cx="12" cy="9" r="2.5" /></Icon>
)
export const GlobeIcon = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></Icon>
)
export const CartIcon = (p: IconProps) => (
  <Icon {...p}><path d="M3 4h2.2l2.2 11h10.8l2-8H6.3" /><circle cx="9" cy="19.5" r="1.5" /><circle cx="17" cy="19.5" r="1.5" /></Icon>
)
export const PhoneIcon = (p: IconProps) => (
  <Icon {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></Icon>
)
export const ClockIcon = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>
)
export const StarIcon = (p: IconProps) => (
  <Icon {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" /></Icon>
)
export const LaptopIcon = (p: IconProps) => (
  <Icon {...p}><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19h20" /></Icon>
)
export const DesktopIcon = (p: IconProps) => (
  <Icon {...p}><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M9 20h6M12 16v4" /></Icon>
)
export const CpuIcon = (p: IconProps) => (
  <Icon {...p}><rect x="6" y="6" width="12" height="12" rx="1.5" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></Icon>
)
export const PrinterIcon = (p: IconProps) => (
  <Icon {...p}><path d="M7 9V3h10v6" /><rect x="3" y="9" width="18" height="8" rx="1.5" /><path d="M7 14h10v7H7z" /></Icon>
)
export const MouseIcon = (p: IconProps) => (
  <Icon {...p}><rect x="6" y="3" width="12" height="18" rx="6" /><path d="M12 7v4" /></Icon>
)
export const GamepadIcon = (p: IconProps) => (
  <Icon {...p}><path d="M7 8h10a4 4 0 0 1 4 4l-.6 4.2a2.4 2.4 0 0 1-4.3 1L15 16H9l-1.1 1.2a2.4 2.4 0 0 1-4.3-1L3 12a4 4 0 0 1 4-4Z" /><path d="M8 11v3M6.5 12.5h3" /><circle cx="16" cy="12" r=".6" fill="currentColor" /></Icon>
)
export const WrenchIcon = (p: IconProps) => (
  <Icon {...p}><path d="M15.5 3.5a5 5 0 0 0-5 6.6L3.9 16.7a2.1 2.1 0 0 0 3 3l6.6-6.6a5 5 0 0 0 6.6-5.6l-3 3-2.6-.6-.6-2.6 3-3a5 5 0 0 0-1.4-.2Z" /></Icon>
)
export const BuildingIcon = (p: IconProps) => (
  <Icon {...p}><path d="M4 21V5l8-2v18M12 8h8v13M8 8h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01M2 21h20" /></Icon>
)
export const CameraIcon = (p: IconProps) => (
  <Icon {...p}><path d="M3 7h12l3 3v4l-3 3H3z" /><circle cx="9" cy="12" r="2.5" /><path d="M18 10.5 21 9v6l-3-1.5" /></Icon>
)
export const ReceiptIcon = (p: IconProps) => (
  <Icon {...p}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2Z" /><path d="M9 8h6M9 12h6M9 16h3" /></Icon>
)
export const CardIcon = (p: IconProps) => (
  <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h3" /></Icon>
)
export const BoxIcon = (p: IconProps) => (
  <Icon {...p}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></Icon>
)
export const StoreIcon = (p: IconProps) => (
  <Icon {...p}><path d="M4 9.5V20h16V9.5M3 5h18l-1 4.5a2.5 2.5 0 0 1-4.7.5 2.5 2.5 0 0 1-4.6 0 2.5 2.5 0 0 1-4.6 0A2.5 2.5 0 0 1 4 9.5Z" /><path d="M10 20v-5h4v5" /></Icon>
)
export const SparkIcon = (p: IconProps) => (
  <Icon {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></Icon>
)
export const FlameIcon = (p: IconProps) => (
  <Icon {...p}><path d="M12 21a6 6 0 0 0 6-6c0-4-3-6-3.5-9.5C12 7 10 9.5 10.5 12 9 11.5 8 10 8 8.5 6.7 10 6 12 6 15a6 6 0 0 0 6 6Z" /></Icon>
)
export const HeadsetIcon = (p: IconProps) => (
  <Icon {...p}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /><path d="M19 20a3 3 0 0 1-3 2h-3" /></Icon>
)
export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
)
export const ChevronLeftIcon = (p: IconProps) => (
  <Icon {...p}><path d="m15 6-6 6 6 6" /></Icon>
)
export const GiftIcon = (p: IconProps) => (
  <Icon {...p}><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v9h14v-9M12 8v13M12 8S10.5 3 8 4.5 9.5 8 12 8Zm0 0s1.5-5 4-3.5S14.5 8 12 8Z" /></Icon>
)
export const BoltIcon = (p: IconProps) => (
  <Icon {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7Z" /></Icon>
)
export const InstagramIcon = (p: IconProps) => (
  <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></Icon>
)
export const FacebookIcon = (p: IconProps) => (
  <Icon {...p}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z" /></Icon>
)
export const PlusIcon = (p: IconProps) => (
  <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>
)
export const MinusIcon = (p: IconProps) => (
  <Icon {...p}><path d="M5 12h14" /></Icon>
)
export const PauseIcon = (p: IconProps) => (
  <Icon {...p}><path d="M9 6v12M15 6v12" /></Icon>
)
export const PlayIcon = (p: IconProps) => (
  <Icon {...p}><path d="M8 5v14l11-7Z" /></Icon>
)

/** WhatsApp logo (filled, brand shape) */
export const WhatsAppIcon = ({ size = 24, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...p}>
    <path
      fill="currentColor"
      d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.2-1.4A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.2 8.2 0 1 1 7 3.9Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.4-.3Z"
    />
  </svg>
)
