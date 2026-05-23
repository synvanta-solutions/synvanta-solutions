"use client";

import { useRef } from "react";
import { ChatWidget } from "@/components/organisms/ChatWidget";
import { sendChatMessage, type ChatMessage } from "@/actions/chat";

export function ChatWidgetWrapper() {
  // Keep conversation history in a ref so it persists across renders
  // but doesn't cause re-renders itself
  const historyRef = useRef<ChatMessage[]>([]);

  const handleReply = async (userMessage: string): Promise<string> => {
    // Call the server action with full history for multi-turn context
    const reply = await sendChatMessage(historyRef.current, userMessage);

    // Append both turns to history after a successful reply
    historyRef.current = [
      ...historyRef.current,
      { role: "user", content: userMessage },
      { role: "assistant", content: reply },
    ];

    return reply;
  };

  return (
    <ChatWidget
      title="Synvanta Assistant"
      subtitle="Powered by Llama 3.3 · Online"
      onReply={handleReply}
    />
  );
}
