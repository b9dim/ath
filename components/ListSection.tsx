"use client";

import clsx from "clsx";
import { PropsWithChildren } from "react";

type ListSectionProps = PropsWithChildren<{
  title?: string;
  className?: string;
}>;

export function ListSection({ title, className, children }: ListSectionProps) {
  return (
    <section className={clsx("space-y-3", className)}>
      {title && <h2 className="text-sm font-medium uppercase text-[#078477]">{title}</h2>}
      <div className="overflow-hidden rounded-3xl border border-[#C1D4CF] bg-white shadow-[0_16px_40px_rgba(7,132,119,0.08)]">
        {children}
      </div>
    </section>
  );
}

type ListCellProps = PropsWithChildren<{
  hint?: string;
  detail?: string;
  destructive?: boolean;
  onClick?: () => void;
  as?: "div" | "button";
}>;

export function ListCell({
  children,
  hint,
  detail,
  destructive,
  onClick,
  as: Component = "div"
}: ListCellProps) {
  const baseClasses = "flex w-full items-center gap-4 px-5 py-4 text-right transition";
  const content = (
    <>
      <div className="flex flex-1 flex-col gap-1 text-[#2F3E3A]">
        <span
          className={clsx("text-base font-semibold leading-6", destructive ? "text-[#B4AD9A]" : "text-[#2F3E3A]")}
        >
          {children}
        </span>
        {hint && <span className="text-xs text-[#6B7B76]">{hint}</span>}
      </div>
      {detail && (
        <span
          className={clsx(
            "rounded-2xl border px-3 py-1 text-xs font-semibold",
            destructive
              ? "border-[#B4AD9A] bg-[#B4AD9A]/20 text-[#2F3E3A]"
              : "border-[#078477] bg-[#078477]/10 text-[#078477]"
          )}
        >
          {detail}
        </span>
      )}
    </>
  );

  if (Component === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          baseClasses,
          destructive ? "bg-[#B4AD9A]/20 text-[#2F3E3A] hover:bg-[#B4AD9A]/30" : "hover:bg-[#C1D4CF]/40"
        )}
      >
        {content}
      </button>
    );
  }

  return <div className={clsx(baseClasses, "hover:bg-[#C1D4CF]/40")}>{content}</div>;
}

