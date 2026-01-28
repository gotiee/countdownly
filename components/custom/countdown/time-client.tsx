"use client";

import { formatTimeRemaining, useCountdown } from "@/hooks/use-countdown";

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const now = useCountdown();

  return (
    <div
      style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "monospace" }}
    >
      {formatTimeRemaining(targetDate, now)}
    </div>
  );
}
