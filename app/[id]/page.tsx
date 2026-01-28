import { db } from "@/db/drizzle";
import { countdown } from "@/db/auth-schema";
import { eq } from "drizzle-orm";
import { CountdownTimer } from "@/components/custom/countdown/time-client";

export default async function PublicCountdownPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const countdownSelected = await db
    .select()
    .from(countdown)
    .where(eq(countdown.id, id))
    .limit(1);

  if (countdownSelected.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20vh" }}>
        <h1>Countdown Not Found</h1>
        <p>The requested countdown does not exist.</p>
      </div>
    );
  }

  const { title, targetDate, timezone } = countdownSelected[0];
  const isPast = new Date(targetDate) < new Date();

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>{title}</h1>

      {!isPast ? (
        <div>
          <p style={{ marginBottom: "0.5rem", color: "#666" }}>
            Time remaining:
          </p>
          <CountdownTimer targetDate={targetDate} />
        </div>
      ) : (
        <div>
          <p style={{ color: "#d32f2f", fontWeight: "bold" }}>
            Countdown finished!
          </p>
        </div>
      )}

      <div style={{ marginTop: "2rem", color: "#666", fontSize: "0.9rem" }}>
        <p>
          Target:{" "}
          {new Date(targetDate).toLocaleString("en-US", {
            timeZone: timezone,
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}{" "}
          ({timezone})
        </p>
      </div>
    </div>
  );
}
