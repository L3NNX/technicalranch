import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface AboutSectionProps {
  darkMode: boolean
  videoCount: number
}

export function AboutSection({ darkMode, videoCount }: AboutSectionProps) {
  return (
    <section id="about" className="px-6 lg:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <Badge
                variant="outline"
                className={`${darkMode ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-600"} mb-4`}
              >
                About Creator
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Meet Akash Halder</h2>
              <p className={`text-xl leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Tech enthusiast and content creator passionate about bringing you honest, detailed reviews of the
                latest smartphones and gadgets. With a focus on real-world usage and practical insights.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div
                className={`rounded-xl p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
              >
                <div className="text-3xl font-bold mb-2">{videoCount}</div>
                <div className={darkMode ? "text-gray-400" : "text-gray-600"}>Videos Published</div>
              </div>
              <div
                className={`rounded-xl p-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
              >
                <div className="text-3xl font-bold mb-2">1K+</div>
                <div className={darkMode ? "text-gray-400" : "text-gray-600"}>Subscribers</div>
              </div>
            </div>
          </div>

          <CreatorProfile darkMode={darkMode} />
        </div>
      </div>
    </section>
  )
}

function CreatorProfile({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="relative">
      <div
        className={`rounded-2xl p-8 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
      >
        <div
          className={`aspect-square rounded-xl flex items-center justify-center mb-6 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
        >
          
            <div
            className={`w-32 h-32 rounded-full overflow-hidden ${
              darkMode ? "bg-white invert" : "bg-gray-900"
            }`}
          >
            <Image
              src="/logo.png"
              alt="Technical Ranch Logo"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">Akash Halder</h3>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Tech Content Creator</p>
          <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
            Bringing you honest tech reviews since day one
          </p>
        </div>
      </div>
    </div>
  )
}