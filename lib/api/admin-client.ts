import { ApiRequestBody, ApiRequestOptions } from "./types";
import { auth } from "@/lib/auth";
import { ApiError } from "next/dist/server/api-utils";
import { headers } from "next/headers";

export async function getAccessToken(): Promise<string> {
  const tokenResponse = await auth.api.getAccessToken({
    body: {
      providerId: "authentik",
    },
    headers: await headers(),
  });

  if (!tokenResponse.accessToken) {
    throw new Error("Failed to retrieve access token");
  }

  return tokenResponse.accessToken;
}

async function adminRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
  body?: ApiRequestBody | FormData,
): Promise<T> {
  const accessToken = await getAccessToken();
  const url = new URL(`${process.env.API_URL}${endpoint}`);

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);

  if (!(body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url.toString(), {
    ...options,
    body: body instanceof FormData ? body : JSON.stringify(body),
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      status: response.status,
      message: response.statusText,
    }));
    throw error;
  }

  if (response.headers.get("content-type")?.includes("application/json")) {
    return response.json() as Promise<T>;
  } else {
    return response.arrayBuffer() as unknown as T;
  }
}

export const adminApi = {
  get: <T>(endpoint: string, options?: Omit<ApiRequestOptions, "body">) =>
    adminRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    body: ApiRequestBody | FormData,
    options?: ApiRequestOptions,
  ) => adminRequest<T>(endpoint, { ...options, method: "POST" }, body),

  put: <T>(
    endpoint: string,
    body: ApiRequestBody,
    options?: ApiRequestOptions,
  ) => adminRequest<T>(endpoint, { ...options, method: "PUT" }, body),

  delete: <T>(endpoint: string, options?: Omit<ApiRequestOptions, "body">) =>
    adminRequest<T>(endpoint, { ...options, method: "DELETE" }),

  patch: <T>(
    endpoint: string,
    body: ApiRequestBody,
    options?: ApiRequestOptions,
  ) => adminRequest<T>(endpoint, { ...options, method: "PATCH" }, body),
};
