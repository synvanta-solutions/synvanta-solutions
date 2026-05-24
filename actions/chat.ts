"use server";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function sendChatMessage(
  history: ChatMessage[],
  userMessage: string,
): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set in environment variables.");
  }

  const messages: Groq.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `You are a helpful and friendly AI assistant named Kevin for Synvanta, a modern web development agency.
You help visitors learn about the agency's services, answer questions, and guide them through getting started.
Keep responses concise, warm, and professional. Use plain text — no markdown.`,
    },
    // Include prior conversation turns for multi-turn context
    ...history.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    {
      role: "user",
      content: userMessage,
    },
  ];

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages,
    temperature: 0.7,
    max_tokens: 512,
  });

  const reply = completion.choices[0]?.message?.content;

  if (!reply) {
    throw new Error("No response received from Groq.");
  }

  return reply.trim();
}
