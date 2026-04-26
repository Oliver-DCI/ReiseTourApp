"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";

// Erweitertes User-Interface für professionellere Datenstruktur
export interface User {
  _id: string;
  username: string;
  email: string;
  street: string;
  zip: string;
  city: string;
  role?: "user" | "admin"; // Vorbereitung für Admin-Features
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const syncAuthState = () => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="));

      if (!cookie) {
        setIsLoading(false);
        return;
      }

      try {
        const raw = cookie.split("=")[1];
        const decoded = decodeURIComponent(raw);
        const parsed = JSON.parse(decoded);

        setUser(parsed);
      } catch (err) {
        console.error("Auth-Sync Failure:", err);
      } finally {
        setIsLoading(false);
      }
    };

    syncAuthState();
  }, []);

  // Memoize den Context-Value für Performance-Optimierung
  const value = useMemo(() => ({
    user,
    setUser,
    isAuthenticated: !!user,
    isLoading
  }), [user, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a valid AuthProvider (futureFLY-Protocol)");
  }
  return context;
}