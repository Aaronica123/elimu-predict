// Minimal toast replacement for `sonner` — plain CSS, no Tailwind, no shadcn.
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Variant = "success" | "error" | "info";
interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant: Variant;
}

interface ToastCtx {
  push: (variant: Variant, title: string, description?: string) => void;
}

const Ctx = createContext<ToastCtx | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((variant: Variant, title: string, description?: string) => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, title, description, variant }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  // Expose globally for the `toast` helper below
  useEffect(() => {
    (window as unknown as { __pushToast?: ToastCtx["push"] }).__pushToast = push;
    return () => { delete (window as unknown as { __pushToast?: ToastCtx["push"] }).__pushToast; };
  }, [push]);

  return (
    <Ctx.Provider value={{ push }}>
      {children}
      {createPortal(
        <div className="toast-region" role="status" aria-live="polite">
          {items.map((t) => (
            <div key={t.id} className={`toast ${t.variant}`}>
              <div className="title">{t.title}</div>
              {t.description && <div className="desc">{t.description}</div>}
            </div>
          ))}
        </div>,
        document.body
      )}
    </Ctx.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};

// Imperative helper compatible with the previous `import { toast } from "sonner"` usage.
type ToastFn = (title: string, opts?: { description?: string }) => void;
const call = (variant: Variant): ToastFn => (title, opts) => {
  const fn = (window as unknown as { __pushToast?: (v: Variant, t: string, d?: string) => void }).__pushToast;
  if (fn) fn(variant, title, opts?.description);
  else console.log(`[toast:${variant}]`, title, opts?.description ?? "");
};

export const toast = Object.assign(call("info"), {
  success: call("success"),
  error: call("error"),
  info: call("info"),
});
