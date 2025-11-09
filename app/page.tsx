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
  const resultCardTone = isDelayed
    ? isFullDayResult
      ? "glass-card border border-red-500/40 bg-[rgba(220,38,38,0.08)] shadow-[0_30px_60px_rgba(248,113,113,0.24)]"
      : "glass-card border border-red-400/35 bg-[rgba(248,113,113,0.08)]"
    : "glass-card border border-emerald-400/35 bg-[rgba(34,197,94,0.08)]";

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(180deg,rgba(var(--tint),0.18)_0%,rgba(var(--tint),0.05)_100%)] px-7 py-8 shadow-[0_30px_60px_rgba(var(--shadow),0.18)]">
        <div className="absolute inset-0">
          <div className="absolute -left-12 -top-16 h-32 w-32 rounded-full bg-[rgba(255,255,255,0.28)] blur-3xl" />
          <div className="absolute -bottom-16 -right-10 h-36 w-36 rounded-full bg-[rgba(135,92,255,0.25)] blur-3xl" />
        </div>
        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--border),0.45)] bg-[rgba(var(--card),0.65)] px-4 py-1 text-xs font-semibold text-[rgba(var(--label),0.68)] backdrop-blur-2xl">
            <span className="inline-flex h-2 w-2 rounded-full bg-[rgba(var(--tint),0.65)]" />
            متتبع الوقت الذكي
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-black leading-tight text-label">
              حافظ على انتظام حضورك
            </h1>
            <p className="text-sm leading-6 text-[rgba(var(--label),0.68)]">
              احسب فرق الوصول عن وقت الحضور الرسمي 07:15 صباحًا، وسجل كل نتيجة ليبقى أداؤك تحت السيطرة.
            </p>
          </div>
          <div className="grid gap-3 text-xs text-[rgba(var(--label),0.62)] sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-[18px] bg-[rgba(255,255,255,0.25)] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              احصل على ملخص فوري للتأخير
            </div>
            <div className="flex items-center gap-2 rounded-[18px] bg-[rgba(255,255,255,0.2)] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              يدعم الوضعين الفاتح والداكن
            </div>
          </div>
        </div>
      </section>

      <GlassCard className="border-none bg-[rgba(var(--card),0.82)] shadow-[0_24px_60px_rgba(var(--shadow),0.16)]">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="arrival-time" className="text-sm font-semibold text-label">
                وقت الحضور
              </label>
              <span className="text-xs font-medium text-[rgba(var(--label),0.55)]">07:15 صباحًا هو الحد الرسمي</span>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm font-medium text-[rgba(var(--label),0.5)]">
                🕘
              </div>
              <input
                id="arrival-time"
                type="time"
                required
                value={arrivalTime}
                onChange={(event) => setArrivalTime(event.target.value)}
                className="w-full rounded-[22px] border border-[rgba(var(--border),0.5)] bg-[rgba(var(--card-elevated),0.95)] px-12 py-3 text-base text-label shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] outline-none transition-all focus:border-[rgba(var(--tint),0.7)] focus:ring-4 focus:ring-[rgba(var(--tint),0.15)]"
              />
            </div>
            <p className="text-xs text-[rgba(var(--label),0.62)]">
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
            <div className={clsx("rounded-[26px] px-6 py-6 text-center", resultCardTone)}>
              <p className="text-sm text-[rgba(var(--label),0.7)]">
                النتيجة لوقت الحضور <span className="font-semibold text-label">{result.arrivalTime}</span>
              </p>
              {isDelayed ? (
                <div className="mt-4 space-y-3">
                  <h2 className="text-3xl font-extrabold text-label">
                    التأخير: {formatDelay(result.delayMinutes)}
                  </h2>
                  {isFullDayResult ? (
                    <p className="text-sm text-[rgba(var(--label),0.7)]">
                      تم تسجيل تأخير يعادل يوم عمل كامل (420 دقيقة أو أكثر). يرجى متابعة الإجراءات المتبعة في جهتك.
                    </p>
                  ) : (
                    <p className="text-sm text-[rgba(var(--label),0.7)]">
                      قم بتسجيل التأخير لتتعامل معه لاحقًا وتفادي تكراره.
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <h2 className="text-3xl font-extrabold text-label">لا يوجد تأخير 🎉</h2>
                  <p className="text-sm text-[rgba(var(--label),0.7)]">
                    ممتاز! حضورك في الوقت المحدد يضمن لك بداية يوم منتجة.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

