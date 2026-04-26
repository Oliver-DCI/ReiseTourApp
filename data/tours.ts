export type Spot = {
  id: string;
  title: string;
  duration: string;
  price: string;
  img: string;
  category?: string; // Optional: Hilft beim Filtern (z.B. 'Express', 'Night', 'Luxury')
};

export type City = {
  city: string;
  title: string;
  description: string;
  img: string;
  spots: Spot[];
  coordinates?: { lat: number; lng: number }; // Optional: Für Karten-Integration
};

export const tours: City[] = [
  {
    city: "Berlin",
    title: "Capital of Diversity",
    description:
      "Berlin ist der zentrale Hub des Netzwerks. Zwischen Spree und Havel verschmelzen historische Monumente mit der rohen Energie der Moderne. Ein Sektor, der niemals schläft und in dem jeder Schritt von Freiheit und digitalem Wandel erzählt.",
    img: "https://images.pexels.com/photos/19284574/pexels-photo-19284574.jpeg",
    spots: [
      {
        id: "berlin-spree-express",
        title: "Berlin Spree Express",
        duration: "3 Std.",
        price: "39€",
        img: "https://images.pexels.com/photos/30305292/pexels-photo-30305292.jpeg",
      },
      {
        id: "berlin-highlights-tour",
        title: "Berlin Highlights Tour",
        duration: "4 Std.",
        price: "55€",
        img: "https://images.pexels.com/photos/33480973/pexels-photo-33480973.jpeg",
      },
    ],
  },
  {
    city: "Frankfurt",
    title: "Skyline Sector",
    description:
      "Das Finanzherz des Systems. Wo Glasfassaden den Himmel spiegeln und historische Fachwerkhäuser die Wurzeln der Stadt bewahren. Frankfurt bietet die perfekte Symbiose aus High-Speed Business und urbaner Erholung am Main.",
    img: "https://images.pexels.com/photos/3772193/pexels-photo-3772193.jpeg",
    spots: [
      {
        id: "frankfurt-night-express",
        title: "Frankfurt Night Express",
        duration: "2 Std.",
        price: "60€",
        img: "https://images.pexels.com/photos/11104942/pexels-photo-11104942.jpeg",
      },
      {
        id: "frankfurt-main-cruise",
        title: "Main River Panorama",
        duration: "3 Std.",
        price: "35€",
        img: "https://images.pexels.com/photos/19307317/pexels-photo-19307317.jpeg",
      },
    ],
  },
  {
    city: "Muenchen",
    title: "Bavarian High-Tech Hub",
    description:
      "Tradition trifft auf Eleganz am Alpenrand. München ist die Weltstadt mit Herz, in der bayerisches Brauchtum und moderne Innovation Hand in Hand gehen. Ein Ort für Genießer und Visionäre.",
    img: "https://images.pexels.com/photos/13762982/pexels-photo-13762982.jpeg",
    spots: [
      {
        id: "munich-stadium-tour",
        title: "München Stadion Tour",
        duration: "1 Tag",
        price: "26€",
        img: "https://images.pexels.com/photos/874464/pexels-photo-874464.jpeg",
      },
      {
        id: "munich-city-highlights",
        title: "Munich City Highlights Tour",
        duration: "1 Tag",
        price: "69€",         
        img: "https://images.pexels.com/photos/4213372/pexels-photo-4213372.jpeg",
      },
    ],
  },
  {
    city: "Hamburg",
    title: "Maritime Interface", // Titel korrigiert (war vorher München)
    description:
      "Das Tor zur Welt. Hamburg besticht durch sein maritimes Flair an Elbe und Alster. Hanseatische Tradition trifft auf die futuristische Architektur der Elbphilharmonie – ein Sektor definiert durch Freiheit und Weite.",
    img: "https://images.pexels.com/photos/6570407/pexels-photo-6570407.jpeg",
    spots: [
      {
        id: "hamburg-elbphilharmonie",
        title: "Hamburg Elbphilharmonie",
        duration: "2 Std.",
        price: "29€",        
        img: "https://images.pexels.com/photos/258642/pexels-photo-258642.jpeg",
      },
      {
        id: "hamburg-boots-tour",
        title: "Hamburg Boots Tour",
        duration: "4 Std.", // Korrigiert: Von 4 Tag auf 4 Std.
        price: "46€",
        img: "https://images.pexels.com/photos/29092045/pexels-photo-29092045.jpeg",
      },
    ],
  },
];