// import { ReactNode } from "react"

// interface AnimatedBackgroundProps {
//   darkMode: boolean
//   children?: ReactNode
// }

// export function AnimatedBackground({ darkMode, children }: AnimatedBackgroundProps) {
//   return (
//     <div className="fixed inset-0 overflow-hidden pointer-events-none">
//       <div
//         className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
//           darkMode ? "bg-blue-500" : "bg-gray-200"
//         }`}
//         style={{
//           top: "10%",
//           left: "10%",
//           animationDelay: "0s",
//           animationDuration: "4s",
//         }}
//       />
//       <div
//         className={`absolute w-80 h-80 rounded-full blur-3xl opacity-15 animate-pulse ${
//           darkMode ? "bg-purple-500" : "bg-gray-300"
//         }`}
//         style={{
//           top: "60%",
//           right: "10%",
//           animationDelay: "2s",
//           animationDuration: "6s",
//         }}
//       />
//       {children}
//     </div>
//   )
// }


'use client'
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedBackgroundProps {
  darkMode: boolean
  children?: ReactNode
}
import React, { useEffect, useState } from 'react';

export function AnimatedBackground({ darkMode, children }: AnimatedBackgroundProps)  {
  const [bubbles, setBubbles] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const generateBubbles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      style: {
        ['--bubble-left-offset' as string]: `${Math.random() * 100}vw`,
        ['--bubble-radius' as string]: `${Math.random() * 3 + 2}vw`,
        ['--bubble-float-duration' as string]: `${Math.random() * 5 + 7}s`,
        ['--bubble-sway-duration' as string]: `${Math.random() * 4 + 4}s`,
        ['--bubble-float-delay' as string]: `${Math.random() * 5}s`,
        ['--bubble-sway-delay' as string]: `${Math.random() * 5}s`,
        ['--bubble-sway-type' as string]: Math.random() > 0.5 ? "sway-left-to-right" : "sway-right-to-left",
      } as React.CSSProperties
    }));
    setBubbles(generateBubbles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Bubble background */}
      <div className={`absolute inset-0 z-0 bubbles ${darkMode ? 'dark' : 'light'}`}>
        {bubbles.map((bubble) => (
          <div key={bubble.id} className="bubble" style={bubble.style} />
        ))}
      </div>

      {/* Radial gradient mask */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center ${
          darkMode ? 'bg-black' : 'bg-white'
        } [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`}
      />

      {children}
    </div>
  );
}

// export function AnimatedBackground({ darkMode, children }: AnimatedBackgroundProps) {
//   return (
//     <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//       {/* Grid Background */}
//       <div
//         className={cn(
//           "absolute inset-0 z-0",
//           "[background-size:40px_40px]",
//           darkMode
//             ? "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
//             : "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
//         )}
//       />

//       {/* Radial gradient mask for faded effect */}
//       <div
//         className={cn(
//           "pointer-events-none absolute inset-0 flex items-center justify-center",
//           "[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
//           darkMode ? "bg-black" : "bg-white",
//         )}
//       />

//       {/* Animated background blobs */}
//       <div
//         className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse z-0 ${
//           darkMode ? "bg-blue-500" : "bg-gray-200"
//         }`}
//         style={{
//           top: "10%",
//           left: "10%",
//           animationDelay: "0s",
//           animationDuration: "4s",
//         }}
//       />
//       <div
//         className={`absolute w-80 h-80 rounded-full blur-3xl opacity-15 animate-pulse z-0 ${
//           darkMode ? "bg-purple-500" : "bg-gray-300"
//         }`}
//         style={{
//           top: "60%",
//           right: "10%",
//           animationDelay: "2s",
//           animationDuration: "6s",
//         }}
//       />

//       {children}
//     </div>
//   )
// }
