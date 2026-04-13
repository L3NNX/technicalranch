import Link from "next/link"
import Image from "next/image"
import { ArrowUp, Instagram, Twitter, Facebook, Youtube } from "lucide-react"

interface FooterProps {
  scrollToTop: () => void
}

export function Footer({ scrollToTop }: FooterProps) {
  const links = ["About", "Videos", "Contact"]
  const socials = [
    { icon: Youtube,   href: "https://www.youtube.com/@technicalranch1623" },
    { icon: Instagram, href: "https://www.instagram.com/akash.halder.5" },
    { icon: Twitter,   href: "https://x.com/AkashHalder1623" },
    { icon: Facebook,  href: "https://www.facebook.com/Akash345hal" },
  ]

  return (
    <footer
      className="px-6 lg:px-12 pt-16 pb-8"
      style={{
        background: "var(--cp-bg)",
        borderTop: "1px solid var(--cp-border)",
      }}
    >
      <div className="cp-redline-full mb-12" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Technical Ranch"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span
                className="text-base font-semibold"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em", color: "var(--cp-text)" }}
              >
                TECHNICAL RANCH
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--cp-muted)" }}>
              Your trusted source for honest tech reviews and tutorials.
              Join a growing community of tech enthusiasts.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  className="w-9 h-9 rounded flex items-center justify-center transition-all duration-150"
                  style={{
                    background: "var(--cp-surface)",
                    border: "1px solid var(--cp-border)",
                    color: "var(--cp-muted)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--cp-red)"
                    e.currentTarget.style.color = "var(--cp-red)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--cp-border)"
                    e.currentTarget.style.color = "var(--cp-muted)"
                  }}
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest mb-4"
              style={{ color: "var(--cp-red)", textTransform: "uppercase" }}
            >
              Navigation
            </h4>
            <div className="space-y-2">
              {links.map((l) => (
                <Link
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="block text-sm transition-colors duration-150"
                  style={{ color: "var(--cp-muted)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--cp-text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--cp-muted)")}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Subscribe */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest mb-4"
              style={{ color: "var(--cp-red)", textTransform: "uppercase" }}
            >
              YouTube
            </h4>
            <Link
              href="https://www.youtube.com/@technicalranch1623?sub_confirmation=1"
              target="_blank"
              className="cp-btn-primary"
              style={{ fontSize: "12px", padding: "8px 14px", display: "inline-flex" }}
            >
              <Youtube size={13} />
              Subscribe Free
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid var(--cp-border)" }}
        >
          <span className="text-xs" style={{ color: "var(--cp-muted)" }}>
            © {new Date().getFullYear()} Technical Ranch. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs transition-colors duration-150"
            style={{ color: "var(--cp-muted)", background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--cp-text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--cp-muted)")}
          >
            <ArrowUp size={13} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}