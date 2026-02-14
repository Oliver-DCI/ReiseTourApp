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
