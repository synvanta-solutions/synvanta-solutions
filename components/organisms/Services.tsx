// Services.tsx — Server Component
// All service names and descriptions are rendered on the server.
// Only the "Show More / Show Less" toggle is a client component.

import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import ServicesGrid from "./ServicesGrid";

export interface ServiceItem {
  heading: string;
  descp: string;
  image: string;
}

export const servicesData: ServiceItem[] = [
  {
    heading: "Custom Web & Business Systems",
    descp:
      "Build powerful digital systems tailored to your business needs. From inventory and appointment systems to school and HR management—we create solutions that scale.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
  },
  {
    heading: "AI Integration for Businesses",
    descp:
      "Harness AI to automate and streamline your operations. We integrate AI-powered chatbots, content generators, and intelligent support systems.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=500&fit=crop",
  },
  {
    heading: "Website Development for SMEs",
    descp:
      "Modern, professional websites that convert. We combine development, design, and SEO to help your business stand out online.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=500&fit=crop",
  },
  {
    heading: "UI/UX Design + Branding",
    descp:
      "Create stunning visual identities and user experiences. From UI mockups to branding packages—we help you make a lasting impression.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
  },
  {
    heading: "QA Testing & Documentation",
    descp:
      "Ensure quality and clarity at every step. We provide comprehensive testing, test cases, user manuals, and API documentation.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
  },
  {
    heading: "Automation Services",
    descp:
      "Reduce manual work and boost efficiency. From email automation to CRM workflows—we help you work smarter, not harder.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop",
  },
  {
    heading: "IoT Solutions",
    descp:
      "Connect your physical and digital worlds. We build smart attendance systems, environmental monitoring dashboards, and sensor networks.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
  },
];

interface ServicesProps {
  data?: ServiceItem[];
}

function Services({ data = servicesData }: ServicesProps) {
  return (
    <section className="bg-background">
      <div className="py-8 sm:py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-8 md:gap-16">
            {/* Header — server-rendered */}
            <div className="flex flex-col items-center justify-center gap-4 max-w-2xl mx-auto">
              <Badge
                variant="secondary"
                className="w-fit text-xs tracking-widest uppercase flex items-center gap-2"
              >
                <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                Services
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-center leading-[1.1] tracking-tight">
                What we do
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed text-center">
                We deliver powerful digital solutions tailored to help your
                business grow, automate operations, and stay competitive in
                today&apos;s market.
              </p>
            </div>

            {/*
              ServicesGrid is the client component.
              It receives ALL items — the toggle lives inside it.
              The first 4 cards are always visible without JS.
            */}
            <ServicesGrid data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
