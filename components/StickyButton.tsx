import { Button } from "@/components/ui/button"
import { ArrowUp, Youtube } from "lucide-react"
import Link from "next/link"

interface StickyButtonsProps {
  darkMode: boolean
  showScrollTop: boolean
  scrollToTop: () => void
}

export function StickyButtons({ darkMode, showScrollTop, scrollToTop }: StickyButtonsProps) {
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button asChild className="bg-red-600 hover:bg-red-700 text-white shadow-lg">
          <Link href="https://www.youtube.com/@technicalranch1623" target="_blank">
            <Youtube className="w-4 h-4 mr-2" />
            Subscribe
          </Link>
        </Button>
      </div>

      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          onClick={scrollToTop}
          className={`fixed bottom-6 left-6 z-50 shadow-lg ${
            darkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-white border-gray-300 hover:bg-gray-50"
          }`}
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      )}
    </>
  )
}