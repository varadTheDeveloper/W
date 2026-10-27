import { readFileSync } from "fs"
import path from "path"
import { financialYear, gstRate, GST_STATE_CODES, gstSummary } from "../gst"

describe("GST on computers", () => {
  it("is 18% for computers, parts, monitors and printers", () => {
    for (const hsn of ["8471", "8473", "8528", "8443"]) expect(gstRate(hsn)).toBe(18)
  })

  it("splits CGST + SGST in the seller's state and adds up to what was paid", () => {
    const s = gstSummary(
      [
        { description: "Wireless mouse", hsn: "8473", quantity: 2, total: 1198 },
        { description: "Laptop", hsn: "8471", quantity: 1, total: 36990 },
      ],
      99,
      "27",
      "27"
    )
    expect(s.intraState).toBe(true)
    expect(s.igst).toBe(0)
    expect(s.lines[0]).toMatchObject({ rate: 18, taxable: 1015.25, cgst: 91.38, sgst: 91.37 })
    expect(s.lines[2]).toMatchObject({ description: "Delivery charges", hsn: "9965", rate: 18 })
    expect(s.total).toBe(1198 + 36990 + 99)
    expect(Math.round((s.taxable + s.cgst + s.sgst) * 100) / 100).toBe(s.total)
  })

  it("uses IGST for other states", () => {
    const s = gstSummary([{ description: "Wireless mouse", hsn: "8473", quantity: 1, total: 599 }], 0, "27", "29")
    expect(s.intraState).toBe(false)
    expect(s.lines[0]).toMatchObject({ cgst: 0, sgst: 0, igst: 91.37, taxable: 507.63 })
  })

  it("knows every state the shop's address form offers", () => {
    const source = readFileSync(path.resolve(__dirname, "../../../../storefront/src/lib/india.ts"), "utf8")
    const block = source.slice(source.indexOf("INDIAN_STATES"), source.indexOf("]", source.indexOf("INDIAN_STATES")))
    const states = [...block.matchAll(/"([^"]+)"/g)].map((m) => m[1])
    expect(states.length).toBeGreaterThan(30)
    expect(states.filter((s) => !GST_STATE_CODES[s])).toEqual([])
  })

  it("dates invoices in the Indian financial year (IST)", () => {
    expect(financialYear(new Date("2026-04-01T00:00:00+05:30"))).toBe("2026-27")
    expect(financialYear(new Date("2026-03-31T23:59:00+05:30"))).toBe("2025-26")
    expect(financialYear(new Date("2027-01-15T10:00:00Z"))).toBe("2026-27")
  })
})
