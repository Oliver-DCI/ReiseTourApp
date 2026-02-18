"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type UserSettingsModalContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const UserSettingsModalContext = createContext<UserSettingsModalContextType | null>(null);

export function UserSettingsModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UserSettingsModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </UserSettingsModalContext.Provider>
  );
}

export function useUserSettingsModal() {
  const ctx = useContext(UserSettingsModalContext);
  if (!ctx) {
    throw new Error("useUserSettingsModal must be used inside <UserSettingsModalProvider>");
  }
  return ctx;
}
