"use client";

import { forwardRef } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

type GlassCardProps = Omit<HTMLMotionProps<"div">, "ref" | "children"> & {
  children?: ReactNode;
  withPadding?: boolean;
};

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, withPadding = true, ...rest }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={clsx(
        "w-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/15 via-white/10 to-white/5 backdrop-blur-2xl shadow-[0_24px_60px_rgba(6,13,35,0.35)] text-white",
        withPadding && "p-5",
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  )
);

GlassCard.displayName = "GlassCard";

export default GlassCard;

