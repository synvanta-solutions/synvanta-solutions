"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

interface ChatFabProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  hasUnread?: boolean;
  showTooltip?: boolean;
}

export function ChatFab({
  isOpen,
  onClick,
  className,
  hasUnread = false,
  showTooltip = true,
}: ChatFabProps) {
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const tipMessages = useMemo(
    () => [
      "I'll answer what you need.",
      "Ask anything about Synvanta.",
      "Quick replies, no waiting.",
    ],
    [],
  );

  useEffect(() => {
    if (!showTooltip || isOpen || isTooltipDismissed) return;
    const id = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tipMessages.length);
    }, 2000);
    return () => clearInterval(id);
  }, [showTooltip, isOpen, isTooltipDismissed, tipMessages.length]);

  return (
    <div className="relative">
      {/* Help message bubble - now positioned to the left */}
      <AnimatePresence>
        {showTooltip && !isOpen && !isTooltipDismissed && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="
              fixed bottom-25 right-6 z-50
              flex flex-col
              w-[200px]
              rounded-3xl shadow-2xl shadow-black/20
              overflow-visible
            "
            role="dialog"
          >
            <div className="relative bg-primary text-primary-foreground px-4 py-2.5 rounded-2xl shadow-lg">
              <button
                type="button"
                onClick={() => setIsTooltipDismissed(true)}
                className="absolute right-1.5 top-1.5 rounded-full p-1 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/15"
                aria-label="Dismiss chat tip"
              >
                <X size={12} />
              </button>
              <p className="text-sm font-medium">👋 Chat with Kevin!</p>
              <p className="text-xs opacity-90 mt-0.5">{tipMessages[tipIndex]}</p>
              {/* Triangle pointer - now positioned on the right side pointing to the button */}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-primary rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unread indicator with count */}
      <AnimatePresence>
        {hasUnread && !isOpen && (
          <motion.div
            key="unread-count"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 z-10 bg-rose-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center shadow-lg ring-2 ring-white"
          >
            1
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
          "bg-gradient-to-br from-primary to-primary/80",
          "hover:from-primary/90 hover:to-primary/70 transition-all duration-300",
          className,
        )}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {/* Pulse ring for attention */}
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.span
              key="pulse"
              className="absolute inset-0 rounded-full bg-primary opacity-60"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.55, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Icon/Image swap */}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-primary-foreground"
            >
              <X size={24} strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span
              key="avatar"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/50 ring-offset-1 ring-offset-primary/20"
            >
              <Image
                src="/kevin.png"
                alt="Kevin Synvanta"
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}