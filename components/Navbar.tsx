"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/delay-log", label: "سجل التأخير" }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex w-full items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-2xl"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-sm font-semibold text-white">
          at
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/70">حضور</p>
          <span className="text-sm font-semibold">مساعد التأخير</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "relative rounded-2xl px-3 py-1.5 transition",
                isActive ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
      <ThemeToggle className="shrink-0" />
    </motion.nav>
  );
}

