"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const resultCardTone = isDelayed
    ? isFullDayResult
      ? "border-red-500/25 bg-red-100/50"
      : "border-red-400/20 bg-red-50/50"
    : "border-green-400/20 bg-green-50/40";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.32em] text-slabel">اليوم</p>
        <h1 className="text-4xl font-bold">التأخير</h1>
        <p className="text-sm text-slabel">احسب التأخير مقارنة بوقت الحضور الرسمي 07:15 صباحًا.</p>
      </div>

      <GlassCard>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label htmlFor="arrival-time" className="block text-sm font-medium text-slabel">
              وقت الحضور
            </label>
            <input
              id="arrival-time"
              type="time"
              required
              value={arrivalTime}
              onChange={(event) => setArrivalTime(event.target.value)}
              className="w-full rounded-ios border border-white/40 bg-white/60 px-4 py-3 text-base text-label shadow-inner shadow-white/30 outline-none transition focus:border-tint focus:ring-2 focus:ring-tint/30"
            />
            <p className="text-xs text-slabel">الإخلال بالوقت بعد 07:15 يحسب كتأخير.</p>
          </div>
          <PrimaryButton type="submit" loading={submitting}>
            احسب التأخير
          </PrimaryButton>
        </form>
      </GlassCard>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.computedAt}
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ type: "spring", damping: 18, stiffness: 180 }}
          >
            <GlassCard className={resultCardTone}>
              <div className="space-y-2 text-center">
                <p className="text-sm text-slabel">
                  النتيجة لوقت الحضور <span className="font-semibold text-label">{result.arrivalTime}</span>
                </p>
                {isDelayed ? (
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-label">التأخير: {formatDelay(result.delayMinutes)}</h2>
                    {isFullDayResult ? (
                      <p className="text-sm text-slabel">
                        تم تسجيل تأخير يعادل يوم عمل كامل (420 دقيقة أو أكثر). يرجى متابعة الإجراءات الإدارية اللازمة.
                      </p>
                    ) : (
                      <p className="text-sm text-slabel">يرجى تسجيل التأخير والمبادرة إلى تعويض الوقت.</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-label">لا يوجد تأخير 🎉</h2>
                    <p className="text-sm text-slabel">أحسنت! وصلت قبل أو في الوقت المحدد.</p>
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

