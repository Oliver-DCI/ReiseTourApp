import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ 
    success: true,
    message: "Neural Link Terminated. Safe travels, Agent." 
  });

  // Konfigurations-Objekt für das sichere Löschen
  const cookieOptions = {
    path: "/",
    expires: new Date(0), // Setzt das Datum in die Vergangenheit
    httpOnly: true,       // Schützt vor Zugriff via JS
    sameSite: "lax" as const,
  };

  // Cookies löschen
  response.cookies.set("userId", "", cookieOptions);
  
  // Beim Frontend-Cookie setzen wir httpOnly auf false, 
  // damit das Frontend merkt, dass der Cookie weg ist.
  response.cookies.set("user", "", { ...cookieOptions, httpOnly: false });

  return response;
}