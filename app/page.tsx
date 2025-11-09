"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import GlassCard from "@/components/GlassCard";
import PrimaryButton from "@/components/PrimaryButton";
import { useAttendanceLog } from "@/hooks/useAttendanceLog";
import { AttendanceEntry } from "@/types/attendance";
import { formatDelay, isFullDayDelay } from "@/lib/time";

const OFFICIAL_HOUR = 7;
const OFFICIAL_MINUTE = 15;

type ResultState = {
  delayMinutes: number;
  arrivalTime: string;
  computedAt: number;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-CA"); // yyyy-mm-dd
}

function parseTimeToMinutes(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
  return hour * 60 + minute;
}

function createEntry(delayMinutes: number, arrivalTime: string): AttendanceEntry {
  const now = new Date();
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${now.getTime()}-${Math.random().toString(36).slice(2, 6)}`,
    date: formatDate(now),
    arrivalTime,
    delayMinutes,
    createdAt: now.getTime()
  };
}

export default function HomePage() {
  const [arrivalTime, setArrivalTime] = useState("07:15");
  const [result, setResult] = useState<ResultState | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { addEntry } = useAttendanceLog();

  const officialMinutes = useMemo(() => OFFICIAL_HOUR * 60 + OFFICIAL_MINUTE, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const minutes = parseTimeToMinutes(arrivalTime);
    if (minutes === null) return;

    setSubmitting(true);
    window.setTimeout(() => {
      const delayMinutes = Math.max(0, minutes - officialMinutes);
      const entry = createEntry(delayMinutes, arrivalTime);
      addEntry(entry);
      setResult({
        delayMinutes,
        arrivalTime,
        computedAt: entry.createdAt
      });
      setSubmitting(false);
    }, 220);
  };

  const isDelayed = result ? result.delayMinutes > 0 : false;
  const isFullDayResult = result ? isFullDayDelay(result.delayMinutes) : false;

  return (
    <div className="space-y-6">
      <section className="space-y-3 text-center">
        <span className="text-sm font-medium text-[#078477]">متتبع الوقت الذكي</span>
        <h1 className="text-2xl font-semibold text-[#2F3E3A]">حافظ على انتظام حضورك</h1>
        <p className="text-sm leading-6 text-[#4C5A56]">
          احسب فرق الوصول عن وقت الحضور الرسمي 07:15 صباحًا، وسجل كل نتيجة ليبقى أداؤك تحت السيطرة.
        </p>
      </section>

      <GlassCard>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label htmlFor="arrival-time" className="flex items-center justify-between text-sm text-[#4C5A56]">
              <span className="font-semibold text-[#2F3E3A]">وقت الحضور</span>
              <span className="text-xs text-[#6B7B76]">07:15 هو الحد الرسمي</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-lg text-[#078477]">🕘</div>
              <input
                id="arrival-time"
                type="time"
                required
                value={arrivalTime}
                onChange={(event) => setArrivalTime(event.target.value)}
                dir="ltr"
                className="w-full appearance-none rounded-2xl border border-[#C1D4CF] bg-white pr-12 pl-4 py-3 text-left text-base text-[#2F3E3A] shadow-[0_12px_24px_rgba(7,132,119,0.12)] transition focus:border-[#078477] focus:ring-2 focus:ring-[#078477]/25"
              />
            </div>
            <p className="text-xs text-[#6B7B76]">
              أدخل وقت الوصول الفعلي للتعرف على مقدار التأخير أو التأكد من انضباطك.
            </p>
          </div>
          <PrimaryButton type="submit" loading={submitting}>
            احسب التأخير الآن
          </PrimaryButton>
        </form>
      </GlassCard>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.computedAt}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 220 }}
          >
            <GlassCard
              className={clsx(
                "space-y-3 text-center",
                isDelayed
                  ? isFullDayResult
                    ? "border-[#B4AD9A] bg-gradient-to-b from-[#B4AD9A]/30 via-[#B4AD9A]/20 to-[#B4AD9A]/10"
                    : "border-[#B4AD9A] bg-gradient-to-b from-[#B4AD9A]/25 via-[#B4AD9A]/15 to-[#B4AD9A]/8"
                  : "border-[#078477] bg-gradient-to-b from-[#078477]/20 via-[#078477]/12 to-[#078477]/6"
              )}
            >
              <p className="text-sm text-[#4C5A56]">
                النتيجة لوقت الحضور <span className="font-semibold text-[#2F3E3A]">{result.arrivalTime}</span>
              </p>
              {isDelayed ? (
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-[#2F3E3A]">التأخير: {formatDelay(result.delayMinutes)}</h2>
                  <p className="text-sm text-[#4C5A56]">
                    {isFullDayResult
                      ? "تم تسجيل تأخير يعادل يوم عمل كامل (420 دقيقة أو أكثر). يرجى متابعة الإجراءات المتبعة في جهتك."
                      : "قم بتسجيل التأخير لتتعامل معه لاحقًا وتفادي تكراره."}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-[#078477]">لا يوجد تأخير 🎉</h2>
                  <p className="text-sm text-[#4C5A56]">
                    ممتاز! حضورك في الوقت المحدد يضمن لك بداية يوم منتجة.
                  </p>
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

