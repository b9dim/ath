"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

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
      <nav className="pointer-events-auto glass-card flex w-full max-w-[420px] items-center justify-between gap-1 rounded-ios-lg px-5 py-3 backdrop-saturate-150">
        <span className="text-sm font-medium text-slabel">التأخير</span>
        <div className="flex items-center gap-2 text-sm font-medium">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "relative overflow-hidden rounded-full px-3 py-1 transition-colors duration-200",
                  isActive ? "text-label" : "text-slabel hover:text-label"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/70 mix-blend-normal"
                    transition={{ type: "spring", damping: 22, stiffness: 200 }}
                  />
                )}
                <span className="relative z-10 mix-blend-plus-lighter">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </motion.header>
  );
}

