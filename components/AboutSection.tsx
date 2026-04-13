import Image from "next/image"

interface AboutSectionProps {
  videoCount: number
}

export function AboutSection({ videoCount }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="px-6 lg:px-12 py-24"
      style={{ background: "var(--cp-bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="space-y-8">
            <div>
              <div className="cp-badge cp-badge-neutral mb-5">About the Creator</div>
              <h2 className="display-lg mb-6" style={{ color: "var(--cp-white)" }}>
                MEET
                <br />
                <span style={{ color: "var(--cp-red)" }}>AKASH HALDER</span>
              </h2>
              <div className="cp-redline mb-6" />
              <p className="text-base leading-relaxed" style={{ color: "var(--cp-muted)" }}>
                Tech enthusiast and content creator passionate about delivering honest,
                detailed reviews of the latest smartphones and gadgets. Focused on
                real-world usage and practical insights that actually help you decide.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px" style={{ background: "var(--cp-border)" }}>
              <StatBox value={`${videoCount}`} label="Videos Published" />
              <StatBox value="1K+" label="Subscribers" />
              <StatBox value="100%" label="Honest Reviews" />
              <StatBox value="2+" label="Years Creating" />
            </div>

            {/* Traits */}
            <div className="space-y-2">
              {[
                "No paid promotions, ever",
                "Real-world testing on every device",
                "Community questions answered",
              ].map((trait) => (
                <div key={trait} className="flex items-center gap-3">
                  <div
                    className="w-1 h-4 rounded-full flex-shrink-0"
                    style={{ background: "var(--cp-red)" }}
                  />
                  <span className="text-sm" style={{ color: "var(--cp-muted)" }}>{trait}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Profile card */}
          <div>
            <div
              className="relative p-8 rounded overflow-hidden"
              style={{
                background: "var(--cp-surface)",
                border: "1px solid var(--cp-border)",
              }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 left-0 w-12 h-12"
                style={{
                  background: "transparent",
                  borderTop: "2px solid var(--cp-red)",
                  borderLeft: "2px solid var(--cp-red)",
                  borderRadius: "4px 0 0 0",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-12 h-12"
                style={{
                  background: "transparent",
                  borderBottom: "2px solid var(--cp-red)",
                  borderRight: "2px solid var(--cp-red)",
                  borderRadius: "0 0 4px 0",
                }}
              />

              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-28 h-28 rounded-full overflow-hidden ring-2"
                  style={{ ringColor: "var(--cp-red)" }}
                >
                  <Image
                    src="/logo.png"
                    alt="Technical Ranch Logo"
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--cp-white)" }}
                >
                  Akash Halder
                </h3>
                <p className="text-sm font-medium" style={{ color: "var(--cp-red)" }}>
                  Tech Content Creator
                </p>
                <p className="text-sm" style={{ color: "var(--cp-muted)" }}>
                  Bringing you honest tech reviews since day one
                </p>
              </div>

              {/* Divider */}
              <div className="cp-redline-full my-6" />

              {/* Channel link */}
              <a
                href="https://www.youtube.com/@technicalranch1623"
                target="_blank"
                rel="noreferrer"
                className="cp-btn-primary w-full justify-center"
                style={{ display: "flex", fontSize: "13px", padding: "10px 16px" }}
              >
                Visit YouTube Channel
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="p-6 transition-colors duration-200"
      style={{ background: "var(--cp-surface)" }}
      onMouseEnter={e => (e.currentTarget.style.background = "var(--cp-surface2)")}
      onMouseLeave={e => (e.currentTarget.style.background = "var(--cp-surface)")}
    >
      <div
        className="text-3xl font-bold mb-1"
        style={{ fontFamily: "var(--font-display)", color: "var(--cp-white)" }}
      >
        {value}
      </div>
      <div className="text-xs" style={{ color: "var(--cp-muted)" }}>{label}</div>
    </div>
  )
}