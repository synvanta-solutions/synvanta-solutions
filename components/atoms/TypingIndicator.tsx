"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      {/* Bot avatar */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full overflow-hidden border border-border">
        <Image
          src="/kevin.png"
          alt="Kevin Synvanta"
          width={28}
          height={28}
          className="w-full h-full object-cover"
        />
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
