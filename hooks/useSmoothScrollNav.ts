"use client";

import { useCallback } from "react";

type SmoothScrollNavOptions = {
  onNavigate?: () => void;
};

export function useSmoothScrollNav(options: SmoothScrollNavOptions = {}) {
  const { onNavigate } = options;

  const handleNavClick = useCallback(
    (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;
      event.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      onNavigate?.();
    },
    [onNavigate],
  );

  const handleLogoClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      onNavigate?.();
    },
    [onNavigate],
  );

  return { handleNavClick, handleLogoClick };
}
