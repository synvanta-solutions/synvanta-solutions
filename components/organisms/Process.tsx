// Process.tsx — Server Component
// Static step data is rendered on the server.
// Framer Motion animations are deferred to ProcessCards (client).

import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import ProcessCards from "./ProcessCards";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover & Define",
    description:
      "We deep-dive into your goals, audience, and technical requirements to build a crystal-clear project scope.",
  },
  {
    number: "02",
    title: "Design & Prototype",
    description:
      "UI/UX wireframes and high-fidelity prototypes reviewed with you before a single line of code is written.",
  },
  {
    number: "03",
    title: "Develop & Test",
    description:
      "Iterative development with regular milestones, rigorous QA, and constant communication throughout.",
  },
  {
    number: "04",
    title: "Deploy & Launch",
    description:
      "Smooth deployment with proper server configuration, domain setup, performance optimization, and launch support.",
  },
  {
    number: "05",
    title: "Maintain & Scale",
    description:
      "Ongoing monitoring, updates, and feature development to keep your product competitive and growing.",
  },
];

const Process = () => {
  return (
    <section className="bg-background">
      <div className="lg:py-20 sm:py-16 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-8 md:gap-16">
            {/* Header — fully server-rendered, no JS required */}
            <div className="flex flex-col items-center justify-center gap-4 max-w-2xl mx-auto">
              <Badge
                variant="secondary"
                className="w-fit text-xs tracking-widest uppercase flex items-center gap-2"
              >
                <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                Our Process
              </Badge>
              {/*
                h2 used here (not h1) because Hero already has the page h1.
                Proper heading hierarchy matters for SEO.
              */}
              <h2 className="text-4xl sm:text-5xl font-extrabold text-center leading-[1.1] tracking-tight">
                How we build
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed text-center">
                A structured approach to turning your vision into reality — from
                discovery and design, through development, to launch and beyond.
              </p>
            </div>

            {/*
              Step content is also pre-rendered here as a <ol> for crawlers.
              ProcessCards renders the same data with animations on the client
              and visually replaces this list (sr-only keeps it accessible).
            */}
            <ol className="sr-only">
              {processSteps.map((step) => (
                <li key={step.number}>
                  <strong>{step.title}</strong>: {step.description}
                </li>
              ))}
            </ol>

            {/* Animated card grid — client component */}
            <ProcessCards steps={processSteps} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
