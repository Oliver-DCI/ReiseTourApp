export default function Hero() {
  return (
    <section className="relative h-[50vh] flex items-center justify-center text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[10s] hover:scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          Entdecke die Magie <span className="text-red-500">der Inka-Welt</span>
        </h1>
        <p className="text-xl mb-10">Erlebe Peru authentisch wie nie zuvor.</p>
        <div className="flex gap-4 justify-center">
          <button className="bg-red-600 px-8 py-4 rounded-xl font-bold">
            Reiseangebote
          </button>
        </div>
      </div>
    </section>
  );
}
