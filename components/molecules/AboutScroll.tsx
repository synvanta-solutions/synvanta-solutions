"use client";

// AboutScroll.tsx — Client Component
// Contains all JS-dependent behaviour: IntersectionObserver, useState,
// Framer Motion animations, and the sticky image panel.
// Section data is passed as props from the server parent (About.tsx).

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Globe, ShieldCheck, Users, Zap } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Section = {
  id: string;
  badge: string;
  heading: string;
  body: string;
  image: string;
  accent: string;
  cta: {
    href: string;
    label: string;
  };
  icon: string;
};

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Zap,
  Users,
  Globe,
  ShieldCheck,
};

interface AboutScrollProps {
  sections: Section[];
}

export default function AboutScroll({ sections }: AboutScrollProps) {
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
        { threshold: 0.5 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const active = sections[activeIndex];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8 sm:py-12 lg:py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* LEFT — scrolling text panels */}
          <div className="py-24 space-y-0">
            {sections.map((s, i) => {
              const Icon = iconMap[s.icon];
              return (
                <motion.div
                  key={s.id}
                  ref={(el) => {
                    sectionRefs.current[i] = el;
                  }}
                  className="min-h-[80vh] flex flex-col justify-center py-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                  >
                    <Badge
                      variant="secondary"
                      className="mb-5 w-fit text-xs tracking-widest uppercase"
                    >
                      <Icon className="mr-1.5 h-3 w-3" aria-hidden="true" />
                      {s.badge}
                    </Badge>
                  </motion.div>

                  <motion.h2
                    className={cn(
                      "text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl whitespace-pre-line transition-colors duration-500",
                      activeIndex === i
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                  >
                    {s.heading}
                  </motion.h2>

                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    style={{ originX: 0 }}
                  >
                    <Separator className="my-6 w-16" />
                  </motion.div>

                  <motion.p
                    className="text-muted-foreground leading-relaxed text-base max-w-md"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.25,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                  >
                    {s.body}
                  </motion.p>

                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                  >
                    <Link href={s.cta.href}>
                      <Button className="h-12 cursor-pointer px-8 md:h-14 md:px-10 flex items-center gap-2">
                        {s.cta.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </Link>
                  </motion.div>

                  {/* Progress dots — mobile only */}
                  <motion.div
                    className="mt-10 flex gap-2 lg:hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.35,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    aria-hidden="true"
                  >
                    {sections.map((_, di) => (
                      <span
                        key={di}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          di === i
                            ? "w-6 bg-primary"
                            : "w-1.5 bg-muted-foreground/30",
                        )}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT — sticky image panel (desktop only) */}
          <div className="hidden lg:block" aria-hidden="true">
            <div className="sticky top-20 flex flex-col justify-center gap-4 lg:pt-10">
              <motion.div
                className="relative w-full aspect-4/5 rounded-3xl overflow-hidden bg-muted"
                style={{
                  boxShadow: `0 20px 60px -10px ${active.accent}40, 0 0 80px -20px ${active.accent}30`,
                }}
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                {sections.map((s, i) => (
                  <Image
                    key={s.id}
                    src={s.image}
                    alt="" // decorative — meaningful text is in the left panel
                    fill
                    priority={i === 0}
                    className={cn(
                      "object-cover transition-opacity duration-700 ease-in-out",
                      activeIndex === i ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}

                <div
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${active.accent}33 60%, ${active.accent}66 100%)`,
                  }}
                />

                <div
                  className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-2/3 h-40 rounded-full blur-3xl transition-all duration-700"
                  style={{ background: `${active.accent}40` }}
                />

                <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-0.5 rounded-full"
                      style={{ background: active.accent }}
                    />
                  </div>
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

                <div className="absolute bottom-4 left-25 -translate-x-1/2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary backdrop-blur-sm px-4 py-2 text-xs font-semibold tracking-widest uppercase text-secondary-foreground shadow">
                    {(() => {
                      const Icon = iconMap[active.icon];
                      return (
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      );
                    })()}
                    {active.badge}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
