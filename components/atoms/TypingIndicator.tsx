"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      {/* Bot avatar */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center">
        <svg
          width="14"
          height="14"
          viewBox="0 0 26 26"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="5"
            y="8"
            width="16"
            height="13"
            rx="4"
            fill="white"
            fillOpacity="0.95"
          />
          <line
            x1="13"
            y1="8"
            x2="13"
            y2="4"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="13" cy="3.5" r="1.5" fill="white" />
          <circle cx="9.5" cy="14" r="1.8" fill="#6d28d9" />
          <circle cx="16.5" cy="14" r="1.8" fill="#6d28d9" />
        </svg>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-1 bg-muted px-3.5 py-3 rounded-2xl rounded-bl-sm">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
