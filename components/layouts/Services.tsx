"use client";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

export interface ServiceItem {
    heading: string;
    descp: string;
    image: string;
}

export interface ServicesProps {
    data?: ServiceItem[];
}

export const servicesData: ServiceItem[] = [
    {
        heading: "Custom Web & Business Systems",
        descp: "Build powerful digital systems tailored to your business needs. From inventory and appointment systems to school and HR management—we create solutions that scale.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop"
    },
    {
        heading: "AI Integration for Businesses",
        descp: "Harness AI to automate and streamline your operations. We integrate AI-powered chatbots, content generators, and intelligent support systems.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=500&fit=crop"
    },
    {
        heading: "Website Development for SMEs",
        descp: "Modern, professional websites that convert. We combine development, design, and SEO to help your business stand out online.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=500&fit=crop"
    },
    {
        heading: "UI/UX Design + Branding",
        descp: "Create stunning visual identities and user experiences. From UI mockups to branding packages—we help you make a lasting impression.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop"
    },
    {
        heading: "QA Testing & Documentation",
        descp: "Ensure quality and clarity at every step. We provide comprehensive testing, test cases, user manuals, and API documentation.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
    },
    {
        heading: "Automation Services",
        descp: "Reduce manual work and boost efficiency. From email automation to CRM workflows—we help you work smarter, not harder.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop"
    },
    {
        heading: "IoT Solutions",
        descp: "Connect your physical and digital worlds. We build smart attendance systems, environmental monitoring dashboards, and sensor networks.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    }
];

function Services({ data = servicesData }: ServicesProps) {
    const [showAll, setShowAll] = useState(false);
    const displayedServices = showAll ? data : data.slice(0, 4);

    return (
        <section className="bg-background">
            <div className="py-8 sm:py-12 lg:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="flex flex-col gap-8 md:gap-16">

                        {/* Header */}
                        <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="flex flex-col items-center justify-center gap-4 max-w-2xl mx-auto"
                        >
                            <Badge variant="secondary" className="w-fit text-xs tracking-widest uppercase flex items-center gap-2">
                                <Zap className="h-3.5 w-3.5" />
                                Services
                            </Badge>
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-center leading-[1.1] tracking-tight">
                                What we do
                            </h1>
                            <p className="text-muted-foreground text-base leading-relaxed text-center">
                                We deliver powerful digital solutions tailored to help your business grow, automate operations, and stay competitive in today's market.
                            </p>
                        </motion.div>

                        {/* ✅ Grid — plain div, no motion stagger parent */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {displayedServices.map((value, index) => (
                                // ✅ Each card animates independently via whileInView
                                <motion.div
                                    key={value.heading}
                                    initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.21, 0.47, 0.32, 0.98],
                                        // ✅ Only stagger within the first 4; new cards animate without delay
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
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                        <div className="absolute top-4 left-4 z-10">
                                            <Badge variant="secondary" className="text-xs tracking-widest uppercase flex items-center gap-1 bg-primary/90 hover:bg-primary">
                                                <Zap className="h-3 w-3" />
                                            </Badge>
                                        </div>

                                        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-3 z-10">
                                            <h6 className="text-base font-semibold text-white line-clamp-2">
                                                {value.heading}
                                            </h6>
                                            <p className="text-sm text-white/90 line-clamp-2">
                                                {value.descp}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* View More / Show Less */}
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
                                    className="h-12 cursor-pointer px-8 md:h-14 md:px-10 flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-primary/25"
                                >
                                    {showAll ? "Show Less" : "View More"}
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;