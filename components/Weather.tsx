"use client";

import { useEffect, useState } from "react";

export default function Weather({ city }: { city: string }) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=de&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (!json.main) {
          setError(true);
        } else {
          setData(json);
        }
      })
      .catch(() => setError(true));
  }, [city]);

  if (error) {
    return (
      <div className="bg-white/60 border border-[#d4af37]/40 rounded-xl p-6 shadow-sm">
        <p className="text-slate-600">
          Wetterdaten derzeit nicht verfügbar.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white/60 border border-[#d4af37]/40 rounded-xl p-6 shadow-sm">
        <p className="text-slate-600">Wetter wird geladen…</p>
      </div>
    );
  }

  return (
    <div className="bg-white/70 border border-[#d4af37] rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        Aktuelles Wetter in {city}
      </h3>

      <p className="text-3xl font-light text-slate-800">
        {Math.round(data.main.temp)}°C
      </p>

      <p className="text-slate-600 capitalize">
        {data.weather[0].description}
      </p>

      <p className="text-sm text-slate-500 mt-2">
        Wind: {data.wind.speed} km/h • Feuchtigkeit: {data.main.humidity}%
      </p>
    </div>
  );
}
