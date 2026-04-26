"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";

interface AuthModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // useCallback verhindert unnötige Re-Renders der Buttons, die diese Funktionen nutzen
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  // Performance-Optimierung des Context-Wertes
  const value = useMemo(() => ({
    isOpen,
    openModal,
    closeModal,
    toggleModal
  }), [isOpen, openModal, closeModal, toggleModal]);

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider (futureFLY-Uplink)");
  }
  return context;
}