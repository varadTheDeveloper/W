import { getDictionary } from "@lib/i18n"
import { toLocale } from "@lib/i18n/config"
import { Metadata } from "next"
import Image from "next/image"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const t = getDictionary((await props.params).locale)
  return { title: t.credits.title, robots: { index: false } }
}

/** Where the product photos come from (full list: public/products/SOURCES.md). */
const SOURCES: { brand: string; site: string; photos: string[] }[] = [
  { brand: "AMD", site: "https://www.amd.com", photos: ["amd-ryzen-5.jpg", "amd-ryzen-7.jpg", "amd-ryzen-7-7700x.jpg"] },
  { brand: "Intel", site: "https://www.intel.com", photos: ["intel-core-i5.jpg", "intel-core-i7.jpg"] },
  { brand: "NVIDIA / ASUS", site: "https://www.nvidia.com", photos: ["rtx-5060.jpg"] },
  { brand: "HP", site: "https://www.hp.com", photos: ["hp-15s.jpg", "hp-victus-15.jpg", "hp-pavilion-14.jpg", "hp-elitebook-840.jpg", "hp-smart-tank-580.jpg", "hp-wireless-mouse.jpg", "hp-victus-15l-desktop.jpg"] },
  { brand: "Apple", site: "https://www.apple.com", photos: ["apple-mac-mini.jpg", "apple-macbook-air-13.jpg"] },
  { brand: "Canon", site: "https://in.canon", photos: ["canon-pixma-g3012.jpg", "canon-pixma-g2012.jpg", "canon-lbp122dw.jpg"] },
  { brand: "Brother", site: "https://www.brother.in", photos: ["brother-dcp-t420w.jpg"] },
  { brand: "ASUS", site: "https://in.store.asus.com", photos: ["asus-vivobook-15.jpg"] },
  { brand: "Acer", site: "https://www.acer.com", photos: ["acer-aspire-7.jpg"] },
  { brand: "MSI", site: "https://www.msi.com", photos: ["msi-thin-gf63.jpg", "msi-g244f.jpg", "msi-g274f.jpg", "msi-pro-mp241x.jpg", "msi-rtx-5060-ti.jpg", "msi-b550m-pro-vdh-wifi.jpg", "msi-pro-h610m-e.jpg", "msi-mag-a650bn.jpg", "msi-mag-forge-100r.jpg"] },
  { brand: "GIGABYTE", site: "https://www.gigabyte.com", photos: ["gigabyte-b760m-ds3h.jpg", "gigabyte-rtx-3050.jpg"] },
  { brand: "Zebronics", site: "https://zebronics.com", photos: ["zebronics-keyboard-mouse.jpg"] },
]

export default async function CreditsPage(props: Props) {
  const locale = toLocale((await props.params).locale)
  const t = getDictionary(locale)

  return (
    <div className="content-container py-8 small:py-12">
      <h1 className="heading-lg">{t.credits.title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{t.credits.intro}</p>
      <ul className="mt-8 grid gap-4 small:grid-cols-2">
        {SOURCES.map((s) => (
          <li key={s.brand} className="rounded-2xl border border-line bg-white p-4">
            <p className="font-heading font-semibold">
              {s.brand} ·{" "}
              <a href={s.site} rel="noopener" className="text-sm font-normal text-navy-700 underline underline-offset-4">
                {s.site.replace("https://", "")}
              </a>
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.photos.map((file) => (
                <li key={file} className="relative h-16 w-16 overflow-hidden rounded-lg border border-line bg-white">
                  <Image src={`/products/${file}`} alt="" fill sizes="64px" className="object-contain p-1" />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
