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
        "group relative flex w-full items-center justify-center overflow-hidden rounded-full px-6 py-3 text-base font-semibold text-white transition-all duration-300",
        "bg-[linear-gradient(125deg,_rgb(var(--tint))_0%,_rgba(var(--tint),0.82)_100%)] shadow-[0_20px_40px_rgba(var(--tint),0.32)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--tint),0.45)] focus-visible:ring-offset-0",
        (disabled || loading) && "cursor-not-allowed opacity-70",
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      <span className="relative z-10">{loading ? "جارٍ الحساب..." : children}</span>
      <span className="absolute inset-0 opacity-50 transition-opacity duration-300 group-hover:opacity-70 group-focus-visible:opacity-80">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,_rgba(255,255,255,0.28),_transparent_50%)]" />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.35)_0%,_rgba(255,255,255,0.05)_100%)] mix-blend-soft-light" />
      </span>
    </motion.button>
  )
);

PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;

