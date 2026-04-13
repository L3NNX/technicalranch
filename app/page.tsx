"use client"

import { useState, useEffect, useRef } from "react"
import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeatureSection"
import { VideoCarousel } from "@/components/VideoCaraousel"
import { StatsSection } from "@/components/StatsSection"
import { TestimonialsSection } from "@/components/Testimonial"
import { AboutSection } from "@/components/AboutSection"
import { CTASection } from "@/components/CTASection"
import { Footer } from "@/components/Footer"

import { formatDuration, fetchVideos, fetchChannelStats } from "@/lib/utils"

export default function TechnicalRanchLanding() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const [subscriberCount, setSubscriberCount] = useState(0)
  const [videoCount, setVideoCount] = useState(0)
  const [viewCount, setViewCount] = useState(0)

  const API_KEY    = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID

  const [featuredVideos, setFeaturedVideos] = useState<
    { videoId: string; title: string; thumbnail: string; views: string; duration: string }[]
  >([])

  const latestVideo =
    featuredVideos.length > 0
      ? {
          videoId:     featuredVideos[0].videoId,
          title:       featuredVideos[0].title,
          description: featuredVideos[0].title,
          views:       featuredVideos[0].views,
          duration:    featuredVideos[0].duration,
        }
      : null

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (!API_KEY || !CHANNEL_ID) return

    const load = async () => {
      try {
        const videos = await fetchVideos(API_KEY, CHANNEL_ID, formatDuration)
        setFeaturedVideos(videos)
        setVideoCount(videos.length)

        const stats = await fetchChannelStats(API_KEY, CHANNEL_ID)
        setSubscriberCount(stats.subscriberCount)
        setViewCount(stats.viewCount)
      } catch (e) {
        console.error("Failed to load YouTube data", e)
      }
    }

    load()
  }, [API_KEY, CHANNEL_ID])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const nextVideo = () =>
    setCurrentVideoIndex((p) => (p + 1) % featuredVideos.length)

  const prevVideo = () =>
    setCurrentVideoIndex((p) => (p - 1 + featuredVideos.length) % featuredVideos.length)

  return (
    <div style={{ background: "var(--cp-bg)", minHeight: "100vh" }}>
      <Navigation />

      <HeroSection
        isVisible={isVisible}
        subscriberCount={subscriberCount}
        videoCount={videoCount}
        viewCount={viewCount}
        latestVideo={latestVideo}
      />

      <FeaturesSection />

      <VideoCarousel
        featuredVideos={featuredVideos}
        currentVideoIndex={currentVideoIndex}
        prevVideo={prevVideo}
        nextVideo={nextVideo}
        carouselRef={carouselRef}
      />

      <StatsSection
        subscriberCount={subscriberCount}
        videoCount={videoCount}
        viewCount={viewCount}
      />

      <TestimonialsSection />

      <AboutSection videoCount={videoCount} />

      <CTASection />

      <Footer scrollToTop={scrollToTop} />
    </div>
  )
}