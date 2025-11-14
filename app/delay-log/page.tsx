"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import PrimaryButton from "@/components/PrimaryButton";
import ConfirmSheet from "@/components/ConfirmSheet";
import { ListCell, ListSection } from "@/components/ListSection";
import { useAttendanceLog } from "@/hooks/useAttendanceLog";
import { FULL_DAY_DELAY_MINUTES, formatDelay, isFullDayDelay, remainingDelayToFullDay } from "@/lib/time";

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
  const totalIsFullDay = isFullDayDelay(totalDelay);
  const totalDelayInDays = useMemo(() => totalDelay / FULL_DAY_DELAY_MINUTES, [totalDelay]);
  const formattedTotalDelayInDays = useMemo(() => {
    if (!totalIsFullDay) return null;
    const value = totalDelayInDays;
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  }, [totalIsFullDay, totalDelayInDays]);
  const remainingToFullDay = useMemo(() => remainingDelayToFullDay(totalDelay), [totalDelay]);
  const showRemainingToFullDay = totalDelay > 0 && remainingToFullDay > 0;

    return (
      <>
        <div className="space-y-6">
          <section className="space-y-3 text-center">
            <span className="text-sm font-medium text-[#078477]">السجلات المحفوظة</span>
            <h1 className="text-2xl font-semibold text-[#2F3E3A]">سجل التأخير</h1>
          </section>

          <GlassCard className="space-y-4">
            <div className="space-y-2 text-center">
              <div className="text-sm text-[#4C5A56]">إجمالي دقائق التأخير</div>
              <div className="text-3xl font-bold text-[#2F3E3A]">{Math.max(totalDelay, 0)} دقيقة</div>
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C1D4CF] bg-[#F6FAF8] px-3 py-1 text-[11px] text-[#4C5A56]">
                عدد دقائق يوم عمل كامل: <span className="font-semibold text-[#2F3E3A]">{FULL_DAY_DELAY_MINUTES} دقيقة</span>
              </div>
              {showRemainingToFullDay && (
                <p className="text-xs text-[#4C5A56]">
                  متبقٍ <span className="font-semibold text-[#2F3E3A]">{remainingToFullDay}</span> دقيقة لبلوغ تأخير يوم كامل.
                </p>
              )}
              {totalIsFullDay && (
                <p className="text-xs font-semibold text-[#2F3E3A]">
                  إجمالي التأخير الحالي يعادل{" "}
                  <span className="text-[#078477]">
                    {formattedTotalDelayInDays ?? totalDelayInDays.toFixed(2)}
                  </span>{" "}
                  يوم عمل ({Math.max(totalDelay, 0)} دقيقة)، راجع الإجراءات المطلوبة.
                </p>
              )}
            </div>
            {hasFullDayDelay && (
              <div className="rounded-2xl border border-[#B4AD9A] bg-[#B4AD9A]/20 p-3 text-xs text-[#2F3E3A]">
                يوجد تأخير يعادل يوم عمل كامل ضمن السجلات، تأكد من متابعة الإجراءات الخاصة به.
              </div>
            )}
            <PrimaryButton type="button" onClick={() => setShowSheet(true)} disabled={!hasEntries}>
              مسح السجل بالكامل
            </PrimaryButton>
          </GlassCard>

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
                            ? "تأخير ليوم كامل"
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
                className="rounded-3xl border border-dashed border-[#C1D4CF] bg-white p-6 text-center text-sm text-[#4C5A56] shadow-[0_16px_40px_rgba(7,132,119,0.08)]"
              >
                لا توجد سجلات محفوظة حتى الآن. قم بحساب التأخير في الصفحة الرئيسية وسيضاف آخر تسجيل هنا تلقائيًا.
              </motion.div>
            )}
          </AnimatePresence>
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

