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
      <div className="bg-white/60 border border-[#d4af37]/40 rounded-xl p-4 shadow-sm">
        <p className="text-slate-600 text-sm">
          Wetterdaten derzeit nicht verfügbar.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white/60 border border-[#d4af37]/40 rounded-xl p-4 shadow-sm">
        <p className="text-slate-600 text-sm">Wetter wird geladen…</p>
      </div>
    );
  }

  return (
    <div className="bg-white/70 border border-[#d4af37] rounded-xl p-4 shadow-md">
      <h3 className="text-lg font-bold text-slate-900 mb-1">
        Aktuelles Wetter
      </h3>

      <p className="text-2xl font-light text-slate-800 leading-tight">
        {Math.round(data.main.temp)}°C
      </p>

      <p className="text-slate-600 capitalize text-sm">
        {data.weather[0].description}
      </p>

      <p className="text-xs text-slate-500 mt-2">
        Wind: {data.wind.speed} km/h • Feuchtigkeit: {data.main.humidity}%
      </p>
    </div>
  );
}
