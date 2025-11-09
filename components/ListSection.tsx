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
      {title && (
        <h2 className="px-2 text-sm font-semibold uppercase tracking-[0.32em] text-[rgba(var(--label),0.55)]">
          {title}
        </h2>
      )}
      <div className="overflow-hidden rounded-[24px] border border-[rgba(var(--border),0.35)] bg-[rgba(var(--card),0.65)] shadow-[0_24px_45px_rgba(var(--shadow),0.18)] backdrop-blur-[22px]">
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
        <span
          className={clsx(
            "text-base font-semibold leading-6",
            destructive ? "text-red-400" : "text-label"
          )}
        >
          {children}
        </span>
        {hint && <span className="text-xs text-[rgba(var(--label),0.6)]">{hint}</span>}
      </div>
      {detail && (
        <span
          className={clsx(
            "rounded-full border border-[rgba(var(--border),0.35)] px-3 py-1 text-xs font-semibold",
            destructive
              ? "border-red-400/60 bg-[rgba(248,113,113,0.1)] text-red-400"
              : "bg-[rgba(var(--card-elevated),0.7)] text-[rgba(var(--label),0.75)]"
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
          "flex w-full items-center gap-4 px-5 py-4 text-right transition-all duration-300",
          destructive
            ? "bg-[rgba(248,113,113,0.08)] text-red-400 hover:bg-[rgba(248,113,113,0.12)]"
            : "bg-transparent text-label hover:bg-[rgba(var(--card-elevated),0.7)]"
        )}
      >
        {content}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4 px-5 py-4 text-right transition-colors duration-300 hover:bg-[rgba(var(--card-elevated),0.55)]">
      {content}
    </div>
  );
}

