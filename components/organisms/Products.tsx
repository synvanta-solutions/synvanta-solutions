"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  img: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "Full-featured online store with payment integration",
    category: "Web Development",
    img: "https://picsum.photos/seed/ecom/560/720",
  },
  {
    id: 2,
    name: "Inventory Management",
    description: "Real-time stock tracking and automated alerts",
    category: "Business Systems",
    img: "https://picsum.photos/seed/invent/560/720",
  },
  {
    id: 3,
    name: "AI Chatbot Solution",
    description: "Intelligent customer support automation",
    category: "AI Integration",
    img: "https://picsum.photos/seed/aichat/560/720",
  },
  {
    id: 4,
    name: "Mobile App Design",
    description: "User-centric iOS and Android experiences",
    category: "UI/UX Design",
    img: "https://picsum.photos/seed/mobileapp/560/720",
  },
  {
    id: 5,
    name: "Analytics Dashboard",
    description: "Data-driven insights with real-time metrics",
    category: "Business Intelligence",
    img: "https://picsum.photos/seed/analytic/560/720",
  },
];

// Fan spread config: index 0 = far left, 2 = center, 4 = far right
const SPREAD = [
  { rotate: -22, tx: -90, ty: 18, scale: 0.84, zIndex: 1, opacity: 0.7 },
  { rotate: -11, tx: -44, ty: 8,  scale: 0.91, zIndex: 2, opacity: 0.85 },
  { rotate:   0, tx:   0, ty: 0,  scale: 1,    zIndex: 5, opacity: 1 },
  { rotate:  11, tx:  44, ty: 8,  scale: 0.91, zIndex: 2, opacity: 0.85 },
  { rotate:  22, tx:  90, ty: 18, scale: 0.84, zIndex: 1, opacity: 0.7 },
];

const N = products.length;

function getSpreadPos(cardIdx: number, current: number) {
  const offset = ((cardIdx - current) % N + N) % N;
  const centerOffset = offset <= Math.floor(N / 2) ? offset : offset - N;
  const spreadIdx = centerOffset + 2;
  if (spreadIdx < 0 || spreadIdx >= SPREAD.length) return null;
  return { ...SPREAD[spreadIdx], spreadIdx };
}

const Products = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const advance = useCallback(
    (steps: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent((prev) => ((prev + steps) % N + N) % N);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating]
  );

  const handleCardClick = (i: number) => {
    if (i === current || animating) return;
    const offset = ((i - current) % N + N) % N;
    advance(offset <= Math.floor(N / 2) ? offset : -(N - offset));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") advance(-1);
      if (e.key === "ArrowRight") advance(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  return (
    <section className="bg-background">
      <div className="py-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-12 md:gap-20 items-center">

            {/* Header */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col items-center gap-4 max-w-2xl"
            >
              <Badge
                variant="secondary"
                className="w-fit text-xs tracking-widest uppercase flex items-center gap-2"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Featured Work
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-center leading-[1.1] tracking-tight">
                Our Latest Projects
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed text-center">
                Explore our portfolio of successful projects and innovative
                solutions we&apos;ve delivered.
              </p>
            </motion.div>

            {/* Fan Deck */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col items-center gap-10"
            >
              {/* Card deck container */}
              <div className="relative w-[320px] h-[380px] flex items-center justify-center">
                {products.map((product, i) => {
                  const pos = getSpreadPos(i, current);
                  if (!pos) return null;
                  const isActive = pos.spreadIdx === 2;

                  return (
                    <motion.div
                      key={product.id}
                      onClick={() => handleCardClick(i)}
                      animate={{
                        rotate: pos.rotate,
                        x: pos.tx,
                        y: pos.ty,
                        scale: pos.scale,
                        opacity: pos.opacity,
                        zIndex: pos.zIndex,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                      }}
                      className="absolute w-[280px] h-[360px] rounded-2xl overflow-hidden cursor-pointer"
                      style={{
                        boxShadow: isActive
                          ? "0 20px 60px rgba(0,0,0,0.28)"
                          : "0 4px 16px rgba(0,0,0,0.12)",
                      }}
                    >
                      {/* Image */}
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="280px"
                        priority={isActive}
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      {/* Category badge */}
                      <div className="absolute top-5 left-5 z-10">
                        <Badge className="bg-primary text-primary-foreground flex items-center gap-1.5 px-3 py-1.5 text-xs">
                          <Sparkles className="h-3 w-3" />
                          {product.category}
                        </Badge>
                      </div>

                      {/* Text content */}
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0.75, y: isActive ? 0 : 4 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-x-0 bottom-0 p-5 z-10"
                      >
                        <p className="text-[10px] tracking-widest uppercase text-white/60 mb-1">
                          {product.category}
                        </p>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-1">
                          {product.name}
                        </h2>
                        <p className="text-xs text-white/75 leading-relaxed">
                          {product.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => advance(-1)}
                  aria-label="Previous product"
                  className="w-11 h-11 rounded-full border border-border bg-card hover:bg-card/80 hover:border-primary text-foreground flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2 px-3">
                  {products.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        width: current === i ? 20 : 8,
                        backgroundColor:
                          current === i
                            ? "var(--color-primary, #000)"
                            : "var(--color-border, #ccc)",
                      }}
                      className="h-2 rounded-full"
                    />
                  ))}
                </div>

                <button
                  onClick={() => advance(1)}
                  aria-label="Next product"
                  className="w-11 h-11 rounded-full border border-border bg-card hover:bg-card/80 hover:border-primary text-foreground flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Counter */}
              <p className="text-sm text-muted-foreground tabular-nums">
                {current + 1} / {N}
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;