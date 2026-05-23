"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type MessageRole = "user" | "assistant";

export interface ChatMessageData {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: ChatMessageData;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn(
        "flex items-end gap-2",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center mb-0.5">
          <BotMiniIcon />
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
          isUser
            ? "bg-gradient-to-br from-violet-600 to-indigo-700 text-white rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm",
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

function BotMiniIcon() {
  return (
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
  );
}
