"use client";

// ProductModal.tsx — Gallery Modal Component
// Opens when a product card is clicked, shows a multi-image lightbox gallery.

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/components/screens/Products";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProductGalleryImage {
  src: string;
  caption?: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildGallery(product: Product): ProductGalleryImage[] {
  if (product.gallery && product.gallery.length > 0) {
    return product.gallery;
  }
  const seed = product.img.includes("picsum")
    ? (product.img.split("seed/")[1]?.split("/")[0] ?? String(product.id))
    : String(product.id);
  return [
    { src: product.img, caption: "Overview" },
    {
      src: `https://picsum.photos/seed/${seed}a/1600/1000`,
      caption: "Dashboard View",
    },
    {
      src: `https://picsum.photos/seed/${seed}b/1600/1000`,
      caption: "Detail Screen",
    },
    {
      src: `https://picsum.photos/seed/${seed}c/1600/1000`,
      caption: "Mobile View",
    },
  ];
}

// ---------------------------------------------------------------------------
// ThumbnailStrip
// ---------------------------------------------------------------------------

function ThumbnailStrip({
  images,
  active,
  onSelect,
}: {
  images: ProductGalleryImage[];
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none px-1">
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={img.caption ?? `Image ${i + 1}`}
          aria-pressed={active === i}
          className={`
            relative flex-shrink-0 h-16 w-24 sm:h-20 sm:w-32 rounded-lg overflow-hidden
            ring-2 transition-all duration-200
            ${
              active === i
                ? "ring-primary scale-105"
                : "ring-transparent opacity-50 hover:opacity-80 hover:scale-[1.02]"
            }
          `}
        >
          <Image
            src={img.src}
            alt={img.caption ?? `Screenshot ${i + 1}`}
            fill
            className="object-cover"
            sizes="128px"
          />
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ProductModal
// ---------------------------------------------------------------------------

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const gallery = product ? buildGallery(product) : [];
  const total = gallery.length;

  useEffect(() => {
    setActiveIdx(0);
    setZoomed(false);
  }, [product]);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setActiveIdx((prev) => (((prev + dir) % total) + total) % total);
      setZoomed(false);
    },
    [total],
  );

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!product) return;
      if (e.key === "Escape") {
        setZoomed(false);
        onClose();
      }
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "z" || e.key === "Z") setZoomed((z) => !z);
    },
    [product, navigate, onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;

  const activeImage = gallery[activeIdx];

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 backdrop-blur-md"
            onClick={() => (zoomed ? setZoomed(false) : onClose())}
            aria-hidden="true"
          />

          {/* Modal panel — near-fullscreen on all breakpoints */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} gallery`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="
              fixed z-50
              inset-x-3 inset-y-3
              sm:inset-x-6 sm:inset-y-4
              lg:inset-x-10 lg:inset-y-6
              xl:left-1/2 xl:-translate-x-1/2 xl:inset-y-6
              xl:w-[min(92vw,1280px)]
              bg-card border border-border rounded-2xl shadow-2xl
              flex flex-col overflow-hidden
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-5 sm:px-8 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-border shrink-0">
              <div className="flex flex-col gap-1 min-w-0">
                <Badge
                  variant="secondary"
                  className="w-fit text-[10px] sm:text-xs tracking-widest uppercase flex items-center gap-1.5"
                >
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  {product.category}
                </Badge>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground leading-tight truncate">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-1 sm:line-clamp-2">
                  {product.description}
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close gallery"
                className="
                  flex-shrink-0 mt-0.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full
                  border border-border bg-background
                  hover:bg-destructive hover:text-destructive-foreground hover:border-destructive
                  flex items-center justify-center transition-all duration-150
                "
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Main image — takes all remaining height */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={activeIdx}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({
                      x: d * 80,
                      opacity: 0,
                      scale: 0.98,
                    }),
                    center: { x: 0, opacity: 1, scale: zoomed ? 1.6 : 1 },
                    exit: (d: number) => ({
                      x: d * -80,
                      opacity: 0,
                      scale: 0.98,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`absolute inset-0 ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                  onClick={() => setZoomed((z) => !z)}
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.caption ?? `${product.name} screenshot`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1280px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next */}
              {total > 1 && (
                <>
                  <button
                    onClick={() => navigate(-1)}
                    aria-label="Previous image"
                    className="
                      absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10
                      w-10 h-10 sm:w-12 sm:h-12 rounded-full
                      bg-black/55 hover:bg-black/80 text-white border border-white/20
                      flex items-center justify-center
                      transition-all duration-150 hover:scale-110 active:scale-95
                    "
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    onClick={() => navigate(1)}
                    aria-label="Next image"
                    className="
                      absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10
                      w-10 h-10 sm:w-12 sm:h-12 rounded-full
                      bg-black/55 hover:bg-black/80 text-white border border-white/20
                      flex items-center justify-center
                      transition-all duration-150 hover:scale-110 active:scale-95
                    "
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </>
              )}

              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
                <div className="flex items-center gap-1.5 bg-black/55 text-white/75 text-[11px] sm:text-xs px-2.5 py-1.5 rounded-full border border-white/10">
                  <ZoomIn className="h-3 w-3" />
                  <span>{zoomed ? "Click to zoom out" : "Click to zoom"}</span>
                </div>
              </div>

              {/* Caption */}
              {activeImage.caption && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                  <span className="bg-black/60 text-white/90 text-xs sm:text-sm px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm whitespace-nowrap font-medium">
                    {activeImage.caption}
                  </span>
                </div>
              )}
            </div>

            {/* Footer: thumbnails + counter */}
            <div className="shrink-0 px-5 sm:px-8 py-3 sm:py-4 border-t border-border bg-background/70 backdrop-blur-sm flex flex-col gap-2.5">
              <ThumbnailStrip
                images={gallery}
                active={activeIdx}
                onSelect={(i) => {
                  setDirection(i > activeIdx ? 1 : -1);
                  setActiveIdx(i);
                  setZoomed(false);
                }}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground tabular-nums">
                  {activeIdx + 1} / {total}
                </p>
                <p className="text-[11px] text-muted-foreground hidden sm:block">
                  ← → to navigate · Z to zoom · Esc to close
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
