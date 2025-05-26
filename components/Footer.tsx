import Link from "next/link"
import { ArrowUp, Youtube, Instagram, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FooterProps {
  darkMode: boolean
  scrollToTop: () => void
}

export function Footer({ darkMode, scrollToTop }: FooterProps) {
  return (
    <footer className={`px-6 lg:px-12 py-12 border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                  darkMode ? "bg-white text-gray-900" : "bg-gray-900 text-white"
                }`}
              >
                TR
              </div>
              <span className="text-lg font-semibold">Technical Ranch</span>
            </div>
            <p className={`max-w-md ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Your trusted source for honest tech reviews and tutorials. Join our community of tech enthusiasts!
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="#about"
                className={`block transition-colors ${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                About
              </Link>
              <Link
                href="#videos"
                className={`block transition-colors ${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Videos
              </Link>
              <Link
                href="#contact"
                className={`block transition-colors ${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className={`transition-colors ${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Youtube className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className={`transition-colors ${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className={`transition-colors ${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className={`transition-colors ${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col md:flex-row justify-between items-center pt-8 border-t ${
            darkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className={`text-sm mb-4 md:mb-0 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            © 2024 Technical Ranch. All rights reserved.
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className={`${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  )
}