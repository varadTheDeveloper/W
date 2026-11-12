/**
 * Shop settings in one place: name, contact details and the policy values shown
 * on the site. Colours live in tailwind.config.js (`brand` red, `accent` yellow, `navy`).
 *
 * Details come from the shop's signboard, Instagram and Google listing
 * (research in varadTheDeveloper/C, branch research-data, October 2026).
 * Policy values (returns, free delivery) are shown on the site, so they must
 * match what the shop actually offers. Set a value to null to hide it.
 */
export const BRAND = {
  name: "Computer Warehouse Jalna",
  /** Text logo: name, then "Jalna Multi-brand +" (English on every language, like a brand name) */
  logo: { name: "Computer Warehouse", place: "Jalna", extra: "Multi-brand" },
  /** Shop tagline from its posts: "Your trust, our responsibility!" */
  tagline: { mr: "तुमचा विश्वास, आमची जबाबदारी!", hi: "आपका विश्वास, हमारी ज़िम्मेदारी!", en: "Your trust, our responsibility!" },
  /** Free delivery from this items total in rupees, or null if not offered.
   *  Must match SHOP.freeShippingFrom in backend/src/config/shop.ts (a test checks it). */
  freeDeliveryFrom: 4999 as number | null,
  /** Delivery charge below freeDeliveryFrom (SHOP.shippingFee) */
  shippingFee: 99,
  /** Cash on delivery for orders up to this total (SHOP.codMaxOrder) */
  codMaxOrder: 10000,
  /** SHOP.returnWindowDays: faulty or wrong items can be returned or replaced */
  returnDays: 7,
  cashOnDelivery: true,
  sourceCodeUrl: "https://github.com/varadTheDeveloper/W",

  /** WhatsApp number with country code, digits only (confirmed by the shop) */
  whatsapp: "919307570781",
  phones: [
    { name: "Amol Jagtap", number: "9307570781" },
    { name: "Krushna Jagtap", number: "8888479687" },
  ],
  address: {
    line1: "Shop No. 17 & 18, Vitthala Tower",
    line2: "Shani Mandir Chowk, Old Jalna",
    city: "Jalna, Maharashtra 431213",
  },
  /** Opening hours, every day (Google listing) */
  hours: { from: "9:00", to: "22:30" },
  map: {
    lat: 19.8394922,
    lng: 75.8820408,
    /** Google Maps listing (reviews, photos) */
    placeUrl: "https://maps.google.com/?cid=4897079765035030415",
  },
  /** Google rating as shown on the listing; update now and then */
  google: { rating: 4.9, reviews: 284 },
  instagram: [
    { handle: "computer_warehouse02", url: "https://www.instagram.com/computer_warehouse02/", followers: 113000 },
    { handle: "computer_warehouse_jalna", url: "https://www.instagram.com/computer_warehouse_jalna/", followers: 36400 },
  ],
  facebook: "https://www.facebook.com/search/top?q=computer%20warehouse%20jalna",
  /** Brands on the shop's signboard */
  brands: [
    "Apple", "HP", "Dell", "ASUS", "Lenovo", "MSI", "Acer", "Samsung",
    "Microsoft", "Gigabyte", "Intel", "AMD", "Zebronics", "Epson", "Canon", "Brother",
  ],
}

/** Opens WhatsApp with a ready-made message */
export function whatsappLink(text?: string): string {
  return `https://wa.me/${BRAND.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`
}

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${BRAND.map.lat},${BRAND.map.lng}`

/** Total Instagram followers, e.g. 149400 */
export const instagramFollowers = BRAND.instagram.reduce((sum, a) => sum + a.followers, 0)
