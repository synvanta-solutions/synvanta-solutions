"use client";

// ServicesGrid.tsx — Client Component
// Handles the show/hide toggle and Framer Motion animations.
// Service headings and descriptions are passed as props from the server parent,
// so they are already present in the initial HTML for crawlers.

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import type { ServiceItem } from "../screens/Services";

interface ServicesGridProps {
  data: ServiceItem[];
}

export default function ServicesGrid({ data }: ServicesGridProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedServices = showAll ? data : data.slice(0, 4);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedServices.map((value, index) => (
          <motion.div
            key={value.heading}
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              ease: [0.21, 0.47, 0.32, 0.98],
              delay: index < 4 ? index * 0.1 : 0,
            }}
          >
            <div className="group relative overflow-hidden rounded-3xl aspect-square bg-muted border border-border hover:border-primary transition-all duration-300 hover:shadow-xl cursor-pointer">
              <Image
                src={value.image}
                alt={value.heading}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute top-4 left-4 z-10">
                <Badge
                  variant="secondary"
                  className="text-xs tracking-widest uppercase flex items-center gap-1 bg-primary/90 hover:bg-primary"
                >
                  <Zap className="h-3 w-3" aria-hidden="true" />
                </Badge>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-3 z-10">
                <h3 className="text-base font-semibold text-white line-clamp-2">
                  {value.heading}
                </h3>
                <p className="text-sm text-white/90 line-clamp-2">
                  {value.descp}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More / Show Less toggle */}
      {data.length > 4 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex justify-center"
        >
          <Button
            type="button"
            onClick={() => setShowAll(!showAll)}
            aria-expanded={showAll}
            aria-controls="services-grid"
            className="h-12 cursor-pointer px-8 md:h-14 md:px-10 flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-primary/25"
          >
            {showAll ? "Show Less" : "View More"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </motion.div>
      )}
    </>
  );
}
