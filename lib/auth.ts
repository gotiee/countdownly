import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import * as schema from "@/db/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  account: {
    skipStateCookieCheck: true,
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.APP_URL!,
  trustedOrigins: [process.env.APP_URL!, process.env.SSO_RACLETTE_URL!],
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "authentik",
          clientId: process.env.AUTHENTIK_CLIENT_ID!,
          authorizationUrl: `${process.env.SSO_RACLETTE_URL}/application/o/authorize/`,
          tokenUrl: `${process.env.SSO_RACLETTE_URL}/application/o/token/`,
          clientSecret: process.env.AUTHENTIK_CLIENT_SECRET!,
          discoveryUrl: `${process.env.SSO_RACLETTE_URL}/application/o/${process.env.APP_NAME}/.well-known/openid-configuration`,
          scopes: ["openid", "profile", "email", "offline_access"],
          pkce: true,
          prompt: "consent",
          redirectURI: `${process.env.APP_URL}/api/auth/oauth2/callback/authentik`,
        },
      ],
    }),
    nextCookies(),
  ],
});
