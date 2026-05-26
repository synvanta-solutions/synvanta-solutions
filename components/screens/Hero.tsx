// Hero.tsx — Server Component
// The h1 + description are rendered on the server (no "use client").
// Only the animated particles and moving orbs are deferred to a client component.

import Link from "next/link";
import { Zap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroAnimations from "@/components/organisms/HeroAnimations"; // client-only child

export default function Hero() {
  return (
    <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-background">
      {/* ── Static background blobs (CSS-only, no JS needed) ─────────────── */}
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000" />
      </div>

      {/* ── Client-only: moving orbs + floating particles ─────────────────── */}
      <HeroAnimations />

      {/* ── Critical content — always server-rendered ─────────────────────── */}
      <div className="container relative z-10 flex flex-col text-center">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-sm text-foreground">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Innovation meets execution</span>
          </div>
        </div>

        {/*
          h1 is the most important on-page SEO signal.
          Rendered in HTML by the server — never hidden behind JS.
        */}
        <h1 className="z-10 text-6xl font-extrabold tracking-tighter text-foreground md:text-7xl lg:text-8xl xl:text-9xl">
          Creating <br />
          <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            What&apos;s Next.
          </span>
        </h1>

        {/* Description — crawlers read this for page relevance */}
        <div className="z-10 flex flex-col items-center justify-center space-y-6 px-6 pt-5 text-center">
          <p className="w-full max-w-2xl text-md font-light text-foreground/70 md:text-lg lg:text-xl">
            Synvanta is a freelance-first team delivering pre-built systems and
            custom digital solutions — websites, mobile apps, GIS platforms, and
            AI-powered tools — engineered to slot straight into your business.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              target="_blank"
              href=""
              aria-label="Request a demo of Synvanta"
            >
              <Button className="h-12 cursor-pointer px-8 md:h-14 md:px-10 flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-primary/25">
                <Zap className="h-4 w-4" aria-hidden="true" />
                Request a Demo
              </Button>
            </Link>
            <Link href="/products" aria-label="See Synvanta products">
              <Button
                variant="outline"
                className="h-12 cursor-pointer px-8 md:h-14 md:px-10 flex items-center gap-2 border-primary bg-white text-foreground hover:bg-background transition-all duration-300"
              >
                Browse Our Work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
