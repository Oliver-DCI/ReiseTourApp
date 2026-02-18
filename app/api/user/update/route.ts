import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { username, newsletter, oldPassword, newPassword } = await req.json();

    // User aus Session holen (du speicherst ihn im Frontend)
    // Wir erwarten, dass der User im Cookie gespeichert ist
    // oder du sendest die ID im Body – hier nehmen wir Cookie-basierte Lösung
    const userId = req.cookies.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { error: "Nicht eingeloggt" },
        { status: 401 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "Benutzer nicht gefunden" },
        { status: 404 }
      );
    }

    // Username aktualisieren
    user.username = username;

    // Newsletter aktualisieren
    user.newsletter = newsletter;

    // Passwort ändern (nur wenn neues Passwort angegeben wurde)
    if (newPassword) {
      if (!oldPassword) {
        return NextResponse.json(
          { error: "Altes Passwort wird benötigt" },
          { status: 400 }
        );
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { error: "Altes Passwort ist falsch" },
          { status: 400 }
        );
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
    }

    await user.save();

    return NextResponse.json(
      { message: "Erfolgreich aktualisiert", user },
      { status: 200 }
    );
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return NextResponse.json(
      { error: "Serverfehler" },
      { status: 500 }
    );
  }
}
