// app/terms/page.tsx
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white pt-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h4 className="text-blue-400 font-mono text-xs uppercase tracking-[0.5em] mb-4">Legal System</h4>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Terms of Service</h1>
        <div className="prose prose-invert opacity-60 font-light leading-relaxed space-y-6">
          <p>Durch den Zugriff auf die futureFLY-Systeme akzeptieren Sie die Einsatzregeln.</p>
          <p>[Hier deine AGB einfügen...]</p>
        </div>
      </div>
    </main>
  );
}