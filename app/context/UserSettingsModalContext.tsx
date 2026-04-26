"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";

interface UserSettingsModalContextType {
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  toggleSettings: () => void;
  // Wir fügen setIsOpen hier NICHT hinzu, da wir bessere Funktionen haben
}

const UserSettingsModalContext = createContext<UserSettingsModalContextType | undefined>(undefined);

export function UserSettingsModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSettings = useCallback(() => setIsOpen(true), []);
  const closeSettings = useCallback(() => setIsOpen(false), []);
  const toggleSettings = useCallback(() => setIsOpen((prev) => !prev), []);

  const value = useMemo(() => ({
    isOpen,
    openSettings,
    closeSettings,
    toggleSettings
  }), [isOpen, openSettings, closeSettings, toggleSettings]);

  return (
    <UserSettingsModalContext.Provider value={value}>
      {children}
    </UserSettingsModalContext.Provider>
  );
}

export function useUserSettingsModal() {
  const context = useContext(UserSettingsModalContext);
  if (context === undefined) {
    throw new Error("useUserSettingsModal must be used within a UserSettingsModalProvider");
  }
  return context;
}