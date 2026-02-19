"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { useUserSettingsModal } from "@/app/context/UserSettingsModalContext";

export default function UserActions() {
  const { user } = useAuth();
  const { setIsOpen: openLogin } = useAuthModal();
  const { setIsOpen: openSettings } = useUserSettingsModal();

  if (!user) {
    return (
      <button
        onClick={() => openLogin(true)}
        className="px-6 py-2 bg-black text-white rounded"
      >
        Login
      </button>
    );
  }

  return (
    <div className="flex gap-4">
      <button className="px-6 py-2 bg-green-600 text-white rounded">
        Reise buchen
      </button>

      <button className="px-6 py-2 bg-blue-600 text-white rounded">
        Meine Notizen
      </button>

      <button
        onClick={() => openSettings(true)}
        className="px-6 py-2 bg-gray-700 text-white rounded"
      >
        Einstellungen
      </button>
    </div>
  );
}
