'use client';

import Image from 'next/image';
import { personalInfo } from '@/config/personal';
import { motion } from 'framer-motion';

// Smooth spring-like easing for React Flow feel
const smoothEase = [0.22, 1, 0.36, 1] as const;

const dotGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: smoothEase,
    },
  },
};

const separatorVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

export default function PreviewPage() {
  return (
    <main className="h-screen bg-background dashed-border-container flex flex-col overflow-hidden">
      <div className="dashed-content-lines" style={{ maxWidth: '1150px' }} aria-hidden="true" />
      <div className="max-w-[1150px] mx-4 sm:mx-12 md:mx-auto relative w-full flex flex-col h-full">
        {/* Top dot grid section - fills remaining space */}
        <motion.div
          className="relative z-50 bg-background flex-[0.8]"
          initial="hidden"
          animate="visible"
          variants={dotGridVariants}
        >
          <div className="relative p-4 h-full">
            <div className="w-full h-full dot-grid" style={{ backgroundImage: 'radial-gradient(#aaa 1.5px, transparent 1.5px)', backgroundSize: '14px 14px' }}></div>
          </div>
        </motion.div>

        <motion.div
          className="dashed-separator origin-left"
          initial="hidden"
          animate="visible"
          variants={separatorVariants}
        />

        {/* Profile section - centered */}
        <div className="relative z-50 bg-background">
          <div className="relative px-20 py-24">
            <div className="flex items-center gap-16">
              {/* Profile image */}
              <motion.div
                className="border border-border rounded-[30px] p-[12px] bg-white"
                initial={{ opacity: 0, scale: 0.8, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, ease: smoothEase }}
              >
                <Image
                  src="/linkedin-pfp.jpg"
                  alt="Profile"
                  width={260}
                  height={260}
                  className="rounded-[20px] object-cover select-none"
                />
              </motion.div>

              {/* Name and title */}
              <div className="flex flex-col select-none">
                <motion.h1
                  className="text-[5rem] font-bold leading-[1.1] text-title"
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, ease: smoothEase, delay: 0.2 }}
                >
                  {personalInfo.name}
                </motion.h1>
                <motion.p
                  className="text-muted-foreground text-4xl mt-5"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: smoothEase, delay: 0.4 }}
                >
                  Vocational Student
                </motion.p>
              </div>
            </div>

            {/* Website URL - bottom right */}
            <motion.span
              className="absolute bottom-10 right-20 text-muted-foreground text-3xl select-none"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.6 }}
            >
              pratama.dev
            </motion.span>
          </div>
        </div>

        <motion.div
          className="dashed-separator origin-right"
          initial="hidden"
          animate="visible"
          variants={separatorVariants}
          transition={{ delay: 0.2 }}
        />

        {/* Bottom dot grid section - fills remaining space */}
        <motion.div
          className="relative z-50 bg-background flex-[0.8]"
          initial="hidden"
          animate="visible"
          variants={dotGridVariants}
          transition={{ delay: 0.3 }}
        >
          <div className="relative p-4 h-full">
            <div className="w-full h-full dot-grid" style={{ backgroundImage: 'radial-gradient(#aaa 1.5px, transparent 1.5px)', backgroundSize: '14px 14px' }}></div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
