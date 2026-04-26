"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { useUserSettingsModal } from "@/app/context/UserSettingsModalContext";
import { motion } from "framer-motion";
import { 
  HiOutlineTicket, 
  HiOutlineDocumentText, 
  HiOutlineCog6Tooth,
  HiOutlineFingerPrint 
} from "react-icons/hi2";

export default function UserActions() {
  const { user } = useAuth();
  const { openModal } = useAuthModal();
  
  // KORREKTUR: Wir nutzen direkt die Funktion 'openSettings' aus deinem Context
  const { openSettings } = useUserSettingsModal(); 

  if (!user) {
    return (
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.5)" }}
        whileTap={{ scale: 0.95 }}
        onClick={openModal} // Keine anonyme Funktion nötig
        className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-mono text-xs uppercase tracking-widest transition-all"
      >
        <HiOutlineFingerPrint size={18} />
        Initialize Login
      </motion.button>
    );
  }

  const actions = [
    { 
      label: "Reise buchen", 
      icon: <HiOutlineTicket size={18} />, 
      color: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white",
      shadow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
    },
    { 
      label: "Meine Notizen", 
      icon: <HiOutlineDocumentText size={18} />, 
      color: "bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white",
      shadow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
    },
    { 
      label: "Profile Settings", 
      icon: <HiOutlineCog6Tooth size={18} />, 
      color: "bg-slate-500/10 border-slate-500/20 text-slate-400 hover:bg-slate-500 hover:text-white",
      shadow: "hover:shadow-[0_0_20px_rgba(100,116,139,0.4)]",
      // KORREKTUR: Aufruf der korrekten Funktion ohne Argument
      onClick: openSettings 
    }
  ];

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {actions.map((action, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={action.onClick}
          className={`
            flex items-center gap-3 px-6 py-3 rounded-2xl border 
            font-mono text-[10px] uppercase tracking-widest transition-all duration-300
            ${action.color} ${action.shadow}
          `}
        >
          {action.icon}
          {action.label}
        </motion.button>
      ))}
    </div>
  );
}