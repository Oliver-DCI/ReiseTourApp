"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineCloud, 
  HiOutlineSun, 
  HiOutlineVariable, 
  HiOutlineBeaker,
  HiOutlineExclamationTriangle 
} from "react-icons/hi2";

export default function Weather({ city }: { city: string }) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Falls die City Sonderzeichen hat, encoden wir sie
    const encodedCity = encodeURIComponent(city);
    
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&lang=de&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
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
      <div className="bg-red-500/5 border border-red-500/20 rounded-[2rem] p-6 backdrop-blur-md">
        <div className="flex items-center gap-3 text-red-400">
          <HiOutlineExclamationTriangle size={20} />
          <p className="text-[10px] font-mono uppercase tracking-widest">
            Atmospheric Sync Failed
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md animate-pulse">
        <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.3em] text-center">
          Scanning Atmosphere...
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl relative overflow-hidden group hover:border-blue-500/30 transition-colors"
    >
      {/* Background Decor */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />

      <div className="relative z-10">
        <header className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-blue-400 font-mono text-[9px] uppercase tracking-[0.4em] mb-1">
              Enviro-Scan / {data.sys.country}
            </h4>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter">
              {data.name}
            </h3>
          </div>
          {data.main.temp > 20 ? (
            <HiOutlineSun className="text-yellow-400 animate-pulse" size={24} />
          ) : (
            <HiOutlineCloud className="text-blue-300" size={24} />
          )}
        </header>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-black text-white tracking-tighter">
            {Math.round(data.main.temp)}°
          </span>
          <span className="text-blue-500 font-mono text-xs uppercase tracking-widest">Celsius</span>
        </div>

        <p className="text-white/50 text-[10px] font-mono uppercase tracking-widest mb-4 border-b border-white/5 pb-4">
          Status: {data.weather[0].description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <HiOutlineVariable className="text-white/20" size={14} />
            <div>
              <p className="text-[8px] font-mono text-white/30 uppercase tracking-tighter">Wind Speed</p>
              <p className="text-[10px] text-white font-mono">{data.wind.speed} <span className="text-[8px]">km/h</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineBeaker className="text-white/20" size={14} />
            <div>
              <p className="text-[8px] font-mono text-white/30 uppercase tracking-tighter">Humidity</p>
              <p className="text-[10px] text-white font-mono">{data.main.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}