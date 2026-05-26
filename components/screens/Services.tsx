// Services.tsx — Server Component
// All service names and descriptions are rendered on the server.
// Only the "Show More / Show Less" toggle is a client component.

import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import ServicesGrid from "../organisms/ServicesGrid";

export interface ServiceItem {
  heading: string;
  descp: string;
  image: string;
}

export const servicesData: ServiceItem[] = [
  {
    heading: "Web & Mobile Development",
    descp:
      "Custom websites and mobile applications built for performance, scalability, and your users. From landing pages to full-scale platforms — we ship products that work.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
  },
  {
    heading: "GIS & Mapping Systems",
    descp:
      "Location-aware platforms and geographic data tools for logistics, urban planning, agriculture, and more. We turn spatial data into actionable, visual systems.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=500&fit=crop",
  },
  {
    heading: "Business Automation",
    descp:
      "Eliminate manual work with smart workflows, integrations, and process automation that run while you sleep. We identify the bottlenecks and engineer them away.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop",
  },
  {
    heading: "AI Integration",
    descp:
      "Embed AI into your existing systems — chatbots, document processing, predictions, and intelligent dashboards. Practical AI that solves real business problems.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=500&fit=crop",
  },
  {
    heading: "Custom CRUD Systems",
    descp:
      "Internal tools, admin dashboards, and data management platforms tailored to your exact operations. Built clean, handed over fully documented.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
  },
  {
    heading: "UI/UX Design & Branding",
    descp:
      "Interfaces people actually enjoy using, paired with a visual identity that sticks. From wireframes to full branding packages — we design with purpose.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
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
