"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M12 .5C5.7.5.5 5.9.5 12.3c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.3-1.5-1.3-1.5-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 3 1.4 3.7 1.1.1-.8.4-1.4.8-1.7-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.3a11.5 11.5 0 0 1 6.2 0C17.6 5 18.6 5.3 18.6 5.3c.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.5-2.7 5.5-5.3 5.8.4.4.9 1.1.9 2.3v3.4c0 .3.2.7.8.6a10.8 10.8 0 0 0 7.9-10.9C23.5 5.9 18.3.5 12 .5z" />
    </svg>
  );
}

export function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 24h5V7H0v17zM8 7h4.8v2.3h.1c.7-1.3 2.5-2.7 5.1-2.7C23 6.6 24 9.2 24 13v11h-5v-9.6c0-2.3 0-5.3-3.2-5.3s-3.7 2.5-3.7 5.1V24H8V7z" />
    </svg>
  );
}

export function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.4L6.3 22H2l7.3-8.4L1 2h6.4l4.4 5.8L18.9 2zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20z" />
    </svg>
  );
}

// ── Team member data ──────────────────────────────────────────────────────────
const teamMembers = [
  {
    name: "Gea Cuevas",
    role: "Co-founder & CEO",
    bio: "The bridge between clients and the product. Gea owns client communication, documentation, and user manuals — making sure every deliverable is understood and every client feels heard.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Jerwin Louise Peria",
    role: "Co-founder & Backend Lead",
    bio: "The engine under the hood. Jerwin architects and builds the backend systems that power every Synvanta product — reliable, scalable, and built to last.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Aeron James Castillo",
    role: "Co-founder & Frontend Lead",
    bio: "The face of every product. Aeron crafts the interfaces users actually interact with — translating ideas into polished, pixel-perfect UI with a sharp eye for detail.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
];

export default function TeamCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-12 sm:pt-16 lg:pt-24 pb-0">
      {/* Section header */}
      <motion.div
        className="mb-10 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-primary" />
            <span className="text-xs tracking-[0.2em] uppercase font-mono text-primary">
              Meet the Team
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground">
            The people
            <br />
            <span className="text-primary">behind the product.</span>
          </h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xs sm:text-right">
          A small, focused team obsessed
          <br className="hidden sm:block" /> with craft and speed.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            className="group relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.75,
              delay: 0.1 + i * 0.12,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Card */}
            <div className="relative bg-card border border-border rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-xl">
              {/* Photo area — tall, cinematic */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  style={{ filter: "brightness(0.88) saturate(0.9)" }}
                />

                {/* Layered gradient: strong bottom fade + subtle top vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

                {/* Index number — top right */}
                <div className="absolute top-4 right-4 pointer-events-none">
                  <span className="text-white/30 font-mono text-xs tracking-widest select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Social links — revealed on hover, anchored bottom-right of photo */}
                <motion.div
                  className="absolute bottom-4 right-4 flex items-center gap-2"
                  animate={{
                    opacity: hoveredIndex === i ? 1 : 0,
                    y: hoveredIndex === i ? 0 : 8,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Link
                    href={member.socials.linkedin}
                    aria-label="LinkedIn"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm text-white hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-white/20"
                  >
                    <span className="scale-[0.6]">
                      <LinkedinIcon />
                    </span>
                  </Link>
                  <Link
                    href={member.socials.github}
                    aria-label="GitHub"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm text-white hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-white/20"
                  >
                    <span className="scale-[0.6]">
                      <GithubIcon />
                    </span>
                  </Link>
                  {member.socials.twitter && (
                    <Link
                      href={member.socials.twitter}
                      aria-label="Twitter"
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm text-white hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-white/20"
                    >
                      <span className="scale-[0.6]">
                        <TwitterIcon />
                      </span>
                    </Link>
                  )}
                </motion.div>
              </div>

              {/* Body */}
              <div className="px-6 pb-6 pt-4">
                {/* Role pill */}
                <div className="inline-flex items-center gap-1.5 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[10px] tracking-[0.18em] uppercase font-mono text-primary">
                    {member.role}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-extrabold text-foreground leading-tight mb-3 tracking-tight">
                  {member.name}
                </h3>

                {/* Thin separator */}
                <div className="w-8 h-px bg-border mb-3 transition-all duration-300 group-hover:w-12 group-hover:bg-primary" />

                {/* Bio */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Bottom accent bar — slides in on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-b-3xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
