"use client";

import { useEffect, useRef } from "react";
import { ChatMessage, ChatMessageData } from "@/components/atoms/ChatMessage";
import { TypingIndicator } from "@/components/atoms/TypingIndicator";
import { AnimatePresence } from "framer-motion";

interface ChatMessageListProps {
  messages: ChatMessageData[];
  isTyping?: boolean;
  onQuickPrompt?: (text: string) => void;
}

export function ChatMessageList({
  messages,
  isTyping = false,
  onQuickPrompt,
}: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const quickPrompts = [
    "What services does Synvanta offer?",
    "Can you show me recent work?",
    "How do I get started?",
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto py-4 space-y-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6 py-8">
          <div>
            <p className="text-2xl font-bold *:text-foreground">Hi there! 👋</p>
            <p className="text-md text-foreground mt-1 leading-relaxed">
              I'm your Synvanta assistant. Ask me anything and I'll help fast.
            </p>
          </div>
          {/* Quick prompts */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {quickPrompts.map((q) => (
              <button
                key={q}
                type="button"
                disabled={isTyping}
                onClick={() => onQuickPrompt?.(q)}
                className="text-xs px-2.5 py-1.5 rounded-full border border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {q}
              </button>
            ))}
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
