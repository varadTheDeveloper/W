/**
 * Demo catalogue used by `yarn seed`: Computer Warehouse Jalna.
 *
 * Products come from the shop's Instagram and Google listing (research in
 * varadTheDeveloper/C, branch research-data). Photos are official brand photos
 * (storefront/public/products, sources in storefront/public/products/SOURCES.md);
 * "setup-*" and "pc-*" pictures are representative images made from those photos.
 *
 * PRICES ARE DEMO PRICES. `priceSource: "instagram"` means the selling price was
 * read from one of the shop's own Instagram posts (festival offers); everything
 * else is an estimate. MRPs are estimates. The shop must confirm every price
 * before launch (change them in the admin panel or with a price list import).
 *
 * Base text (stored on the product) is English (en-IN). Hindi (hi-IN) and
 * Marathi (mr-IN) go into Medusa's translation module. Model names and
 * technical specs stay in English, as on every Indian electronics shop.
 * The Hindi/Marathi wording should be checked by a native speaker.
 *
 * Prices are in rupees. `mrp` is the base price; `price` is the selling
 * price, applied through a price list so the shop can show MRP and % off.
 */

export type Locale = "hi-IN" | "mr-IN"

export type Text = { en: string; hi: string; mr: string }

export type CategoryDef = {
  handle: string
  parent?: string
  name: Text
  rank: number
}

export type Condition = "new" | "open-box" | "refurbished"

/** Spec keys are translated on the storefront (dictionary `specs`); values stay in English. */
export type Specs = Partial<
  Record<
    | "processor"
    | "graphics"
    | "ram"
    | "storage"
    | "display"
    | "os"
    | "motherboard"
    | "power"
    | "cabinet"
    | "cooling"
    | "monitor"
    | "keyboardMouse"
    | "connectivity"
    | "ports"
    | "cores"
    | "socket"
    | "memory"
    | "formFactor"
    | "refreshRate"
    | "panel"
    | "resolution"
    | "screenSize"
    | "printType"
    | "functions"
    | "efficiency"
    | "wattage"
    | "chipset"
    | "weight"
    | "inBox",
    string
  >
>

export type VariantDef = {
  /** Option value shown on the product page, e.g. "i5 · 16GB · 512GB" */
  name: string
  mrp: number
  price: number
  stock: number
  /** Specs that differ from the product's own */
  specs?: Specs
}

export type ProductDef = {
  handle: string
  categories: string[]
  collections?: string[]
  /** Small tag on product cards */
  badge?: "bestseller" | "new" | "hot"
  brand: string
  condition: Condition
  /** 0 = no warranty */
  warrantyMonths: number
  /** File names in storefront/public/products; the first is the main photo */
  images: string[]
  /** True when the photo shows a similar item, not the exact one (shown as a note) */
  representative?: boolean
  title: Text
  description: Text
  /** Short key points for cards and the top of the product page */
  highlights: string[]
  specs: Specs
  /** Option title when there are several variants */
  option?: string
  variants: VariantDef[]
  /** Grams, for courier bookings */
  weight: number
  /** HSN code for the GST invoice (confirm with the accountant) */
  hsn: string
  priceSource: "instagram" | "demo"
  /** Link to the Instagram post the price or product came from */
  sourcePost?: string
}

export const LOCALES = [
  { code: "en-IN", name: "English (India)" },
  { code: "hi-IN", name: "Hindi (India)" },
  { code: "mr-IN", name: "Marathi (India)" },
]

/** Same text in every language (model names) */
const same = (s: string): Text => ({ en: s, hi: s, mr: s })

const IG = "https://www.instagram.com/computer_warehouse_jalna/reel/"

// HSN codes (GST 18%): computers 8471, parts 8473, monitors 8528, printers 8443
const HSN = { computer: "8471", part: "8473", monitor: "8528", printer: "8443" }

export const CATEGORIES: CategoryDef[] = [
  { handle: "laptops", name: { en: "Laptops", hi: "लैपटॉप", mr: "लॅपटॉप" }, rank: 0 },
  { handle: "desktops", name: { en: "Desktops & PCs", hi: "डेस्कटॉप और पीसी", mr: "डेस्कटॉप आणि पीसी" }, rank: 1 },
  { handle: "components", name: { en: "PC Components", hi: "पीसी पार्ट्स", mr: "पीसी पार्ट्स" }, rank: 2 },
  { handle: "monitors", name: { en: "Monitors", hi: "मॉनिटर", mr: "मॉनिटर" }, rank: 3 },
  { handle: "printers", name: { en: "Printers", hi: "प्रिंटर", mr: "प्रिंटर" }, rank: 4 },
  { handle: "accessories", name: { en: "Accessories", hi: "एक्सेसरीज़", mr: "ॲक्सेसरीज" }, rank: 5 },

  { handle: "gaming-laptops", parent: "laptops", name: { en: "Gaming laptops", hi: "गेमिंग लैपटॉप", mr: "गेमिंग लॅपटॉप" }, rank: 0 },
  { handle: "everyday-laptops", parent: "laptops", name: { en: "Everyday laptops", hi: "रोज़मर्रा के लैपटॉप", mr: "रोजच्या वापराचे लॅपटॉप" }, rank: 1 },
  { handle: "business-laptops", parent: "laptops", name: { en: "Business laptops", hi: "बिज़नेस लैपटॉप", mr: "बिझनेस लॅपटॉप" }, rank: 2 },
  { handle: "macbooks", parent: "laptops", name: same("Apple MacBook"), rank: 3 },

  { handle: "gaming-pcs", parent: "desktops", name: { en: "Gaming PCs", hi: "गेमिंग पीसी", mr: "गेमिंग पीसी" }, rank: 0 },
  { handle: "complete-setups", parent: "desktops", name: { en: "Complete PC setups", hi: "पूरा कंप्यूटर सेटअप", mr: "संपूर्ण कॉम्प्युटर सेटअप" }, rank: 1 },
  { handle: "mini-pcs", parent: "desktops", name: { en: "Mini PCs", hi: "मिनी पीसी", mr: "मिनी पीसी" }, rank: 2 },

  { handle: "processors", parent: "components", name: { en: "Processors", hi: "प्रोसेसर", mr: "प्रोसेसर" }, rank: 0 },
  { handle: "graphics-cards", parent: "components", name: { en: "Graphics cards", hi: "ग्राफ़िक्स कार्ड", mr: "ग्राफिक्स कार्ड" }, rank: 1 },
  { handle: "motherboards", parent: "components", name: { en: "Motherboards", hi: "मदरबोर्ड", mr: "मदरबोर्ड" }, rank: 2 },
  { handle: "power-supplies", parent: "components", name: { en: "Power supplies (SMPS)", hi: "पावर सप्लाई (SMPS)", mr: "पॉवर सप्लाय (SMPS)" }, rank: 3 },
  { handle: "cabinets", parent: "components", name: { en: "Cabinets", hi: "कैबिनेट", mr: "कॅबिनेट" }, rank: 4 },

  { handle: "gaming-monitors", parent: "monitors", name: { en: "Gaming monitors", hi: "गेमिंग मॉनिटर", mr: "गेमिंग मॉनिटर" }, rank: 0 },
  { handle: "office-monitors", parent: "monitors", name: { en: "Home & office monitors", hi: "घर और ऑफ़िस मॉनिटर", mr: "घर आणि ऑफिस मॉनिटर" }, rank: 1 },

  { handle: "ink-tank-printers", parent: "printers", name: { en: "Ink tank printers", hi: "इंक टैंक प्रिंटर", mr: "इंक टँक प्रिंटर" }, rank: 0 },
  { handle: "laser-printers", parent: "printers", name: { en: "Laser printers", hi: "लेज़र प्रिंटर", mr: "लेझर प्रिंटर" }, rank: 1 },

  { handle: "keyboards-mice", parent: "accessories", name: { en: "Keyboards & mice", hi: "कीबोर्ड और माउस", mr: "कीबोर्ड आणि माउस" }, rank: 0 },
]

export const COLLECTIONS: { handle: string; title: Text }[] = [
  { handle: "deals", title: { en: "Deals of the day", hi: "आज की डील", mr: "आजच्या डील्स" } },
  { handle: "bestsellers", title: { en: "Best sellers", hi: "सबसे ज़्यादा बिकने वाले", mr: "सर्वाधिक विक्री" } },
  { handle: "diwali", title: { en: "Diwali offers", hi: "दिवाली ऑफ़र", mr: "दिवाळी ऑफर्स" } },
  { handle: "open-box", title: { en: "Open box & refurbished", hi: "ओपन बॉक्स और रिफ़र्बिश्ड", mr: "ओपन बॉक्स आणि रिफर्बिश्ड" } },
  { handle: "new-arrivals", title: { en: "New arrivals", hi: "नए प्रोडक्ट", mr: "नवीन प्रॉडक्ट्स" } },
]

