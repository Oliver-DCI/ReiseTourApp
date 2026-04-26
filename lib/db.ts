import mongoose from "mongoose";

// Wir definieren einen Cache, um die Verbindung über Hot-Reloads hinweg zu erhalten
const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Bitte definiere die MONGO_URI in deiner .env Datei");
}

/**
 * Global wird in Next.js verwendet, um die Verbindung im Development 
 * über Modul-Reloads hinweg zu speichern.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // 1. Wenn wir bereits eine Verbindung haben, nutzen wir diese
  if (cached.conn) {
    return cached.conn;
  }

  // 2. Wenn gerade ein Verbindungsaufbau läuft, warten wir auf diesen
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Sofort Fehlermeldung werfen, wenn DB down ist
    };

    console.log("📡 [System] Initializing Neural Link to Database...");

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("✅ [System] Database Connection Established.");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ [System] Database Connection Failed:", e);
    throw e;
  }

  return cached.conn;
}