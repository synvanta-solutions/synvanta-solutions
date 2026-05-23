"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChatHeader } from "@/components/molecules/ChatHeader";
import { ChatMessageList } from "@/components/molecules/ChatMessageList";
import { ChatInput } from "@/components/molecules/ChatInput";
import { ChatMessageData } from "@/components/atoms/ChatMessage";

interface ChatWindowProps {
  isOpen: boolean;
  messages: ChatMessageData[];
  isTyping?: boolean;
  onSend: (text: string) => void;
  onClose: () => void;
  onClear?: () => void;
  title?: string;
  subtitle?: string;
}

export function ChatWindow({
  isOpen,
  messages,
  isTyping = false,
  onSend,
  onClose,
  onClear,
  title,
  subtitle,
}: ChatWindowProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="chat-window"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="
            flex flex-col
            w-[360px] h-[520px]
            rounded-2xl shadow-2xl shadow-black/20
            border border-border
            bg-background
            overflow-hidden
          "
          role="dialog"
          aria-label="Chat with AI assistant"
          aria-modal="true"
        >
          <ChatHeader
            title={title}
            subtitle={subtitle}
            onClose={onClose}
            onClear={onClear}
          />

          <ChatMessageList messages={messages} isTyping={isTyping} />

          <ChatInput onSend={onSend} disabled={isTyping} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
