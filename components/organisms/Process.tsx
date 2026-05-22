"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover & Define",
    description: "We deep-dive into your goals, audience, and technical requirements to build a crystal-clear project scope.",
  },
  {
    number: "02",
    title: "Design & Prototype",
    description: "UI/UX wireframes and high-fidelity prototypes reviewed with you before a single line of code is written.",
  },
  {
    number: "03",
    title: "Develop & Test",
    description: "Iterative development with regular milestones, rigorous QA, and constant communication throughout.",
  },
  {
    number: "04",
    title: "Deploy & Launch",
    description: "Smooth deployment with proper server configuration, domain setup, performance optimization, and launch support.",
  },
  {
    number: "05",
    title: "Maintain & Scale",
    description: "Ongoing monitoring, updates, and feature development to keep your product competitive and growing.",
  },
];

const Process = () => {
  return (
    <section className="bg-background">
      <div className="lg:py-20 sm:py-16 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-8 md:gap-16">
            {/* Header */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="flex flex-col items-center justify-center gap-4 max-w-2xl mx-auto"
            >
              <Badge variant="secondary" className="w-fit text-xs tracking-widest uppercase flex items-center gap-2">
                <Zap className="h-3.5 w-3.5" />
                Our Process
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-center leading-[1.1] tracking-tight">
                How we build
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed text-center">
                A structured approach to turning your vision into reality. From discovery to launch and beyond.
              </p>
            </motion.div>

            {/* Process Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {processSteps.map((step, index) => (
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
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                  )}

                  <div className="h-full rounded-3xl border border-border hover:border-primary p-6 bg-card hover:bg-card/80 transition-all duration-300 hover:shadow-xl group">
                    {/* Step Number */}
                    <div className="mb-4">
                      <span className="text-5xl font-extrabold text-primary/20 group-hover:text-primary/40 transition-colors duration-300">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="mt-6 inline-flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-semibold uppercase tracking-wide">Next</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
