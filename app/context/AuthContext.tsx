"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  _id: string;
  username: string;
  email: string;
  street: string;
  zip: string;
  city: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Cookie "user" suchen
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));

    if (!cookie) {
      console.log("Kein user Cookie gefunden");
      return;
    }

    try {
      const raw = cookie.split("=")[1];
      const decoded = decodeURIComponent(raw);
      const parsed = JSON.parse(decoded);

      console.log("User aus Cookie geladen:", parsed);

      setUser({
        _id: parsed._id,
        username: parsed.username,
        email: parsed.email,
        street: parsed.street,
        zip: parsed.zip,
        city: parsed.city,
      });
    } catch (err) {
      console.error("Fehler beim Lesen des User-Cookies:", err);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
