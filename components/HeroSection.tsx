"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, ArrowRight, Users, Video, Eye } from "lucide-react"

interface VideoData {
  videoId: string
  title: string
  description: string
  views: string
  duration: string
}

interface HeroSectionProps {
  isVisible: boolean
  subscriberCount: number
  videoCount: number
  viewCount: number
  latestVideo: VideoData | null
}

export function HeroSection({
  isVisible,
  subscriberCount,
  videoCount,
  viewCount,
  latestVideo,
}: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 px-6 lg:px-12 overflow-hidden"
      style={{ background: "var(--cp-bg)" }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(42,42,42,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,42,42,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Red accent line — top left */}
      <div
        className="absolute top-0 left-0 w-px h-32 opacity-60"
        style={{ background: "linear-gradient(to bottom, var(--cp-red), transparent)" }}
      />

      <div className="max-w-6xl mx-auto w-full py-16 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className={`space-y-8 ${isVisible ? "anim-slide-left" : "opacity-0"}`}>

            {/* Badge */}
            <div className="cp-badge">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--cp-red)" }}
              />
              Tech Reviews &amp; Tutorials
            </div>

            {/* Headline */}
            <div className="space-y-0">
              <h1
                className="display-xl"
                style={{ color: "var(--cp-white)" }}
              >
                TECHNICAL
              </h1>
              <h1
                className="display-xl"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px var(--cp-red)",
                }}
              >
                RANCH
              </h1>
              <div className="cp-redline mt-4" />
            </div>

            {/* Subtext */}
            <p
              className="text-lg leading-relaxed max-w-md"
              style={{ color: "var(--cp-muted)" }}
            >
              Honest tech reviews and tutorials by{" "}
              <span style={{ color: "var(--cp-text)", fontWeight: 500 }}>Akash Halder</span>.
              Smartphones, gadgets, and everything tech — unfiltered.
            </p>

            {/* Stats row */}
            <div
              className="flex items-center gap-6 py-4 border-y"
              style={{ borderColor: "var(--cp-border)" }}
            >
              <StatPill icon={<Users size={14} />} value={`${(subscriberCount / 1000).toFixed(1)}K`} label="Subscribers" />
              <div style={{ width: 1, height: 28, background: "var(--cp-border)" }} />
              <StatPill icon={<Video size={14} />} value={String(videoCount)} label="Videos" />
              <div style={{ width: 1, height: 28, background: "var(--cp-border)" }} />
              <StatPill icon={<Eye size={14} />} value={`${Math.round(viewCount / 1000)}K`} label="Views" />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`https://www.youtube.com/watch?v=${latestVideo?.videoId || ""}`}
                target="_blank"
                className="cp-btn-primary"
              >
                <Play size={16} fill="currentColor" />
                Watch Latest
              </Link>
              <Link
                href="https://www.youtube.com/@technicalranch1623"
                target="_blank"
                className="cp-btn-ghost"
              >
                Explore Channel
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* ── Right: Video card ── */}
          <div className={`${isVisible ? "anim-slide-right delay-200" : "opacity-0"}`}>
            {latestVideo ? (
              <VideoCard video={latestVideo} />
            ) : (
              <VideoCardSkeleton />
            )}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--cp-bg), transparent)" }}
      />
    </section>
  )
}

function StatPill({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span style={{ color: "var(--cp-muted)" }}>{icon}</span>
      <div>
        <div className="text-sm font-semibold leading-none" style={{ color: "var(--cp-text)" }}>{value}</div>
        <div className="text-xs mt-0.5" style={{ color: "var(--cp-muted)" }}>{label}</div>
      </div>
    </div>
  )
}

function VideoCard({ video }: { video: VideoData }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`https://www.youtube.com/watch?v=${video.videoId}`}
      target="_blank"
      className="block group"
    >
      <div
        className="cp-card red-glow-hover overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden" style={{ background: "var(--cp-surface2)" }}>
          <Image
            src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
          />

          {/* Play overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{
              background: "rgba(0,0,0,0.5)",
              opacity: hovered ? 1 : 0,
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "var(--cp-red)" }}
            >
              <Play size={22} fill="white" color="white" className="ml-1" />
            </div>
          </div>

          {/* Duration badge */}
          <div
            className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-xs font-semibold"
            style={{ background: "rgba(0,0,0,0.85)", color: "#fff", fontSize: "11px" }}
          >
            {video.duration}
          </div>

          {/* Latest badge */}
          <div
            className="absolute top-3 left-3 cp-badge"
            style={{ fontSize: "10px", padding: "3px 8px" }}
          >
            Latest
          </div>
        </div>

        {/* Info */}
        <div className="p-5" style={{ background: "var(--cp-surface)" }}>
          <h3
            className="font-semibold text-base leading-snug mb-2 line-clamp-2"
            style={{ color: "var(--cp-text)" }}
          >
            {video.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--cp-muted)" }}>{video.views}</span>
            <span
              className="text-xs flex items-center gap-1"
              style={{ color: "var(--cp-red)" }}
            >
              Watch now <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function VideoCardSkeleton() {
  return (
    <div className="cp-card overflow-hidden">
      <div className="aspect-video skeleton" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/3 rounded" />
      </div>
    </div>
  )
}