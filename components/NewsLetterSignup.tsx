import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

interface NewsletterSectionProps {
  darkMode: boolean
  email: string
  setEmail: (email: string) => void
  handleNewsletterSubmit: (e: React.FormEvent) => void
}

export function NewsletterSection({
  darkMode,
  email,
  setEmail,
  handleNewsletterSubmit,
}: NewsletterSectionProps) {
  return (
    <section className={`px-6 lg:px-12 py-20 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`rounded-2xl p-12 border ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
        >
          <Mail className={`w-16 h-16 mx-auto mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
          <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Get early access to reviews, exclusive content, and tech giveaways. Join our mailing list!
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`flex-1 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
            />
            <Button
              type="submit"
              className={`${darkMode ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 hover:bg-gray-800 text-white"}`}
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}