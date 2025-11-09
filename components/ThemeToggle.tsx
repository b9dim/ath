"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { useTheme } from "@/components/ThemeProvider";

const spring = {
  type: "spring",
  stiffness: 260,
  damping: 20
};

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, isReady } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
      whileTap={{ scale: 0.94 }}
      className={clsx(
        "relative flex h-11 w-20 items-center rounded-full border border-[rgba(var(--border),0.45)] bg-[rgba(var(--card),0.56)] px-1.5 transition-all",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_14px_30px_rgba(var(--shadow),0.22)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--tint),0.45)] focus-visible:ring-offset-0",
        !isReady && "pointer-events-none opacity-0",
        className
      )}
    >
      <motion.span
        layout
        transition={spring}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(255,255,255,0.55))] text-sm text-label shadow-[0_12px_24px_rgba(var(--shadow),0.22)]"
      >
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </motion.span>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 text-xs font-semibold uppercase tracking-[0.08em] text-[rgba(var(--label),0.6)]">
        <span>نهار</span>
        <span>ليل</span>
      </div>
    </motion.button>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="4" fill="url(#sunCore)" />
      <g stroke="url(#sunStroke)" strokeWidth="1.5" strokeLinecap="round">
        <path d="M10 1.5v2" />
        <path d="M10 16.5v2" />
        <path d="M18.5 10h-2" />
        <path d="M3.5 10h-2" />
        <path d="M15.95 4.05l-1.4 1.4" />
        <path d="M5.45 14.55l-1.4 1.4" />
        <path d="M4.05 4.05l1.4 1.4" />
        <path d="M14.55 14.55l1.4 1.4" />
      </g>
      <defs>
        <linearGradient id="sunCore" x1="6" y1="6" x2="14" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(255,221,122,1)" />
          <stop offset="1" stopColor="rgba(255,179,71,1)" />
        </linearGradient>
        <linearGradient id="sunStroke" x1="4" y1="4" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(255,200,100,0.9)" />
          <stop offset="1" stopColor="rgba(255,170,50,0.9)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M15.5 13.2c-1.1 1.2-2.7 1.95-4.45 1.95-3.4 0-6.15-2.9-5.95-6.35 0.1-1.9 1.05-3.6 2.5-4.7-.1.4-.15.85-.15 1.3 0 3.4 2.75 6.15 6.15 6.15.65 0 1.25-.1 1.9-.35-.25.4-.6.9-1 1.4z"
        fill="url(#moonCore)"
      />
      <path
        d="M15.5 13.2c-1.1 1.2-2.7 1.95-4.45 1.95-3.4 0-6.15-2.9-5.95-6.35 0.1-1.9 1.05-3.6 2.5-4.7-.1.4-.15.85-.15 1.3 0 3.4 2.75 6.15 6.15 6.15.65 0 1.25-.1 1.9-.35-.25.4-.6.9-1 1.4z"
        stroke="url(#moonStroke)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="moonCore" x1="6" y1="5" x2="14.5" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(185,198,255,1)" />
          <stop offset="1" stopColor="rgba(157,168,255,1)" />
        </linearGradient>
        <linearGradient id="moonStroke" x1="5" y1="4" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(186,198,255,0.95)" />
          <stop offset="1" stopColor="rgba(141,156,255,0.95)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

