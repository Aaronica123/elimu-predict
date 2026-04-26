// Lightweight class joiner (no Tailwind, no tailwind-merge).
type ClassValue = string | number | false | null | undefined | Record<string, boolean | undefined | null> | ClassValue[];

function flatten(value: ClassValue, out: string[]) {
  if (!value) return;
  if (typeof value === "string" || typeof value === "number") {
    out.push(String(value));
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v) => flatten(v, out));
    return;
  }
  if (typeof value === "object") {
    for (const key of Object.keys(value)) {
      if (value[key]) out.push(key);
    }
  }
}

export function cn(...inputs: ClassValue[]): string {
  const parts: string[] = [];
  inputs.forEach((i) => flatten(i, parts));
  return parts.join(" ").trim();
}
