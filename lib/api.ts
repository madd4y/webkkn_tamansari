const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function apiGet<T>(endpoint: string, fallback: T): Promise<T> {
  if (!apiBaseUrl) {
    return fallback;
  }

  try {
    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as ApiResponse<T>;
    return payload.data;
  } catch {
    return fallback;
  }
}

export async function apiSend<TPayload, TResponse>(
  endpoint: string,
  method: "POST" | "PUT" | "DELETE",
  payload?: TPayload,
): Promise<ApiResponse<TResponse>> {
  if (!apiBaseUrl) {
    return {
      success: false,
      message: "NEXT_PUBLIC_API_URL belum dikonfigurasi.",
      data: {} as TResponse,
    };
  }

  const response = await fetch(`${apiBaseUrl}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<ApiResponse<TResponse>>;
}
