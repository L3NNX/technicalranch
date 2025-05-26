import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Youtube } from "lucide-react"

interface NavigationProps {
  darkMode: boolean
  setDarkMode: (mode: boolean) => void
}

export function Navigation({ darkMode, setDarkMode }: NavigationProps) {
  return (
    <nav
      className={`flex items-center justify-between p-6 lg:px-12 border-b transition-colors ${
        darkMode ? "border-gray-800" : "border-gray-100"
      }`}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
            darkMode ? "bg-white text-gray-900" : "bg-gray-900 text-white"
          }`}
        >
          TR
        </div>
        <span className="text-xl font-semibold">Technical Ranch</span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <Link
          href="#about"
          className={`transition-colors ${
            darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          About
        </Link>
        <Link
          href="#videos"
          className={`transition-colors ${
            darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Videos
        </Link>
        <Link
          href="#contact"
          className={`transition-colors ${
            darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Contact
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          className={darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
          <Link href="https://www.youtube.com/@technicalranch1623" target="_blank">
            <Youtube className="w-4 h-4 mr-2" />
            Subscribe
          </Link>
        </Button>
      </div>
    </nav>
  )
}