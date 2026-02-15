export type Spot = {
  id: string; // WICHTIG: Jede Tour braucht eine ID für die URL
  title: string;
  duration: string;
  price: string;
  img: string;
};

export type City = {
  city: string;
  title: string;
  description: string;
  img: string;
  spots: Spot[];
};

export const tours: City[] = [
  // Berlin
  {
    city: "Berlin",
    title: "Hauptstadt der Freiheit und Vielfalt",
    description:
      "Berlin liegt zwischen Spree und Havel. Wer Berlin betritt, spürt den Pulsschlag der Geschichte und den Rhythmus der Gegenwart. Es ist nicht nur eine Stadt, sondern ein lebendiges Mosaik aus Erinnerung und Aufbruch, in dem jeder Schritt zwischen alten Fassaden und moderner Architektur von Wandel und Freiheit erzählt.",
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

  // Frankfurt 
  {
    city: "Frankfurt",
    title: "Mainmetropole zwischen Skyline und Geschichte",
    description:
      "Frankfurt am Main liegt am Ufer des Mains, wo Tradition und Moderne aufeinandertreffen. Wer Frankfurt betritt, spürt sofort die Energie einer Stadt, die nach oben wächst und zugleich tief in ihrer Geschichte verwurzelt ist. Es ist nicht nur ein Finanzzentrum, sondern ein Ort der Kontraste, in dem Glasfassaden den Himmel spiegeln und Fachwerkhäuser von vergangenen Jahrhunderten erzählen.",
    img: "https://images.pexels.com/photos/3772193/pexels-photo-3772193.jpeg",

    spots: [
      {
        id: "frankfurt-hop-on-hop-off",
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

  // München
  {
    city: "Muenchen",
    title: "Weltstadt mit Herz und Alpenblick",
    description:
      "München liegt zwischen Isar und Alpenrand. Wer München betritt, spürt die besondere Mischung aus Tradition und Lebensfreude. Es ist nicht nur die Heimat des Oktoberfests, sondern eine Stadt, in der bayerisches Brauchtum auf moderne Eleganz trifft. Zwischen historischen Plätzen, grünen Biergärten und klarer Bergluft erzählt jeder Augenblick von Genuss, Kultur und einem Lebensgefühl, das weit über die Stadtgrenzen hinausstrahlt.",
    img: "https://images.pexels.com/photos/13762982/pexels-photo-13762982.jpeg",
    spots: [
      {
        id: "munich-hop-on-hop-off",
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

  // Hamburg
  {
    city: "Hamburg",
    title: "Weltstadt mit Herz und Alpenblick",
    description:
      "Hamburg liegt an Elbe und Alster. Wer Hamburg betritt, spürt sofort das maritime Flair und die weltoffene Atmosphäre. Es ist nicht nur die Heimat des Hafens und der Reeperbahn, sondern eine Stadt, in der hanseatische Tradition auf moderne Architektur trifft. Zwischen historischen Speichern, weiten Wasserflächen und lebendigen Vierteln erzählt jeder Augenblick von Freiheit, Kultur und einem nordischen Lebensgefühl, das weit über die Stadtgrenzen hinausstrahlt.",
    img: "https://images.pexels.com/photos/6570407/pexels-photo-6570407.jpeg",
    spots: [
      {
        id: "hamburg-hop-on-hop-off",
        title: "Hamburg Elb Filharmonie",
        duration: "2 Std.",
        price: "29€",        
        img: "https://images.pexels.com/photos/258642/pexels-photo-258642.jpeg",
      },
      {
        id: "hamburg-harbor-cruise",
        title: "Hamburg Boots Tour",
        duration: "4 Tag",
        price: "46€",
        img: "https://images.pexels.com/photos/29092045/pexels-photo-29092045.jpeg",
      },
      
    ],
  },
];
