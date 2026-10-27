// Shop rules for checkout, in one place. Amounts in rupees.
// The seed uses the shipping values to create the delivery option; after
// launch, change delivery prices in the admin panel (Settings → Locations &
// Shipping) and keep these numbers in step.

export const SHOP = {
  /** Delivery is free when the items total at least this much */
  freeShippingFrom: 4999,
  /** Delivery charge below that */
  shippingFee: 99,
  /** Cash on delivery only for orders up to this total (delivery included).
   *  Kept low for computers: a refused ₹40,000 parcel costs the shop two courier trips. */
  codMaxOrder: 10000,
  /** Parcel size when a product has no weight of its own (courier bookings) */
  defaultPackage: { weightGrams: 2500, lengthCm: 45, breadthCm: 35, heightCm: 12 },
  /** Weight of one piece when the product has none */
  defaultItemGrams: 1000,
  /** Days after delivery during which a faulty or wrong item can be returned or replaced */
  returnWindowDays: 7,
} as const
