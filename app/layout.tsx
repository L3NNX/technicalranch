import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { LazyMotion, domAnimation } from "framer-motion"

const inter = Inter({ subsets: ["latin"] })

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

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
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <LazyMotion features={domAnimation} strict>
            {children}
          </LazyMotion>
        </QueryClientProvider>
      </body>
    </html>
  )
}