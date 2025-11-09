"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";

export default function RootShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] via-[#C1D4CF] to-[#B4AD9A] text-[#2F3E3A]">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col gap-6 px-4 py-8">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="flex flex-1 flex-col gap-6 pb-8"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}

