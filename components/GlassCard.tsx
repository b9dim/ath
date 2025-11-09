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
        "w-full rounded-3xl border border-[#C1D4CF] bg-gradient-to-b from-white to-[#C1D4CF]/40 text-[#2F3E3A] shadow-[0_24px_60px_rgba(7,132,119,0.15)] backdrop-blur-sm",
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

