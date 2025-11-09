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
      <div className="flex w-full justify-center px-4 pb-16 pt-28">
        <div className="relative w-full max-w-[520px]">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_30%_0%,rgba(var(--tint),0.12),transparent_55%),radial-gradient(circle_at_90%_0%,rgba(148,88,255,0.12),transparent_60%)] blur-[60px]" />
          <div className="pointer-events-none absolute -inset-[18px] -z-20 rounded-[46px] border border-[rgba(var(--border),0.28)] bg-[rgba(255,255,255,0.02)] shadow-[0_45px_120px_rgba(var(--shadow),0.32)] backdrop-blur-[30px]" />
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="relative z-10 rounded-[36px] border border-[rgba(var(--border),0.35)] bg-[rgba(var(--card),0.72)] px-8 pb-12 pt-10 shadow-[0_32px_80px_rgba(var(--shadow),0.28)] backdrop-blur-[30px]"
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

