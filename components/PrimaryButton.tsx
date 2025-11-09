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
        "group flex w-full items-center justify-center rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition",
        "hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        (disabled || loading) && "cursor-not-allowed opacity-60",
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      <span className="relative z-10">{loading ? "جارٍ الحساب..." : children}</span>
    </motion.button>
  )
);

PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;

