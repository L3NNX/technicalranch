import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface VideoData {
  videoId: string
  title: string
  description: string
  views: string
  duration: string
}

interface HeroSectionProps {
  darkMode: boolean
  isVisible: boolean
  subscriberCount: number
  videoCount: number
  latestVideo: VideoData | null
}

export function HeroSection({ darkMode, isVisible, subscriberCount, videoCount, latestVideo, }: HeroSectionProps) {
  return (
    <section className="relative px-6 lg:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 ${isVisible ? "animate-in slide-in-from-left duration-1000" : "opacity-0"}`}>
            <div className="space-y-6">
              <Badge
                variant="outline"
                className={`${darkMode ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-600"}`}
              >
                Tech Reviews & Tutorials
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Technical
                <br />
                <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Ranch</span>
              </h1>
              <p className={`text-xl leading-relaxed max-w-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Honest tech reviews and tutorials by Akash Halder. Discover insights on smartphones, gadgets, and the
                latest technology trends.
              </p>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Users className={`w-5 h-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                <span className="text-lg font-semibold">{subscriberCount.toLocaleString()}</span>
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Subscribers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Video className={`w-5 h-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                <span className="text-lg font-semibold">{videoCount}</span>
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Videos</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className={`${darkMode ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 hover:bg-gray-800 text-white"}`}
              >
                <Link href={`https://www.youtube.com/watch?v=${latestVideo?.videoId || ""}`} target="_blank">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Latest Video
                </Link>
              </Button>
              <Button
                size="lg"
                className={`${darkMode ? "border-gray-700 hover:text-white hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
              >
                Explore Channel
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <HeroVideoPreview darkMode={darkMode} isVisible={isVisible} latestVideo={latestVideo} />
        </div>
      </div>
    </section>
  )
}

function HeroVideoPreview({ darkMode, isVisible, latestVideo, }: { darkMode: boolean; isVisible: boolean, latestVideo: VideoData | null }) {
  if (!latestVideo) {
    return null
  }

  return (
    <div
      className={`relative ${isVisible ? "animate-in slide-in-from-right duration-1000 delay-300" : "opacity-0"}`}
    >
      <div
        className={`rounded-2xl p-8 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
      >
        <div
          className={`aspect-video rounded-xl flex items-center justify-center mb-6 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
        >
          {/* You can replace this with an actual thumbnail */}
          <Image
            src={`https://img.youtube.com/vi/${latestVideo.videoId}/mqdefault.jpg`}
            alt={latestVideo.title}
            width={480}
            height={270}
            className="rounded-xl object-cover w-full h-full"
          />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">{latestVideo.title}</h3>
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              {latestVideo.description || "Check out the latest video from Technical Ranch!"}
          </p>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}> {latestVideo.views}</span>
            <Badge
              variant="secondary"
              className={`${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}
            >
               {latestVideo.duration}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}