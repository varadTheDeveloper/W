import {
  BoxIcon,
  CpuIcon,
  DesktopIcon,
  GamepadIcon,
  LaptopIcon,
  MouseIcon,
  PrinterIcon,
} from "@modules/common/icons/ui"

const ICONS: Record<string, typeof LaptopIcon> = {
  laptops: LaptopIcon,
  desktops: DesktopIcon,
  "gaming-pcs": GamepadIcon,
  components: CpuIcon,
  monitors: DesktopIcon,
  printers: PrinterIcon,
  accessories: MouseIcon,
}

/** Line icon for a category handle (a box for unknown ones) */
export function CategoryIcon({ handle, size = 20, className }: { handle: string; size?: number; className?: string }) {
  const Icon = ICONS[handle] ?? BoxIcon
  return <Icon size={size} className={className} />
}
