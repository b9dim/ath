"use client";

import { forwardRef } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

type PrimaryButtonProps = Omit<HTMLMotionProps<"button">, "ref" | "children"> & {
  children?: ReactNode;
  loading?: boolean;
};

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, children, disabled, loading, ...rest }, ref) => (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.96 }}
      className={clsx(
        "relative flex w-full items-center justify-center overflow-hidden rounded-full bg-tint/90 px-5 py-3 text-base font-semibold text-white shadow-ios transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-tint/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        (disabled || loading) && "cursor-not-allowed opacity-70",
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      <span className="relative z-10">{loading ? "جارٍ الحساب..." : children}</span>
      <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-black/10 opacity-40" />
    </motion.button>
  )
);

PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;

