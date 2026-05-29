"use client";

// ProcessCards.tsx — Client Component
// Receives step data as props (already rendered by the server parent).
// Responsible only for Framer Motion animations and hover interactions.

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ProcessStep } from "@/components/screens/Process";

interface ProcessCardsProps {
  steps: ProcessStep[];
}

export default function ProcessCards({ steps }: ProcessCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.6,
            ease: [0.21, 0.47, 0.32, 0.98],
            delay: index * 0.1,
          }}
          className="relative"
        >
          {/* Connector line to next card */}
          {index < steps.length - 1 && (
            <div
              className="hidden lg:block absolute top-12 -right-3 w-6 h-0.5 bg-linear-to-r from-primary to-transparent"
              aria-hidden="true"
            />
          )}

          <div className="h-full rounded-3xl border border-border hover:border-primary p-6 bg-card hover:bg-card/80 transition-all duration-300 hover:shadow-xl group">
            <div className="mb-4">
              <span
                className="text-5xl font-extrabold text-primary/20 group-hover:text-primary/40 transition-colors duration-300"
                aria-hidden="true"
              >
                {step.number}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-semibold uppercase tracking-wide">
                Next
              </span>
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
