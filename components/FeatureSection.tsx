"use client"

import { Video, Shield, Zap, Upload, Users, Smartphone } from "lucide-react"
import { useInView } from "react-intersection-observer"

const features = [
  {
    icon: Video,
    title: "High-Quality Content",
    description: "In-depth reviews and tutorials with professional production quality that respects your time.",
  },
  {
    icon: Shield,
    title: "Unbiased Reviews",
    description: "Honest analysis with zero sponsored influence. What you see is what the device actually is.",
  },
  {
    icon: Zap,
    title: "Latest Tech Coverage",
    description: "Stay ahead with coverage of the newest gadgets and technology trends as they happen.",
  },
  {
    icon: Upload,
    title: "Regular Uploads",
    description: "Fresh content delivered consistently every week. Never miss a new release again.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Engaging with viewers and addressing real tech questions from the community.",
  },
  {
    icon: Smartphone,
    title: "Hands-On Testing",
    description: "Real-world usage and practical insights for every device — not just spec sheets.",
  },
]

export function FeaturesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      id="features"
      ref={ref}
      className="px-6 lg:px-12 py-24"
      style={{ background: "var(--cp-bg)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <div className="cp-badge cp-badge-neutral mb-5">Why Choose Us</div>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2
              className="display-lg"
              style={{ color: "var(--cp-white)" }}
            >
              THE TECHNICAL RANCH
              <br />
              <span style={{ color: "var(--cp-red)" }}>DIFFERENCE</span>
            </h2>
            <p
              className="text-base max-w-xs"
              style={{ color: "var(--cp-muted)" }}
            >
              What sets our tech reviews and content apart from the rest
            </p>
          </div>
          <div className="cp-redline-full mt-6" />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--cp-border)" }}>
          {features.map((feature, i) => (
            <FeatureCell
              key={i}
              feature={feature}
              inView={inView}
              delay={i * 80}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCell({
  feature,
  inView,
  delay,
}: {
  feature: typeof features[0]
  inView: boolean
  delay: number
}) {
  const Icon = feature.icon

  return (
    <div
      className="p-8 group transition-all duration-300"
      style={{
        background: "var(--cp-surface)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, background 0.2s ease`,
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "var(--cp-surface2)")}
      onMouseLeave={e => (e.currentTarget.style.background = "var(--cp-surface)")}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded flex items-center justify-center mb-5 transition-colors duration-200"
        style={{ background: "var(--cp-red-dim)", border: "1px solid rgba(239,68,68,0.2)" }}
      >
        <Icon size={18} style={{ color: "var(--cp-red)" }} />
      </div>

      <h3
        className="text-base font-semibold mb-2"
        style={{ color: "var(--cp-text)" }}
      >
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--cp-muted)" }}>
        {feature.description}
      </p>

      {/* Bottom accent on hover */}
      <div
        className="mt-5 h-px w-0 group-hover:w-8 transition-all duration-300"
        style={{ background: "var(--cp-red)" }}
      />
    </div>
  )
}