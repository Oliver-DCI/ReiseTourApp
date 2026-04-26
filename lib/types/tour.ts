export type Spot = {
  id: string;        // Eindeutiger Slug für die Detail-URL
  title: string;     // Name des Erlebnisses
  duration: string;  // Zeitangabe (z.B. "3 Std.")
  price: string;     // Preis als String (inkl. Währung)
  img: string;       // URL zum Teaser-Bild
  isHot?: boolean;   // Optional: Markiert besonders beliebte Touren
};

export type City = {
  city: string;        // Technischer Name (z.B. "Berlin" für den Pfad)
  title: string;       // Slogan/Überschrift
  description: string; // Detailtext
  img: string;         // Hero-Image der Stadt
  spots: Spot[];       // Liste der verfügbaren Erlebnisse
  tags?: string[];     // Optional: ["Urban", "Water", "History"]
};