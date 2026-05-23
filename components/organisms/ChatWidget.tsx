"use client";

import { useState, useCallback, useId } from "react";
import { ChatFab } from "@/components/atoms/ChatFab";
import { ChatWindow } from "@/components/organisms/ChatWindow";
import { ChatMessageData } from "@/components/atoms/ChatMessage";
import { cn } from "@/lib/utils";

interface ChatWidgetProps {
  /**
   * Provide a custom reply function. Receives the user message,
   * returns a Promise<string> for the bot's reply.a
   * Defaults to a simple echo if omitted.
   */
  onReply?: (message: string) => Promise<string>;
  title?: string;
  subtitle?: string;
  /** Tailwind classes for the widget container */
  className?: string;
  /** Default position: bottom-right */
  position?: "bottom-right" | "bottom-left";
}

function defaultReply(message: string): Promise<string> {
  // Swap this out with your real API call
  return new Promise((res) =>
    setTimeout(
      () =>
        res(
          `You said: "${message}". Connect me to your API to give real answers!`,
        ),
      1200,
    ),
  );
}

export function ChatWidget({
  onReply = defaultReply,
  title = "AI Assistant",
  subtitle = "Online · Replies instantly",
  className,
  position = "bottom-right",
}: ChatWidgetProps) {
  const uid = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [hasUnread, setHasUnread] = useState(false);

  const addMessage = useCallback(
    (msg: Omit<ChatMessageData, "id" | "timestamp">) => {
      const full: ChatMessageData = {
        ...msg,
        id: `${uid}-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, full]);
      return full;
    },
    [uid],
  );

  const handleSend = useCallback(
    async (text: string) => {
      addMessage({ role: "user", content: text });
      setIsTyping(true);

      try {
        const reply = await onReply(text);
        addMessage({ role: "assistant", content: reply });
        if (!isOpen) setHasUnread(true);
      } catch {
        addMessage({
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        });
      } finally {
        setIsTyping(false);
      }
    },
    [addMessage, onReply, isOpen],
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setHasUnread(false);
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleClear = useCallback(() => setMessages([]), []);

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col items-end gap-3",
        position === "bottom-right" ? "bottom-6 right-6" : "bottom-6 left-6",
        className,
      )}
    >
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        isTyping={isTyping}
        onSend={handleSend}
        onClose={handleClose}
        onClear={handleClear}
        title={title}
        subtitle={subtitle}
      />

      <ChatFab
        isOpen={isOpen}
        onClick={isOpen ? handleClose : handleOpen}
        hasUnread={hasUnread}
      />
    </div>
  );
}
