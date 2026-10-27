/**
 * Pictures for category tiles and menus (files in public/products), by category
 * handle. Category names come from the backend in the visitor's language.
 * A category without a picture here shows its first product's photo.
 */
export const CATEGORY_IMAGES: Record<string, string> = {
  laptops: "/products/hp-pavilion-14.jpg",
  "gaming-laptops": "/products/msi-thin-gf63.jpg",
  "everyday-laptops": "/products/hp-15s.jpg",
  "business-laptops": "/products/hp-elitebook-840.jpg",
  macbooks: "/products/apple-macbook-air-13.jpg",
  desktops: "/products/pc-gaming-amd.jpg",
  "gaming-pcs": "/products/pc-gaming-intel.jpg",
  "complete-setups": "/products/setup-office.jpg",
  "mini-pcs": "/products/apple-mac-mini.jpg",
  components: "/products/rtx-5060.jpg",
  processors: "/products/amd-ryzen-7-7700x.jpg",
  "graphics-cards": "/products/msi-rtx-5060-ti.jpg",
  motherboards: "/products/msi-b550m-pro-vdh-wifi.jpg",
  "power-supplies": "/products/msi-mag-a650bn.jpg",
  cabinets: "/products/msi-mag-forge-100r.jpg",
  monitors: "/products/msi-g274f.jpg",
  "gaming-monitors": "/products/msi-g244f.jpg",
  "office-monitors": "/products/msi-pro-mp241x.jpg",
  printers: "/products/canon-pixma-g3012.jpg",
  "ink-tank-printers": "/products/hp-smart-tank-580.jpg",
  "laser-printers": "/products/canon-lbp122dw.jpg",
  accessories: "/products/zebronics-keyboard-mouse.jpg",
  "keyboards-mice": "/products/hp-wireless-mouse.jpg",
}

/** Tiles on the home page, in this order (handles of categories) */
export const HOME_CATEGORY_TILES = [
  "laptops",
  "gaming-pcs",
  "complete-setups",
  "monitors",
  "printers",
  "processors",
  "graphics-cards",
  "motherboards",
  "cabinets",
  "accessories",
]

/** Links in the bar under the header, after the category menu */
export const NAV_CATEGORIES = ["laptops", "gaming-pcs", "complete-setups", "monitors", "printers", "components"]

/** Opening hours as shown in each language */
export const HOURS_TEXT: Record<string, { from: string; to: string }> = {
  en: { from: "9 am", to: "10:30 pm" },
  mr: { from: "सकाळी 9", to: "रात्री 10:30" },
  hi: { from: "सुबह 9", to: "रात 10:30" },
}
