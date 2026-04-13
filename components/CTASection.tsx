import Link from "next/link"
import { Youtube, ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section
      className="px-6 lg:px-12 py-24 relative overflow-hidden"
      style={{ background: "var(--cp-surface)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(42,42,42,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,42,42,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="cp-badge mb-6 mx-auto" style={{ width: "fit-content" }}>
          Join Us
        </div>

        <h2
          className="display-xl mb-6"
          style={{ color: "var(--cp-white)", fontSize: "clamp(48px, 7vw, 88px)" }}
        >
          JOIN THE
          <br />
          <span style={{ color: "var(--cp-red)" }}>COMMUNITY</span>
        </h2>

        <p
          className="text-lg mb-10 max-w-xl mx-auto"
          style={{ color: "var(--cp-muted)" }}
        >
          Subscribe to Technical Ranch for the latest tech reviews, tutorials, and insights.
          Never miss an upload.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://www.youtube.com/@technicalranch1623?sub_confirmation=1"
            target="_blank"
            className="cp-btn-primary text-base px-8 py-4"
          >
            <Youtube size={18} />
            Subscribe on YouTube
          </Link>
          <Link
            href="#videos"
            className="cp-btn-ghost text-base px-8 py-4"
          >
            Browse Videos
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}