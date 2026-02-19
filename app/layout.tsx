import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { AuthProvider } from "./context/AuthContext";
import { AuthModalProvider } from "./context/AuthModalContext";
import { UserSettingsModalProvider } from "./context/UserSettingsModalContext";

import AuthModal from "../components/AuthModal";
import ClientHydration from "./ClientHydration"; // ← richtige Client-Komponente

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="flex flex-col min-h-screen bg-gradient-to-b from-white via-[#f5f5f5] to-[#e9e9e9] text-gray-900"
      >
        <ClientHydration>
          <AuthProvider>
            <AuthModalProvider>
              <UserSettingsModalProvider>

                <Header />

                {/* Login/Register Modal */}
                <AuthModal />

                <main className="grow">
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
