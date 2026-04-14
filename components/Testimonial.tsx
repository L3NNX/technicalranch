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

// Card width + gap in px — must match the values used in JSX below
const CARD_W = 320
const GAP    = 16
// How far to translate = one full set of original items
const SHIFT  = (CARD_W + GAP) * testimonials.length

export function TestimonialsSection() {
  // Triple so there is always content filling the screen in both directions
  const tripled = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section
      className="py-24"
      style={{ background: "var(--cp-surface)", overflow: "hidden" }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-14">
        <div className="cp-badge cp-badge-neutral mb-5">Community</div>
        <h2 className="display-lg" style={{ color: "var(--cp-white)" }}>
          WHAT VIEWERS <span style={{ color: "var(--cp-red)" }}>SAY</span>
        </h2>
        <div className="cp-redline mt-4" />
      </div>

      {/* Marquee rows */}
      <div className="space-y-5">
        {[false, true].map((reverse, idx) => (
          // mask-fade on the viewport wrapper — NOT on the moving strip
          <div
            key={idx}
            style={{
              overflow: "hidden",
              width: "100%",
              maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: `${GAP}px`,
                width: "max-content",
                willChange: "transform",
                animation: `${reverse ? "tr-reverse" : "tr-forward"} 40s linear infinite`,
              }}
            >
              {tripled.map((t, i) => (
                <TestimonialCard key={`${idx}-${i}`} testimonial={t} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Scoped keyframes using the exact pixel shift */}
      <style>{`
        @keyframes tr-forward {
          from { transform: translateX(0px); }
          to   { transform: translateX(-${SHIFT}px); }
        }
        @keyframes tr-reverse {
          from { transform: translateX(-${SHIFT}px); }
          to   { transform: translateX(0px); }
        }
      `}</style>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: `${CARD_W}px`,
        padding: "20px",
        borderRadius: "6px",
        background: "var(--cp-surface2)",
        border: "1px solid var(--cp-border)",
      }}
    >
      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          lineHeight: 1,
          marginBottom: "12px",
          color: "var(--cp-red)",
          fontFamily: "Georgia, serif",
          opacity: 0.6,
        }}
      >
        &quot;
      </div>
      <p
        style={{
          fontSize: "13px",
          lineHeight: 1.6,
          marginBottom: "16px",
          color: "var(--cp-muted)",
        }}
      >
        {testimonial.comment}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          paddingTop: "12px",
          borderTop: "1px solid var(--cp-border)",
        }}
      >
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={32}
          height={32}
          style={{ borderRadius: "50%" }}
        />
        <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--cp-text)" }}>
          {testimonial.name}
        </span>
      </div>
    </div>
  )
}