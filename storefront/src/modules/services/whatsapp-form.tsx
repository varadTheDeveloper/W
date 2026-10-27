"use client"

import { whatsappLink } from "@config/brand"
import { format } from "@lib/i18n"
import { WhatsAppIcon } from "@modules/common/icons/ui"
import { useState } from "react"

export type Field =
  | { name: string; label: string; type: "text" | "textarea"; required?: boolean; placeholder?: string }
  | { name: string; label: string; type: "choice"; options: { value: string; label: string }[]; multiple?: boolean }

/**
 * A short form that opens WhatsApp with the answers filled into `template`
 * ({name} placeholders). Nothing is sent to our server.
 */
export default function WhatsAppForm({
  fields,
  template,
  submit,
  testId,
}: {
  fields: Field[]
  template: string
  submit: string
  testId?: string
}) {
  const initial = Object.fromEntries(
    fields.map((f) => [f.name, f.type === "choice" ? (f.multiple ? [] : [f.options[0]?.value ?? ""]) : ""])
  ) as Record<string, string | string[]>
  const [values, setValues] = useState(initial)

  const labelOf = (f: Field, v: string) => (f.type === "choice" ? f.options.find((o) => o.value === v)?.label ?? v : v)
  const text = format(
    template,
    Object.fromEntries(
      fields.map((f) => {
        const v = values[f.name]
        const shown = Array.isArray(v) ? v.map((x) => labelOf(f, x)).join(", ") : v
        return [f.name, shown.trim() || "-"]
      })
    )
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        window.open(whatsappLink(text), "_blank", "noopener")
      }}
      className="space-y-5"
      data-testid={testId}
    >
      {fields.map((f) => (
        <div key={f.name}>
          {f.type === "choice" ? (
            <fieldset>
              <legend className="mb-2 text-sm font-semibold">{f.label}</legend>
              <div className="flex flex-wrap gap-2">
                {f.options.map((o) => {
                  const current = values[f.name] as string[]
                  const on = current.includes(o.value)
                  return (
                    <button
                      key={o.value}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setValues((s) => ({
                          ...s,
                          [f.name]: f.multiple ? (on ? current.filter((x) => x !== o.value) : [...current, o.value]) : [o.value],
                        }))
                      }
                      className={`chip h-10 ${on ? "chip-active" : ""}`}
                    >
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ) : (
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">{f.label}</span>
              {f.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={values[f.name] as string}
                  required={f.required}
                  placeholder={f.placeholder}
                  onChange={(e) => setValues((s) => ({ ...s, [f.name]: e.target.value }))}
                  className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-[15px] focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-accent-400/50"
                />
              ) : (
                <input
                  value={values[f.name] as string}
                  required={f.required}
                  placeholder={f.placeholder}
                  onChange={(e) => setValues((s) => ({ ...s, [f.name]: e.target.value }))}
                  className="h-12 w-full rounded-xl border border-line bg-white px-3.5 text-[15px] focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-accent-400/50"
                />
              )}
            </label>
          )}
        </div>
      ))}
      <button type="submit" className="btn-whatsapp h-12 w-full">
        <WhatsAppIcon size={20} />
        {submit}
      </button>
    </form>
  )
}
