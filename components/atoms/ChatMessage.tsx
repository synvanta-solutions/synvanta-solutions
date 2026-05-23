"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import Image from "next/image";

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
        "flex items-end gap-2 px-4 first:pt-2 last:pb-2",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full overflow-hidden mb-0.5 border border-border">
          <Image
            src="/kevin.png"
            alt="Kevin Synvanta"
            width={28}
            height={28}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-0.5">
          <User size={14} className="text-primary" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed",
          isUser
            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-sm shadow-sm"
            : "bg-muted/80 text-foreground rounded-bl-sm border border-border",
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}