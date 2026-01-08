import { ApiRequestBody, ApiRequestOptions } from "./types";
import { ApiError } from "next/dist/server/api-utils";

async function request<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
  body?: ApiRequestBody,
): Promise<T> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  const response = await fetch(url.toString(), {
    ...options,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      status: response.status,
      message: response.statusText,
    }));
    throw error;
  }

  return response.json() as Promise<T>;
}

export const publicApi = {
  get: <T>(endpoint: string, options?: Omit<ApiRequestOptions, "body">) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    body: ApiRequestBody,
    options?: ApiRequestOptions,
  ) => request<T>(endpoint, { ...options, method: "POST" }, body),
};
