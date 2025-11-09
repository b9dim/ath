"use client";

import clsx from "clsx";
import { PropsWithChildren } from "react";

type ListSectionProps = PropsWithChildren<{
  title?: string;
  className?: string;
}>;

export function ListSection({ title, className, children }: ListSectionProps) {
  return (
    <section className={clsx("space-y-2", className)}>
      {title && <h2 className="px-3 text-xs font-semibold uppercase tracking-[0.3em] text-slabel">{title}</h2>}
      <div className="overflow-hidden rounded-ios bg-white/55 shadow-ios/40 backdrop-blur-2xl backdrop-saturate-150">
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
  const content = (
    <>
      <div className="flex flex-1 flex-col gap-1">
        <span className={clsx("text-base", destructive ? "text-red-500" : "text-label")}>{children}</span>
        {hint && <span className="text-xs text-slabel">{hint}</span>}
      </div>
      {detail && <span className={clsx("text-sm text-slabel", destructive && "text-red-500")}>{detail}</span>}
    </>
  );

  if (Component === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          "flex w-full items-center gap-3 px-4 py-4 text-right transition-colors",
          destructive
            ? "bg-white/40 text-red-500 hover:bg-red-50/80"
            : "bg-transparent text-label hover:bg-white/70"
        )}
      >
        {content}
      </button>
    );
  }

  return <div className="flex items-center gap-3 px-4 py-4 text-right">{content}</div>;
}

