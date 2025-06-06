// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Moon, Sun, Youtube } from "lucide-react"
// import Image from "next/image"

// interface NavigationProps {
//   darkMode: boolean
//   setDarkMode: (mode: boolean) => void
// }

// export function Navigation({ darkMode, setDarkMode }: NavigationProps) {
//   return (
//     <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
//       <nav
//         className={`flex items-center justify-between px-8 py-4 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 w-full ${
//           darkMode 
//             ? "bg-gray-900/80 border border-gray-700/50" 
//             : "bg-white/80 border border-gray-200/50"
//         }`}
//       >
//         {/* Logo Section */}
//         <div className="flex items-center space-x-3 min-w-fit">
//           <Image
//             src="/logo.png"
//             alt="Technical Ranch Logo"
//             width={32}
//             height={32}
//             className="rounded-full flex-shrink-0"
//           />
//           <span className={`text-lg font-semibold whitespace-nowrap ${darkMode ? "text-white" : "text-gray-900"}`}>
//             Technical Ranch
//           </span>
//         </div>

//         {/* Navigation Links */}
//         <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
//           <Link
//             href="#about"
//             className={`px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
//               darkMode 
//                 ? "text-gray-300 hover:text-white hover:bg-gray-800/50" 
//                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
//             }`}
//           >
//             About
//           </Link>
//           <Link
//             href="#videos"
//             className={`px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
//               darkMode 
//                 ? "text-gray-300 hover:text-white hover:bg-gray-800/50" 
//                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
//             }`}
//           >
//             Videos
//           </Link>
//           <Link
//             href="#contact"
//             className={`px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
//               darkMode 
//                 ? "text-gray-300 hover:text-white hover:bg-gray-800/50" 
//                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
//             }`}
//           >
//             Contact
//           </Link>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center space-x-3 min-w-fit">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setDarkMode(!darkMode)}
//             className={`rounded-full transition-all duration-200 ${
//               darkMode 
//                 ? "hover:bg-gray-800/50 text-gray-300 hover:text-white" 
//                 : "hover:bg-gray-100/50 text-gray-600 hover:text-gray-900"
//             }`}
//           >
//             {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
//           </Button>
//           <Button 
//             asChild 
//             className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2 shadow-md transition-all duration-200 hover:shadow-lg whitespace-nowrap"
//           >
//             <Link href="https://www.youtube.com/@technicalranch1623?sub_confirmation=1" target="_blank">
//               <Youtube className="w-4 h-4 mr-2" />
//               <span className="hidden sm:inline">Subscribe</span>
//               <span className="sm:hidden">Sub</span>
//             </Link>
//           </Button>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               className={`rounded-full ${
//                 darkMode 
//                   ? "hover:bg-gray-800/50 text-gray-300" 
//                   : "hover:bg-gray-100/50 text-gray-600"
//               }`}
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </Button>
//           </div>
//         </div>
//       </nav>
//     </div>
//   )
// }


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Youtube } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface NavigationProps {
  darkMode: boolean
  setDarkMode: (mode: boolean) => void
}

export function Navigation({ darkMode, setDarkMode }: NavigationProps) {
   const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4 mb-24">
      <nav
        className={`flex items-center justify-between px-6 py-2.5 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 w-full ${
          darkMode 
            ? "bg-gray-900/80 border border-gray-700/50" 
            : "bg-white/80 border border-gray-200/50"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center space-x-2.5 min-w-fit">
          <Image
            src="/logo.png"
            alt="Technical Ranch Logo"
            width={28}
            height={28}
            className="rounded-full flex-shrink-0"
          />
          <span className={`text-base font-semibold whitespace-nowrap ${darkMode ? "text-white" : "text-gray-900"}`}>
            Technical Ranch
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
          <Link
            href="#about"
            className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap text-sm ${
              darkMode 
                ? "text-gray-300 hover:text-white hover:bg-gray-800/50" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
            }`}
          >
            About
          </Link>
          <Link
            href="#videos"
            className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap text-sm ${
              darkMode 
                ? "text-gray-300 hover:text-white hover:bg-gray-800/50" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
            }`}
          >
            Videos
          </Link>
          <Link
            href="#contact"
            className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap text-sm ${
              darkMode 
                ? "text-gray-300 hover:text-white hover:bg-gray-800/50" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5 min-w-fit">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className={`rounded-full transition-all duration-200 h-8 w-8 ${
              darkMode 
                ? "hover:bg-gray-800/50 text-gray-300 hover:text-white" 
                : "hover:bg-gray-100/50 text-gray-600 hover:text-gray-900"
            }`}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </Button>
          <Button 
            asChild 
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1.5 shadow-md transition-all duration-200 hover:shadow-lg whitespace-nowrap text-sm h-8"
          >
            <Link href="https://www.youtube.com/@technicalranch1623?sub_confirmation=1" target="_blank">
              <Youtube className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Subscribe</span>
              <span className="sm:hidden">Sub</span>
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
               onClick={() => setMenuOpen((open) => !open)}
              className={`rounded-full h-8 w-8 ${
                darkMode 
                  ? "hover:bg-gray-800/50 text-gray-300" 
                  : "hover:bg-gray-100/50 text-gray-600"
              }`}
            >
              <svg className={`w-4 h-4 ${darkMode ? "stroke-gray-300" : "stroke-gray-900"}`} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </nav>

         {menuOpen && (
        <div
          className={`mt-2 px-6 py-4 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 lg:hidden ${
            darkMode
              ? "bg-gray-900/90 border border-gray-700/50 text-white"
              : "bg-white/90 border border-gray-200/50 text-gray-900"
          }`}
        >
          <div className="flex flex-col space-y-4 text-sm">
            {["about", "videos", "contact"].map((id) => (
              <Link
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-md transition-all ${
                  darkMode 
                    ? "hover:bg-gray-800/50" 
                    : "hover:bg-gray-100/60"
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      )}
      
    </div>
  )
}