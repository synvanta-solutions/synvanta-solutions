"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChatHeader } from "@/components/molecules/ChatHeader";
import { ChatMessageList } from "@/components/molecules/ChatMessageList";
import { ChatInput } from "@/components/molecules/ChatInput";
import { ChatMessageData } from "@/components/atoms/ChatMessage";
import { Sheet, SheetContent } from "@/components/ui/sheet";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop: Floating popup
  if (!isMobile) {
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
              fixed bottom-25 right-6 z-50
              flex flex-col
              w-[380px] h-[560px]
              rounded-3xl shadow-2xl shadow-black/20
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

            <ChatMessageList
              messages={messages}
              isTyping={isTyping}
              onQuickPrompt={onSend}
            />

            <ChatInput onSend={onSend} disabled={isTyping} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Mobile: Full-height sheet
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        side="bottom" 
        className="
          p-0 h-[100vh] rounded-t-3xl
          border-t border-border
          bg-background
          flex flex-col
        "
      >
        <div className="flex flex-col h-[80vh]">
          <ChatHeader
            title={title}
            subtitle={subtitle}
            onClose={onClose}
            onClear={onClear}
          />

          <ChatMessageList
            messages={messages}
            isTyping={isTyping}
            onQuickPrompt={onSend}
          />

          <ChatInput onSend={onSend} disabled={isTyping} />
        </div>
      </SheetContent>
    </Sheet>
  );
}