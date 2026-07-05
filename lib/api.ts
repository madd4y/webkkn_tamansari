const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
const apiRevalidateSeconds = 60;

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export function ensureApiSuccess<T>(response: ApiResponse<T>) {
  if (!response.success) {
    throw new Error(response.message);
  }

  return response.data;
}

export function withFallbackData<T>(
  response: ApiResponse<T>,
  fallback: T,
): ApiResponse<T> {
  if (response.data == null) {
    return {
      ...response,
      data: fallback,
    };
  }

  if (Array.isArray(fallback)) {
    return {
      ...response,
      data: Array.isArray(response.data) ? response.data : fallback,
    };
  }

  if (
    typeof fallback === "object" &&
    fallback !== null &&
    typeof response.data === "object" &&
    response.data !== null &&
    !Array.isArray(response.data)
  ) {
    return {
      ...response,
      data: {
        ...fallback,
        ...response.data,
      },
    };
  }

  return response;
}

type MutationMethod = "POST" | "PUT" | "DELETE";
type MutationAction = "create" | "update" | "delete";

type AppsScriptPayload<TPayload> = {
  resource: string;
  action: MutationAction;
  method: MutationMethod;
  id?: string;
  data?: TPayload;
};

function getAction(method: MutationMethod): MutationAction {
  if (method === "POST") {
    return "create";
  }

  if (method === "PUT") {
    return "update";
  }

  return "delete";
}

function buildUrl(resource: string, action: string, id?: string) {
  if (!apiBaseUrl) {
    return "";
  }

  const url = new URL(apiBaseUrl);
  url.searchParams.set("resource", resource);
  url.searchParams.set("action", action);

  if (id) {
    url.searchParams.set("id", id);
  }

  return url.toString();
}

function isApiResponse<T>(payload: unknown): payload is ApiResponse<T> {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const record = payload as Record<string, unknown>;

  return (
    typeof record.success === "boolean" &&
    typeof record.message === "string" &&
    "data" in record
  );
}

function normalizeResponse<T>(payload: unknown): ApiResponse<T> {
  if (isApiResponse<T>(payload)) {
    return payload;
  }

  return {
    success: true,
    message: "Data berhasil dimuat.",
    data: payload as T,
  };
}

export async function apiGet<T>(
  resource: string,
  fallback: T,
): Promise<ApiResponse<T>> {
  if (!apiBaseUrl) {
    return {
      success: false,
      message: "NEXT_PUBLIC_API_URL belum dikonfigurasi.",
      data: fallback,
    };
  }

  try {
    const response = await fetch(
      buildUrl(resource, "list"),
      typeof window === "undefined"
        ? {
            next: {
              revalidate: apiRevalidateSeconds,
              tags: [`content:${resource}`],
            },
          }
        : {
            cache: "no-store",
          },
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload: unknown = await response.json();
    return normalizeResponse<T>(payload);
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Data gagal dimuat dari Google Apps Script.",
      data: fallback,
    };
  }
}

export async function apiSend<TPayload, TResponse>(
  resource: string,
  method: MutationMethod,
  payload?: TPayload,
  id?: string,
): Promise<ApiResponse<TResponse>> {
  if (!apiBaseUrl) {
    return {
      success: false,
      message: "NEXT_PUBLIC_API_URL belum dikonfigurasi.",
      data: {} as TResponse,
    };
  }

  const action = getAction(method);
  const body: AppsScriptPayload<TPayload> = {
    resource,
    action,
    method,
    id,
    data: payload,
  };

  const response = await fetch(buildUrl(resource, action, id), {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();
  const result = normalizeResponse<TResponse>(data);

  if (result.success && typeof window !== "undefined") {
    void fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resource }),
    });
  }

  return result;
}
