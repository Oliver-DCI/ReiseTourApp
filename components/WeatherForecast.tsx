"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineCalendarDays, HiOutlineArrowTrendingUp } from "react-icons/hi2";

export default function WeatherForecast({ city }: { city: string }) {
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const encodedCity = encodeURIComponent(city);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCity}&units=metric&lang=de&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
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
      <div className="bg-red-500/5 border border-red-500/10 rounded-[2rem] p-6 backdrop-blur-md">
        <p className="text-red-400 text-[10px] font-mono uppercase tracking-widest text-center">
          Forecast Link Severed
        </p>
      </div>
    );
  }

  if (forecast.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md animate-pulse">
        <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.3em] text-center">
          Calculating Trajectories...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl shadow-2xl">
      <header className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <HiOutlineCalendarDays className="text-blue-400" size={18} />
        </div>
        <div>
          <h4 className="text-blue-400 font-mono text-[9px] uppercase tracking-[0.4em]">Next Cycles</h4>
          <h3 className="text-xl font-black text-white uppercase tracking-tighter">3-Day Projection</h3>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {forecast.map((day, index) => {
          const date = new Date(day.dt_txt);
          const weekday = date.toLocaleDateString("de-DE", { weekday: "short" });

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 hover:border-blue-500/30 transition-all group"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400 mb-3 group-hover:text-blue-300 transition-colors">
                {weekday}
              </p>

              <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:items-center">
                <p className="text-3xl font-black text-white tracking-tighter">
                  {Math.round(day.main.temp)}°
                </p>
                <div className="bg-blue-500/20 px-2 py-1 rounded text-[9px] font-mono text-blue-300 uppercase">
                  Stable
                </div>
              </div>

              <p className="text-white/40 text-[10px] font-light mt-3 capitalize tracking-wide">
                {day.weather[0].description}
              </p>
              
              <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "100%" }}
                   transition={{ duration: 1, delay: 0.5 }}
                   className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 opacity-30" 
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}