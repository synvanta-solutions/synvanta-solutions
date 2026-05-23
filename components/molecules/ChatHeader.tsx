"use client";

import { X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  onClose: () => void;
  onClear?: () => void;
}

export function ChatHeader({
  onClose,
  onClear,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-primary rounded-t-2xl">
      {/* Avatar Image */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-primary-foreground/20 flex items-center justify-center">
        <Image
          src="/kevin.png"
          alt="Kevin Synvanta"
          width={42}
          height={42}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-primary-foreground leading-tight truncate">
         Kevin Synvanta
        </p>
        <p className="text-xs text-primary-foreground/70 leading-tight truncate">
          AI Powered Assistant
        </p>
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
            className="w-7 h-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/15"
            onClick={onClear}
            aria-label="Clear conversation"
          >
            <RotateCcw size={14} />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="w-7 h-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/15"
          onClick={onClose}
          aria-label="Close chat"
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
}