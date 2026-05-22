"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Zap, Users, Globe, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Section data ──────────────────────────────────────────────────────────────
const sections = [
  {
    id: "mission",
    badge: "Our Mission",
    heading: "We build what\ncomes next.",
    body: "Synvanta exists to collapse the gap between ambition and execution. We deliver pre-built systems that slot straight into your workflow and bespoke solutions engineered around your exact constraints — so you spend less time building infrastructure and more time changing your industry.",
    cta: { label: "Work With Us", href: "/contact" },
    icon: Zap,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=500&fit=crop",
    accent: "hsl(var(--primary))",
  },
  {
    id: "team",
    badge: "The Team",
    heading: "Builders who\nship fast.",
    body: "Behind every Synvanta product is a tight crew of engineers, designers, and strategists obsessed with craft. No committees, no bloat — just focused people who care deeply about the quality of what they hand you.",
    cta: { label: "Meet the Team", href: "/team" },
    icon: Users,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop",
    accent: "hsl(var(--primary) / 0.75)",
  },
  {
    id: "reach",
    badge: "Our Reach",
    heading: "Local roots,\nglobal scale.",
    body: "Synvanta partners with startups and enterprises across Southeast Asia and beyond. Our systems are built to scale — cloud-native from day one, localisation-ready, and wired for the markets that matter to you.",
    cta: { label: "See Case Studies", href: "/work" },
    icon: Globe,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=500&fit=crop",
    accent: "hsl(var(--primary) / 0.55)",
  },
  {
    id: "trust",
    badge: "Our Promise",
    heading: "Reliable systems,\nreal ownership.",
    body: "Every system we deliver is yours — fully documented, thoroughly tested, and handed over with the knowledge transfer your team needs to own it. We don't create dependency; we create capability.",
    cta: { label: "See Pricing", href: "/pricing" },
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop",
    accent: "hsl(var(--primary) / 0.4)",
  },
];

// ── Sticky scroll component ───────────────────────────────────────────────────
export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const active = sections[activeIndex];

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* ── Sticky scroll narrative ───────────────────────────────────────── */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">

            {/* LEFT — scrolling text panels */}
            <div className="py-24 space-y-0">
              {sections.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.id}
                    ref={(el) => { sectionRefs.current[i] = el; }}
                    className="min-h-[80vh] flex flex-col justify-center py-16"
                  >
                    <Badge
                      variant="secondary"
                      className="mb-5 w-fit text-xs tracking-widest uppercase"
                    >
                      <Icon className="mr-1.5 h-3 w-3" />
                      {s.badge}
                    </Badge>

                    <h2
                      className={cn(
                        "text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl whitespace-pre-line transition-colors duration-500",
                        activeIndex === i
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {s.heading}
                    </h2>

                    <Separator className="my-6 w-16" />

                    <p className="text-muted-foreground leading-relaxed text-base max-w-md">
                      {s.body}
                    </p>

                    <div className="mt-8">
                      <Link href={s.cta.href}>
                        <Button className="h-12 cursor-pointer px-8 md:h-14 md:px-10 flex items-center gap-2">
                          {s.cta.label}{" "}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>

                    {/* progress dots — mobile only */}
                    <div className="mt-10 flex gap-2 lg:hidden">
                      {sections.map((_, di) => (
                        <span
                          key={di}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            di === i
                              ? "w-6 bg-primary"
                              : "w-1.5 bg-muted-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT — sticky image panel (desktop only) */}
            <div className="hidden lg:block">
              <div className="sticky top-20 flex flex-col justify-center gap-4 lg:pt-10">
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-muted"
                  style={{
                    boxShadow: `0 20px 60px -10px ${active.accent}40, 0 0 80px -20px ${active.accent}30`
                  }}>
                  {sections.map((s, i) => (
                    <Image
                      key={s.id}
                      src={s.image}
                      alt={s.badge}
                      fill
                      priority={i === 0}
                      className={cn(
                        "object-cover transition-opacity duration-700 ease-in-out",
                        activeIndex === i ? "opacity-100" : "opacity-0"
                      )}
                    />
                  ))}

                  {/* colour-tinted overlay that matches each section */}
                  <div
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                      background: `linear-gradient(180deg, transparent 0%, ${active.accent}33 60%, ${active.accent}66 100%)`,
                    }}
                  />

                  {/* glow effect at bottom */}
                  <div
                    className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-2/3 h-40 rounded-full blur-3xl transition-all duration-700"
                    style={{
                      background: `${active.accent}40`,
                    }}
                  />

                 <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Accent line */}
                      <div
                        className="w-8 h-0.5 rounded-full"
                        style={{ background: active.accent }}
                      />
                    </div>

                    {/* Page indicator */}
                    <div className="flex gap-1.5">
                      {sections.map((_, pi) => (
                        <div
                          key={pi}
                          className={cn(
                            "w-1.5 h-1.5 rounded-full transition-all duration-500",
                            pi === activeIndex ? "bg-white" : "bg-white/30",
                          )}
                        />
                      ))}
                    </div>
                  </div>


                  {/* floating label — inside image at bottom */}
                  <div className="absolute bottom-4 left-25 -translate-x-1/2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-secondary backdrop-blur-sm px-4 py-2 text-xs font-semibold tracking-widest uppercase text-secondary-foreground shadow">
                      {(() => { const Icon = active.icon; return <Icon className="h-3.5 w-3.5" />; })()}
                      {active.badge}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}