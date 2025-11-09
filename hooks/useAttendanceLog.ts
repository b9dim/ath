"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AttendanceEntry } from "@/types/attendance";

const STORAGE_KEY = "attendance_log";

function readLog(): AttendanceEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as AttendanceEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed.sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export function useAttendanceLog() {
  const [entries, setEntries] = useState<AttendanceEntry[]>([]);

  useEffect(() => {
    setEntries(readLog());
  }, []);

  const addEntry = useCallback(
    (entry: AttendanceEntry) => {
      setEntries((prev) => {
        const nextEntries = [entry, ...prev];
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries));
        }
        return nextEntries;
      });
    },
    []
  );

  const clearEntries = useCallback(() => {
    setEntries(() => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      }
      return [];
    });
  }, []);

  const totalDelay = useMemo(() => entries.reduce((sum, entry) => sum + entry.delayMinutes, 0), [entries]);

  const reload = useCallback(() => {
    setEntries(readLog());
  }, []);

  return { entries, addEntry, clearEntries, totalDelay, reload };
}

