"use client";

// ProductsCarousel.tsx — Client Component
// All carousel state, keyboard navigation, window resize, and animations live here.
// Clicking the active (front) card opens the ProductModal gallery.

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Expand } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/components/screens/Products";
import ProductModal from "@/components/organisms/ProductModal";

interface ProductsCarouselProps {
  products: Product[];
}

// ---------------------------------------------------------------------------
// Spread config
// ---------------------------------------------------------------------------

const getSpreadConfig = (isMobile: boolean, isTablet: boolean) => {
  if (isMobile) {
    return [
      { rotate: -15, tx: -40, ty: 12, scale: 0.7, zIndex: 1, opacity: 0.4 },
      { rotate: -7, tx: -20, ty: 5, scale: 0.85, zIndex: 2, opacity: 0.7 },
      { rotate: 0, tx: 0, ty: 0, scale: 1, zIndex: 5, opacity: 1 },
      { rotate: 7, tx: 20, ty: 5, scale: 0.85, zIndex: 2, opacity: 0.7 },
      { rotate: 15, tx: 40, ty: 12, scale: 0.7, zIndex: 1, opacity: 0.4 },
    ];
  } else if (isTablet) {
    return [
      { rotate: -18, tx: -60, ty: 15, scale: 0.8, zIndex: 1, opacity: 0.6 },
      { rotate: -9, tx: -30, ty: 7, scale: 0.88, zIndex: 2, opacity: 0.8 },
      { rotate: 0, tx: 0, ty: 0, scale: 1, zIndex: 5, opacity: 1 },
      { rotate: 9, tx: 30, ty: 7, scale: 0.88, zIndex: 2, opacity: 0.8 },
      { rotate: 18, tx: 60, ty: 15, scale: 0.8, zIndex: 1, opacity: 0.6 },
    ];
  } else {
    return [
      { rotate: -22, tx: -90, ty: 18, scale: 0.84, zIndex: 1, opacity: 0.7 },
      { rotate: -11, tx: -44, ty: 8, scale: 0.91, zIndex: 2, opacity: 0.85 },
      { rotate: 0, tx: 0, ty: 0, scale: 1, zIndex: 5, opacity: 1 },
      { rotate: 11, tx: 44, ty: 8, scale: 0.91, zIndex: 2, opacity: 0.85 },
      { rotate: 22, tx: 90, ty: 18, scale: 0.84, zIndex: 1, opacity: 0.7 },
    ];
  }
};

function getSpreadPos(
  cardIdx: number,
  current: number,
  spread: ReturnType<typeof getSpreadConfig>,
  N: number,
) {
  const offset = (((cardIdx - current) % N) + N) % N;
  const centerOffset = offset <= Math.floor(N / 2) ? offset : offset - N;
  const spreadIdx = centerOffset + 2;
  if (spreadIdx < 0 || spreadIdx >= spread.length) return null;
  return { ...spread[spreadIdx], spreadIdx };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProductsCarousel({ products }: ProductsCarouselProps) {
  const N = products.length;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 });
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowSize.width < 640;
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024;
  const spread = getSpreadConfig(isMobile, isTablet);

  const advance = useCallback(
    (steps: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent((prev) => (((prev + steps) % N) + N) % N);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating, N],
  );

  const handleCardClick = (i: number) => {
    if (animating) return;
    if (i === current) {
      // Active card → open gallery
      setModalProduct(products[i]);
      return;
    }
    // Non-active card → rotate to front
    const offset = (((i - current) % N) + N) % N;
    advance(offset <= Math.floor(N / 2) ? offset : -(N - offset));
  };

  // Arrow keys only when modal is closed
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalProduct) return;
      if (e.key === "ArrowLeft") advance(-1);
      if (e.key === "ArrowRight") advance(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, modalProduct]);

  const getCardDimensions = () => {
    if (isMobile)
      return {
        container: "h-[min(60vh,400px)] w-[min(85vw,280px)]",
        card: "h-[min(60vh,400px)] w-[min(85vw,280px)]",
      };
    if (isTablet)
      return {
        container: "h-[min(65vh,480px)] w-[min(85vw,340px)]",
        card: "h-[min(65vh,480px)] w-[min(85vw,340px)]",
      };
    return {
      container: "h-[min(70vh,560px)] w-[min(90vw,380px)]",
      card: "h-[min(70vh,560px)] w-[min(90vw,380px)]",
    };
  };

  const dimensions = getCardDimensions();

  return (
    <>
      <div className="flex flex-col items-center gap-6 sm:gap-10 w-full">
        {/* Card deck */}
        <div
          className={`relative flex items-center justify-center ${dimensions.container}`}
          role="region"
          aria-label="Product carousel"
        >
          {products.map((product, i) => {
            const pos = getSpreadPos(i, current, spread, N);
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
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className={`absolute cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl ${dimensions.card}`}
                style={{
                  boxShadow: isActive
                    ? "0 20px 40px rgba(0,0,0,0.25)"
                    : "0 4px 12px rgba(0,0,0,0.1)",
                }}
                aria-label={
                  isActive
                    ? `Open ${product.name} gallery`
                    : `Go to ${product.name}`
                }
                role="button"
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => {
                  if (isActive && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setModalProduct(product);
                  }
                }}
              >
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 340px, 380px"
                  priority={isActive}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-10">
                  <Badge className="bg-primary text-primary-foreground flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs">
                    <Sparkles
                      className="h-2 w-2 sm:h-3 sm:w-3"
                      aria-hidden="true"
                    />
                    <span className="hidden xs:inline">{product.category}</span>
                    <span className="xs:hidden">
                      {product.category.split(" ")[0]}
                    </span>
                  </Badge>
                </div>

                {/* "View Gallery" pill — only on active card */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 }}
                    className="absolute top-3 sm:top-5 right-3 sm:right-5 z-10"
                  >
                    <div className="flex items-center gap-1 bg-black/50 text-white/90 text-[10px] px-2 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                      <Expand className="h-2.5 w-2.5" aria-hidden="true" />
                      <span className="hidden sm:inline">View Gallery</span>
                    </div>
                  </motion.div>
                )}

                {/* Card text */}
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0.75,
                    y: isActive ? 0 : 4,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-x-0 bottom-0 p-3 sm:p-5 z-10"
                >
                  <p className="text-[8px] sm:text-[10px] tracking-widest uppercase text-white/60 mb-0.5 sm:mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-base sm:text-xl lg:text-2xl font-extrabold text-white leading-tight mb-0.5 sm:mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-white/75 leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {product.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => advance(-1)}
            aria-label="Previous project"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-border bg-card hover:bg-card/80 hover:border-primary text-foreground flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <div
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3"
            role="tablist"
            aria-label="Project slides"
          >
            {products.map((p, i) => (
              <button
                key={i}
                onClick={() => handleCardClick(i)}
                role="tab"
                aria-selected={current === i}
                aria-label={`Go to ${p.name}`}
                className="focus:outline-none"
              >
                <motion.div
                  animate={{
                    width: current === i ? 16 : 6,
                    height: 6,
                    backgroundColor:
                      current === i
                        ? "hsl(var(--primary))"
                        : "hsl(var(--border))",
                  }}
                  className="rounded-full"
                  transition={{ duration: 0.2 }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => advance(1)}
            aria-label="Next project"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-border bg-card hover:bg-card/80 hover:border-primary text-foreground flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <p
          className="text-xs sm:text-sm text-muted-foreground tabular-nums"
          aria-live="polite"
        >
          {current + 1} / {N}
        </p>
      </div>

      {/* Gallery modal */}
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </>
  );
}
