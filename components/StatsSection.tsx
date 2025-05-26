interface StatsSectionProps {
  darkMode: boolean
  subscriberCount: number
  videoCount: number
  viewCount: number
}

export function StatsSection({ darkMode, subscriberCount, videoCount, viewCount }: StatsSectionProps) {
  return (
    <section className={`px-6 lg:px-12 py-20 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16">Community Milestones</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`p-8 rounded-2xl ${darkMode ? "bg-gray-900" : "bg-white"}`}>
            <div className="text-4xl font-bold mb-2">{subscriberCount.toLocaleString()}</div>
            <div className={darkMode ? "text-gray-400" : "text-gray-600"}>Subscribers</div>
          </div>
          <div className={`p-8 rounded-2xl ${darkMode ? "bg-gray-900" : "bg-white"}`}>
            <div className="text-4xl font-bold mb-2">{videoCount}</div>
            <div className={darkMode ? "text-gray-400" : "text-gray-600"}>Videos</div>
          </div>
          <div className={`p-8 rounded-2xl ${darkMode ? "bg-gray-900" : "bg-white"}`}>
            <div className="text-4xl font-bold mb-2">{viewCount.toLocaleString()}</div>
            <div className={darkMode ? "text-gray-400" : "text-gray-600"}>Total Views</div>
          </div>
        </div>
      </div>
    </section>
  )
}