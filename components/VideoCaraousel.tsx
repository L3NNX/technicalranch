import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface Video {
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
   carouselRef: React.RefObject<HTMLDivElement | null>
}

export function VideoCarousel({
  darkMode,
  featuredVideos,
  currentVideoIndex,
  prevVideo,
  nextVideo,
  carouselRef,
}: VideoCarouselProps) {
  return (
    <section id="videos" className="px-6 lg:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className={`${darkMode ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-600"} mb-4`}
          >
            Featured Content
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Popular Videos</h2>
          <p className={`text-xl max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Discover our most watched tech reviews and tutorials
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevVideo}
              className={darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextVideo}
              className={darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="overflow-hidden" ref={carouselRef}>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentVideoIndex * (100 / 3)}%)` }}
            >
              {featuredVideos.map((video, index) => (
                <div 
                  key={index} 
                  className="flex-none w-full md:w-1/2 lg:w-1/3 px-3" // Added px-3 for consistent spacing
                >
                  <div className="h-full pb-6"> {/* Wrapper div for consistent spacing */}
                    <Card
                      className={`border hover:shadow-lg transition-all duration-300 group h-full flex flex-col ${
                        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                      }`}
                    >
                      <CardContent className="p-0 flex flex-col flex-grow">
                        <div
                          className={`relative aspect-video rounded-t-lg overflow-hidden ${
                            darkMode ? "bg-gray-700" : "bg-gray-100"
                          }`}
                        >
                          <Image
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                        </div>
                        <div className="p-6 flex-grow">
                          <h3
                            className={`font-semibold text-lg mb-2 ${
                              darkMode ? "text-white group-hover:text-gray-300" : "text-gray-900 group-hover:text-gray-600"
                            } transition-colors duration-300`}
                          >
                            {video.title}
                          </h3>
                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
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