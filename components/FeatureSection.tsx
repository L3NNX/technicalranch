import { Card, CardContent } from "@/components/ui/card"
import { Upload, Shield, Smartphone } from "lucide-react"

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

interface FeaturesSectionProps {
  darkMode: boolean
}

export function FeaturesSection({ darkMode }: FeaturesSectionProps) {
  const features: Feature[] = [
    {
      icon: Upload,
      title: "Consistent Uploads",
      description: "Regular content every week",
    },
    {
      icon: Shield,
      title: "Trusted Insights",
      description: "Unbiased, honest reviews",
    },
    {
      icon: Smartphone,
      title: "Latest Tech",
      description: "Covering the newest devices",
    },
  ]

  return (
    <section className={`px-6 lg:px-12 py-20 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Why Choose Technical Ranch?</h2>
          <p className={`text-xl max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            What makes our tech reviews stand out from the crowd
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`text-center p-8 border ${
                darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
              } hover:shadow-lg transition-all duration-300`}
            >
              <CardContent className="p-0">
                <feature.icon className={`w-12 h-12 mx-auto mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
