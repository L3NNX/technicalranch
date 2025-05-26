import { useRef, useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useInView } from "react-intersection-observer"
import { useGesture } from "react-use-gesture"
import { cn } from "@/lib/utils"

interface Video {
  videoId: string
  title: string
  views: string
  duration: string
  thumbnail: string
}

interface VideoCarouselProps {
  darkMode: boolean
  featuredVideos: Video[]
  currentVideoIndex: number
  prevVideo: () => void
  nextVideo: () => void
  carouselRef: React.RefObject<HTMLDivElement>
}

const AUTO_PLAY_INTERVAL = 5000 // 5 seconds

export function VideoCarousel({
  darkMode,
  featuredVideos,
  currentVideoIndex,
  prevVideo,
  nextVideo,
  carouselRef,
}: VideoCarouselProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout>()
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  // Combine refs
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      // For the carousel ref
      if (carouselRef) {
        if (typeof carouselRef === 'function') {
          carouselRef(node)
        } else {
          carouselRef.current = node
        }
      }
      // For the intersection observer
      inViewRef(node)
    },
    [carouselRef, inViewRef]
  )

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevVideo()
      } else if (e.key === 'ArrowRight') {
        nextVideo()
      } else if (e.key === ' ') {
        e.preventDefault()
        setIsPaused(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevVideo, nextVideo])

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused && inView) {
      autoPlayRef.current = setInterval(nextVideo, AUTO_PLAY_INTERVAL)
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isPaused, inView, nextVideo])

  // Touch gesture handling
  const bind = useGesture({
    onDrag: ({ direction: [dx], distance, cancel }) => {
      if (distance > 50) {
        if (dx > 0) {
          prevVideo()
        } else {
          nextVideo()
        }
        cancel()
      }
    },
  })

  // Loading state handler
  useEffect(() => {
    if (featuredVideos.length > 0) {
      setIsLoading(false)
    }
  }, [featuredVideos])

  if (isLoading) {
    return (
      <section className={cn(
        "px-6 lg:px-12 py-20",
        darkMode ? "bg-gray-800" : "bg-gray-50"
      )}>
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 bg-gray-300 rounded mx-auto" />
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "aspect-video rounded-xl",
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="videos" className="px-6 lg:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className={cn(
              "mb-4",
              darkMode ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-600"
            )}
          >
            Featured Content
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Popular Videos</h2>
          <p className={cn(
            "text-xl max-w-2xl mx-auto",
            darkMode ? "text-gray-300" : "text-gray-600"
          )}>
            Discover our most watched tech reviews and tutorials
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevVideo}
                className={cn(
                  "transition-all",
                  darkMode 
                    ? "border-gray-700 hover:bg-gray-800" 
                    : "border-gray-300 hover:bg-gray-50"
                )}
                aria-label="Previous video"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextVideo}
                className={cn(
                  "transition-all",
                  darkMode 
                    ? "border-gray-700 hover:bg-gray-800" 
                    : "border-gray-300 hover:bg-gray-50"
                )}
                aria-label="Next video"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPaused(!isPaused)}
              className={cn(
                "transition-all",
                darkMode 
                  ? "border-gray-700 hover:bg-gray-800" 
                  : "border-gray-300 hover:bg-gray-50"
              )}
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div 
            className="overflow-hidden"
            ref={setRefs}
            {...bind()}
            role="region"
            aria-label="Video carousel"
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentVideoIndex * (100 / 3)}%)` }}
            >
              {featuredVideos.map((video, index) => (
                <div 
                  key={index} 
                  className="flex-none w-full md:w-1/2 lg:w-1/3 px-3"
                  role="group"
                  aria-label={`Video ${index + 1} of ${featuredVideos.length}`}
                >
                  <div className="h-full pb-6">
                    <Card
                      className={cn(
                        "border hover:shadow-lg transition-all duration-300 group h-full flex flex-col",
                        darkMode 
                          ? "bg-gray-800/80 border-gray-700 hover:bg-gray-800" 
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <CardContent className="p-0 flex flex-col flex-grow">
                        <div
                          className={cn(
                            "relative aspect-video rounded-t-lg overflow-hidden",
                            darkMode ? "bg-gray-700" : "bg-gray-100"
                          )}
                        >
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div 
                            className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded"
                            aria-label={`Duration: ${video.duration}`}
                          >
                            {video.duration}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                        </div>
                        <div className="p-6 flex-grow">
                          <h3
                            className={cn(
                              "font-semibold text-lg mb-2 line-clamp-2",
                              darkMode 
                                ? "text-white group-hover:text-gray-300" 
                                : "text-gray-900 group-hover:text-gray-600"
                            )}
                          >
                            {video.title}
                          </h3>
                          <p className={cn(
                            "text-sm",
                            darkMode ? "text-gray-400" : "text-gray-600"
                          )}>
                            {video.views}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}