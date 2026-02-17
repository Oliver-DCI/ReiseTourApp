import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Alle Felder sind erforderlich" },
        { status: 400 }
      );
    }

    // Prüfen ob User existiert
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "E-Mail wird bereits verwendet" },
        { status: 400 }
      );
    }

    // Passwort hashen
    const hashed = await bcrypt.hash(password, 10);

    // User speichern
    const newUser = await User.create({
      username,
      email,
      password: hashed,
    });

    return NextResponse.json(
      { message: "Registrierung erfolgreich", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: "Serverfehler" },
      { status: 500 }
    );
  }
}
