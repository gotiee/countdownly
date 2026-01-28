"use client";

import { useState, useEffect } from "react";
import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export function useCountdown() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return now;
}

export function formatTimeRemaining(
  targetDate: Date,
  now: Date,
  displayInDays: boolean,
) {
  const isPast = targetDate < now;
  if (isPast) return <span style={{ color: "#d32f2f" }}>Done</span>;

  if (displayInDays) {
    const days = differenceInDays(targetDate, now);
    const hours = differenceInHours(targetDate, now) % 24;
    const minutes = differenceInMinutes(targetDate, now) % 60;
    const seconds = differenceInSeconds(targetDate, now) % 60;

    return (
      <span style={{ fontFamily: "monospace" }}>
        {days > 0 && `${days}d `}
        {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m{" "}
        {String(seconds).padStart(2, "0")}s
      </span>
    );
  }

  const years = differenceInYears(targetDate, now);
  const months = differenceInMonths(targetDate, now) % 12;
  const days = differenceInDays(targetDate, now) % 30;
  const hours = differenceInHours(targetDate, now) % 24;
  const minutes = differenceInMinutes(targetDate, now) % 60;
  const seconds = differenceInSeconds(targetDate, now) % 60;

  const formatUnit = (value: number, unit: string) =>
    value > 0 ? `${value}${unit} ` : "";

  return (
    <span style={{ fontFamily: "monospace" }}>
      {formatUnit(years, "y")}
      {formatUnit(months, "mo")}
      {formatUnit(days, "d")}
      {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m{" "}
      {String(seconds).padStart(2, "0")}s
    </span>
  );
}
