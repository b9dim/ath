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
        <span className="text-sm uppercase tracking-[0.3em] text-white/60">متتبع الوقت الذكي</span>
        <h1 className="text-xl font-semibold tracking-tight">حافظ على انتظام حضورك</h1>
        <p className="text-sm leading-6 text-white/70">
          احسب فرق الوصول عن وقت الحضور الرسمي 07:15 صباحًا، وسجل كل نتيجة ليبقى أداؤك تحت السيطرة.
        </p>
      </section>

      <GlassCard>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label htmlFor="arrival-time" className="flex items-center justify-between text-sm text-white/70">
              <span>وقت الحضور</span>
              <span className="text-xs">07:15 هو الحد الرسمي</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-base text-white/60">🕘</div>
              <input
                id="arrival-time"
                type="time"
                required
                value={arrivalTime}
                onChange={(event) => setArrivalTime(event.target.value)}
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-12 py-3 text-sm text-white shadow-[0_12px_30px_rgba(8,13,30,0.25)] outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20"
              />
            </div>
            <p className="text-xs text-white/60">
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
                    ? "border-red-400/30 bg-gradient-to-b from-red-500/25 via-red-500/15 to-red-500/10"
                    : "border-orange-400/25 bg-gradient-to-b from-orange-500/25 via-orange-500/15 to-orange-500/10"
                  : "border-emerald-400/25 bg-gradient-to-b from-emerald-400/25 via-emerald-400/15 to-emerald-400/10"
              )}
            >
              <p className="text-sm text-white/70">
                النتيجة لوقت الحضور <span className="font-semibold text-white">{result.arrivalTime}</span>
              </p>
              {isDelayed ? (
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    التأخير: {formatDelay(result.delayMinutes)}
                  </h2>
                  <p className="text-sm text-white/70">
                    {isFullDayResult
                      ? "تم تسجيل تأخير يعادل يوم عمل كامل (420 دقيقة أو أكثر). يرجى متابعة الإجراءات المتبعة في جهتك."
                      : "قم بتسجيل التأخير لتتعامل معه لاحقًا وتفادي تكراره."}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">لا يوجد تأخير 🎉</h2>
                  <p className="text-sm text-white/70">
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

