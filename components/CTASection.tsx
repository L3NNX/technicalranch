import { Button } from "@/components/ui/button"
import { ExternalLink, Youtube } from "lucide-react"
import Link from "next/link"

interface CTASectionProps {
  darkMode: boolean
}

export function CTASection({ darkMode }: CTASectionProps) {
  return (
    <section className={`px-6 lg:px-12 py-20 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`rounded-2xl p-12 border ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Join the Tech Community</h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Subscribe to Technical Ranch for the latest tech reviews, tutorials, and insights. Never miss an update!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="https://www.youtube.com/@technicalranch1623" target="_blank">
                <Youtube className="w-5 h-5 mr-2" />
                Subscribe on YouTube
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              className={`${
                darkMode ? "border-gray-700 hover:text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Watch Latest Videos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}