import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="flex flex-col min-h-screen bg-gradient-to-b from-white via-[#f5f5f5] to-[#e9e9e9] text-gray-900">
        <Header />

        {/* main sorgt dafür, dass dieser Bereich den restlichen Platz einnimmt */}
        <main className="grow">
          {/* Ebene 2 (Main/Children): Inhalt der page.tsx */}
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
