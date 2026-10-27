// Legal and help pages, in English (defines the shape for hi and mr).
// {placeholders} are filled from src/config/seller.ts and brand.ts.
// A line starting with "- " is shown as a list item.
// DRAFT: a lawyer must review this wording before launch.

export const POLICY_SLUGS = ["about", "contact", "shipping", "returns-policy", "privacy", "terms", "grievance", "faq"] as const
export type PolicySlug = (typeof POLICY_SLUGS)[number]

export type PolicyPage = {
  title: string
  /** Search engine description */
  description: string
  intro?: string
  sections: { heading: string; body: string[] }[]
}

export type PolicyTexts = {
  draft: string
  updated: string
  days: string
  pages: Record<PolicySlug, PolicyPage>
}

const en: PolicyTexts = {
  draft: "Draft for testing. This page has sample details and will be checked before the shop opens.",
  updated: "Last updated: {date}",
  days: "every day",
  pages: {
    about: {
      title: "About us",
      description: "Computer Warehouse Jalna: laptops, gaming PCs, parts, printers and repairs in Old Jalna.",
      intro: "{brand} is a multi-brand computer showroom in Old Jalna: laptops, gaming PCs, complete setups, PC parts, printers, CCTV and repairs, under one roof.",
      sections: [
        {
          heading: "Who we are",
          body: [
            "We are a local computer shop in Old Jalna, run by Amol Jagtap Patil, known for PCs built and tested in our own shop. Our customers rate us 4.9 out of 5 on Google, and more than 1.4 lakh people follow our Marathi reels on Instagram.",
            "{brand} is run by {legalName}, {address}.",
          ],
        },
        {
          heading: "What we do",
          body: [
            "- New, open box and refurbished laptops and desktops from HP, ASUS, Acer, MSI, Apple and more.",
            "- Gaming and work PCs built to your budget, assembled and stress-tested before delivery.",
            "- PC parts, monitors, printers and accessories.",
            "- Repairs, upgrades, data recovery, CCTV and networking.",
            "- Computer labs and bulk orders for schools, offices and businesses.",
          ],
        },
        {
          heading: "Our promise",
          body: [
            "- Genuine products with a GST invoice. The price you see includes GST.",
            "- Free delivery on orders of ₹{freeFrom} and above, or free pickup from our shop.",
            "- Replacement or refund for faulty or wrong items within {returnDays} days of delivery.",
            "- Cash on delivery for orders up to ₹{codMax}.",
            "- Help on WhatsApp before and after you buy.",
          ],
        },
      ],
    },
    contact: {
      title: "Contact us",
      description: "Phone, WhatsApp and address of Computer Warehouse Jalna.",
      intro: "Call, WhatsApp or visit us. We are happy to help with choosing a product, orders, delivery, warranty and repairs.",
      sections: [
        {
          heading: "Shop and customer care",
          body: ["Phone and WhatsApp: {phone}", "Email: {email}", "Open {days}, {hoursFrom} to {hoursTo}"],
        },
        {
          heading: "Visit us",
          body: ["{address}"],
        },
        {
          heading: "Seller",
          body: ["{legalName}", "GSTIN: {gstin}"],
        },
        {
          heading: "Complaints",
          body: ["If we have not solved your problem, write to our Grievance Officer (see the Grievance officer page)."],
        },
      ],
    },
    shipping: {
      title: "Shipping policy",
      description: "Delivery charges, times and cash on delivery.",
      sections: [
        {
          heading: "Where we deliver",
          body: [
            "We deliver across India through courier partners. Enter your pincode on a product page to see if we deliver there and the expected delivery date.",
          ],
        },
        {
          heading: "Delivery charges",
          body: ["- Free delivery when your items total ₹{freeFrom} or more.", "- Below that, delivery costs ₹{fee}.", "The full amount is shown before you pay."],
        },
        {
          heading: "Delivery time",
          body: [
            "Orders are usually packed within 1–2 working days. Delivery then takes about 2–7 days, depending on your pincode. The date on the product page and at checkout is an estimate.",
          ],
        },
        {
          heading: "Cash on delivery",
          body: ["Cash on delivery is available for orders up to ₹{codMax}, where the courier can collect cash. We may confirm cash orders with a code sent by SMS."],
        },
        {
          heading: "Tracking and cancelling",
          body: [
            "You get an email (and SMS) when your order is shipped, out for delivery and delivered. You can follow it under My orders.",
            "You can cancel an order from My orders until it is shipped. Online payments are then refunded in full.",
          ],
        },
      ],
    },
    "returns-policy": {
      title: "Returns and replacement policy",
      description: "What to do if an item arrives faulty, damaged or wrong.",
      sections: [
        {
          heading: "Within {returnDays} days",
          body: [
            "If an item arrives faulty, damaged or is not what you ordered, tell us within {returnDays} days of delivery. Go to My orders, open the order and choose Return or replace, or send us a WhatsApp message.",
            "Keep the item in its original box with the bill, all accessories and free gifts. Items that were used roughly, opened for repair by someone else, or damaged after delivery cannot be returned.",
          ],
        },
        {
          heading: "Replacement",
          body: [
            "For a faulty or wrong item we send you the same item again, if it is in stock, at no extra charge. If it is out of stock, we refund you instead.",
          ],
        },
        {
          heading: "Free pickup",
          body: ["After we approve your request, a courier collects the item from your delivery address. Pickup is free. In Jalna you can also bring it to our shop."],
        },
        {
          heading: "Refunds",
          body: [
            "- Paid online: the refund goes back to the card, UPI or bank you paid with, usually within 5–7 working days after we receive the item.",
            "- Cash on delivery: we send the refund to the UPI ID or bank account you give in the return form, usually within 5–7 working days after we receive the item.",
          ],
        },
        {
          heading: "Warranty after {returnDays} days",
          body: [
            "After the return period, faults are covered by the brand warranty (or our shop warranty for our own builds and refurbished items). Bring the item to our shop or message us on WhatsApp and we help you with the claim.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy policy",
      description: "What personal data we collect, why, and your rights.",
      intro:
        "This policy explains how {legalName} (\"we\") uses your personal data when you shop at {brand}, under India's Digital Personal Data Protection Act, 2023.",
      sections: [
        {
          heading: "What we collect",
          body: [
            "- Your mobile number, to log you in with a one-time code.",
            "- Your name, and email if you give it.",
            "- Delivery addresses and your orders.",
            "- For returns: the reason, any photos you add, and (for cash orders) the UPI ID or bank account for your refund.",
            "We do not see or store your card or UPI PIN details: online payments are handled by Razorpay.",
          ],
        },
        {
          heading: "Why we use it",
          body: [
            "To create your account, deliver your orders, send updates about them by email and SMS, handle returns and refunds, prevent fraud, and keep the records the law requires. We do not send advertising and we do not sell your data.",
          ],
        },
        {
          heading: "Who we share it with",
          body: [
            "Only what each one needs to do its job for us:",
            "- Razorpay (online payments)",
            "- Shiprocket and its courier partners (delivery and return pickup)",
            "- Message Central (SMS) and Resend (email)",
            "- Amazon Web Services (where our website and data are hosted)",
            "We may also share data when the law requires it.",
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            "- Account details: until you delete your account.",
            "- Orders and invoices: as long as tax law requires (usually up to 8 years), even after you delete your account.",
            "- Refund bank or UPI details: deleted as soon as the refund is sent or the request is closed.",
          ],
        },
        {
          heading: "Cookies",
          body: ["We use only the cookies the shop needs to work: your login, your cart and your language. We do not use advertising or tracking cookies."],
        },
        {
          heading: "Your rights",
          body: [
            "- See and correct your details under My account.",
            "- Delete your account under My account → Profile. Your personal details are removed at once (orders are kept, as above).",
            "- Withdraw your consent by deleting your account.",
            "- Nominate someone to act for you, or complain to our Grievance Officer: {grievanceEmail}.",
            "If you are not satisfied with our answer, you can complain to the Data Protection Board of India.",
          ],
        },
        {
          heading: "Age",
          body: ["You must be 18 or older to create an account."],
        },
        {
          heading: "Changes",
          body: ["If we change this policy, we update the date at the top and, for important changes, tell you by email or on the website."],
        },
      ],
    },
    terms: {
      title: "Terms of use",
      description: "The rules for using this website and buying from us.",
      intro: "By using this website or placing an order you agree to these terms. The seller is {legalName}, {address} (GSTIN {gstin}).",
      sections: [
        {
          heading: "Your account",
          body: ["You log in with your mobile number and a one-time code. Keep your phone safe: orders placed from your account are treated as yours."],
        },
        {
          heading: "Prices and orders",
          body: [
            "Prices are in Indian rupees and include GST. Delivery charges are shown before you pay. An order is accepted when you receive the order confirmation. We may cancel an order (and refund it in full) if an item is out of stock or the price shown was clearly wrong.",
            "Product photos may show a similar model; the specifications on the product page are what you buy. Pictures marked as representative show the kind of parts used in our own builds.",
          ],
        },
        {
          heading: "Payment",
          body: ["You can pay online through Razorpay or by cash on delivery (see the Shipping policy)."],
        },
        {
          heading: "Delivery, cancellation and returns",
          body: ["See our Shipping policy and our Returns and replacement policy."],
        },
        {
          heading: "Use of the website",
          body: ["Do not misuse the website, try to break its security, or use it for anything unlawful. The website's source code is open source (GPL-3.0); the brand name, logo and photos are not."],
        },
        {
          heading: "Liability",
          body: ["We are responsible for the products we sell as Indian consumer law requires. Nothing in these terms limits your rights under the Consumer Protection Act, 2019."],
        },
        {
          heading: "Law and disputes",
          body: ["These terms follow the laws of India. Courts at {city} have jurisdiction, without affecting your right to approach a consumer commission."],
        },
      ],
    },
    grievance: {
      title: "Grievance officer",
      description: "How to make a complaint and how we handle it.",
      intro: "Under the Consumer Protection (E-Commerce) Rules, 2020 and the Digital Personal Data Protection Act, 2023, you can raise a complaint with our Grievance Officer.",
      sections: [
        {
          heading: "Grievance Officer",
          body: ["{grievanceName}", "{legalName}, {address}", "Email: {grievanceEmail}", "Phone: {grievancePhone} ({days}, {hoursFrom} to {hoursTo})"],
        },
        {
          heading: "How we handle complaints",
          body: [
            "Please give your order number and describe the problem. We acknowledge your complaint within 48 hours and aim to resolve it within one month.",
          ],
        },
        {
          heading: "Other help",
          body: ["You can also contact the National Consumer Helpline: call 1915 or visit consumerhelpline.gov.in."],
        },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      description: "Answers about orders, delivery, payment, warranty and returns.",
      sections: [
        { heading: "Are your products genuine?", body: ["Yes. We sell sealed brand products with a GST invoice and the brand's warranty. Open box and refurbished items are clearly marked."] },
        { heading: "What do open box and refurbished mean?", body: ["Open box: the box was opened (for example a display piece or a return) but the item is unused or barely used. Refurbished: a used item that we checked part by part and restored. Both come with a warranty, shown on the product page."] },
        { heading: "Can you build a PC for my budget?", body: ["Yes. Use the Custom PC page or send us a WhatsApp message with your budget and what you will use it for. We suggest the parts, build it and test it."] },
        { heading: "Prices change often. Is the price on the site final?", body: ["The price shown when you pay is the price you pay. Computer part prices change with the market, so the price may be different on another day."] },
        { heading: "When will my order arrive?", body: ["Enter your pincode on the product page to see the expected delivery date. Most orders arrive within 2–7 days of being shipped. In Jalna you can also pick it up from our shop."] },
        { heading: "Is delivery free?", body: ["Yes, on orders of ₹{freeFrom} and above. Below that, delivery costs ₹{fee}."] },
        { heading: "Can I pay cash on delivery or with EMI?", body: ["Cash on delivery is available for orders up to ₹{codMax}. For EMI, choose credit card EMI or cardless EMI in the online payment window."] },
        { heading: "Do I get a GST invoice?", body: ["Yes, for every order. You can download it under My orders."] },
        { heading: "How do I track or cancel my order?", body: ["Log in and open My orders. You can cancel until the order is shipped."] },
        { heading: "What if the item is faulty?", body: ["Within {returnDays} days of delivery we replace it or refund you (see the Returns policy). After that, the warranty covers it and we help you with the claim."] },
      ],
    },
  },
}

export default en
