import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ChatWidgetWrapper } from "@/components/organisms/ChatWidgetWrapper";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["700", "800"],
  subsets: ["latin"],
});

// ── Metadata (server-rendered <head> tags) ────────────────────────────────────
export const metadata: Metadata = {
  title: "Synvanta — Pre-Built & Custom Business Systems",
  description:
    "Synvanta delivers pre-built digital systems and custom software solutions for startups and enterprises across Southeast Asia. Web apps, AI integration, IoT, automation, and more.",
  keywords: [
    "custom software development",
    "business systems",
    "AI integration",
    "web development Philippines",
    "Southeast Asia tech",
    "inventory management system",
    "e-commerce platform",
    "automation services",
    "IoT solutions",
    "Synvanta",
  ],
  authors: [{ name: "Synvanta" }],
  creator: "Synvanta",
  metadataBase: new URL("https://www.synvanta.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.synvanta.com",
    siteName: "Synvanta",
    title: "Synvanta — Pre-Built & Custom Business Systems",
    description:
      "Pre-built systems that slot straight into your workflow, and bespoke solutions engineered around your exact constraints.",
    images: [
      {
        url: "/og-image.png", // add a 1200×630 image to /public
        width: 1200,
        height: 630,
        alt: "Synvanta — Creating What's Next",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synvanta — Pre-Built & Custom Business Systems",
    description:
      "Pre-built systems that slot straight into your workflow, and bespoke solutions engineered around your exact constraints.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// ── JSON-LD structured data ───────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.synvanta.com/#organization",
      name: "Synvanta",
      url: "https://www.synvanta.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.synvanta.com/logo.png",
      },
      description:
        "Synvanta delivers pre-built digital systems and custom software solutions for startups and enterprises across Southeast Asia.",
      areaServed: "Southeast Asia",
      serviceType: [
        "Custom Web Development",
        "AI Integration",
        "Business Systems",
        "IoT Solutions",
        "Automation Services",
        "UI/UX Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.synvanta.com/#website",
      url: "https://www.synvanta.com",
      name: "Synvanta",
      publisher: { "@id": "https://www.synvanta.com/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.synvanta.com/#webpage",
      url: "https://www.synvanta.com",
      name: "Synvanta — Pre-Built & Custom Business Systems",
      isPartOf: { "@id": "https://www.synvanta.com/#website" },
      about: { "@id": "https://www.synvanta.com/#organization" },
      description:
        "Pre-built systems that slot straight into your workflow, and bespoke solutions engineered around your exact constraints.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Inject JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
       
        {/* With your own AI API */}
        <ChatWidgetWrapper />
        <Toaster />
      </body>
    </html>
  );
}
