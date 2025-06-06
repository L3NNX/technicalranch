import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Upload, 
  Shield, 
  Smartphone, 
  Video, 
  Zap,
  Users
} from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  delay: number
}

interface FeaturesSectionProps {
  darkMode: boolean
}

export function FeaturesSection({ darkMode }: FeaturesSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const features: Feature[] = [
    {
      icon: Video,
      title: "High-Quality Content",
      description: "In-depth reviews and tutorials with professional production quality",
      delay: 0,
    },
    {
      icon: Shield,
      title: "Unbiased Reviews",
      description: "Honest, detailed analysis without any sponsored influence",
      delay: 100,
    },
    {
      icon: Zap,
      title: "Latest Tech Coverage",
      description: "Stay updated with the newest gadgets and technology trends",
      delay: 200,
    },
    {
      icon: Upload,
      title: "Regular Updates",
      description: "Fresh content delivered consistently every week",
      delay: 300,
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Engaging with viewers and addressing their tech questions",
      delay: 400,
    },
    {
      icon: Smartphone,
      title: "Hands-on Testing",
      description: "Real-world usage and practical insights for every device",
      delay: 500,
    },
  ]

  return (
    <section 
      ref={ref}
      className={cn(
        "px-6 lg:px-12 py-20",
        darkMode ? "bg-gray-800/50" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className={cn(
              "mb-4",
              darkMode ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-600"
            )}
          >
            Why Choose Us
          </Badge>
          <h2 className="text-4xl font-bold mb-6">
            The Technical Ranch Difference
          </h2>
          <p className={cn(
            "text-xl max-w-2xl mx-auto",
            darkMode ? "text-gray-300" : "text-gray-600"
          )}>
            What sets our tech reviews and content apart from the rest
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={cn(
                "border transition-all duration-500 transform",
                darkMode ? "bg-gray-900/50 border-gray-700 hover:bg-gray-900/80" : "bg-white border-gray-200 hover:bg-transparent",
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ 
                transitionDelay: `${feature.delay}ms`,
              }}
            >
              <CardContent className="p-6">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <feature.icon className={cn(
                    "w-6 h-6",
                    darkMode ? "text-gray-300" : "text-gray-700"
                  )} />
                </div>
                <h3 className={cn(
                  "text-xl font-semibold mb-3",
                  darkMode ? "text-white" : "text-gray-900"
                )}>
                  {feature.title}
                </h3>
                <p className={cn(
                  "text-sm leading-relaxed",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}