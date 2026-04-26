import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { AuthProvider } from "./context/AuthContext";
import { AuthModalProvider } from "./context/AuthModalContext";
import { UserSettingsModalProvider } from "./context/UserSettingsModalContext";

import AuthModal from "../components/AuthModal";
import ClientHydration from "./ClientHydration"; 

export const metadata = {
  title: "futureFLY | Next-Gen Travel Experience",
  description: "Entdecke urbane Metropolen mit der Technologie von morgen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning className="scroll-smooth">
      <body
        suppressHydrationWarning
        className="flex flex-col min-h-screen bg-[#030712] text-slate-200 antialiased selection:bg-blue-500/30 selection:text-blue-200"
      >
        <ClientHydration>
          <AuthProvider>
            <AuthModalProvider>
              <UserSettingsModalProvider>
                
                {/* Background Noise / Grid Overlay (Optional für extra Tiefe) */}
                <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20 z-0"></div>

                <Header />

                {/* Login/Register Modal - Das Herzstück der User-Interaktion */}
                <AuthModal />

                <main className="relative z-10 grow">
                  {children}
                </main>

                <Footer />

              </UserSettingsModalProvider>
            </AuthModalProvider>
          </AuthProvider>
        </ClientHydration>
      </body>
    </html>
  );
}