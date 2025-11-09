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
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex w-full items-center justify-between gap-4 rounded-3xl border border-[#C1D4CF] bg-[#F5F5F5] p-4 shadow-[0_12px_30px_rgba(7,132,119,0.08)]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#078477] text-sm font-semibold text-white">
          at
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-medium text-[#078477]">حضور</p>
          <span className="text-sm font-semibold text-[#2F3E3A]">مساعد التأخير</span>
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
                isActive
                  ? "bg-[#078477] text-white shadow-[0_8px_20px_rgba(7,132,119,0.25)]"
                  : "text-[#078477] hover:bg-[#C1D4CF] hover:text-[#2F3E3A]"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}

