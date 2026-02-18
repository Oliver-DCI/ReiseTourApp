import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Cookies löschen
  res.cookies.set("userId", "", { expires: new Date(0) });
  res.cookies.set("user", "", { expires: new Date(0) });

  return res;
}
