import { db } from "@/db/drizzle";
import { countdown } from "@/db/auth-schema";
import { desc, eq } from "drizzle-orm";
import { PublicCountdownList } from "@/components/custom/countdown/public-countdown-list";
import Link from "next/link";

export default async function PublicCountdownsPage() {
  const publicCountdowns = await db
    .select()
    .from(countdown)
    .where(eq(countdown.isPublic, true))
    .orderBy(desc(countdown.targetDate), countdown.createdAt);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <Link
        href="/admin"
        className="absolute top-[1rem] right-[1rem] border p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition text-xs"
      >
        Edit My Countdowns
      </Link>
      <h1
        style={{
          fontSize: "1.5rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        Public Countdowns
      </h1>

      {publicCountdowns.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No public countdowns available.
        </p>
      ) : (
        <PublicCountdownList countdowns={publicCountdowns} />
      )}
    </div>
  );
}
