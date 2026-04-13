"use client"

import { ChevronLeft, ChevronRight, Play, Eye } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface Video {
  videoId: string
  title: string
  views: string
  duration: string
  thumbnail: string
}

interface VideoCarouselProps {
  featuredVideos: Video[]
  currentVideoIndex: number
  prevVideo: () => void
  nextVideo: () => void
  carouselRef: React.RefObject<HTMLDivElement | null>
}

export function VideoCarousel({
  featuredVideos,
  currentVideoIndex,
  prevVideo,
  nextVideo,
  carouselRef,
}: VideoCarouselProps) {
  if (!featuredVideos.length) return null

  const visibleCount = 3
  const progress = featuredVideos.length > 0
    ? ((currentVideoIndex + 1) / featuredVideos.length) * 100
    : 0

  return (
    <section
      id="videos"
      className="px-6 lg:px-12 py-24"
      style={{ background: "var(--cp-surface)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header row */}
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <div className="cp-badge cp-badge-neutral mb-4">Featured Content</div>
            <h2 className="display-lg" style={{ color: "var(--cp-white)" }}>
              POPULAR
              <br />
              <span style={{ color: "var(--cp-red)" }}>VIDEOS</span>
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: "var(--cp-muted)" }}>
              {currentVideoIndex + 1} / {featuredVideos.length}
            </span>
            <button
              onClick={prevVideo}
              className="w-10 h-10 rounded flex items-center justify-center transition-all duration-150"
              style={{
                background: "var(--cp-surface2)",
                border: "1px solid var(--cp-border2)",
                color: "var(--cp-text)",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--cp-red)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--cp-border2)")}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextVideo}
              className="w-10 h-10 rounded flex items-center justify-center transition-all duration-150"
              style={{
                background: "var(--cp-surface2)",
                border: "1px solid var(--cp-border2)",
                color: "var(--cp-text)",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--cp-red)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--cp-border2)")}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-px mb-8"
          style={{ background: "var(--cp-border)" }}
        >
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "var(--cp-red)" }}
          />
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={carouselRef}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentVideoIndex * (100 / visibleCount)}%)` }}
          >
            {featuredVideos.map((video, i) => (
              <div
                key={i}
                className="flex-none px-2"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function VideoCard({ video }: { video: Video }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.videoId}`}
      target="_blank"
      rel="noreferrer"
      className="block"
    >
      <div
        className="cp-card overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderColor: hovered ? "var(--cp-border2)" : "var(--cp-border)",
        }}
      >
        {/* Thumbnail */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "16/9", background: "var(--cp-surface2)" }}
        >
          <Image
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ background: "rgba(0,0,0,0.45)", opacity: hovered ? 1 : 0 }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "var(--cp-red)" }}
            >
              <Play size={18} fill="white" color="white" className="ml-0.5" />
            </div>
          </div>

          {/* Duration */}
          <div
            className="absolute bottom-2 right-2 rounded px-1.5 py-0.5"
            style={{ background: "rgba(0,0,0,0.85)", color: "#fff", fontSize: "10px", fontWeight: 600 }}
          >
            {video.duration}
          </div>
        </div>

        {/* Info */}
        <div className="p-4" style={{ background: "var(--cp-surface)" }}>
          <h3
            className="text-sm font-semibold leading-snug line-clamp-2 mb-2"
            style={{ color: hovered ? "var(--cp-white)" : "var(--cp-text)" }}
          >
            {video.title}
          </h3>
          <div className="flex items-center gap-1.5" style={{ color: "var(--cp-muted)" }}>
            <Eye size={12} />
            <span style={{ fontSize: "12px" }}>{video.views}</span>
          </div>
        </div>
      </div>
    </a>
  )
}