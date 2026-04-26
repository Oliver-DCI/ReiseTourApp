import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { error: "ACCESS_DENIED: No active session found" },
        { status: 401 }
      );
    }

    // 1. Permanent aus der Datenbank entfernen
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json(
        { error: "NODE_NOT_FOUND: Identity already purged" },
        { status: 404 }
      );
    }

    // 2. Response vorbereiten
    const response = NextResponse.json(
      { message: "Identity Node terminated successfully." },
      { status: 200 }
    );

    // 3. Alle Cookies restlos löschen (Vergangenheitsdatum)
    const purgeOptions = {
      path: "/",
      expires: new Date(0),
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
    };

    response.cookies.set("userId", "", { ...purgeOptions, httpOnly: true });
    response.cookies.set("user", "", { ...purgeOptions, httpOnly: false });

    return response;
    
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json(
      { error: "CRITICAL_CORE_FAILURE: Termination protocol aborted" },
      { status: 500 }
    );
  }
}