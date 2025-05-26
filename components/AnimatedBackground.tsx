import { ReactNode } from "react"

interface AnimatedBackgroundProps {
  darkMode: boolean
  children?: ReactNode
}

export function AnimatedBackground({ darkMode, children }: AnimatedBackgroundProps) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
          darkMode ? "bg-blue-500" : "bg-gray-200"
        }`}
        style={{
          top: "10%",
          left: "10%",
          animationDelay: "0s",
          animationDuration: "4s",
        }}
      />
      <div
        className={`absolute w-80 h-80 rounded-full blur-3xl opacity-15 animate-pulse ${
          darkMode ? "bg-purple-500" : "bg-gray-300"
        }`}
        style={{
          top: "60%",
          right: "10%",
          animationDelay: "2s",
          animationDuration: "6s",
        }}
      />
      {children}
    </div>
  )
}