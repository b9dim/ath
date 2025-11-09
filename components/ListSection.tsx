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
      {title && <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-white/60">{title}</h2>}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl">
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
      <div className="flex flex-1 flex-col gap-1 text-white">
        <span className={clsx("text-base font-semibold leading-6", destructive ? "text-red-300" : "text-white")}>
          {children}
        </span>
        {hint && <span className="text-xs text-white/60">{hint}</span>}
      </div>
      {detail && (
        <span
          className={clsx(
            "rounded-2xl border px-3 py-1 text-xs font-semibold",
            destructive
              ? "border-red-400/40 bg-red-400/10 text-red-200"
              : "border-white/10 bg-white/10 text-white/80"
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
          destructive ? "bg-red-500/5 text-red-200 hover:bg-red-500/10" : "hover:bg-white/5"
        )}
      >
        {content}
      </button>
    );
  }

  return <div className={clsx(baseClasses, "hover:bg-white/5")}>{content}</div>;
}

