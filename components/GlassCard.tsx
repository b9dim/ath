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
        "glass-card border-white/30 bg-white/60 backdrop-blur-[22px] backdrop-saturate-150",
        withPadding && "px-5 py-5",
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

