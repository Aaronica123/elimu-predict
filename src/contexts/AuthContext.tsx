import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { AuthUser, UserRole } from "@/types/auth";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = sessionStorage.getItem("elimu_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("elimu_token"));

  const login = useCallback((token: string, user: AuthUser) => {
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

  const hasRole = useCallback(
    (roles: UserRole[]) => !!user && roles.includes(user.role),
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user && !!token, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};
