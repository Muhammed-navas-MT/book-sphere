"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookMarked } from "lucide-react";
import Link from "next/link";
import { IBookDetails } from "../../shared/types/bookTypes";

interface HeroSectionProps {
  books: IBookDetails[];
}

const DEFAULT_COVERS = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600",
];

export default function HeroSection({ books }: HeroSectionProps) {
  const covers = books?.length > 0
    ? books.map((b) => b.coverImage)
    : DEFAULT_COVERS;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 4500);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [activeIndex, covers.length]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + covers.length) % covers.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % covers.length);
  };

  if (covers.length === 0) return null;

  // Retrieve previous, current, and next indexes to render side previews
  const getIndexes = () => {
    const prevIdx = (activeIndex - 1 + covers.length) % covers.length;
    const nextIdx = (activeIndex + 1) % covers.length;
    return { prevIdx, currentIdx: activeIndex, nextIdx };
  };

  const { prevIdx, currentIdx, nextIdx } = getIndexes();

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-b from-purple-50/50 via-white to-white border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Subtle decorative tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
          <BookMarked className="w-3.5 h-3.5" />
          Featured Cover Art
        </div>

        {/* Carousel Visual Frame */}
        <div className="relative w-full max-w-4xl h-[420px] flex items-center justify-center select-none">
          {/* Left Side Preview Cover */}
          {covers.length > 1 && (
            <div
              onClick={handlePrev}
              className="absolute left-4 lg:left-12 w-44 h-64 opacity-30 blur-[1px] hover:opacity-50 transition duration-300 transform -translate-x-1/4 scale-90 cursor-pointer hidden sm:block overflow-hidden rounded-2xl shadow-md"
            >
              <img
                src={covers[prevIdx]}
                alt="Previous book cover preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Active Center Cover */}
          <div className="relative z-10 w-64 sm:w-72 h-[380px] rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 border-4 border-white transition-all duration-300">
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={currentIdx}
                src={covers[currentIdx]}
                alt="Active book cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full object-cover bg-gray-50"
              />
            </AnimatePresence>
          </div>

          {/* Right Side Preview Cover */}
          {covers.length > 1 && (
            <div
              onClick={handleNext}
              className="absolute right-4 lg:right-12 w-44 h-64 opacity-30 blur-[1px] hover:opacity-50 transition duration-300 transform translate-x-1/4 scale-90 cursor-pointer hidden sm:block overflow-hidden rounded-2xl shadow-md"
            >
              <img
                src={covers[nextIdx]}
                alt="Next book cover preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Navigation Controls */}
          {covers.length > 1 && (
            <>
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-1/4 lg:left-[15%] z-20 w-12 h-12 flex items-center justify-center bg-white border border-gray-100 hover:border-purple-200 text-gray-700 hover:text-purple-600 rounded-full shadow-lg hover:shadow-purple-100 active:scale-95 transition-all duration-200"
                aria-label="Previous Cover"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-1/4 lg:right-[15%] z-20 w-12 h-12 flex items-center justify-center bg-white border border-gray-100 hover:border-purple-200 text-gray-700 hover:text-purple-600 rounded-full shadow-lg hover:shadow-purple-100 active:scale-95 transition-all duration-200"
                aria-label="Next Cover"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Carousel Indicators */}
        {covers.length > 1 && (
          <div className="flex items-center gap-2 mt-4">
            {covers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-6 bg-purple-600 shadow-md shadow-purple-200"
                    : "w-2 bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}