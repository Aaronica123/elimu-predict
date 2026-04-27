function flatten(value, out) {
    if (!value)
        return;
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
            if (value[key])
                out.push(key);
        }
    }
}
export function cn(...inputs) {
    const parts = [];
    inputs.forEach((i) => flatten(i, parts));
    return parts.join(" ").trim();
}
