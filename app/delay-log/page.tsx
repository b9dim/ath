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
        <section className="space-y-3 text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-white/60">السجلات المحفوظة</span>
          <h1 className="text-xl font-semibold tracking-tight">سجل التأخير</h1>
          <p className="text-sm text-white/70">
            تابع الأرشيف المحلي لكل تسجيل. لا يتم رفع بياناتك لأي خادم.
          </p>
        </section>

        <GlassCard className="space-y-4">
          <div className="space-y-2 text-center">
            <div className="text-sm text-white/70">إجمالي التأخير</div>
            <div className="text-3xl font-bold tracking-tight">{formatDelay(totalDelay)}</div>
            <p className="text-xs text-white/60">تراكم جميع الدقائق المسجلة حتى الآن.</p>
          </div>
          {hasFullDayDelay && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
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
              className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-sm text-white/70 backdrop-blur-2xl"
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

