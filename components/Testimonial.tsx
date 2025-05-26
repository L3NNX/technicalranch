import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface Testimonial {
  name: string
  comment: string
  avatar: string
}

interface TestimonialsSectionProps {
  darkMode: boolean
}

export function TestimonialsSection({ darkMode }: TestimonialsSectionProps) {
  const testimonials: Testimonial[] = [
    {
      name: "TechLover2024",
      comment: "Best honest reviews on YouTube! Akash never disappoints with his detailed analysis.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "GadgetGuru",
      comment: "I always wait for Technical Ranch videos before buying any new gadget. Trustworthy!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "SmartBuyer",
      comment: "Clear, concise, and super informative. Highly recommend this channel to all tech enthusiasts.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "TechFan88",
      comment: "Akash's videos helped me choose the perfect laptop. Thanks for the amazing insights!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "GizmoGeek",
      comment: "Fantastic content and always up-to-date with the latest tech trends!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    // Add more if needed
  ]

  return (
    <section className="px-6 lg:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Viewers Say</h2>
          <p className={`text-xl max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Real feedback from our amazing community
          </p>
        </div>

        <div className="overflow-hidden w-full">
          <div className="space-y-6 mask-fade">
            {[false, true].map((reverse, idx) => (
              <div
                key={idx}
                className={`flex gap-6 will-change-transform ${
                  reverse ? "animate-marquee-reverse" : "animate-marquee"
                }`}
              >
                {[...testimonials, ...testimonials].map((testimonial, i) => (
                  <Card
                    key={`${idx}-${i}`}
                    className={`w-80 shrink-0 rounded-xl p-6 border ${
                      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    }`}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-3 mb-4">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {testimonial.name}
                        </span>
                      </div>
                      <p className={`italic ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        &quot;{testimonial.comment}&quot;
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
