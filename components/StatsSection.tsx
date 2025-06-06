import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface Stat {
  value: number
  label: string
  prefix?: string
  suffix?: string
}

interface StatsSectionProps {
  darkMode: boolean
  subscriberCount: number
  videoCount: number
  viewCount: number
  isLoading?: boolean
  error?: string
}

function animateValue(start: number, end: number, duration: number, setValue: (value: number) => void) {
  const startTimestamp = performance.now()
  
  const updateValue = (timestamp: number) => {
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    const easeProgress = 1 - Math.pow(1 - progress, 3) // Cubic ease-out
    const currentValue = Math.floor(start + (end - start) * easeProgress)
    setValue(currentValue)
    
    if (progress < 1) {
      requestAnimationFrame(updateValue)
    }
  }
  
  requestAnimationFrame(updateValue)
}

function StatCard({ 
  stat, 
  darkMode, 
  inView, 
  delay 
}: { 
  stat: Stat
  darkMode: boolean
  inView: boolean
  delay: number 
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        animateValue(0, stat.value, 2000, setDisplayValue)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [inView, stat.value, delay])

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-700 transform group hover:scale-105",
        darkMode 
          ? "bg-gray-900/50 border-gray-700 hover:bg-gray-900/80" 
          : "bg-white/80 border-gray-200 hover:shadow-lg",
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20",
          darkMode 
            ? "bg-gradient-to-br from-blue-500 to-purple-600" 
            : "bg-gradient-to-br from-gray-100 to-blue-100"
        )}
      />
      <div className="relative p-8 text-center">
        <div className="flex items-center justify-center space-x-1">
          {stat.prefix && (
            <span className={cn(
              "text-4xl md:text-5xl font-bold",
              darkMode ? "text-gray-300" : "text-gray-900"
            )}>
              {stat.prefix}
            </span>
          )}
          <span className={cn(
            "text-4xl md:text-5xl font-bold tracking-tight",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            {displayValue.toLocaleString()}
          </span>
          {stat.suffix && (
            <span className={cn(
              "text-4xl md:text-5xl font-bold",
              darkMode ? "text-gray-300" : "text-gray-900"
            )}>
              {stat.suffix}
            </span>
          )}
        </div>
        <p className={cn(
          "mt-4 text-sm font-medium",
          darkMode ? "text-gray-400" : "text-gray-600"
        )}>
          {stat.label}
        </p>
      </div>
    </Card>
  )
}

export function StatsSection({
  darkMode,
  subscriberCount,
  videoCount,
  viewCount,
  isLoading = false,
  error,
}: StatsSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const stats: Stat[] = [
    {
      value: subscriberCount,
      label: "Growing Subscribers",
      prefix: "",
      suffix: "+",
    },
    {
      value: videoCount,
      label: "Videos Published",
    },
    {
      value: viewCount,
      label: "Total Video Views",
      suffix: "+",
    },
  ]

  if (error) {
    return (
      <div className={cn(
        "px-6 lg:px-12 py-20 text-center",
        // darkMode ? "bg-gray-800/50" : "bg-gray-50/80"
        darkMode ? "bg-gray-800/50" : "bg-transparent"
      )}>
        <p className="text-red-500">Error loading statistics: {error}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={cn(
        "px-6 lg:px-12 py-20",
        // darkMode ? "bg-gray-800/50" : "bg-gray-50/80"
        darkMode ? "bg-gray-800/50" : "bg-transparent"
      )}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className={cn(
                  "animate-pulse",
                  darkMode ? "bg-gray-900/50 border-gray-700" : "bg-white/80 border-gray-200"
                )}
              >
                <div className="p-8">
                  <div className={cn(
                    "h-10 w-32 mx-auto rounded",
                    darkMode ? "bg-gray-800" : "bg-gray-200"
                  )} />
                  <div className={cn(
                    "h-4 w-24 mx-auto mt-4 rounded",
                    darkMode ? "bg-gray-800" : "bg-gray-200"
                  )} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      ref={ref}
      className={cn(
        "px-6 lg:px-12 py-20 relative overflow-hidden",
        darkMode ? "bg-gray-800/50" : "bg-transparent"
        // darkMode ? "bg-gray-800/50" : "bg-gray-50/80"
      )}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className={cn(
              "mb-4",
              darkMode ? "border-gray-700 text-gray-300" : "border-gray-500 text-gray-700"
            )}
          >
            Our Growth
          </Badge>
          <h2 className={cn(
            "text-4xl font-bold mb-6",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            Community Milestones
          </h2>
          <p className={cn(
            "text-xl max-w-2xl mx-auto",
            darkMode ? "text-gray-300" : "text-gray-600"
          )}>
            Growing together with our tech-savvy community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              darkMode={darkMode}
              inView={inView}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}