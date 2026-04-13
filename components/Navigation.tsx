"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Youtube, Menu, X } from "lucide-react"

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { href: "#videos",   label: "Videos"   },
    { href: "#features", label: "Features" },
    { href: "#stats",    label: "Stats"    },
    { href: "#about",    label: "About"    },
  ]

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(17,17,17,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--cp-border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-[var(--cp-border2)] transition-all duration-200">
              <Image
                src="/logo.png"
                alt="Technical Ranch"
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
            <span
              className="font-semibold text-sm tracking-wide"
              style={{ color: "var(--cp-text)", fontFamily: "var(--font-body)" }}
            >
              Technical Ranch
            </span>
            {/* Red accent dot */}
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--cp-red)" }}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded text-sm font-medium transition-all duration-150"
                style={{ color: "var(--cp-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--cp-text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--cp-muted)")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="https://www.youtube.com/@technicalranch1623?sub_confirmation=1"
              target="_blank"
              className="cp-btn-primary hidden sm:inline-flex text-sm px-4 py-2"
              style={{ borderRadius: "4px", fontSize: "13px", padding: "8px 16px" }}
            >
              <Youtube style={{ width: 15, height: 15 }} />
              Subscribe
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded transition-colors"
              style={{ color: "var(--cp-muted)" }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-40 lg:hidden"
          style={{
            background: "rgba(17,17,17,0.98)",
            borderBottom: "1px solid var(--cp-border)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded text-sm font-medium transition-colors"
                style={{ color: "var(--cp-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--cp-text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--cp-muted)")}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://www.youtube.com/@technicalranch1623?sub_confirmation=1"
              target="_blank"
              className="cp-btn-primary mt-2"
              style={{ justifyContent: "center", fontSize: "13px", padding: "10px 16px" }}
              onClick={() => setMenuOpen(false)}
            >
              <Youtube style={{ width: 15, height: 15 }} />
              Subscribe on YouTube
            </Link>
          </div>
        </div>
      )}
    </>
  )
}