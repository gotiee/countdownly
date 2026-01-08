import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;

  const data = await auth.api.signInWithOAuth2({
    body: {
      providerId: "authentik",
      callbackURL: params.callbackUrl || "/admin",
    },
  });

  redirect(data.url);
}
