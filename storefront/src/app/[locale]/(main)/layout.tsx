import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getAccountWishlist } from "@lib/data/wishlist"
import { getDictionary } from "@lib/i18n"
import { WishlistProvider } from "@lib/wishlist"
import BottomNav from "@modules/layout/components/header/bottom-nav"
import { bagCount } from "@modules/layout/components/header/bag-link"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import Footer from "@modules/layout/templates/footer"
import Header, { navCategories } from "@modules/layout/templates/header"
import WhatsAppFloat from "@modules/layout/components/whatsapp-float"
import { toLocale } from "@lib/i18n/config"

export default async function PageLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const locale = toLocale((await props.params).locale)
  const t = getDictionary(locale)
  const [customer, cart, categories, count, wishlist] = await Promise.all([
    retrieveCustomer(),
    retrieveCart(),
    navCategories(locale),
    bagCount(),
    getAccountWishlist(),
  ])

  return (
    <WishlistProvider loggedIn={!!customer} initial={customer ? wishlist : null}>
      <Header locale={locale} t={t} customerName={customer?.first_name} />
      {customer && cart && <CartMismatchBanner customer={customer} cart={cart} />}
      <main id="main" className="min-h-[60vh]">
        {props.children}
      </main>
      <Footer t={t} locale={locale} categories={categories} />
      <WhatsAppFloat />
      <BottomNav bagCount={count} />
    </WishlistProvider>
  )
}
