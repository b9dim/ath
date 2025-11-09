"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";

export default function RootShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="w-full max-w-[420px] px-5 pb-16 pt-28"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

