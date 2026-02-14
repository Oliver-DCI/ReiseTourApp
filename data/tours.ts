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
        id: "machu-picchu",
        title: "Machu Picchu Express",
        duration: "1 Tag",
        price: "299€",
        img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=500",
      },
      {
        id: "sacsayhuaman",
        title: "City Tour & Sacsayhuamán",
        duration: "4 Std.",
        price: "45€",
        img: "https://images.unsplash.com/photo-1640549768697-6e9483127244?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        id: "colca-canyon",
        title: "Colca Canyon Trekking",
        duration: "2 Tage",
        price: "120€",
        img: "https://images.unsplash.com/photo-1617382119463-101efd32d048?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "sillar-route",
        title: "Sillar Route & Kloster",
        duration: "5 Std.",
        price: "35€",
        img: "https://images.unsplash.com/photo-1597188446821-359133fe0729?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },

  // München
  {
    city: "München",
    title: "Weltstadt mit Herz und Alpenblick",
    description:
      "München liegt zwischen Isar und Alpenrand. Wer München betritt, spürt die besondere Mischung aus Tradition und Lebensfreude. Es ist nicht nur die Heimat des Oktoberfests, sondern eine Stadt, in der bayerisches Brauchtum auf moderne Eleganz trifft. Zwischen historischen Plätzen, grünen Biergärten und klarer Bergluft erzählt jeder Augenblick von Genuss, Kultur und einem Lebensgefühl, das weit über die Stadtgrenzen hinausstrahlt.",
    img: "https://images.pexels.com/photos/13762982/pexels-photo-13762982.jpeg",
    spots: [
      {
        id: "Uros-Taquileinseln",
        title: "Uros & Taquile Inseln",
        duration: "1 Tag",
        price: "55€",
        img: "https://images.unsplash.com/photo-1536705284215-000a0c2f0406?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "Puno-city",
        title: "City-Tour",
        duration: "1 Tag",
        price: "55€",

        img: "https://images.unsplash.com/photo-1568805647831-79a19e414f21?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      
    ],
  },

  // Hamburg
  {
    city: "Hamburg",
    title: "Weltstadt mit Herz und Alpenblick",
    description:
      "München liegt zwischen Isar und Alpenrand. Wer München betritt, spürt die besondere Mischung aus Tradition und Lebensfreude. Es ist nicht nur die Heimat des Oktoberfests, sondern eine Stadt, in der bayerisches Brauchtum auf moderne Eleganz trifft. Zwischen historischen Plätzen, grünen Biergärten und klarer Bergluft erzählt jeder Augenblick von Genuss, Kultur und einem Lebensgefühl, das weit über die Stadtgrenzen hinausstrahlt.",
    img: "https://images.pexels.com/photos/6570407/pexels-photo-6570407.jpeg",
    spots: [
      {
        id: "Uros-Taquileinseln",
        title: "Uros & Taquile Inseln",
        duration: "1 Tag",
        price: "55€",
        img: "https://images.unsplash.com/photo-1536705284215-000a0c2f0406?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "Puno-city",
        title: "City-Tour",
        duration: "1 Tag",
        price: "55€",

        img: "https://images.unsplash.com/photo-1568805647831-79a19e414f21?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      
    ],
  },
];
