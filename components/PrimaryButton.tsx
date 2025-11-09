"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function PrimaryButton({ className, children, disabled, loading, ...rest }: PrimaryButtonProps) {
  return (
    <motion.button
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
  );
}

