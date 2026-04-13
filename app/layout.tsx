import type React from "react"
import type { Metadata } from "next"
import { Inter, Barlow_Condensed } from "next/font/google"
import "./globals.css"
import { MotionProvider } from "../components/MotionProvider"

// ✅ Fonts (ONLY source of truth)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "Technical Ranch — Tech Reviews & Tutorials by Akash Halder",
  description:
    "Discover the latest in tech with Technical Ranch. In-depth reviews, tutorials, and insights on smartphones, gadgets, and technology trends by Akash Halder.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      {/* ❌ REMOVE your entire <head> block */}
      <body className={`${inter.variable} ${barlow.variable} antialiased`}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}