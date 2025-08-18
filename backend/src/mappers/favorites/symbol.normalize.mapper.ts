//* DTO --> Entity

export function normalizeSymbol(raw: string): string {
  return String(raw ?? '')
    .trim()
    .toUpperCase();
}
