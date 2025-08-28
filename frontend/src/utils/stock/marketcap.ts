export function marketcapRange(cap?: number | null) {
  if (cap == null) return "-";

  if (cap >= 10_000_000_000) return "Large-Caps";
  if (cap >= 2_000_000_000) return "Mid-Caps";
  return "Sall-Caps";
}
