// Seller details printed on GST invoices. The shop name, address and phone are
// from the shop's signboard and Google listing. The legal name and GSTIN are
// PLACEHOLDERS: the shop must give the real ones before launch (the GSTIN is
// public information, so it may live in this public repository).

export const SELLER = {
  /** Shop name in emails and SMS (same STORE_NAME the seed uses; placeholder until the brand is named) */
  brandName: process.env.STORE_NAME || "Computer Warehouse Jalna",
  legalName: "Computer Warehouse (legal name to confirm)",
  address: ["Shop No. 17 & 18, Vitthala Tower, Shani Mandir Chowk, Old Jalna", "Jalna, Maharashtra 431213"],
  gstin: "27AAAAA0000A1Z5",
  /** GST state code of the seller (27 = Maharashtra) */
  stateCode: "27",
  state: "Maharashtra",
  email: "support@example.com",
  /** Pickup address as named in the Shiprocket panel (Settings → Pickup addresses), and its pincode */
  pickupLocation: "Primary",
  pickupPincode: "431213",
  /** Where returned items are sent (usually the same place as the pickup address) */
  warehouse: {
    name: "Computer Warehouse Jalna",
    address: "Shop No. 17 & 18, Vitthala Tower, Shani Mandir Chowk, Old Jalna",
    city: "Jalna",
    state: "Maharashtra",
    pincode: "431213",
    phone: "9307570781",
  },
  /** Invoice numbers look like CW/2026-27/000123 (max 16 characters) */
  invoicePrefix: "CW",
} as const
