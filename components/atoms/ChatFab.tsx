"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

interface ChatFabProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  hasUnread?: boolean;
}

export function ChatFab({
  isOpen,
  onClick,
  className,
  hasUnread = false,
}: ChatFabProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500",
        "bg-gradient-to-br from-violet-600 to-indigo-700",
        "hover:from-violet-500 hover:to-indigo-600 transition-colors",
        className,
      )}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {/* Pulse ring when unread */}
      <AnimatePresence>
        {hasUnread && !isOpen && (
          <motion.span
            key="pulse"
            className="absolute inset-0 rounded-full bg-violet-400 opacity-60"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.55, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Unread dot */}
      <AnimatePresence>
        {hasUnread && !isOpen && (
          <motion.span
            key="dot"
            className="absolute top-1 right-1 w-3 h-3 rounded-full bg-rose-500 border-2 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Icon swap */}
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="text-white"
          >
            <X size={22} strokeWidth={2.5} />
          </motion.span>
        ) : (
          <motion.span
            key="chat"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="text-white"
          >
            <BotIcon />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function BotIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Head */}
      <rect
        x="5"
        y="8"
        width="16"
        height="13"
        rx="4"
        fill="white"
        fillOpacity="0.95"
      />
      {/* Antenna */}
      <line
        x1="13"
        y1="8"
        x2="13"
        y2="4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="13" cy="3.5" r="1.5" fill="white" />
      {/* Eyes */}
      <circle cx="9.5" cy="14" r="1.8" fill="#6d28d9" />
      <circle cx="16.5" cy="14" r="1.8" fill="#6d28d9" />
      {/* Mouth */}
      <path
        d="M9.5 17.5 Q13 19.5 16.5 17.5"
        stroke="#6d28d9"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
