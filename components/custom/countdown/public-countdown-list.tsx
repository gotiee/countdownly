"use client";

import { formatTimeRemaining, useCountdown } from "@/hooks/use-countdown";
import Link from "next/link";

type Countdown = {
  id: string;
  title: string;
  targetDate: Date;
  timezone: string;
};

export function PublicCountdownList({
  countdowns,
}: {
  countdowns: Countdown[];
}) {
  const now = useCountdown();

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {countdowns.map((c) => (
        <li
          key={c.id}
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Link
              href={`/${c.id}`}
              style={{
                fontSize: "1.1rem",
                marginBottom: "0.25rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <h2 style={{ margin: 0 }}>{c.title}</h2>
            </Link>
            <p
              style={{
                color: "#666",
                fontSize: "0.9rem",
                margin: "0.25rem 0 0 0",
              }}
            >
              {new Date(c.targetDate).toLocaleString("en-US", {
                timeZone: c.timezone,
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" (" + c.timezone + ")"}
            </p>
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            {formatTimeRemaining(new Date(c.targetDate), now)}
          </div>
        </li>
      ))}
    </ul>
  );
}
