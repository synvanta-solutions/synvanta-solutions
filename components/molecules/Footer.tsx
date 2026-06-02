"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Heart,
  // Github,
  // Linkedin,
  // Facebook,
  ArrowUpRight,
  Mail,
} from "lucide-react";
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
  tagline?: string;
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
  tagline: "Building What's Next.",
  description:
    "Synvanta delivers ready-made and custom systems to help businesses work smarter and grow faster.",
  sections: [
    {
      title: "Products",
      links: [{ name: "Demo Projects", href: "#products" }],
    },
    {
      title: "Services",
      links: [
        { name: "How We Build", href: "#process" },
        { name: "What We Do", href: "#services" },
        { name: "Start Your Project", href: "#contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Meet The Team", href: "#about" },
      ],
    },
  ],
  copyright: "© 2024 Synvanta. All rights reserved.",
  legalLinks: [],
};

const MAX_SECTIONS = 3;

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/synvanta",
    icon: null, // Replace with actual GitHub icon component
    label: "Synvanta on GitHub",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/synvanta",
    icon: null, // Replace with actual LinkedIn icon component
    label: "Synvanta on LinkedIn",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/synvanta",
    icon: null, // Replace with actual Facebook icon component
    label: "Synvanta on Facebook",
  },
];

const Footer = (props: Props) => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const { logo, tagline, description, sections, legalLinks, className } = {
    ...defaultProps,
    ...props,
  };

  const visibleSections = (sections ?? []).slice(0, MAX_SECTIONS);

  return (
    <section className={cn("bg-card pt-32 pb-10 px-6 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <footer>
          {/* Top grid: brand + nav sections */}
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 justify-between">
            {/* Brand column */}
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

              {/* Tagline */}
              {tagline && (
                <p className="mt-3 text-sm font-semibold tracking-wide text-foreground/60 uppercase">
                  Synvanta — <span className="text-primary">{tagline}</span>
                </p>
              )}

              <p className="mt-4 text-md font-sans text-muted-foreground">
                {description}
              </p>

              {/* Contact email */}
              <a
                href="mailto:hello@synvanta.com"
                className="mt-5 inline-flex items-center gap-2 text-sm font-sans font-medium text-muted-foreground transition-colors hover:text-primary group"
                aria-label="Email Synvanta"
              >
                <Mail className="h-4 w-4 shrink-0" />
                synvanta.solutions@gmail.com
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/synvanta"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-sans font-medium text-muted-foreground transition-colors hover:text-primary group"
                aria-label="Synvanta on Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 fill-current"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
              </a>
            </div>

            {/* Nav sections */}
            <div className="col-span-4 grid grid-cols-3 gap-8">
              {visibleSections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-4 text-md font-semibold tracking-tight text-foreground">
                    {section.title}
                  </h3>
                  <ul className="space-y-4 text-md text-muted-foreground">
                    {section.links.map((link, linkIdx) => {
                      const isCTA = link.name === "Start Your Project";
                      return (
                        <li
                          key={linkIdx}
                          className={cn(
                            "font-sans transition-colors",
                            isCTA
                              ? "font-semibold text-primary hover:text-primary/80"
                              : "hover:text-primary",
                          )}
                        >
                          <a
                            href={link.href}
                            className={cn(
                              "inline-flex items-center gap-1",
                              isCTA && "group",
                            )}
                          >
                            {link.name}
                            {isCTA && (
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border pt-8 text-sm font-sans font-medium text-muted-foreground md:flex-row md:items-center">
            <p>© {year} Synvanta. All rights reserved.</p>

            {/* Legal links (if any) */}
            {legalLinks && legalLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {legalLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <span>Based in Batangas, Philippines</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
