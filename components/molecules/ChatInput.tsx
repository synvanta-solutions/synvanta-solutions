"use client";

import { useRef, useState, KeyboardEvent } from "react";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Type a message…",
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-3 py-3 border-t border-border bg-background rounded-b-2xl">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex-1 w-full pr-12 pl-4 py-2.5 text-sm",
            "rounded-full border border-border bg-muted/60",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
            "placeholder:text-muted-foreground/60",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "leading-snug transition-all"
          )}
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          size="icon"
          className={cn(
            "absolute right-1.5 w-8 h-8 rounded-full flex-shrink-0",
            "bg-primary to-primary/80",
            "hover:from-primary/90 hover:to-primary/70",
            "disabled:opacity-40 transition-all shadow-sm",
            "cursor-pointer"
          )}
          aria-label="Send message"
        >
          <SendHorizonal size={15} className="text-primary-foreground" />
        </Button>
      </div>
    </div>
  );
}