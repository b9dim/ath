"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

type GlassCardProps = HTMLMotionProps<"div"> & {
  withPadding?: boolean;
};

export default function GlassCard({
  children,
  className,
  withPadding = true,
  ...rest
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={clsx(
        "glass-card border-white/30 bg-white/60 backdrop-blur-[22px] backdrop-saturate-150",
        withPadding && "px-5 py-5",
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

