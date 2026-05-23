"use client";

import { ChatWidget } from "@/components/organisms/ChatWidget";

export function ChatWidgetWrapper() {
  return (
    <ChatWidget
      title="Support Bot"
      subtitle="Online · Replies instantly"
      onReply={async (msg) => {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: msg }),
        });

        if (!res.ok) throw new Error("Failed to fetch reply");

        const { reply } = await res.json();
        return reply as string;
      }}
    />
  );
}
