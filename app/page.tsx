"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatedBackground } from "@/components/AnimatedBackground"
import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeatureSection"
import { VideoCarousel } from "@/components/VideoCaraousel"
import { StatsSection } from "@/components/StatsSection"
import { TestimonialsSection } from "@/components/Testimonial"
import { NewsletterSection } from "@/components/NewsLetterSignup"
import { AboutSection } from "@/components/AboutSection"
import { CTASection } from "@/components/CTASection"
import { Footer } from "@/components/Footer"
import { StickyButtons } from "@/components/StickyButton"

// Import helper utils
import {
  formatDuration,
  animateCounter,
  fetchVideos,
  fetchChannelStats,
} from "@/lib/utils" // adjust path if needed

export default function TechnicalRanchLanding() {
  const [isVisible, setIsVisible] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [email, setEmail] = useState("")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Animated counters
  const [subscriberCount, setSubscriberCount] = useState(0)
  const [videoCount, setVideoCount] = useState(0)
  const [viewCount, setViewCount] = useState(0)

  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID

  useEffect(() => {
    setIsVisible(true)

    setTimeout(() => {
      animateCounter(1020, setSubscriberCount)
      animateCounter(183, setVideoCount)
      animateCounter(250000, setViewCount)
    }, 500)

    // Scroll listener for back to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [featuredVideos, setFeaturedVideos] = useState<
    {
      videoId: string
      title: string
      thumbnail: string
      views: string
      duration: string
    }[]
  >([])

  const latestVideo = featuredVideos.length > 0 ? {
  videoId: featuredVideos[0].videoId,
  title: featuredVideos[0].title,
  description: featuredVideos[0].title, 
  views: featuredVideos[0].views,
  duration: featuredVideos[0].duration,
} : null


  useEffect(() => {
    if (!API_KEY || !CHANNEL_ID) {
      console.error("Missing YouTube API key or Channel ID")
      return
    }

    const loadVideos = async () => {
      try {
        const videos = await fetchVideos(API_KEY, CHANNEL_ID, formatDuration)
        setFeaturedVideos(videos)
        setVideoCount(videos.length)

        const stats = await fetchChannelStats(API_KEY, CHANNEL_ID)
        setSubscriberCount(stats.subscriberCount)
        setViewCount(stats.viewCount)
      } catch (error) {
        console.error("Failed to fetch videos or stats", error)
      }
    }

    loadVideos()
  }, [API_KEY, CHANNEL_ID])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % featuredVideos.length)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + featuredVideos.length) % featuredVideos.length)
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter signup:", email)
    setEmail("")
    alert("Thanks for subscribing!")
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <AnimatedBackground darkMode={darkMode} />

      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <HeroSection
        darkMode={darkMode}
        isVisible={isVisible}
        subscriberCount={subscriberCount}
        videoCount={videoCount}
        latestVideo={latestVideo}
      />

      <FeaturesSection darkMode={darkMode} />

      <VideoCarousel
        darkMode={darkMode}
        featuredVideos={featuredVideos}
        currentVideoIndex={currentVideoIndex}
        prevVideo={prevVideo}
        nextVideo={nextVideo}
        carouselRef={carouselRef}
      />

      <StatsSection
        darkMode={darkMode}
        subscriberCount={subscriberCount}
        videoCount={videoCount}
        viewCount={viewCount}
      />

      <TestimonialsSection darkMode={darkMode} />

      <NewsletterSection
        darkMode={darkMode}
        email={email}
        setEmail={setEmail}
        handleNewsletterSubmit={handleNewsletterSubmit}
      />

      <AboutSection darkMode={darkMode} videoCount={videoCount} />

      <CTASection darkMode={darkMode} />

      <Footer darkMode={darkMode} scrollToTop={scrollToTop} />

      <StickyButtons
        darkMode={darkMode}
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />
    </div>
  )
}
