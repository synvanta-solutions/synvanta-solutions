"use client";

import { useEffect, useRef } from "react";
import { ChatMessage, ChatMessageData } from "@/components/atoms/ChatMessage";
import { TypingIndicator } from "@/components/atoms/TypingIndicator";
import { AnimatePresence } from "framer-motion";

interface ChatMessageListProps {
  messages: ChatMessageData[];
  isTyping?: boolean;
}

export function ChatMessageList({
  messages,
  isTyping = false,
}: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6 py-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <svg
              width="28"
              height="28"
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
          <div>
            <p className="text-sm font-medium text-foreground">Hi there! 👋</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              I'm your AI assistant. Ask me anything — I'm here to help.
            </p>
          </div>
          {/* Quick prompts */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {["Getting started", "How can you help?", "Show me an example"].map(
              (q) => (
                <span
                  key={q}
                  className="text-xs px-2.5 py-1.5 rounded-full border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/40 cursor-pointer hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors"
                >
                  {q}
                </span>
              ),
            )}
          </div>
        </div>
      )}

      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator key="typing" />}
      </AnimatePresence>

      <div ref={bottomRef} />
    </div>
  );
}
