"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

interface StatsSectionProps {
  subscriberCount: number
  videoCount: number
  viewCount: number
}

function useAnimatedValue(target: number, inView: boolean, delay = 0) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => {
      const start = performance.now()
      const duration = 1800
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setValue(Math.floor(target * ease))
        if (p < 1) requestAnimationFrame(tick)
        else setValue(target)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(timer)
  }, [inView, target, delay])

  return value
}

export function StatsSection({ subscriberCount, videoCount, viewCount }: StatsSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const subs  = useAnimatedValue(subscriberCount, inView, 0)
  const vids  = useAnimatedValue(videoCount,      inView, 150)
  const views = useAnimatedValue(viewCount,        inView, 300)

  const stats = [
    { value: subs,  suffix: "+", label: "Subscribers",   sub: "and growing" },
    { value: vids,  suffix: "",  label: "Videos",         sub: "published" },
    { value: views, suffix: "+", label: "Total Views",    sub: "across all videos" },
  ]

  return (
    <section
      id="stats"
      ref={ref}
      className="px-6 lg:px-12 py-24 relative overflow-hidden"
      style={{ background: "var(--cp-bg)" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(239,68,68,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="cp-badge cp-badge-neutral mb-5 mx-auto" style={{ width: "fit-content" }}>
            By The Numbers
          </div>
          <h2 className="display-lg" style={{ color: "var(--cp-white)" }}>
            COMMUNITY <span style={{ color: "var(--cp-red)" }}>MILESTONES</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--cp-border)" }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-12 text-center group transition-colors duration-200"
              style={{
                background: "var(--cp-surface)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms, background 0.2s`,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--cp-surface2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--cp-surface)")}
            >
              <div
                className="display-xl mb-2"
                style={{ color: "var(--cp-white)", fontSize: "clamp(48px, 6vw, 80px)" }}
              >
                {stat.value.toLocaleString()}
                <span style={{ color: "var(--cp-red)" }}>{stat.suffix}</span>
              </div>
              <div className="text-base font-semibold mb-1" style={{ color: "var(--cp-text)" }}>
                {stat.label}
              </div>
              <div className="text-sm" style={{ color: "var(--cp-muted)" }}>{stat.sub}</div>
              <div
                className="mt-6 mx-auto w-0 group-hover:w-12 h-px transition-all duration-300"
                style={{ background: "var(--cp-red)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}