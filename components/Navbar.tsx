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
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="pointer-events-none fixed inset-x-0 top-6 flex justify-center px-5"
    >
      <nav className="pointer-events-auto flex w-full max-w-[460px] items-center justify-between gap-3 rounded-[28px] border border-[rgba(var(--border),0.35)] bg-[rgba(var(--card),0.66)] px-5 py-4 shadow-[0_24px_40px_rgba(var(--shadow),0.18)] backdrop-blur-2xl backdrop-saturate-150">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(255,255,255,0.86),rgba(255,255,255,0.45))] text-lg font-semibold text-label shadow-[0_12px_30px_rgba(var(--shadow),0.18)]">
            at
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(var(--label),0.55)]">حضور</p>
            <span className="text-base font-semibold text-label">مساعد التأخير</span>
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
                  "relative overflow-hidden rounded-full px-3.5 py-1.5 transition-all duration-300",
                  isActive
                    ? "text-label"
                    : "text-[rgba(var(--label),0.62)] hover:text-label hover:bg-[rgba(var(--card-elevated),0.55)]"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-[rgba(var(--card-elevated),0.85)] shadow-[0_18px_30px_rgba(var(--shadow),0.18)] mix-blend-normal"
                    transition={{ type: "spring", damping: 20, stiffness: 220 }}
                  />
                )}
                <span className="relative z-10 mix-blend-plus-lighter">{link.label}</span>
              </Link>
            );
          })}
        </div>
        <ThemeToggle className="shrink-0" />
      </nav>
    </motion.header>
  );
}

