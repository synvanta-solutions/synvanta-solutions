"use client";

import Link from "next/link";
import { Zap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroAnimations from "@/components/organisms/HeroAnimations";
import { useSmoothScrollNav } from "@/hooks/useSmoothScrollNav";

export default function Hero() {
  const { handleNavClick } = useSmoothScrollNav();

  return (
    <div
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative min-h-[80vh] md:min-h-[96vh] mx-auto max-w-7xl flex items-center justify-center overflow-hidden pt-16 md:pt-0">
        {/* ── Technical Grid Overlay (Using global border variables) ──────── */}
        <div
          className="absolute inset-0 grid grid-cols-4 md:grid-cols-12 gap-0 pointer-events-none opacity-40"
          aria-hidden="true"
        >
          <div className="col-span-1 border-r border-border/40 h-full" />
          <div className="hidden md:block col-span-3 border-r border-border/40 h-full" />
          <div className="hidden md:block col-span-4 border-r border-border/40 h-full" />
          <div className="col-span-1 md:col-span-4 h-full" />
        </div>

        {/* ── Ambient Kinetic Lighting ────────────────────────────────────── */}
        <div
          className="absolute inset-0 w-full h-full mix-blend-screen"
          aria-hidden="true"
        >
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full filter blur-[120px] animate-pulse duration-[8s]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-secondary/10 rounded-full filter blur-[140px] animate-pulse duration-[12s] delay-2000" />
        </div>

        {/* ── Client-only Animations ──────────────────────────────────────── */}
        <HeroAnimations />

        {/* ── Main Layout Container (Asymmetric Grid Structure) ───────────── */}
        <div className="container relative z-10 w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* LEFT COLUMN: Deep Typography Stack */}
          <div className="lg:col-span-7 flex flex-col text-left items-start group">
            {/* Aggressive Typographic Focal Point */}
            <h1 className="text-5xl font-black tracking-tight text-foreground sm:text-6xl md:text-7xl xl:text-8xl leading-[0.9] select-none">
              Creating <br />
              <span className="relative inline-block mt-2 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x font-black">
                What&apos;s Next.
              </span>
            </h1>
          </div>

          {/* RIGHT COLUMN: Floating Card Context & Actions */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-8 pt-8 lg:pt-4 lg:pl-4 backdrop-blur-[2px]">
            {/* Contextual Paragraph */}
            <p className="hidden w-full text-base font-normal text-foreground leading-relaxed md:block md:text-lg">
              Synvanta is a freelance-first team delivering pre-built systems
              and custom digital solutions — websites, mobile apps, GIS
              platforms, and AI-powered tools — engineered to slot straight into
              your business.
            </p>

            {/* Kinetic Interactive Button Suite */}
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <Link
                href="#products"
                aria-label="See Synvanta products"
                onClick={handleNavClick("#products")}
                className="w-full sm:w-auto"
              >
                <Button className="h-14 w-full sm:w-auto cursor-pointer px-8 flex items-center justify-center gap-3 bg-primary text-primary-foreground font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0">
                  <Zap className="h-4 w-4 fill-current" aria-hidden="true" />
                  Browse Our Portfolio
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
