import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MotionProvider } from "../components/MotionProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Technical Ranch - Tech Reviews & Tutorials by Akash Halder",
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
      <head>
        <link
          rel="preconnect"
          href="https://www.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://img.youtube.com"
          crossOrigin="anonymous"
        />
         <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
         <body className={`${inter.className} antialiased`}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
