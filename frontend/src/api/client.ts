const TOKEN_STORAGE_KEY = "spectra-demo.token";

export type LoginRequest = { email: string; password: string };
export type User = { id: string; email: string; displayName: string };
export type LoginResponse = { token: string; user: User };
export type Item = { id: string; title: string; createdAt: string };

function getToken(): string | null {
  return typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

function setToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

async function request<T>(input: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(input, { ...init, headers });
  if (!res.ok) {
    let message = res.statusText || "Request failed";
    try {
      const body = (await res.json()) as { error?: string };
      if (body?.error) message = body.error;
    } catch {
      // intentionally ignore
    }
    throw new ApiError(message, res.status);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = {
  isAuthenticated(): boolean {
    return Boolean(getToken());
  },
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const out = await request<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setToken(out.token);
    return out;
  },
  logout(): void {
    setToken(null);
  },
  me(): Promise<{ user: User }> {
    return request<{ user: User }>("/api/me");
  },
  listItems(): Promise<Item[]> {
    return request<Item[]>("/api/dashboard/items");
  },
  addItem(title: string): Promise<Item> {
    return request<Item>("/api/dashboard/items", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
  },
};
