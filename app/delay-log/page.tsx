"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import PrimaryButton from "@/components/PrimaryButton";
import ConfirmSheet from "@/components/ConfirmSheet";
import { ListCell, ListSection } from "@/components/ListSection";
import { useAttendanceLog } from "@/hooks/useAttendanceLog";
import { formatDelay, isFullDayDelay } from "@/lib/time";

export default function DelayLogPage() {
  const { entries, totalDelay, clearEntries } = useAttendanceLog();
  const [showSheet, setShowSheet] = useState(false);

  const groupedEntries = useMemo(() => {
    const groups = new Map<string, typeof entries>();
    entries.forEach((entry) => {
      if (!groups.has(entry.date)) {
        groups.set(entry.date, []);
      }
      groups.get(entry.date)?.push(entry);
    });
    return Array.from(groups.entries());
  }, [entries]);

  const hasEntries = entries.length > 0;
  const hasFullDayDelay = useMemo(() => entries.some((entry) => isFullDayDelay(entry.delayMinutes)), [entries]);

  return (
    <>
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-[30px] border border-[rgba(var(--border),0.3)] bg-[linear-gradient(160deg,rgba(var(--card),0.85)_0%,rgba(var(--card-elevated),0.6)_100%)] px-7 py-8 shadow-[0_30px_60px_rgba(var(--shadow),0.22)]">
          <div className="absolute inset-0">
            <div className="absolute -left-10 top-10 h-24 w-24 rounded-full bg-[rgba(118,102,255,0.32)] blur-3xl" />
            <div className="absolute -right-12 -top-8 h-40 w-40 rounded-full bg-[rgba(99,205,255,0.2)] blur-3xl" />
          </div>
          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--border),0.45)] bg-[rgba(var(--card),0.65)] px-4 py-1 text-xs font-semibold text-[rgba(var(--label),0.68)] backdrop-blur-2xl">
              السجلات المحفوظة
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-label">سجل التأخير</h1>
              <p className="text-sm text-[rgba(var(--label),0.68)]">
                تابع الأرشيف المحلي لكل تسجيل. لا يتم رفع بياناتك لأي خادم.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <div className="glass-card flex flex-col gap-2 rounded-[24px] border border-[rgba(var(--border),0.4)] bg-[rgba(var(--card),0.78)] px-5 py-4 shadow-[0_22px_40px_rgba(var(--shadow),0.18)]">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(var(--label),0.55)]">
                  إجمالي التأخير
                </span>
                <span className="text-3xl font-black text-label">{formatDelay(totalDelay)}</span>
                <p className="text-xs text-[rgba(var(--label),0.62)]">تراكم جميع الدقائق المسجلة حتى الآن.</p>
              </div>
              <div className="flex items-end">
                <PrimaryButton type="button" onClick={() => setShowSheet(true)} disabled={!hasEntries}>
                  مسح السجل بالكامل
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {groupedEntries.length > 0 ? (
              groupedEntries.map(([date, items]) => (
                <motion.div
                  key={date}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <ListSection title={date}>
                    {items.map((entry, index) => (
                      <div key={entry.id} className={index !== items.length - 1 ? "hairline-divider" : undefined}>
                        <ListCell
                          hint={`الوصول: ${entry.arrivalTime}`}
                          detail={formatDelay(entry.delayMinutes)}
                          destructive={isFullDayDelay(entry.delayMinutes)}
                        >
                          {isFullDayDelay(entry.delayMinutes)
                            ? "تأخير ليوم عمل كامل"
                            : entry.delayMinutes > 0
                              ? "تأخير مسجل"
                              : "لا يوجد تأخير"}
                        </ListCell>
                      </div>
                    ))}
                  </ListSection>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[26px] border border-dashed border-[rgba(var(--border),0.45)] bg-[rgba(var(--card),0.4)] px-6 py-10 text-center text-sm text-[rgba(var(--label),0.62)] shadow-[0_20px_50px_rgba(var(--shadow),0.12)]"
              >
                لا توجد سجلات محفوظة حتى الآن. قم بحساب التأخير في الصفحة الرئيسية وسيضاف آخر تسجيل هنا تلقائيًا.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ConfirmSheet
        open={showSheet}
        title="مسح سجل التأخير؟"
        description="سيتم حذف جميع سجلات الحضور المخزنة على هذا الجهاز."
        confirmText="نعم، احذف"
        cancelText="تراجع"
        onConfirm={() => {
          clearEntries();
          setShowSheet(false);
        }}
        onCancel={() => setShowSheet(false)}
      />
    </>
  );
}

