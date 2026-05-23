"use client";

import { X, Minus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  onClose: () => void;
  onClear?: () => void;
}

export function ChatHeader({
  title = "AI Assistant",
  subtitle = "Online · Replies instantly",
  onClose,
  onClear,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-gradient-to-r from-violet-600 to-indigo-700 rounded-t-2xl">
      {/* Bot avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <svg
          width="18"
          height="18"
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

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white leading-tight truncate">
          {title}
        </p>
        <p className="text-xs text-white/70 leading-tight">{subtitle}</p>
      </div>

      {/* Status dot */}
      <span
        className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"
        aria-label="Online"
      />

      {/* Actions */}
      <div className="flex items-center gap-1">
        {onClear && (
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 text-white/70 hover:text-white hover:bg-white/15"
            onClick={onClear}
            aria-label="Clear conversation"
          >
            <RotateCcw size={14} />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="w-7 h-7 text-white/70 hover:text-white hover:bg-white/15"
          onClick={onClose}
          aria-label="Close chat"
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
}
