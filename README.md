# Computer Warehouse Jalna – online shop

Online shop for **Computer Warehouse Jalna**, a multi-brand computer showroom in Old Jalna, Maharashtra:
laptops, gaming PCs, complete setups, PC parts, monitors, printers, repairs and custom PC builds.
Marathi (default), Hindi and English. Open source under the GPL-3.0 (see `LICENSE`).

Started from [varadTheDeveloper/e-commerce](https://github.com/varadTheDeveloper/e-commerce) (commit `61efde3`),
the same Medusa + Next.js shop, turned from clothing into computers. Shop research (Instagram, Google listing,
photo sources): [varadTheDeveloper/C](https://github.com/varadTheDeveloper/C), branch `research-data`.

**Before launch the shop must confirm:** every price (all prices are demo prices; 11 come from the shop's
own Instagram offer posts), stock, the legal name, GSTIN and emails (`config/seller.ts` in both apps), and the
condition of the HP EliteBook 840 G7 (listed as refurbished) and other demo details. Real photos of the shop's
own PC builds should replace the representative pictures.

```
backend/      Medusa v2 server + admin panel (TypeScript, Postgres, Redis)   http://localhost:9000  (admin: /app)
storefront/   Next.js shop                                                   http://localhost:8000
```

Both started from Medusa's MIT-licensed starters; see `CREDITS.md`.

Shop addresses carry the language: `/mr/...` (Marathi, default), `/hi/...`, `/en/...`.
Visitors without one are sent to their saved or browser language, else Marathi.

## Run it locally

Needs Node 20+ (22 recommended), Docker, and Yarn (`corepack enable` once).

```
docker compose up -d                        # Postgres 16 + Redis 7

cd backend
copy .env.template .env                     # Windows (macOS/Linux: cp)
yarn install
npx medusa db:migrate
yarn seed                                   # demo catalogue: 43 computer products, India region, ₹ prices, mr/hi/en text
npx medusa user -e you@example.com -p <password>   # first admin user
yarn dev                                    # http://localhost:9000/app

cd ../storefront
copy .env.template .env.local
# Put the publishable key in NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY:
#   admin panel -> Settings -> Publishable API Keys
yarn install
yarn dev                                    # http://localhost:8000
```

## Checks (also run on GitHub for every push and pull request)

```
cd backend;    yarn build; yarn typecheck; yarn test:unit; yarn test:integration:http
cd storefront; yarn typecheck; yarn lint; yarn test; yarn build   # build needs the backend running
cd storefront; yarn start; yarn test:e2e     # browser tests (desktop + phone); backend seeded, with OTP_TEST_CODE=123456
                                             # and the fake Razorpay (see "Checkout and payments")
```

Browser tests need Chromium once: `npx playwright install chromium`.

The backend tests create and drop their own database. They read `DB_HOST`, `DB_USERNAME` and `DB_PASSWORD`.

## Where things are

| What | Where |
|---|---|
| Shop name, phones, WhatsApp, address, hours, Google rating, Instagram | `storefront/src/config/brand.ts` |
| Category pictures, home page tiles, menu links, opening hours text | `storefront/src/config/categories.ts` |
| Delivery charge, free-delivery amount, COD limit | `backend/src/config/shop.ts` |
| Seller details on GST invoices, pickup address for couriers | `backend/src/config/seller.ts` |
| Texts of order emails and SMS (mr/hi/en) | `backend/src/notifications/messages.ts` |
| Colours (signboard red `brand`, yellow `accent`, `navy`) | `storefront/tailwind.config.js` |
| Shop texts in mr / hi / en | `storefront/src/lib/i18n/dictionaries/` |
| Demo products (specs, prices, Hindi/Marathi text) | `backend/src/scripts/data/catalogue.ts` |
| Product photos and their sources | `storefront/public/products/` (`SOURCES.md`), banner cut-outs in `public/hero/` |

Product, category and collection text in Hindi and Marathi is stored with Medusa's translation module
(editable in the admin panel). Model names and technical specs stay in English, as on every Indian electronics shop.

Product facts live in product metadata (editable in the admin): `brand`, `condition` (`new` | `open-box` |
`refurbished`), `warranty_months`, `highlights` (list), `specs` (key → value; keys are translated on the site,
see `specs` in the dictionaries), `badge` (`bestseller` | `new` | `hot`), `collections` (extra collection
handles such as `deals`, `diwali`), `representative_photo`. A product with several configurations has one
option (e.g. "Configuration") and each variant may carry its own `specs` in its metadata (processor, RAM…).

Photos are official brand photos (none from Amazon or Flipkart). Pictures of the shop's own builds and setups
(`pc-*.jpg`, `setup-*.jpg`) and the transparent banner pictures are made from them by
`storefront/scripts/make-setup-photos.py` and are labelled as representative on the product page.
The seed links photos as `STOREFRONT_URL/products/…`; the site serves those as local files.

The home page banners and offers are in `storefront/src/app/[locale]/(main)/page.tsx` and
`storefront/src/modules/home/`. The custom PC, repair and business pages send their forms to WhatsApp
(nothing is stored on the server).

## Customer login (phone codes)

Customers log in with their mobile number and a 6-digit SMS code; staff log in to the admin
with email and password. For development, `backend/.env` has `SMS_PROVIDER=console`: no SMS
is sent and the code is printed in the backend log. Set `OTP_TEST_CODE=123456` to make every
code 123456 (tests use this; it is ignored in production). Real SMS: Message Central
(no DLT paperwork; `SMS_PROVIDER=messagecentral`) or your own DLT registration + MSG91
(`SMS_PROVIDER=msg91`). Steps for both: `docs/SETUP-SMS.md`.

## Checkout and payments

Customers log in (phone code), choose a saved address or add one, and pay online with Razorpay
or by cash on delivery (orders up to ₹10,000, confirmed by SMS code). Delivery is ₹99, free from ₹4,999.
GST is 18% on everything the shop sells today (`backend/src/lib/gst.ts`).
After the order they can download a GST invoice (PDF). Shop rules: `backend/src/config/shop.ts`;
seller details for invoices: `backend/src/config/seller.ts` (placeholders). Setup steps for
Razorpay, the webhook and GST: `docs/SETUP-PAYMENTS.md`.

To try online payment without Razorpay keys, run the fake Razorpay and start the backend with test keys:

```
cd backend
node integration-tests/fake-razorpay.js     # http://127.0.0.1:9911
# in backend/.env: RAZORPAY_KEY_ID=rzp_test_fake  RAZORPAY_KEY_SECRET=fake-secret  RAZORPAY_API_BASE=http://127.0.0.1:9911
```

(The real Razorpay payment window will not open with these keys; the browser tests replace it.)

## Delivery and order updates

Staff ship an order from the admin panel (**Create fulfillment**): this books the courier with Shiprocket.
Customers see the delivery date for their pincode, follow the parcel on their order page, can cancel until it is
shipped, and get emails/SMS at each step. Setup: `docs/SETUP-SHIPPING.md`. For local testing without Shiprocket:
`node integration-tests/fake-shiprocket.js` (port 9912) and, in `backend/.env`,
`SHIPROCKET_EMAIL=api@example.com SHIPROCKET_PASSWORD=fake-password SHIPROCKET_API_BASE=http://127.0.0.1:9912`.
With the fake, pincodes starting with 9 are not served and those starting with 8 have no cash on delivery.

## Returns and replacement

Within 7 days of delivery, customers ask for a refund or a replacement (the same item) from their order page. Staff decide in the
admin panel (**Returns**); approving books a free courier pickup. Online payments are refunded through Razorpay when
the item comes back; cash-on-delivery refunds are sent by staff to the customer's UPI ID or bank account. How staff
handle orders, cancellations and returns: `docs/STAFF-GUIDE.md`.

## Legal pages and privacy

About, contact, shipping, returns, privacy, terms, grievance officer and FAQ pages in mr/hi/en. The seller details
in `storefront/src/config/seller.ts` are placeholders, and the pages show a "draft" notice until a lawyer has checked
them. Customers agree to the privacy policy when they sign up, and can delete their account from their profile
(orders are kept for tax records).

## Quality

Phone speed, accessibility and security checks, with results and what is left: `docs/QUALITY.md`.
The browser tests include an accessibility check (axe), a keyboard-only purchase, a speed budget and one full
"golden path" from search to refund.

## Server (test copy on AWS)

One small EC2 server runs everything in Docker: Caddy (HTTPS), the website, Medusa, Postgres and Redis. GitHub
Actions builds the images, and the website sits behind a demo password. Step by step: `docs/EC2-SETUP.md`.

## Secrets

Keys live only in `.env` / `.env.local` files (git-ignored) and in AWS Secrets Manager in production.
In production the server refuses to start without real `JWT_SECRET`, `COOKIE_SECRET`, `OTP_SECRET`, `REDIS_URL`,
the `RAZORPAY_*` and `SHIPROCKET_*` values and the email settings, or with the console SMS provider or a
test-only API address.
