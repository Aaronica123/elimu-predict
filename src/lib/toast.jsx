// Minimal toast replacement for `sonner` — plain CSS, no Tailwind, no shadcn.
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
const Ctx = createContext(null);
export const ToastProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const push = useCallback((variant, title, description) => {
        const id = Date.now() + Math.random();
        setItems((prev) => [...prev, { id, title, description, variant }]);
        setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3500);
    }, []);
    // Expose globally for the `toast` helper below
    useEffect(() => {
        window.__pushToast = push;
        return () => { delete window.__pushToast; };
    }, [push]);
    return (<Ctx.Provider value={{ push }}>
      {children}
      {createPortal(<div className="toast-region" role="status" aria-live="polite">
          {items.map((t) => (<div key={t.id} className={`toast ${t.variant}`}>
              <div className="title">{t.title}</div>
              {t.description && <div className="desc">{t.description}</div>}
            </div>))}
        </div>, document.body)}
    </Ctx.Provider>);
};
export const useToast = () => {
    const ctx = useContext(Ctx);
    if (!ctx)
        throw new Error("useToast must be used inside ToastProvider");
    return ctx;
};
const call = (variant) => (title, opts) => {
    const fn = window.__pushToast;
    if (fn)
        fn(variant, title, opts?.description);
    else
        console.log(`[toast:${variant}]`, title, opts?.description ?? "");
};
export const toast = Object.assign(call("info"), {
    success: call("success"),
    error: call("error"),
    info: call("info"),
});