export const PRODUCTS: ProductDef[] = [
  // ---------- Gaming PCs (the shop's own builds) ----------
  {
    handle: "ryzen-5-5600gt-gaming-pc",
    categories: ["gaming-pcs"],
    collections: ["deals", "bestsellers", "diwali"],
    badge: "bestseller",
    brand: "Computer Warehouse",
    condition: "new",
    warrantyMonths: 36,
    images: ["pc-gaming-amd.jpg", "amd-ryzen-5.jpg", "msi-b550m-pro-vdh-wifi.jpg", "msi-mag-forge-100r.jpg"],
    representative: true,
    title: {
      en: "Ryzen 5 5600GT Gaming & Performance PC",
      hi: "Ryzen 5 5600GT गेमिंग और परफ़ॉर्मेंस पीसी",
      mr: "Ryzen 5 5600GT गेमिंग आणि परफॉर्मन्स पीसी",
    },
    description: {
      en: "Our Navratri bestseller. A fast, quiet PC for gaming, editing and everyday work, built and tested in our Jalna shop. Wi-Fi 6 built in, so no extra cables.",
      hi: "हमारा नवरात्रि बेस्टसेलर। गेमिंग, एडिटिंग और रोज़ के काम के लिए तेज़ और शांत पीसी, हमारी जालना शॉप में बनाया और टेस्ट किया गया। Wi-Fi 6 पहले से लगा है।",
      mr: "आमचा नवरात्री बेस्टसेलर. गेमिंग, एडिटिंग आणि रोजच्या कामासाठी वेगवान आणि शांत पीसी, आमच्या जालना शॉपमध्ये बनवून टेस्ट केलेला. Wi-Fi 6 आधीच दिलेले.",
    },
    highlights: ["Ryzen 5 5600GT", "16GB RAM", "512GB NVMe", "Wi-Fi 6"],
    specs: {
      processor: "AMD Ryzen 5 5600GT (6 cores, 12 threads)",
      graphics: "AMD Radeon graphics (built in)",
      motherboard: "MSI B550 Wi-Fi 6",
      ram: "16GB DDR4",
      storage: "512GB NVMe SSD",
      power: "500W SMPS",
      cabinet: "RGB gaming cabinet",
      os: "Windows 11 (trial) – ask for licensed",
    },
    variants: [{ name: "Standard", mrp: 54999, price: 46500, stock: 6 }],
    weight: 9000,
    hsn: HSN.computer,
    priceSource: "instagram",
    sourcePost: `${IG}Dea7rDXzfbH/`,
  },
  {
    handle: "ryzen-7-5700x-gaming-pc",
    categories: ["gaming-pcs"],
    collections: ["bestsellers"],
    brand: "Computer Warehouse",
    condition: "new",
    warrantyMonths: 36,
    images: ["pc-gaming-amd-r7.jpg", "amd-ryzen-7.jpg", "msi-mag-forge-100r.jpg"],
    representative: true,
    title: {
      en: "Ryzen 7 5700X Gaming & Editing PC",
      hi: "Ryzen 7 5700X गेमिंग और एडिटिंग पीसी",
      mr: "Ryzen 7 5700X गेमिंग आणि एडिटिंग पीसी",
    },
    description: {
      en: "8 cores for smooth video editing, streaming and gaming. RGB memory and a Wi-Fi motherboard. Built and tested in our shop.",
      hi: "वीडियो एडिटिंग, स्ट्रीमिंग और गेमिंग के लिए 8 कोर। RGB रैम और Wi-Fi मदरबोर्ड। हमारी शॉप में बनाया और टेस्ट किया गया।",
      mr: "व्हिडिओ एडिटिंग, स्ट्रीमिंग आणि गेमिंगसाठी 8 कोर. RGB रॅम आणि Wi-Fi मदरबोर्ड. आमच्या शॉपमध्ये बनवून टेस्ट केलेला.",
    },
    highlights: ["Ryzen 7 5700X", "16GB RGB RAM", "512GB NVMe", "4GB graphics"],
    specs: {
      processor: "AMD Ryzen 7 5700X (8 cores, 16 threads)",
      graphics: "4GB graphics card",
      motherboard: "Wi-Fi motherboard",
      ram: "16GB HP RGB DDR4",
      storage: "512GB NVMe SSD",
      power: "550W 80+ Bronze",
      cabinet: "RGB gaming cabinet",
    },
    variants: [{ name: "Standard", mrp: 72999, price: 65000, stock: 3 }],
    weight: 9500,
    hsn: HSN.computer,
    priceSource: "instagram",
    sourcePost: `${IG}DdIdROaM_dI/`,
  },
  {
    handle: "ryzen-5-rtx-3050-gaming-setup",
    categories: ["gaming-pcs", "complete-setups"],
    collections: ["diwali"],
    badge: "hot",
    brand: "Computer Warehouse",
    condition: "new",
    warrantyMonths: 36,
    images: ["setup-gaming.jpg", "gigabyte-rtx-3050.jpg", "msi-g244f.jpg", "msi-mag-forge-100r.jpg"],
    representative: true,
    title: {
      en: "Ryzen 5 + RTX 3050 Complete Gaming Setup",
      hi: "Ryzen 5 + RTX 3050 पूरा गेमिंग सेटअप",
      mr: "Ryzen 5 + RTX 3050 संपूर्ण गेमिंग सेटअप",
    },
    description: {
      en: "Everything you need to start gaming: PC with RTX 3050, gaming monitor, keyboard and mouse. Plug in and play.",
      hi: "गेमिंग शुरू करने के लिए सब कुछ: RTX 3050 वाला पीसी, गेमिंग मॉनिटर, कीबोर्ड और माउस। लगाइए और खेलिए।",
      mr: "गेमिंग सुरू करण्यासाठी सगळं: RTX 3050 असलेला पीसी, गेमिंग मॉनिटर, कीबोर्ड आणि माउस. जोडा आणि खेळा.",
    },
    highlights: ["Ryzen 5 5600", "RTX 3050 6GB", "16GB RAM", "With monitor"],
    specs: {
      processor: "AMD Ryzen 5 5600 (6 cores, 12 threads)",
      graphics: "NVIDIA GeForce RTX 3050 6GB",
      ram: "16GB DDR4",
      storage: "512GB NVMe SSD",
      power: "550W 80+",
      cabinet: "RGB gaming cabinet",
      monitor: "Gaming monitor",
      keyboardMouse: "Gaming keyboard + mouse",
    },
    variants: [{ name: "Standard", mrp: 112000, price: 99999, stock: 2 }],
    weight: 16000,
    hsn: HSN.computer,
    priceSource: "instagram",
    sourcePost: `${IG}Dd-iNvyMJS2/`,
  },
  {
    handle: "ryzen-7-7700x-rtx-5060-white-build",
    categories: ["gaming-pcs"],
    collections: ["new-arrivals"],
    badge: "new",
    brand: "Computer Warehouse",
    condition: "new",
    warrantyMonths: 36,
    images: ["pc-gaming-white.jpg", "amd-ryzen-7-7700x.jpg", "rtx-5060.jpg"],
    representative: true,
    title: {
      en: "Ryzen 7 7700X + RTX 5060 White Gaming PC",
      hi: "Ryzen 7 7700X + RTX 5060 व्हाइट गेमिंग पीसी",
      mr: "Ryzen 7 7700X + RTX 5060 व्हाइट गेमिंग पीसी",
    },
    description: {
      en: "An all-white high-end build with DDR5, a fast Gen4 SSD and a 360mm liquid cooler. Plays the latest games at high settings.",
      hi: "DDR5, तेज़ Gen4 SSD और 360mm लिक्विड कूलर वाला पूरा सफ़ेद हाई-एंड पीसी। नए गेम हाई सेटिंग पर।",
      mr: "DDR5, वेगवान Gen4 SSD आणि 360mm लिक्विड कूलर असलेला संपूर्ण पांढरा हाय-एंड पीसी. नवीन गेम्स हाय सेटिंगवर.",
    },
    highlights: ["Ryzen 7 7700X", "RTX 5060 8GB", "16GB DDR5", "1TB Gen4"],
    specs: {
      processor: "AMD Ryzen 7 7700X (8 cores, 16 threads)",
      graphics: "NVIDIA GeForce RTX 5060 8GB (white)",
      motherboard: "MSI B850M Gaming Plus WiFi",
      ram: "16GB DDR5 5600MHz",
      storage: "1TB NVMe Gen4 SSD",
      cooling: "360mm white liquid cooler",
      power: "750W 80+ Gold",
    },
    variants: [{ name: "Standard", mrp: 149999, price: 134999, stock: 1 }],
    weight: 12000,
    hsn: HSN.computer,
    priceSource: "demo",
    sourcePost: `${IG}DdvFJ2zsxW2/`,
  },
  {
    handle: "intel-i7-14th-gen-rtx-5060-ti-gaming-pc",
    categories: ["gaming-pcs"],
    collections: ["new-arrivals"],
    brand: "Computer Warehouse",
    condition: "new",
    warrantyMonths: 36,
    images: ["pc-gaming-intel.jpg", "intel-core-i7.jpg", "msi-rtx-5060-ti.jpg", "gigabyte-b760m-ds3h.jpg"],
    representative: true,
    title: {
      en: "Intel Core i7 14th Gen + RTX 5060 Ti Gaming PC",
      hi: "Intel Core i7 14th Gen + RTX 5060 Ti गेमिंग पीसी",
      mr: "Intel Core i7 14th Gen + RTX 5060 Ti गेमिंग पीसी",
    },
    description: {
      en: "A powerful gaming and creator PC with DDR5 memory and a 1TB SSD. For 1440p gaming, 3D work and heavy editing.",
      hi: "DDR5 मेमोरी और 1TB SSD वाला ताक़तवर गेमिंग और क्रिएटर पीसी। 1440p गेमिंग, 3D और भारी एडिटिंग के लिए।",
      mr: "DDR5 मेमरी आणि 1TB SSD असलेला ताकदवान गेमिंग आणि क्रिएटर पीसी. 1440p गेमिंग, 3D आणि जड एडिटिंगसाठी.",
    },
    highlights: ["Core i7 14th Gen", "RTX 5060 Ti 8GB", "16GB DDR5", "1TB NVMe"],
    specs: {
      processor: "Intel Core i7 14th Gen",
      graphics: "NVIDIA GeForce RTX 5060 Ti 8GB",
      motherboard: "B760M WiFi",
      ram: "16GB DDR5",
      storage: "1TB NVMe SSD",
    },
    variants: [{ name: "Standard", mrp: 189999, price: 175000, stock: 1 }],
    weight: 12000,
    hsn: HSN.computer,
    priceSource: "instagram",
    sourcePost: `${IG}DeIzk6mMFhX/`,
  },
  {
    handle: "hp-victus-15l-gaming-desktop",
    categories: ["gaming-pcs"],
    brand: "HP",
    condition: "new",
    warrantyMonths: 12,
    images: ["hp-victus-15l-desktop.jpg"],
    title: same("HP Victus 15L Gaming Desktop"),
    description: {
      en: "HP's compact gaming tower with NVIDIA RTX graphics, with HP's own warranty. Ask us about the exact configuration in stock.",
      hi: "NVIDIA RTX ग्राफ़िक्स वाला HP का कॉम्पैक्ट गेमिंग टावर, HP की अपनी वारंटी के साथ। स्टॉक में कौन सा कॉन्फ़िगरेशन है, हमसे पूछें।",
      mr: "NVIDIA RTX ग्राफिक्स असलेला HP चा कॉम्पॅक्ट गेमिंग टॉवर, HP च्या वॉरंटीसह. स्टॉकमधील नेमके कॉन्फिगरेशन आम्हाला विचारा.",
    },
    highlights: ["Core i5 14th Gen", "RTX 4060 8GB", "16GB RAM", "512GB SSD"],
    specs: {
      processor: "Intel Core i5-14400F",
      graphics: "NVIDIA GeForce RTX 4060 8GB",
      ram: "16GB DDR4",
      storage: "512GB NVMe SSD",
      os: "Windows 11 Home",
      formFactor: "Compact tower (15 litres)",
    },
    variants: [{ name: "Standard", mrp: 94999, price: 79990, stock: 2 }],
    weight: 8000,
    hsn: HSN.computer,
    priceSource: "demo",
  },

  // ---------- Complete setups ----------
  {
    handle: "intel-i5-12th-gen-complete-setup",
    categories: ["complete-setups"],
    collections: ["deals", "diwali"],
    brand: "Computer Warehouse",
    condition: "new",
    warrantyMonths: 36,
    images: ["setup-office.jpg", "intel-core-i5.jpg", "msi-pro-h610m-e.jpg"],
    representative: true,
    title: {
      en: "Intel Core i5 12th Gen Complete Computer Setup",
      hi: "Intel Core i5 12th Gen पूरा कंप्यूटर सेटअप",
      mr: "Intel Core i5 12th Gen संपूर्ण कॉम्प्युटर सेटअप",
    },
    description: {
      en: "PC, 22-inch IPS monitor, keyboard and mouse in one box. Ideal for home, office, students and shops.",
      hi: "पीसी, 22 इंच IPS मॉनिटर, कीबोर्ड और माउस एक साथ। घर, ऑफ़िस, स्टूडेंट और दुकान के लिए बढ़िया।",
      mr: "पीसी, 22 इंच IPS मॉनिटर, कीबोर्ड आणि माउस एकत्र. घर, ऑफिस, विद्यार्थी आणि दुकानासाठी उत्तम.",
    },
    highlights: ["Core i5 12th Gen", "8GB RAM", "512GB SSD", "22\" IPS monitor"],
    specs: {
      processor: "Intel Core i5 12th Gen",
      graphics: "NVIDIA GT 730 4GB",
      motherboard: "MSI H610",
      ram: "8GB DDR4",
      storage: "512GB SSD",
      monitor: "22-inch IPS",
      keyboardMouse: "Keyboard + mouse",
    },
    variants: [{ name: "Standard", mrp: 45999, price: 38500, stock: 5 }],
    weight: 14000,
    hsn: HSN.computer,
    priceSource: "demo",
    sourcePost: `${IG}DdgVrLssIEK/`,
  },
  {
    handle: "trading-setup-24-inch",
    categories: ["complete-setups"],
    collections: ["bestsellers"],
    badge: "bestseller",
    brand: "Computer Warehouse",
    condition: "new",
    warrantyMonths: 36,
    images: ["setup-trading.jpg", "msi-pro-mp241x.jpg", "intel-core-i5.jpg"],
    representative: true,
    title: {
      en: "Complete Trading Setup with 24-inch Display",
      hi: "24 इंच डिस्प्ले के साथ पूरा ट्रेडिंग सेटअप",
      mr: "24 इंच डिस्प्लेसह संपूर्ण ट्रेडिंग सेटअप",
    },
    description: {
      en: "Made for traders and offices: Core i5 PC, 24-inch IPS display on a stand, metal cabinet with copper power supply, RGB keyboard and mouse.",
      hi: "ट्रेडर और ऑफ़िस के लिए: Core i5 पीसी, स्टैंड पर 24 इंच IPS डिस्प्ले, कॉपर पावर सप्लाई वाला मेटल कैबिनेट, RGB कीबोर्ड और माउस।",
      mr: "ट्रेडर्स आणि ऑफिससाठी: Core i5 पीसी, स्टँडवर 24 इंच IPS डिस्प्ले, कॉपर पॉवर सप्लाय असलेले मेटल कॅबिनेट, RGB कीबोर्ड आणि माउस.",
    },
    highlights: ["Core i5", "8GB RAM", "256GB SSD", "24\" IPS display"],
    specs: {
      processor: "Intel Core i5",
      ram: "8GB",
      storage: "256GB SSD",
      monitor: "24-inch IPS with screen stand",
      cabinet: "Metal cabinet + copper power supply",
      keyboardMouse: "RGB keyboard + mouse",
    },
    variants: [{ name: "Standard", mrp: 34999, price: 29999, stock: 8 }],
    weight: 14000,
    hsn: HSN.computer,
    priceSource: "instagram",
    sourcePost: `${IG}Dd20SZEstTw/`,
  },
  {
    handle: "budget-i5-complete-setup-22-inch",
    categories: ["complete-setups"],
    collections: ["deals", "bestsellers"],
    badge: "hot",
    brand: "Computer Warehouse",
    condition: "new",
    warrantyMonths: 12,
    images: ["setup-budget.jpg", "msi-pro-mp241x.jpg", "zebronics-keyboard-mouse.jpg"],
    representative: true,
    title: {
      en: "Budget Core i5 Complete Computer Setup (22-inch)",
      hi: "बजट Core i5 पूरा कंप्यूटर सेटअप (22 इंच)",
      mr: "बजेट Core i5 संपूर्ण कॉम्प्युटर सेटअप (22 इंच)",
    },
    description: {
      en: "Our lowest-priced complete computer: perfect for students, billing, typing and online classes. Tested in our shop.",
      hi: "हमारा सबसे सस्ता पूरा कंप्यूटर: स्टूडेंट, बिलिंग, टाइपिंग और ऑनलाइन क्लास के लिए। हमारी शॉप में टेस्ट किया गया।",
      mr: "आमचा सर्वात स्वस्त संपूर्ण कॉम्प्युटर: विद्यार्थी, बिलिंग, टायपिंग आणि ऑनलाइन क्लाससाठी. आमच्या शॉपमध्ये टेस्ट केलेला.",
    },
    highlights: ["Core i5", "8GB RAM", "256GB SSD", "22\" IPS monitor"],
    specs: {
      processor: "Intel Core i5",
      ram: "8GB",
      storage: "256GB SSD",
      monitor: "22-inch IPS",
      cabinet: "Premium metal cabinet",
      keyboardMouse: "RGB keyboard + mouse",
    },
    variants: [{ name: "Standard", mrp: 21999, price: 16500, stock: 10 }],
    weight: 13000,
    hsn: HSN.computer,
    priceSource: "instagram",
    sourcePost: `${IG}DdsixJ2MINx/`,
  },
  {
    handle: "ryzen-5-setup-100hz",
    categories: ["complete-setups"],
    brand: "Computer Warehouse",
    condition: "new",
    warrantyMonths: 36,
    images: ["setup-gaming-lite.jpg", "amd-ryzen-5.jpg", "msi-g244f.jpg"],
    representative: true,
    title: {
      en: "Ryzen 5 Computer Setup with 100Hz Monitor",
      hi: "100Hz मॉनिटर के साथ Ryzen 5 कंप्यूटर सेटअप",
      mr: "100Hz मॉनिटरसह Ryzen 5 कॉम्प्युटर सेटअप",
    },
    description: {
      en: "A smooth 100Hz screen and a quick Ryzen 5 PC for study, office work and light gaming.",
      hi: "पढ़ाई, ऑफ़िस और हल्की गेमिंग के लिए स्मूद 100Hz स्क्रीन और तेज़ Ryzen 5 पीसी।",
      mr: "अभ्यास, ऑफिस काम आणि हलक्या गेमिंगसाठी स्मूद 100Hz स्क्रीन आणि वेगवान Ryzen 5 पीसी.",
    },
    highlights: ["Ryzen 5", "8GB DDR4", "512GB NVMe", "22\" 100Hz"],
    specs: {
      processor: "AMD Ryzen 5",
      ram: "8GB DDR4",
      storage: "512GB NVMe SSD",
      power: "500W SMPS",
      monitor: "22-inch IPS 100Hz",
      keyboardMouse: "RGB keyboard + mouse",
    },
    variants: [{ name: "Standard", mrp: 38999, price: 32500, stock: 4 }],
    weight: 14000,
    hsn: HSN.computer,
    priceSource: "demo",
  },
  {
    handle: "ryzen-5-5600gt-setup-acer-24",
    categories: ["complete-setups"],
    brand: "Computer Warehouse",
    condition: "new",
    warrantyMonths: 36,
    images: ["setup-gaming-24.jpg", "amd-ryzen-5.jpg", "msi-mag-a650bn.jpg"],
    representative: true,
    title: {
      en: "Ryzen 5 5600GT Setup with Acer 24-inch Monitor",
      hi: "Acer 24 इंच मॉनिटर के साथ Ryzen 5 5600GT सेटअप",
      mr: "Acer 24 इंच मॉनिटरसह Ryzen 5 5600GT सेटअप",
    },
    description: {
      en: "16GB fast memory, a 650W Bronze power supply and an RGB cabinet with Type-C, with an Acer 24-inch monitor.",
      hi: "16GB तेज़ मेमोरी, 650W ब्रॉन्ज़ पावर सप्लाई और Type-C वाला RGB कैबिनेट, Acer 24 इंच मॉनिटर के साथ।",
      mr: "16GB वेगवान मेमरी, 650W ब्रॉन्झ पॉवर सप्लाय आणि Type-C असलेले RGB कॅबिनेट, Acer 24 इंच मॉनिटरसह.",
    },
    highlights: ["Ryzen 5 5600GT", "16GB 3200MHz", "512GB NVMe", "Acer 24\""],
    specs: {
      processor: "AMD Ryzen 5 5600GT",
      ram: "16GB DDR4 3200MHz",
      storage: "512GB NVMe SSD",
      power: "650W 80+ Bronze",
      cabinet: "RGB cabinet with Type-C",
      monitor: "Acer 24-inch",
    },
    variants: [{ name: "Standard", mrp: 59999, price: 53500, stock: 3 }],
    weight: 15000,
    hsn: HSN.computer,
    priceSource: "instagram",
    sourcePost: `${IG}DdagngPMzXW/`,
  },

  // ---------- Mini PCs ----------
  {
    handle: "apple-mac-mini-m4-open-box",
    categories: ["mini-pcs"],
    collections: ["open-box", "deals"],
    brand: "Apple",
    condition: "open-box",
    warrantyMonths: 5,
    images: ["apple-mac-mini.jpg"],
    title: { en: "Apple Mac mini M4 (Open Box)", hi: "Apple Mac mini M4 (ओपन बॉक्स)", mr: "Apple Mac mini M4 (ओपन बॉक्स)" },
    description: {
      en: "Open box, like new, with the remaining Apple warranty. Tiny, silent and very fast for office work, coding and editing.",
      hi: "ओपन बॉक्स, बिल्कुल नए जैसा, बची हुई Apple वारंटी के साथ। छोटा, शांत और ऑफ़िस, कोडिंग और एडिटिंग के लिए बहुत तेज़।",
      mr: "ओपन बॉक्स, अगदी नव्यासारखा, उरलेल्या Apple वॉरंटीसह. लहान, शांत आणि ऑफिस, कोडिंग व एडिटिंगसाठी खूप वेगवान.",
    },
    highlights: ["Apple M4", "16GB memory", "256GB SSD", "Thunderbolt 4"],
    specs: {
      processor: "Apple M4 (10-core CPU, 10-core GPU)",
      memory: "16GB unified memory",
      storage: "256GB SSD",
      ports: "3× Thunderbolt 4, HDMI, 2× USB-C (front)",
      os: "macOS",
    },
    variants: [{ name: "16GB · 256GB", mrp: 59900, price: 47990, stock: 1 }],
    weight: 1500,
    hsn: HSN.computer,
    priceSource: "demo",
  },

  // ---------- Laptops ----------
  {
    handle: "hp-15s-laptop",
    categories: ["everyday-laptops"],
    collections: ["bestsellers", "diwali"],
    badge: "bestseller",
    brand: "HP",
    condition: "new",
    warrantyMonths: 12,
    images: ["hp-15s.jpg"],
    title: same("HP 15s Laptop"),
    description: {
      en: "A dependable 15.6-inch laptop for college, office and home, with a fast SSD and Windows 11. HP brand warranty.",
      hi: "कॉलेज, ऑफ़िस और घर के लिए भरोसेमंद 15.6 इंच लैपटॉप, तेज़ SSD और Windows 11 के साथ। HP ब्रांड वारंटी।",
      mr: "कॉलेज, ऑफिस आणि घरासाठी विश्वासार्ह 15.6 इंच लॅपटॉप, वेगवान SSD आणि Windows 11 सह. HP ब्रँड वॉरंटी.",
    },
    highlights: ["15.6\" FHD", "Windows 11", "MS Office", "Fast SSD"],
    specs: {
      display: "15.6-inch Full HD",
      os: "Windows 11 Home + MS Office Home",
      weight: "1.69 kg",
    },
    option: "Configuration",
    variants: [
      { name: "Core i3 · 8GB · 512GB", mrp: 45999, price: 36990, stock: 6, specs: { processor: "Intel Core i3-1215U", ram: "8GB DDR4", storage: "512GB SSD" } },
      { name: "Core i5 · 16GB · 512GB", mrp: 62999, price: 52990, stock: 4, specs: { processor: "Intel Core i5-1235U", ram: "16GB DDR4", storage: "512GB SSD" } },
    ],
    weight: 2500,
    hsn: HSN.computer,
    priceSource: "demo",
  },
  {
    handle: "hp-pavilion-14-laptop",
    categories: ["everyday-laptops"],
    brand: "HP",
    condition: "new",
    warrantyMonths: 12,
    images: ["hp-pavilion-14.jpg"],
    title: same("HP Pavilion 14 Thin & Light Laptop"),
    description: {
      en: "Slim, light and stylish, with a sharp 14-inch screen and all-day battery. Great for students and people on the move.",
      hi: "पतला, हल्का और स्टाइलिश, 14 इंच की साफ़ स्क्रीन और पूरे दिन की बैटरी। स्टूडेंट और सफ़र करने वालों के लिए बढ़िया।",
      mr: "पातळ, हलका आणि स्टायलिश, 14 इंचाची स्पष्ट स्क्रीन आणि दिवसभराची बॅटरी. विद्यार्थी आणि प्रवास करणाऱ्यांसाठी उत्तम.",
    },
    highlights: ["14\" FHD IPS", "Thin & light", "Backlit keyboard", "Windows 11"],
    specs: { display: "14-inch Full HD IPS", os: "Windows 11 Home + MS Office Home", weight: "1.41 kg" },
    option: "Configuration",
    variants: [
      { name: "Core i5 · 16GB · 512GB", mrp: 76999, price: 64990, stock: 3, specs: { processor: "Intel Core i5-1335U", ram: "16GB DDR4", storage: "512GB SSD" } },
      { name: "Core i7 · 16GB · 1TB", mrp: 92999, price: 79990, stock: 2, specs: { processor: "Intel Core i7-1355U", ram: "16GB DDR4", storage: "1TB SSD" } },
    ],
    weight: 2200,
    hsn: HSN.computer,
    priceSource: "demo",
  },
  {
    handle: "asus-vivobook-15-laptop",
    categories: ["everyday-laptops"],
    collections: ["deals"],
    brand: "ASUS",
    condition: "new",
    warrantyMonths: 12,
    images: ["asus-vivobook-15.jpg"],
    title: same("ASUS Vivobook 15 Laptop"),
    description: {
      en: "Big 15.6-inch screen, comfortable keyboard with number pad and a fast SSD. Value for money for home and office.",
      hi: "बड़ी 15.6 इंच स्क्रीन, नंबर पैड वाला आरामदायक कीबोर्ड और तेज़ SSD। घर और ऑफ़िस के लिए पैसा वसूल।",
      mr: "मोठी 15.6 इंच स्क्रीन, नंबर पॅडसह आरामदायक कीबोर्ड आणि वेगवान SSD. घर आणि ऑफिससाठी पैसा वसूल.",
    },
    highlights: ["15.6\" FHD", "Number pad", "Fingerprint", "Windows 11"],
    specs: { display: "15.6-inch Full HD", os: "Windows 11 Home + MS Office Home", weight: "1.7 kg" },
    option: "Configuration",
    variants: [
      { name: "Core i3 · 8GB · 512GB", mrp: 44990, price: 34990, stock: 5, specs: { processor: "Intel Core i3-1315U", ram: "8GB", storage: "512GB SSD" } },
      { name: "Core i5 · 16GB · 512GB", mrp: 62990, price: 49990, stock: 4, specs: { processor: "Intel Core i5-13420H", ram: "16GB", storage: "512GB SSD" } },
    ],
    weight: 2500,
    hsn: HSN.computer,
    priceSource: "demo",
  },
  {
    handle: "acer-aspire-ryzen-laptop",
    categories: ["everyday-laptops"],
    brand: "Acer",
    condition: "new",
    warrantyMonths: 12,
    images: ["acer-aspire-7.jpg"],
    title: same("Acer Aspire Laptop (AMD Ryzen)"),
    description: {
      en: "AMD Ryzen power at a friendly price. Full HD screen, quick SSD and Windows 11 for everyday work and study.",
      hi: "किफ़ायती दाम में AMD Ryzen की ताक़त। रोज़ के काम और पढ़ाई के लिए Full HD स्क्रीन, तेज़ SSD और Windows 11।",
      mr: "परवडणाऱ्या किमतीत AMD Ryzen ची ताकद. रोजचे काम आणि अभ्यासासाठी Full HD स्क्रीन, वेगवान SSD आणि Windows 11.",
    },
    highlights: ["15.6\" FHD", "AMD Ryzen", "Fast SSD", "Windows 11"],
    specs: { display: "15.6-inch Full HD", os: "Windows 11 Home", graphics: "AMD Radeon graphics" },
    option: "Configuration",
    variants: [
      { name: "Ryzen 5 · 8GB · 512GB", mrp: 42999, price: 32990, stock: 5, specs: { processor: "AMD Ryzen 5 7520U", ram: "8GB LPDDR5", storage: "512GB SSD" } },
      { name: "Ryzen 7 · 16GB · 512GB", mrp: 59999, price: 47990, stock: 3, specs: { processor: "AMD Ryzen 7 5825U", ram: "16GB", storage: "512GB SSD" } },
    ],
    weight: 2500,
    hsn: HSN.computer,
    priceSource: "demo",
  },
  {
    handle: "hp-victus-15-gaming-laptop",
    categories: ["gaming-laptops"],
    collections: ["bestsellers", "diwali"],
    badge: "bestseller",
    brand: "HP",
    condition: "new",
    warrantyMonths: 12,
    images: ["hp-victus-15.jpg"],
    title: same("HP Victus 15 Gaming Laptop"),
    description: {
      en: "A gaming laptop that also works for college and editing: 144Hz screen, NVIDIA RTX graphics and strong cooling.",
      hi: "गेमिंग लैपटॉप जो कॉलेज और एडिटिंग के लिए भी है: 144Hz स्क्रीन, NVIDIA RTX ग्राफ़िक्स और बढ़िया कूलिंग।",
      mr: "कॉलेज आणि एडिटिंगसाठीही चालणारा गेमिंग लॅपटॉप: 144Hz स्क्रीन, NVIDIA RTX ग्राफिक्स आणि उत्तम कूलिंग.",
    },
    highlights: ["15.6\" 144Hz", "NVIDIA RTX", "16GB RAM", "Windows 11"],
    specs: { display: "15.6-inch Full HD 144Hz", os: "Windows 11 Home + MS Office Home", weight: "2.29 kg" },
    option: "Configuration",
    variants: [
      { name: "Core i5 · RTX 3050 · 16GB · 512GB", mrp: 76999, price: 62990, stock: 4, specs: { processor: "Intel Core i5-12450H", graphics: "NVIDIA GeForce RTX 3050 6GB", ram: "16GB DDR4", storage: "512GB SSD" } },
      { name: "Ryzen 7 · RTX 4050 · 16GB · 512GB", mrp: 94999, price: 79990, stock: 2, specs: { processor: "AMD Ryzen 7 7840HS", graphics: "NVIDIA GeForce RTX 4050 6GB", ram: "16GB DDR5", storage: "512GB SSD" } },
    ],
    weight: 3200,
    hsn: HSN.computer,
    priceSource: "demo",
  },
  {
    handle: "msi-thin-gf63-gaming-laptop",
    categories: ["gaming-laptops"],
    collections: ["deals"],
    brand: "MSI",
    condition: "new",
    warrantyMonths: 24,
    images: ["msi-thin-gf63.jpg"],
    title: same("MSI Thin GF63 Gaming Laptop"),
    description: {
      en: "One of the lightest RTX gaming laptops, with a 144Hz screen and red backlit keyboard. 2-year MSI warranty.",
      hi: "सबसे हल्के RTX गेमिंग लैपटॉप में से एक, 144Hz स्क्रीन और लाल बैकलिट कीबोर्ड के साथ। 2 साल की MSI वारंटी।",
      mr: "सर्वात हलक्या RTX गेमिंग लॅपटॉपपैकी एक, 144Hz स्क्रीन आणि लाल बॅकलिट कीबोर्डसह. 2 वर्षांची MSI वॉरंटी.",
    },
    highlights: ["15.6\" 144Hz", "NVIDIA RTX", "1.86 kg", "2-year warranty"],
    specs: { display: "15.6-inch Full HD 144Hz IPS", os: "Windows 11 Home", weight: "1.86 kg" },
    option: "Configuration",
    variants: [
      { name: "Core i5 · RTX 3050 · 16GB · 512GB", mrp: 69990, price: 54990, stock: 3, specs: { processor: "Intel Core i5-12450H", graphics: "NVIDIA GeForce RTX 3050 4GB", ram: "16GB DDR4", storage: "512GB SSD" } },
      { name: "Core i7 · RTX 4050 · 16GB · 512GB", mrp: 89990, price: 71990, stock: 2, specs: { processor: "Intel Core i7-12650H", graphics: "NVIDIA GeForce RTX 4050 6GB", ram: "16GB DDR4", storage: "512GB SSD" } },
    ],
    weight: 3000,
    hsn: HSN.computer,
    priceSource: "demo",
  },
  {
    handle: "hp-elitebook-840-g7-laptop",
    categories: ["business-laptops"],
    collections: ["open-box", "deals", "bestsellers"],
    badge: "hot",
    brand: "HP",
    condition: "refurbished",
    warrantyMonths: 6,
    images: ["hp-elitebook-840.jpg"],
    representative: true,
    title: same("HP EliteBook 840 G7 Business Laptop"),
    description: {
      en: "A premium metal business laptop at a fraction of the new price. Checked part by part in our shop, with our own warranty.",
      hi: "नए दाम के कुछ हिस्से में प्रीमियम मेटल बिज़नेस लैपटॉप। हमारी शॉप में हर पार्ट जाँचा गया, हमारी अपनी वारंटी के साथ।",
      mr: "नव्या किमतीच्या थोड्या भागात प्रीमियम मेटल बिझनेस लॅपटॉप. आमच्या शॉपमध्ये प्रत्येक पार्ट तपासलेला, आमच्या स्वतःच्या वॉरंटीसह.",
    },
    highlights: ["Core i5 10th Gen", "8GB RAM", "256GB SSD", "Metal body"],
    specs: {
      processor: "Intel Core i5 10th Gen",
      ram: "8GB",
      storage: "256GB SSD",
      display: "14-inch",
      os: "Windows 11 Pro",
      connectivity: "Fingerprint sensor, Wi-Fi, Bluetooth",
    },
    variants: [{ name: "Standard", mrp: 34999, price: 24990, stock: 7 }],
    weight: 2000,
    hsn: HSN.computer,
    priceSource: "demo",
    sourcePost: `${IG}Dd0TC8eTQck/`,
  },
  {
    handle: "apple-macbook-air-13",
    categories: ["macbooks"],
    collections: ["new-arrivals"],
    brand: "Apple",
    condition: "new",
    warrantyMonths: 12,
    images: ["apple-macbook-air-13.jpg"],
    title: same("Apple MacBook Air 13-inch (M4)"),
    description: {
      en: "Super thin, silent and all-day battery. The best laptop for students, creators and business owners who want it to just work.",
      hi: "बहुत पतला, बिना आवाज़ और पूरे दिन की बैटरी। स्टूडेंट, क्रिएटर और बिज़नेस वालों के लिए सबसे अच्छा लैपटॉप।",
      mr: "अगदी पातळ, आवाजरहित आणि दिवसभराची बॅटरी. विद्यार्थी, क्रिएटर्स आणि व्यावसायिकांसाठी सर्वोत्तम लॅपटॉप.",
    },
    highlights: ["Apple M4", "13.6\" Liquid Retina", "18-hour battery", "macOS"],
    specs: { display: "13.6-inch Liquid Retina", os: "macOS", weight: "1.24 kg", processor: "Apple M4 (10-core CPU)" },
    option: "Configuration",
    variants: [
      { name: "M4 · 16GB · 256GB", mrp: 99900, price: 92990, stock: 3, specs: { memory: "16GB unified memory", storage: "256GB SSD" } },
      { name: "M4 · 16GB · 512GB", mrp: 119900, price: 110990, stock: 2, specs: { memory: "16GB unified memory", storage: "512GB SSD" } },
    ],
    weight: 2000,
    hsn: HSN.computer,
    priceSource: "demo",
  },

  // ---------- Monitors ----------
  {
    handle: "msi-pro-mp241x-24-monitor",
    categories: ["office-monitors"],
    collections: ["bestsellers"],
    brand: "MSI",
    condition: "new",
    warrantyMonths: 36,
    images: ["msi-pro-mp241x.jpg"],
    title: same("MSI PRO MP241X 24-inch Monitor"),
    description: {
      en: "A clear, eye-friendly 24-inch Full HD monitor for home and office, with less blue light and no flicker.",
      hi: "घर और ऑफ़िस के लिए साफ़ और आँखों के लिए आरामदायक 24 इंच Full HD मॉनिटर, कम ब्लू लाइट और बिना फ़्लिकर।",
      mr: "घर आणि ऑफिससाठी स्पष्ट आणि डोळ्यांना आरामदायक 24 इंच Full HD मॉनिटर, कमी ब्लू लाइट आणि फ्लिकर नाही.",
    },
    highlights: ["24\" Full HD", "75Hz", "Eye care", "3-year warranty"],
    specs: { screenSize: "23.8 inch", resolution: "1920 × 1080 (Full HD)", refreshRate: "75Hz", panel: "VA", ports: "HDMI, VGA" },
    variants: [{ name: "Standard", mrp: 10999, price: 7499, stock: 12 }],
    weight: 4500,
    hsn: HSN.monitor,
    priceSource: "demo",
  },
  {
    handle: "msi-g244f-24-gaming-monitor",
    categories: ["gaming-monitors"],
    collections: ["deals"],
    brand: "MSI",
    condition: "new",
    warrantyMonths: 36,
    images: ["msi-g244f.jpg"],
    title: same("MSI G244F 24-inch 170Hz Gaming Monitor"),
    description: {
      en: "Fast 170Hz IPS screen with 1ms response for smooth, sharp gaming. Bright colours for movies too.",
      hi: "स्मूद गेमिंग के लिए तेज़ 170Hz IPS स्क्रीन और 1ms रिस्पॉन्स। फ़िल्मों के लिए भी चमकीले रंग।",
      mr: "स्मूद गेमिंगसाठी वेगवान 170Hz IPS स्क्रीन आणि 1ms रिस्पॉन्स. चित्रपटांसाठीही चमकदार रंग.",
    },
    highlights: ["24\" IPS", "170Hz", "1ms", "Adaptive sync"],
    specs: { screenSize: "23.8 inch", resolution: "1920 × 1080 (Full HD)", refreshRate: "170Hz", panel: "Rapid IPS, 1ms", ports: "2× HDMI, DisplayPort" },
    variants: [{ name: "Standard", mrp: 17999, price: 11999, stock: 6 }],
    weight: 5000,
    hsn: HSN.monitor,
    priceSource: "demo",
  },
  {
    handle: "msi-g274f-27-gaming-monitor",
    categories: ["gaming-monitors"],
    brand: "MSI",
    condition: "new",
    warrantyMonths: 36,
    images: ["msi-g274f.jpg"],
    title: same("MSI G274F 27-inch 180Hz Gaming Monitor"),
    description: {
      en: "A big 27-inch IPS gaming screen at 180Hz. More space for games, editing and multitasking.",
      hi: "180Hz वाली बड़ी 27 इंच IPS गेमिंग स्क्रीन। गेम, एडिटिंग और कई काम एक साथ करने के लिए ज़्यादा जगह।",
      mr: "180Hz असलेली मोठी 27 इंच IPS गेमिंग स्क्रीन. गेम्स, एडिटिंग आणि अनेक कामांसाठी जास्त जागा.",
    },
    highlights: ["27\" IPS", "180Hz", "1ms", "G-Sync compatible"],
    specs: { screenSize: "27 inch", resolution: "1920 × 1080 (Full HD)", refreshRate: "180Hz", panel: "Rapid IPS, 1ms", ports: "2× HDMI, DisplayPort" },
    variants: [{ name: "Standard", mrp: 24999, price: 15999, stock: 4 }],
    weight: 6500,
    hsn: HSN.monitor,
    priceSource: "demo",
  },

  // ---------- Printers ----------
  {
    handle: "canon-pixma-g3012-wifi-printer",
    categories: ["ink-tank-printers"],
    collections: ["bestsellers", "diwali"],
    badge: "bestseller",
    brand: "Canon",
    condition: "new",
    warrantyMonths: 12,
    images: ["canon-pixma-g3012.jpg"],
    title: same("Canon PIXMA G3012 Wi-Fi Ink Tank Printer"),
    description: {
      en: "Print, copy and scan from your phone over Wi-Fi. Very low cost per page. With 2 extra black ink bottles free.",
      hi: "Wi-Fi से फ़ोन से प्रिंट, कॉपी और स्कैन। हर पेज का ख़र्च बहुत कम। 2 एक्स्ट्रा काली इंक बोतल मुफ़्त।",
      mr: "Wi-Fi ने फोनवरून प्रिंट, कॉपी आणि स्कॅन. प्रत्येक पानाचा खर्च खूप कमी. 2 जादा काळ्या इंक बाटल्या मोफत.",
    },
    highlights: ["Wi-Fi", "Print · Copy · Scan", "Colour", "+2 ink bottles free"],
    specs: { printType: "Colour ink tank", functions: "Print, copy, scan", connectivity: "Wi-Fi, USB", inBox: "Printer, ink bottles + 2 extra black bottles" },
    variants: [{ name: "Standard", mrp: 16995, price: 13499, stock: 8 }],
    weight: 7000,
    hsn: HSN.printer,
    priceSource: "demo",
  },
  {
    handle: "canon-pixma-g2012-printer",
    categories: ["ink-tank-printers"],
    collections: ["deals"],
    brand: "Canon",
    condition: "new",
    warrantyMonths: 12,
    images: ["canon-pixma-g2012.jpg"],
    title: same("Canon PIXMA G2012 Ink Tank Printer"),
    description: {
      en: "A tough colour printer for home, office and shops. Print, copy and scan. 2 extra black ink bottles free.",
      hi: "घर, ऑफ़िस और दुकान के लिए मज़बूत कलर प्रिंटर। प्रिंट, कॉपी और स्कैन। 2 एक्स्ट्रा काली इंक बोतल मुफ़्त।",
      mr: "घर, ऑफिस आणि दुकानासाठी मजबूत कलर प्रिंटर. प्रिंट, कॉपी आणि स्कॅन. 2 जादा काळ्या इंक बाटल्या मोफत.",
    },
    highlights: ["Print · Copy · Scan", "Colour", "Low cost per page", "+2 ink bottles free"],
    specs: { printType: "Colour ink tank", functions: "Print, copy, scan", connectivity: "USB", inBox: "Printer, ink bottles + 2 extra black bottles" },
    variants: [{ name: "Standard", mrp: 13995, price: 11500, stock: 10 }],
    weight: 6500,
    hsn: HSN.printer,
    priceSource: "instagram",
    sourcePost: `${IG}Ddxo4k5s_3V/`,
  },
  {
    handle: "brother-dcp-t420w-printer",
    categories: ["ink-tank-printers"],
    brand: "Brother",
    condition: "new",
    warrantyMonths: 24,
    images: ["brother-dcp-t420w.jpg"],
    title: same("Brother DCP-T420W Wi-Fi Ink Tank Printer"),
    description: {
      en: "Wi-Fi ink tank all-in-one with high page yield. Print from your phone with the Brother app.",
      hi: "ज़्यादा पेज देने वाला Wi-Fi इंक टैंक ऑल-इन-वन। Brother ऐप से फ़ोन से प्रिंट करें।",
      mr: "जास्त पाने देणारा Wi-Fi इंक टँक ऑल-इन-वन. Brother ॲपने फोनवरून प्रिंट करा.",
    },
    highlights: ["Wi-Fi", "Print · Copy · Scan", "Colour", "2-year warranty"],
    specs: { printType: "Colour ink tank", functions: "Print, copy, scan", connectivity: "Wi-Fi, USB" },
    variants: [{ name: "Standard", mrp: 16490, price: 12499, stock: 4 }],
    weight: 7000,
    hsn: HSN.printer,
    priceSource: "demo",
  },
  {
    handle: "hp-smart-tank-580-printer",
    categories: ["ink-tank-printers"],
    brand: "HP",
    condition: "new",
    warrantyMonths: 12,
    images: ["hp-smart-tank-580.jpg"],
    title: same("HP Smart Tank 580 Wi-Fi All-in-One Printer"),
    description: {
      en: "Easy setup with the HP Smart app, spill-free refills and Wi-Fi printing from any phone.",
      hi: "HP Smart ऐप से आसान सेटअप, बिना गिराए इंक भरना और किसी भी फ़ोन से Wi-Fi प्रिंटिंग।",
      mr: "HP Smart ॲपने सोपे सेटअप, न सांडता इंक भरणे आणि कोणत्याही फोनवरून Wi-Fi प्रिंटिंग.",
    },
    highlights: ["Wi-Fi", "Print · Copy · Scan", "Colour", "HP Smart app"],
    specs: { printType: "Colour ink tank", functions: "Print, copy, scan", connectivity: "Wi-Fi, Bluetooth, USB" },
    variants: [{ name: "Standard", mrp: 18000, price: 12999, stock: 5 }],
    weight: 6500,
    hsn: HSN.printer,
    priceSource: "demo",
  },
  {
    handle: "canon-lbp122dw-laser-printer",
    categories: ["laser-printers"],
    brand: "Canon",
    condition: "new",
    warrantyMonths: 12,
    images: ["canon-lbp122dw.jpg"],
    title: same("Canon imageCLASS LBP122dw Laser Printer"),
    description: {
      en: "Fast black-and-white laser printing with automatic two-sided printing and Wi-Fi. Great for offices and schools.",
      hi: "दोनों तरफ़ ऑटो प्रिंटिंग और Wi-Fi के साथ तेज़ ब्लैक एंड व्हाइट लेज़र प्रिंटिंग। ऑफ़िस और स्कूल के लिए बढ़िया।",
      mr: "दोन्ही बाजूंनी ऑटो प्रिंटिंग आणि Wi-Fi सह वेगवान ब्लॅक अँड व्हाइट लेझर प्रिंटिंग. ऑफिस आणि शाळांसाठी उत्तम.",
    },
    highlights: ["Laser", "Two-sided printing", "Wi-Fi", "29 pages/min"],
    specs: { printType: "Black & white laser", functions: "Print", connectivity: "Wi-Fi, USB" },
    variants: [{ name: "Standard", mrp: 19995, price: 14499, stock: 3 }],
    weight: 7000,
    hsn: HSN.printer,
    priceSource: "demo",
  },

  // ---------- Components ----------
  {
    handle: "amd-ryzen-5-5600gt-processor",
    categories: ["processors"],
    collections: ["bestsellers"],
    brand: "AMD",
    condition: "new",
    warrantyMonths: 36,
    images: ["amd-ryzen-5.jpg"],
    representative: true,
    title: same("AMD Ryzen 5 5600GT Processor"),
    description: {
      en: "6 cores with built-in Radeon graphics: build a good PC without a graphics card. Cooler included.",
      hi: "बिल्ट-इन Radeon ग्राफ़िक्स के साथ 6 कोर: बिना ग्राफ़िक्स कार्ड अच्छा पीसी बनाइए। कूलर साथ में।",
      mr: "अंगभूत Radeon ग्राफिक्ससह 6 कोर: ग्राफिक्स कार्डशिवाय चांगला पीसी बनवा. कूलर सोबत.",
    },
    highlights: ["6 cores / 12 threads", "AM4", "Radeon graphics", "Cooler included"],
    specs: { cores: "6 cores, 12 threads, up to 4.6 GHz", socket: "AM4", graphics: "AMD Radeon (built in)", inBox: "Wraith Stealth cooler" },
    variants: [{ name: "Standard", mrp: 15990, price: 11999, stock: 9 }],
    weight: 500,
    hsn: HSN.part,
    priceSource: "demo",
  },
  {
    handle: "amd-ryzen-7-5700x-processor",
    categories: ["processors"],
    brand: "AMD",
    condition: "new",
    warrantyMonths: 36,
    images: ["amd-ryzen-7.jpg"],
    representative: true,
    title: same("AMD Ryzen 7 5700X Processor"),
    description: {
      en: "8 cores for gaming and editing on the AM4 platform. A great upgrade for B450/B550 boards.",
      hi: "AM4 प्लेटफ़ॉर्म पर गेमिंग और एडिटिंग के लिए 8 कोर। B450/B550 बोर्ड के लिए बढ़िया अपग्रेड।",
      mr: "AM4 प्लॅटफॉर्मवर गेमिंग आणि एडिटिंगसाठी 8 कोर. B450/B550 बोर्डसाठी उत्तम अपग्रेड.",
    },
    highlights: ["8 cores / 16 threads", "AM4", "Up to 4.6 GHz", "65W"],
    specs: { cores: "8 cores, 16 threads, up to 4.6 GHz", socket: "AM4", graphics: "Needs a graphics card" },
    variants: [{ name: "Standard", mrp: 22990, price: 14999, stock: 5 }],
    weight: 500,
    hsn: HSN.part,
    priceSource: "demo",
  },
  {
    handle: "amd-ryzen-7-7700x-processor",
    categories: ["processors"],
    brand: "AMD",
    condition: "new",
    warrantyMonths: 36,
    images: ["amd-ryzen-7-7700x.jpg"],
    title: same("AMD Ryzen 7 7700X Processor"),
    description: {
      en: "A fast 8-core AM5 processor with DDR5 support, for high-end gaming and creator builds.",
      hi: "DDR5 सपोर्ट वाला तेज़ 8 कोर AM5 प्रोसेसर, हाई-एंड गेमिंग और क्रिएटर पीसी के लिए।",
      mr: "DDR5 सपोर्ट असलेला वेगवान 8 कोर AM5 प्रोसेसर, हाय-एंड गेमिंग आणि क्रिएटर पीसीसाठी.",
    },
    highlights: ["8 cores / 16 threads", "AM5", "Up to 5.4 GHz", "DDR5"],
    specs: { cores: "8 cores, 16 threads, up to 5.4 GHz", socket: "AM5", memory: "DDR5", graphics: "AMD Radeon (basic, built in)" },
    variants: [{ name: "Standard", mrp: 36990, price: 27999, stock: 3 }],
    weight: 500,
    hsn: HSN.part,
    priceSource: "demo",
  },
  {
    handle: "intel-core-i5-12400-processor",
    categories: ["processors"],
    collections: ["deals"],
    brand: "Intel",
    condition: "new",
    warrantyMonths: 36,
    images: ["intel-core-i5.jpg"],
    representative: true,
    title: same("Intel Core i5-12400 Processor"),
    description: {
      en: "The most popular processor for office and gaming PCs. 6 cores with Intel UHD 730 graphics, cooler included.",
      hi: "ऑफ़िस और गेमिंग पीसी का सबसे लोकप्रिय प्रोसेसर। Intel UHD 730 ग्राफ़िक्स के साथ 6 कोर, कूलर साथ में।",
      mr: "ऑफिस आणि गेमिंग पीसीसाठी सर्वात लोकप्रिय प्रोसेसर. Intel UHD 730 ग्राफिक्ससह 6 कोर, कूलर सोबत.",
    },
    highlights: ["6 cores / 12 threads", "LGA 1700", "UHD 730 graphics", "Cooler included"],
    specs: { cores: "6 cores, 12 threads, up to 4.4 GHz", socket: "LGA 1700", graphics: "Intel UHD 730 (built in)", inBox: "Intel Laminar cooler" },
    variants: [{ name: "Standard", mrp: 18500, price: 13499, stock: 7 }],
    weight: 500,
    hsn: HSN.part,
    priceSource: "demo",
  },
  {
    handle: "intel-core-i7-14700-processor",
    categories: ["processors"],
    brand: "Intel",
    condition: "new",
    warrantyMonths: 36,
    images: ["intel-core-i7.jpg"],
    representative: true,
    title: same("Intel Core i7-14700 Processor"),
    description: {
      en: "20 cores for heavy multitasking, streaming and 3D work. Fits B760 and Z790 motherboards.",
      hi: "भारी मल्टीटास्किंग, स्ट्रीमिंग और 3D के लिए 20 कोर। B760 और Z790 मदरबोर्ड में लगता है।",
      mr: "जड मल्टिटास्किंग, स्ट्रीमिंग आणि 3D कामासाठी 20 कोर. B760 आणि Z790 मदरबोर्डमध्ये बसतो.",
    },
    highlights: ["20 cores / 28 threads", "LGA 1700", "Up to 5.4 GHz", "UHD 770 graphics"],
    specs: { cores: "20 cores (8P + 12E), 28 threads, up to 5.4 GHz", socket: "LGA 1700", graphics: "Intel UHD 770 (built in)" },
    variants: [{ name: "Standard", mrp: 45999, price: 36499, stock: 2 }],
    weight: 500,
    hsn: HSN.part,
    priceSource: "demo",
  },
  {
    handle: "asus-dual-rtx-5060-graphics-card",
    categories: ["graphics-cards"],
    collections: ["new-arrivals", "bestsellers"],
    badge: "new",
    brand: "ASUS",
    condition: "new",
    warrantyMonths: 36,
    images: ["rtx-5060.jpg"],
    title: same("ASUS Dual GeForce RTX 5060 8GB Graphics Card"),
    description: {
      en: "NVIDIA's latest mid-range card with DLSS 4. Quiet dual-fan cooler, great for 1080p gaming.",
      hi: "DLSS 4 वाला NVIDIA का नया मिड-रेंज कार्ड। शांत डुअल-फ़ैन कूलर, 1080p गेमिंग के लिए बढ़िया।",
      mr: "DLSS 4 असलेले NVIDIA चे नवीन मिड-रेंज कार्ड. शांत ड्युअल-फॅन कूलर, 1080p गेमिंगसाठी उत्तम.",
    },
    highlights: ["RTX 5060", "8GB GDDR7", "DLSS 4", "Dual fan"],
    specs: { chipset: "NVIDIA GeForce RTX 5060", memory: "8GB GDDR7", ports: "HDMI 2.1, 3× DisplayPort", power: "550W PSU recommended" },
    variants: [{ name: "Standard", mrp: 36999, price: 30999, stock: 4 }],
    weight: 1500,
    hsn: HSN.part,
    priceSource: "demo",
  },
  {
    handle: "msi-rtx-5060-ti-graphics-card",
    categories: ["graphics-cards"],
    collections: ["new-arrivals"],
    brand: "MSI",
    condition: "new",
    warrantyMonths: 36,
    images: ["msi-rtx-5060-ti.jpg"],
    title: same("MSI GeForce RTX 5060 Ti Graphics Card"),
    description: {
      en: "Strong 1080p and 1440p gaming with a triple-fan cooler. Choose 8GB or the 16GB version for editing and AI.",
      hi: "ट्रिपल-फ़ैन कूलर के साथ दमदार 1080p और 1440p गेमिंग। एडिटिंग और AI के लिए 16GB वर्ज़न लें।",
      mr: "ट्रिपल-फॅन कूलरसह दमदार 1080p आणि 1440p गेमिंग. एडिटिंग आणि AI साठी 16GB व्हर्जन घ्या.",
    },
    highlights: ["RTX 5060 Ti", "GDDR7", "DLSS 4", "Triple fan"],
    specs: { chipset: "NVIDIA GeForce RTX 5060 Ti", ports: "HDMI 2.1, 3× DisplayPort", power: "600W PSU recommended" },
    option: "Memory",
    variants: [
      { name: "8GB", mrp: 49999, price: 41999, stock: 3, specs: { memory: "8GB GDDR7" } },
      { name: "16GB", mrp: 57999, price: 49999, stock: 2, specs: { memory: "16GB GDDR7" } },
    ],
    weight: 1800,
    hsn: HSN.part,
    priceSource: "demo",
  },
  {
    handle: "gigabyte-rtx-3050-graphics-card",
    categories: ["graphics-cards"],
    collections: ["deals"],
    brand: "Gigabyte",
    condition: "new",
    warrantyMonths: 36,
    images: ["gigabyte-rtx-3050.jpg"],
    title: same("GIGABYTE GeForce RTX 3050 6GB Graphics Card"),
    description: {
      en: "An affordable way to add real gaming power. Low power use, no extra power cable needed on the 6GB model.",
      hi: "असली गेमिंग पावर जोड़ने का किफ़ायती तरीक़ा। कम बिजली, 6GB मॉडल में अलग पावर केबल की ज़रूरत नहीं।",
      mr: "खरी गेमिंग पॉवर जोडण्याचा परवडणारा मार्ग. कमी वीज, 6GB मॉडेलला वेगळ्या पॉवर केबलची गरज नाही.",
    },
    highlights: ["RTX 3050", "6GB GDDR6", "Low power", "Dual fan"],
    specs: { chipset: "NVIDIA GeForce RTX 3050", memory: "6GB GDDR6", ports: "2× HDMI, 2× DisplayPort", power: "300W PSU recommended" },
    variants: [{ name: "Standard", mrp: 24999, price: 18999, stock: 5 }],
    weight: 1200,
    hsn: HSN.part,
    priceSource: "demo",
  },
  {
    handle: "msi-b550m-pro-vdh-wifi-motherboard",
    categories: ["motherboards"],
    brand: "MSI",
    condition: "new",
    warrantyMonths: 36,
    images: ["msi-b550m-pro-vdh-wifi.jpg"],
    title: same("MSI B550M PRO-VDH WIFI Motherboard"),
    description: {
      en: "AM4 motherboard with built-in Wi-Fi, four RAM slots and M.2 NVMe. Works with Ryzen 3000, 5000 and 5000G.",
      hi: "बिल्ट-इन Wi-Fi, चार रैम स्लॉट और M.2 NVMe वाला AM4 मदरबोर्ड। Ryzen 3000, 5000 और 5000G के साथ।",
      mr: "अंगभूत Wi-Fi, चार रॅम स्लॉट आणि M.2 NVMe असलेला AM4 मदरबोर्ड. Ryzen 3000, 5000 आणि 5000G सोबत चालतो.",
    },
    highlights: ["AM4", "Wi-Fi", "4× DDR4", "M.2 NVMe"],
    specs: { socket: "AMD AM4", chipset: "AMD B550", formFactor: "Micro-ATX", memory: "4× DDR4", connectivity: "Wi-Fi, Bluetooth" },
    variants: [{ name: "Standard", mrp: 13999, price: 9999, stock: 4 }],
    weight: 1000,
    hsn: HSN.part,
    priceSource: "demo",
  },
  {
    handle: "msi-pro-h610m-e-motherboard",
    categories: ["motherboards"],
    brand: "MSI",
    condition: "new",
    warrantyMonths: 36,
    images: ["msi-pro-h610m-e.jpg"],
    title: same("MSI PRO H610M-E Motherboard"),
    description: {
      en: "A simple, reliable board for Intel 12th to 14th Gen office PCs.",
      hi: "Intel 12वीं से 14वीं जेन ऑफ़िस पीसी के लिए सादा और भरोसेमंद बोर्ड।",
      mr: "Intel 12 व्या ते 14 व्या जेन ऑफिस पीसीसाठी साधा आणि विश्वासार्ह बोर्ड.",
    },
    highlights: ["LGA 1700", "DDR4", "M.2 NVMe", "Micro-ATX"],
    specs: { socket: "Intel LGA 1700", chipset: "Intel H610", formFactor: "Micro-ATX", memory: "2× DDR4" },
    variants: [{ name: "Standard", mrp: 9999, price: 6999, stock: 6 }],
    weight: 900,
    hsn: HSN.part,
    priceSource: "demo",
  },
  {
    handle: "gigabyte-b760m-ds3h-motherboard",
    categories: ["motherboards"],
    brand: "Gigabyte",
    condition: "new",
    warrantyMonths: 36,
    images: ["gigabyte-b760m-ds3h.jpg"],
    title: same("GIGABYTE B760M DS3H Motherboard"),
    description: {
      en: "Intel B760 board with two M.2 slots and four RAM slots. Choose the DDR4 or DDR5 version.",
      hi: "दो M.2 स्लॉट और चार रैम स्लॉट वाला Intel B760 बोर्ड। DDR4 या DDR5 वर्ज़न चुनें।",
      mr: "दोन M.2 स्लॉट आणि चार रॅम स्लॉट असलेला Intel B760 बोर्ड. DDR4 किंवा DDR5 व्हर्जन निवडा.",
    },
    highlights: ["LGA 1700", "2× M.2", "4 RAM slots", "Micro-ATX"],
    specs: { socket: "Intel LGA 1700", chipset: "Intel B760", formFactor: "Micro-ATX" },
    option: "Memory type",
    variants: [
      { name: "DDR4", mrp: 13999, price: 10999, stock: 3, specs: { memory: "4× DDR4" } },
      { name: "DDR5", mrp: 15499, price: 11999, stock: 3, specs: { memory: "4× DDR5" } },
    ],
    weight: 1000,
    hsn: HSN.part,
    priceSource: "demo",
  },
  {
    handle: "msi-mag-a650bn-power-supply",
    categories: ["power-supplies"],
    brand: "MSI",
    condition: "new",
    warrantyMonths: 60,
    images: ["msi-mag-a650bn.jpg"],
    title: same("MSI MAG A650BN 650W Power Supply"),
    description: {
      en: "A safe 80 Plus Bronze power supply with protections. Enough for an RTX 3050/4060/5060 gaming PC.",
      hi: "सुरक्षा फ़ीचर वाला 80 Plus ब्रॉन्ज़ पावर सप्लाई। RTX 3050/4060/5060 गेमिंग पीसी के लिए काफ़ी।",
      mr: "सुरक्षा फीचर्स असलेला 80 Plus ब्रॉन्झ पॉवर सप्लाय. RTX 3050/4060/5060 गेमिंग पीसीसाठी पुरेसा.",
    },
    highlights: ["650W", "80 Plus Bronze", "5-year warranty", "ATX"],
    specs: { wattage: "650W", efficiency: "80 Plus Bronze", formFactor: "ATX" },
    variants: [{ name: "Standard", mrp: 6999, price: 4299, stock: 8 }],
    weight: 2000,
    hsn: HSN.part,
    priceSource: "demo",
  },
  {
    handle: "msi-mag-forge-100r-cabinet",
    categories: ["cabinets"],
    collections: ["bestsellers"],
    brand: "MSI",
    condition: "new",
    warrantyMonths: 12,
    images: ["msi-mag-forge-100r.jpg"],
    title: same("MSI MAG FORGE 100R Gaming Cabinet"),
    description: {
      en: "Tempered glass side panel with two ARGB fans pre-installed. Good airflow for gaming builds.",
      hi: "टेम्पर्ड ग्लास साइड पैनल और पहले से लगे दो ARGB फ़ैन। गेमिंग पीसी के लिए अच्छी हवा।",
      mr: "टेम्पर्ड ग्लास साइड पॅनल आणि आधीच बसवलेले दोन ARGB फॅन्स. गेमिंग पीसीसाठी चांगली हवा.",
    },
    highlights: ["Tempered glass", "2× ARGB fans", "ATX", "Good airflow"],
    specs: { formFactor: "Mid tower, ATX / Micro-ATX", cooling: "2× ARGB fans included", ports: "USB 3.2, audio" },
    variants: [{ name: "Standard", mrp: 6999, price: 4499, stock: 6 }],
    weight: 6000,
    hsn: HSN.part,
    priceSource: "demo",
  },

  // ---------- Accessories ----------
  {
    handle: "zebronics-wireless-keyboard-mouse-combo",
    categories: ["keyboards-mice"],
    collections: ["deals"],
    brand: "Zebronics",
    condition: "new",
    warrantyMonths: 12,
    images: ["zebronics-keyboard-mouse.jpg"],
    title: same("Zebronics Wireless Keyboard & Mouse Combo"),
    description: {
      en: "Full-size wireless keyboard and mouse with one USB receiver. Clean desk, no cables.",
      hi: "एक USB रिसीवर वाला फ़ुल-साइज़ वायरलेस कीबोर्ड और माउस। साफ़ डेस्क, बिना केबल।",
      mr: "एका USB रिसीव्हरसह फुल-साइझ वायरलेस कीबोर्ड आणि माउस. स्वच्छ डेस्क, केबल नाही.",
    },
    highlights: ["Wireless", "Full size", "USB receiver", "Silent keys"],
    specs: { connectivity: "2.4 GHz wireless, USB nano receiver", inBox: "Keyboard, mouse, receiver" },
    variants: [{ name: "Standard", mrp: 1999, price: 1099, stock: 25 }],
    weight: 800,
    hsn: HSN.part,
    priceSource: "demo",
  },
  {
    handle: "hp-wireless-mouse",
    categories: ["keyboards-mice"],
    brand: "HP",
    condition: "new",
    warrantyMonths: 12,
    images: ["hp-wireless-mouse.jpg"],
    title: same("HP Wireless Mouse"),
    description: {
      en: "Comfortable wireless mouse with long battery life. Works with any laptop or PC.",
      hi: "लंबी बैटरी लाइफ़ वाला आरामदायक वायरलेस माउस। किसी भी लैपटॉप या पीसी के साथ।",
      mr: "दीर्घ बॅटरी लाइफ असलेला आरामदायक वायरलेस माउस. कोणत्याही लॅपटॉप किंवा पीसीसोबत.",
    },
    highlights: ["Wireless", "Long battery", "Plug & play", "HP warranty"],
    specs: { connectivity: "2.4 GHz wireless, USB receiver" },
    variants: [{ name: "Standard", mrp: 999, price: 599, stock: 30 }],
    weight: 200,
    hsn: HSN.part,
    priceSource: "demo",
  },
]
