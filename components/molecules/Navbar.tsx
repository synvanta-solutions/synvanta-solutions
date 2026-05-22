"use client";

import { useState, useEffect, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ProjectDialog from "@/components/atoms/ProjectDialog";
import { useProjectForm } from "@/hooks/useProjectForm";

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { title: "Products", href: "#products" },
  { title: "Process", href: "#process" },
  { title: "About Us", href: "#about" },
  { title: "Services", href: "#services" },
];

// Split index for the logo-centered desktop layout (nav items flank the logo)
const NAV_SPLIT_INDEX = Math.ceil(NAV_ITEMS.length / 2);

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // All form state and logic lives in the hook — Navbar only wires the dialog
  const form = useProjectForm();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  const handleNavClick =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;
      event.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMobileMenu();
    };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMobileMenu();
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* cn() keeps conditional class logic readable and avoids template-literal bugs */}
        <div
          className={cn(
            "mx-auto flex max-w-7xl bg-background rounded-full backdrop-blur-md",
            "border border-white/20 items-center justify-between",
            "mt-7 gap-6 px-4 py-3 sm:px-6 lg:px-8 transition-shadow duration-300",
            isScrolled && "shadow-lg",
          )}
        >
          {/* Left nav — first half of NAV_ITEMS */}
          <nav className="hidden flex-1 items-center justify-end gap-8 text-md text-foreground lg:flex">
            {NAV_ITEMS.slice(0, NAV_SPLIT_INDEX).map(({ title, href }) => (
              <Link
                key={title}
                href={href}
                onClick={handleNavClick(href)}
                className="transition-colors hover:text-foreground/70"
              >
                {title}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <a
            href="#"
            aria-label="Synvanta home"
            className="shrink-0 px-3 lg:px-6"
            onClick={handleLogoClick}
          >
            <Image
              src="/navbar.png"
              alt="Synvanta"
              width={160}
              height={48}
              className="h-8 w-auto object-contain sm:h-10"
              priority
            />
          </a>

          {/* Right nav — second half of NAV_ITEMS + actions */}
          <div className="flex flex-1 items-center justify-end gap-4 lg:justify-start lg:gap-8">
            <nav className="hidden flex-1 items-center gap-8 text-md text-foreground lg:flex">
              {NAV_ITEMS.slice(NAV_SPLIT_INDEX).map(({ title, href }) => (
                <Link
                  key={title}
                  href={href}
                  onClick={handleNavClick(href)}
                  className="transition-colors hover:text-foreground/70"
                >
                  {title}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop dialog — each dialog manages its own open state */}
              <ProjectDialog
                form={form}
                trigger={
                  <Button className="hidden lg:inline-flex">
                    Start a Project
                  </Button>
                }
              />

              <button
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-md",
                  "border border-border bg-background text-foreground",
                  "transition-colors hover:bg-muted lg:hidden",
                )}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? (
                  <XIcon className="h-5 w-5 transition-transform duration-300" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <nav
        className={cn(
          "fixed rounded-2xl shadow-sm right-5 top-26 z-50",
          "w-72 max-w-[90vw] origin-top-right rounded-b-lg",
          "border border-border/60 bg-background",
          "transition-all duration-300 sm:top-16 lg:hidden",
          mobileOpen
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0",
        )}
      >
        <div className="space-y-1 p-4">
          {NAV_ITEMS.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              onClick={handleNavClick(href)}
              className="block rounded-md px-4 py-3 text-md text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {title}
            </Link>
          ))}
        </div>

        <div className="border-t border-border/60 p-4">
          {/* Mobile dialog — shares the same form hook instance */}
          <ProjectDialog
            form={form}
            trigger={<Button className="w-full">Start a Project</Button>}
          />
        </div>
      </nav>
    </>
  );
}
