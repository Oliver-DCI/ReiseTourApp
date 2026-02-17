"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useAuthModal } from "@/app/context/AuthModalContext";

export default function UserActions() {
  const { user } = useAuth();
  const { setIsOpen } = useAuthModal();

  if (!user) {
    return (
      <button
        onClick={() => setIsOpen(true)}
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
    </div>
  );
}
