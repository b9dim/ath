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
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.32em] text-slabel">السجلات</p>
          <h1 className="text-4xl font-bold">سجل التأخير</h1>
          <p className="text-sm text-slabel">راجع إجمالي التأخير اليومي وسجل حضورك المحفوظ محليًا.</p>
        </div>

        <GlassCard className={hasFullDayDelay ? "border-red-400/30 bg-red-50/40" : undefined}>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-slabel">إجمالي التأخير</span>
              <h2 className="text-3xl font-bold text-label">{formatDelay(totalDelay)}</h2>
            </div>
            <PrimaryButton type="button" onClick={() => setShowSheet(true)} disabled={!hasEntries}>
              مسح السجل
            </PrimaryButton>
          </div>
        </GlassCard>

        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {groupedEntries.length > 0 ? (
              groupedEntries.map(([date, items]) => (
                <motion.div
                  key={date}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  <ListSection title={date}>
                    {items.map((entry, index) => (
                      <div
                        key={entry.id}
                        className={index !== items.length - 1 ? "hairline-divider" : undefined}
                      >
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
                className="rounded-ios bg-white/60 px-6 py-10 text-center text-sm text-slabel shadow-inner shadow-white/50"
              >
                لا توجد سجلات محفوظة حتى الآن. قم بحساب التأخير في الصفحة الرئيسية وسيتم حفظ النتيجة هنا.
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

