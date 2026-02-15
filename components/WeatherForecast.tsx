"use client";

import { useEffect, useState } from "react";

export default function WeatherForecast({ city }: { city: string }) {
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=de&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (!json.list) {
          setError(true);
          return;
        }

        // Vorhersage für jeweils 12:00 Uhr der nächsten 3 Tage
        const daily = json.list.filter((item: any) =>
          item.dt_txt.includes("12:00:00")
        );

        setForecast(daily.slice(0, 3));
      })
      .catch(() => setError(true));
  }, [city]);

  if (error) {
    return (
      <div className="bg-white/60 border border-[#d4af37]/40 rounded-xl p-4 shadow-sm">
        <p className="text-slate-600 text-sm">Vorhersage derzeit nicht verfügbar.</p>
      </div>
    );
  }

  if (forecast.length === 0) {
    return (
      <div className="bg-white/60 border border-[#d4af37]/40 rounded-xl p-4 shadow-sm">
        <p className="text-slate-600 text-sm">Vorhersage wird geladen…</p>
      </div>
    );
  }

  return (
    <div className="bg-white/70 border border-[#d4af37] rounded-xl p-4 shadow-md">
      <h3 className="text-lg font-bold text-slate-900 mb-3">
        3‑Tage‑Vorhersage
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {forecast.map((day, index) => {
          const date = new Date(day.dt_txt);
          const weekday = date.toLocaleDateString("de-DE", {
            weekday: "long",
          });

          return (
            <div
              key={index}
              className="bg-white/80 border border-[#d4af37]/40 rounded-xl p-3 shadow-sm text-center"
            >
              <p className="text-xs uppercase text-[#d4af37] font-semibold mb-1">
                {weekday}
              </p>

              <p className="text-2xl font-light text-slate-800 leading-tight">
                {Math.round(day.main.temp)}°C
              </p>

              <p className="text-slate-600 capitalize text-xs mt-1">
                {day.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
