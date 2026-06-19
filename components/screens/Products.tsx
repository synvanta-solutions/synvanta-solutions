"use client";

import { motion, Variants, Easing } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const projects = [
  { id: 3, image: "/portfolio/3.png" },
  { id: 4, image: "/portfolio/4.png" },
  { id: 5, image: "/portfolio/5.png" },
  { id: 6, image: "/portfolio/6.png" },
  { id: 7, image: "/portfolio/7.png" },
  { id: 8, image: "/portfolio/8.png" },
  { id: 9, image: "/portfolio/9.png" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as Easing },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as Easing },
  },
};

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative flex-shrink-0 w-[78vw]  sm:w-auto snap-start"
      style={{ paddingBottom: "75%" }}
    >
      <Image
        src={project.image}
        alt={`Portfolio ${project.id}`}
        fill
        className="object-contain"
        sizes="(max-width: 640px) 78vw, (max-width: 1024px) 33vw, 25vw"
      />
    </motion.div>
  );
}

const Products = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    setActiveIndex(Math.round(scrollLeft / (clientWidth * 0.78)));
  };

  return (
    <section className="bg-background w-full overflow-x-hidden">
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

          {/* Centered header */}
          <motion.div
            className="flex flex-col items-center text-center space-y-4 mb-10 sm:mb-14"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants}>
              <Badge
                variant="secondary"
                className="w-fit text-[10px] sm:text-xs tracking-widest uppercase
                           flex items-center gap-1.5"
              >
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                Our Portfolio
              </Badge>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold
                         leading-tight tracking-tight max-w-2xl"
            >
              Websites & Applications We've Built
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-muted-foreground
                         leading-relaxed max-w-lg"
            >
              From business-grade platforms to capstone-level systems — these
              are real projects we've delivered. Want something built for you?{" "}
              <span className="text-foreground font-semibold">
                Reach out and let's talk.
              </span>
            </motion.p>
          </motion.div>

          {/* Desktop: 3-column grid */}
          <motion.div
            className="hidden sm:grid grid-cols-3 gap-4 sm:gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </motion.div>

          {/* Mobile: snap carousel */}
          <div className="sm:hidden">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {projects.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to project ${i + 1}`}
                  onClick={() => {
                    scrollRef.current?.scrollTo({
                      left: i * scrollRef.current.clientWidth * 0.82,
                      behavior: "smooth",
                    });
                    setActiveIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300
                    ${i === activeIndex
                      ? "w-6 bg-foreground"
                      : "w-2 bg-muted-foreground/30"
                    }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Products;