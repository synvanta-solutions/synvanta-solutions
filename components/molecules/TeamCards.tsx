"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

// ── Team member data ──────────────────────────────────────────────────────────
const teamMembers = [
  {
    name: "AJ Castillo",
    role: "Frontend Developer",
    image: "/team/aj.png",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Gea Cuevas",
    role: "CEO",
    image: "/team/gea.png",
  },
  {
    name: "Jerwin Louise Peria",
    role: "Backend Developer",
    image: "/team/jerwin.png",
  },
  {
    name: "Joshua Samonte",
    role: "Frontend Developer",
    image: "/team/joshua.jpg",
  },
  {
    name: "Errol Purino",
    role: "Backend Developer",
    image: "/team/errol.jpg",
  },
];

export default function TeamCards() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 py-12 sm:py-16 lg:py-24">
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
            <Badge
              variant="secondary"
              className="mb-3 sm:mb-5 w-fit text-xs tracking-widest uppercase"
            >
              <Users className="mr-1.5 h-3 w-3" />
              Meet the Team
            </Badge>
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

      {/* Team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-7 sm:gap-8">
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
          >
            {/* Image-first, hollow layout */}
            <div className="relative">
              {/* Photo area */}
              <div className="relative w-full h-[350px] overflow-hidden transition-all duration-500 rounded-3xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                  style={{ filter: "brightness(0.96) saturate(0.98)" }}
                />

                {/* Index number — top right */}
                <div className="absolute top-3 right-3 pointer-events-none">
                  <span className="text-black/30 font-mono text-[10px] tracking-widest select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="px-1 pb-2 pt-4">
                {/* Name */}
                <h3 className="text-lg sm:text-xl font-extrabold text-foreground leading-tight tracking-tight">
                  {member.name}
                </h3>

              <p className="w-fit text-foreground border border-white/70 backdrop-blur-sm text-sm font-medium">
                {member.role}
              </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
