"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 via-orange-400 to-pink-500">
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md"></div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main loader container */}
      <div className="relative flex flex-col items-center gap-8 p-8">
        {/* Primary spinning loader */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-32 h-32 border-4 border-white/20 rounded-full animate-spin border-t-white/80 border-r-white/60"></div>

          {/* Middle rotating ring - opposite direction */}
          <div
            className="absolute inset-2 w-28 h-28 border-4 border-purple-300/30 rounded-full animate-spin border-b-purple-300/80 border-l-purple-300/60"
            style={{
              animationDirection: "reverse",
              animationDuration: "2s",
            }}
          ></div>

          {/* Inner pulsing core */}
          <div className="absolute inset-6 w-20 h-20 bg-gradient-to-r from-white/20 to-purple-300/20 rounded-full backdrop-blur-sm animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Floating dots animation */}
        <div className="flex gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-white to-purple-300 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.5s",
              }}
            />
          ))}
        </div>

        {/* Glass morphism container for text */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
          {/* Loading text with gradient animation */}
          <h2 className="text-2xl font-bold text-white arabic-text text-center mb-4 relative">
            <span className="relative z-10">جاري التحميل...</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded"></div>
          </h2>

          {/* Animated loading dots */}
          <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Orbiting elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60 orbit-animation"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`,
              }}
            />
          ))}
        </div>

        {/* Floating particles around the loader */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-ping"
              style={{
                left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 15}%`,
                top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 15}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS animations using global styles */}
      <style jsx global>{`
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(100px)
              rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(100px)
              rotate(-360deg);
          }
        }

        .orbit-animation {
          animation: orbit linear infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
