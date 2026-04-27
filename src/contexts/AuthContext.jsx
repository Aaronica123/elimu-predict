import React, { createContext, useContext, useState, useCallback } from "react";
const AuthContext = createContext(null);
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = sessionStorage.getItem("elimu_user");
        return stored ? JSON.parse(stored) : null;
    });
    const [token, setToken] = useState(() => sessionStorage.getItem("elimu_token"));
    const login = useCallback((token, user) => {
        setToken(token);
        setUser(user);
        sessionStorage.setItem("elimu_token", token);
        sessionStorage.setItem("elimu_user", JSON.stringify(user));
    }, []);
    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        sessionStorage.removeItem("elimu_token");
        sessionStorage.removeItem("elimu_user");
    }, []);
    const hasRole = useCallback((roles) => !!user && roles.includes(user.role), [user]);
    return (<AuthContext.Provider value={{ user, token, isAuthenticated: !!user && !!token, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>);
};
