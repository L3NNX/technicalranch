import Image from "next/image"

const testimonials = [
  {
    name: "TechLover2024",
    comment: "Best honest reviews on YouTube! Akash never disappoints with his detailed analysis.",
    avatar: "https://i.pravatar.cc/40?u=techlover2024",
  },
  {
    name: "GadgetGuru",
    comment: "I always wait for Technical Ranch videos before buying any new gadget. Trustworthy!",
    avatar: "https://i.pravatar.cc/40?u=gadgetguru",
  },
  {
    name: "SmartBuyer",
    comment: "Clear, concise, and super informative. Highly recommend this channel to all tech enthusiasts.",
    avatar: "https://i.pravatar.cc/40?u=smartbuyer",
  },
  {
    name: "TechFan88",
    comment: "Akash's videos helped me choose the perfect laptop. Thanks for the amazing insights!",
    avatar: "https://i.pravatar.cc/40?u=techfan88",
  },
  {
    name: "GizmoGeek",
    comment: "Fantastic content and always up-to-date with the latest tech trends!",
    avatar: "https://i.pravatar.cc/40?u=gizmogeek",
  },
  {
    name: "ReviewFanatic",
    comment: "The depth of analysis is incredible. No other channel comes close to this quality.",
    avatar: "https://i.pravatar.cc/40?u=reviewfanatic",
  },
]

export function TestimonialsSection() {
  const doubled = [...testimonials, ...testimonials]

  return (
    <section
      className="py-24 overflow-hidden"
      style={{ background: "var(--cp-surface)" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-14">
        <div className="cp-badge cp-badge-neutral mb-5">Community</div>
        <h2 className="display-lg" style={{ color: "var(--cp-white)" }}>
          WHAT VIEWERS <span style={{ color: "var(--cp-red)" }}>SAY</span>
        </h2>
        <div className="cp-redline mt-4" />
      </div>

      <div className="space-y-5">
        {[false, true].map((reverse, idx) => (
          <div
            key={idx}
            className={`flex gap-4 mask-fade ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
            style={{ willChange: "transform" }}
          >
            {doubled.map((t, i) => (
              <TestimonialCard key={`${idx}-${i}`} testimonial={t} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div
      className="flex-none w-80 p-5 rounded"
      style={{
        background: "var(--cp-surface2)",
        border: "1px solid var(--cp-border)",
      }}
    >
      {/* Quote mark */}
      <div
        className="text-3xl font-bold leading-none mb-3"
        style={{ color: "var(--cp-red)", fontFamily: "Georgia, serif", opacity: 0.6 }}
      >
        "
      </div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--cp-muted)" }}>
        {testimonial.comment}
      </p>
      <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid var(--cp-border)" }}>
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-sm font-medium" style={{ color: "var(--cp-text)" }}>
          {testimonial.name}
        </span>
      </div>
    </div>
  )
}