"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background dashed-border-container">
      <div className="dashed-content-lines" aria-hidden="true" />
      <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative">
        {/* Top dot grid */}
        <div className="relative z-50 bg-background">
          <div className="relative p-3">
            <div className="w-full h-[60px] sm:h-[140px] dot-grid" />
          </div>
          <div className="dashed-separator" />
        </div>

        {/* 404 Content */}
        <div className="relative z-50 bg-background">
          <div className="relative p-3">
            <div className="flex flex-col items-center justify-center py-16 sm:py-24 select-none">
              {/* 404 Number */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease }}
                className="relative"
              >
                <span className="text-[8rem] sm:text-[12rem] font-bold leading-none text-title tracking-tighter">
                  404
                </span>
                <div
                  className="absolute inset-0 dot-grid opacity-30 pointer-events-none"
                  aria-hidden="true"
                />
              </motion.div>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.15 }}
                className="text-muted-foreground text-sm sm:text-base text-center mt-2 max-w-[360px] leading-relaxed"
              >
                This page doesn&apos;t exist. Maybe it was moved, or you
                mistyped the URL.
              </motion.p>

              {/* Handwritten note */}
              <motion.span
                initial={{ opacity: 0, rotate: -3 }}
                animate={{ opacity: 1, rotate: -2 }}
                transition={{ duration: 0.5, ease, delay: 0.3 }}
                className="font-handwritten text-muted-foreground/60 text-lg mt-4"
              >
                nothing here...
              </motion.span>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.45 }}
                className="mt-10"
              >
                <Link
                  href="/"
                  className="flex items-center gap-1.5 bg-primary hover:bg-action-hover transition-colors duration-300 px-4 py-2 text-primary-foreground text-sm font-medium rounded-[9px] group"
                >
                  <ArrowLeft
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                  Go back home
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="dashed-separator" />
        </div>

        {/* Bottom dot grid */}
        <div className="relative z-50 bg-background">
          <div className="relative p-3">
            <div className="w-full h-[60px] sm:h-[100px] dot-grid" />
          </div>
        </div>
      </div>
    </main>
  );
}
