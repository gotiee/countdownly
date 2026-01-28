"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { countdown } from "@/db/auth-schema";
import { eq } from "drizzle-orm";

export async function createCountdown(formData: FormData, userId: string) {
  const data = {
    title: formData.get("title") as string,
    targetDate: new Date(formData.get("targetDate") as string),
    timezone: formData.get("timezone") as string,
    isPublic: formData.get("isPublic") === "on",
    displayInDays: formData.get("displayInDays") === "on",
    userId,
  };
  await db.insert(countdown).values(data);
  revalidatePath("/admin/countdowns");
}

export async function deleteCountdown(id: string) {
  await db.delete(countdown).where(eq(countdown.id, id));
  revalidatePath("/admin/countdowns");
}

export async function togglePublic(id: string, isPublic: boolean) {
  await db.update(countdown).set({ isPublic }).where(eq(countdown.id, id));
  revalidatePath("/admin/countdowns");
}

export async function toggleDisplayInDays(id: string, displayInDays: boolean) {
  await db.update(countdown).set({ displayInDays }).where(eq(countdown.id, id));
  revalidatePath("/admin/countdowns");
}
