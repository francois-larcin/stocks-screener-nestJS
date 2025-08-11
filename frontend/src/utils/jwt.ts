export type JwtPayload = {
  exp?: number; //? Durée d'expiration
  [k: string]: unknown;
};

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) {
      return null;
    }
    //? Compatibilité base64url
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isJwtValid(token?: string | null, skewSeconds = 5): boolean {
  if (!token) {
    return false;
  }

  const data = decodeJwt(token);
  if (!data || typeof data.exp !== "number") {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);
  return now + skewSeconds < data.exp; //?marge en cas de léger décalage
}
