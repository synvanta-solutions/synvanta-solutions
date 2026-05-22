"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface FooterLink {
  name: string;
  href: string;
}
interface FooterSection {
  title: string;
  links: FooterLink[];
}
interface FooterLogo {
  url: string;
  src: string;
  alt: string;
  title: string;
}

interface FooterBasicProps {
  logo?: FooterLogo;
  description?: string;
  sections?: FooterSection[];
  copyright?: string;
  legalLinks?: FooterLink[];
  className?: string;
}

interface Footer2Props extends FooterBasicProps {
  logoClassName?: string;
}
type Props = Partial<Footer2Props>;

const defaultProps: Footer2Props = {
  logo: {
    url: "#",
    src: "/navbar.png",
    alt: "Synvanta",
    title: "Synvanta",
  },
description: "Synvanta delivers ready-made and custom systems to help businesses work smarter and grow faster.",  sections: [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Security", href: "#" },
        { name: "Roadmap", href: "#" },
      ],
    },
    {
      title: "Projects",
      links: [
        { name: "Case Studies", href: "#" },
        { name: "Portfolio", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "API Docs", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
  ],
  copyright: "© 2024 Synvanta. All rights reserved.",
  legalLinks: [],
};

const MAX_SECTIONS = 3;

const Footer = (props: Props) => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const { logo, description, sections, copyright, legalLinks, className } = {
    ...defaultProps,
    ...props,
  };

  const visibleSections = (sections ?? []).slice(0, MAX_SECTIONS);

  return (
    <section className={cn("pt-32 pb-10 px-6 lg:px-10", className)}>
      <div className="container mx-auto max-w-7xl">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 justify-between">
            <div className="col-span-2 mb-8 mr-10 lg:mb-0">
              <div className="flex items-center lg:justify-start">
                <a href={logo?.url} aria-label="Synvanta home">
                  <Image
                    src={logo?.src || "/navbar.png"}
                    alt={logo?.alt || "Synvanta"}
                    width={160}
                    height={48}
                    className="h-8 w-auto object-contain sm:h-10"
                    priority
                  />
                </a>
              </div>
              <p className="mt-4 text-md font-sans text-muted-foreground">
                {description}
              </p>
            </div>
            <div className="col-span-4 grid grid-cols-3 gap-8">
              {visibleSections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-4 text-md font-semibold tracking-tight text-foreground">
                    {section.title}
                  </h3>
                  <ul className="space-y-4 text-md text-muted-foreground">
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className="font-sans transition-colors hover:text-primary"
                      >
                        <a href={link.href}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border pt-8 text-sm font-sans font-medium text-muted-foreground md:flex-row md:items-center">
            <p>© {year} Synvanta. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Based on Batangas, Philippines</span>
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer ;
