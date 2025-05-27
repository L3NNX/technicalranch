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
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-all duration-300 h-[60px] ${
        darkMode 
          ? "bg-gray-900/80 border-gray-800/50" 
          : "bg-white/80 border-gray-200/50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg transition-transform hover:scale-105 ${
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
              className={`transition-colors relative group ${
                darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              About
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                darkMode ? "bg-white" : "bg-gray-900"
              }`} />
            </Link>
            <Link
              href="#videos"
              className={`transition-colors relative group ${
                darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Videos
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                darkMode ? "bg-white" : "bg-gray-900"
              }`} />
            </Link>
            <Link
              href="#contact"
              className={`transition-colors relative group ${
                darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Contact
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                darkMode ? "bg-white" : "bg-gray-900"
              }`} />
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className={`rounded-lg transition-transform hover:scale-105 ${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button 
                asChild 
                className="bg-red-600 hover:bg-red-700 text-white shadow-lg transition-transform hover:scale-105"
              >
                <Link href="https://www.youtube.com/@technicalranch1623" target="_blank">
                  <Youtube className="w-4 h-4 mr-2" />
                  Subscribe
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}