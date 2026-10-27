import { BRAND } from "@config/brand"
import { toLocale } from "@lib/i18n/config"
import { getDictionary } from "@lib/i18n"
import { I18nProvider } from "@lib/i18n/provider"
import { getBaseURL } from "@lib/util/env"
import { Metadata, Viewport } from "next"
import { Inter, Mukta, Poppins } from "next/font/google"
import "styles/globals.css"

// Inter for English letters and numbers, Mukta for Marathi and Hindi letters (the
// browser picks each font by character). Poppins for English headings; Marathi and
// Hindi headings use Mukta bold (Poppins' Devanagari files would add ~160 KB).
// Not preloaded: phones then fetch only the files a page really uses.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-latin",
})

const mukta = Mukta({
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-sans",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-heading",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: { default: BRAND.name, template: `%s | ${BRAND.name}` },
}

export const viewport: Viewport = {
  themeColor: "#0a1430",
}

export default async function LocaleLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const locale = toLocale((await props.params).locale)

  return (
    <html lang={locale} data-mode="light" className={`${inter.variable} ${mukta.variable} ${poppins.variable}`}>
      <body className="bg-cream font-sans text-ink antialiased">
        <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
          {props.children}
        </I18nProvider>
      </body>
    </html>
  )
}
