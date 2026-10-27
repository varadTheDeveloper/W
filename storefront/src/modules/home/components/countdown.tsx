"use client"

import { useI18n } from "@lib/i18n/provider"
import { useEffect, useState } from "react"

/** Seconds left until midnight in India (IST, UTC+5:30) */
function secondsToMidnightIST(now = Date.now()): number {
  const ist = now + 5.5 * 3600 * 1000
  const day = 24 * 3600 * 1000
  return Math.floor((day - (ist % day)) / 1000)
}

/** "Ends in 05h 12m 33s" for the deals of the day, counting to midnight IST. */
export default function Countdown({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { t } = useI18n()
  // Filled after the page loads, so the server and browser render the same first
  const [left, setLeft] = useState<number | null>(null)

  useEffect(() => {
    const tick = () => setLeft(secondsToMidnightIST())
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  const parts =
    left === null
      ? ["--", "--", "--"]
      : [Math.floor(left / 3600), Math.floor((left % 3600) / 60), left % 60].map((n) => String(n).padStart(2, "0"))
  const units = [t.home.deals.hours, t.home.deals.minutes, t.home.deals.seconds]

  return (
    <div className="flex items-center gap-2" role="timer" aria-live="off">
      <span className={`text-[13px] font-medium ${tone === "dark" ? "text-white/80" : "text-muted"}`}>{t.home.deals.endsIn}</span>
      <span className="flex items-center gap-1">
        {parts.map((p, i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="flex min-w-[2.6rem] items-baseline justify-center gap-0.5 rounded-lg bg-navy-900 px-1.5 py-1 font-heading text-[15px] font-bold tabular text-white">
              {p}
              <span className="text-[10px] font-medium text-accent-300">{units[i]}</span>
            </span>
            {i < 2 && <span className={`font-bold ${tone === "dark" ? "text-white" : "text-navy-900"}`}>:</span>}
          </span>
        ))}
      </span>
    </div>
  )
}
