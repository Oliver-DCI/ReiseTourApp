import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // 1. User Validierung
    const user = await User.findOne({ email });
    if (!user) {
      // Sicherheits-Tipp: "Invalid Credentials" statt "User not found" 
      // verhindert E-Mail-Enumeration
      return NextResponse.json({ error: "Access Denied: Credentials Invalid" }, { status: 401 });
    }

    // 2. Password Check
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: "Access Denied: Credentials Invalid" }, { status: 401 });
    }

    const cookieStore = await cookies();
    const isProd = process.env.NODE_ENV === "production";

    // 3. User Objekt für Cookies & Response vorbereiten
    // Wir fügen hier 'role' hinzu, um das Admin-Panel später zu schützen
    const userData = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      street: user.street,
      zip: user.zip,
      city: user.city,
      role: user.role || "user", // Default Rolle
    };

    // ⭐ Secure Session Cookie (Server-only)
    cookieStore.set("userId", userData._id, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // ⭐ Public User Cookie (Für den AuthContext im Frontend)
    cookieStore.set(
      "user",
      JSON.stringify(userData),
      {
        httpOnly: false, 
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    // 4. Response für den Client
    return NextResponse.json({
      success: true,
      message: "Neural Link Established",
      user: userData,
    });

  } catch (error) {
    console.error("Auth Error:", error);
    return NextResponse.json({ error: "Internal Server Interface Error" }, { status: 500 });
  }
}