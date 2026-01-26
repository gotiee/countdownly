import { countdown } from "@/db/auth-schema";
import { db } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const data = await db.select().from(countdown);
  return Response.json(data);
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const body = await request.json();
  const [result] = await db
    .insert(countdown)
    .values({ ...body, userId: session.user.id })
    .returning();
  return Response.json(result);
}
