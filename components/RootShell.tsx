"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";

export default function RootShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A2BF1] via-[#2433EF] to-[#0C0F31] text-white">
      <div className="max-w-[420px] mx-auto px-4 py-8 space-y-6">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="space-y-6"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}

