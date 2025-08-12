const KEY = "token";

export function getToken(): string | null {
  return localStorage.getItem(KEY);
}

export function clearAuth() {
  localStorage.removeItem(KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(KEY, token);
}
