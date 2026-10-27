import { Dictionary } from "@lib/i18n"

/** Product option titles are English keys in the catalogue ("Configuration", "Memory"…); shown translated. */
export function optionTitle(title: string, t: Dictionary): string {
  return (t.optionNames as Record<string, string>)[title] ?? title
}
