import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import { cookies } from "next/headers";

// ⭐ Hilfsfunktion: User-ID aus Cookie holen
async function getUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  return userId || null;
}

// ⭐ POST – Notiz speichern
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });
    }

    const { city, note } = await req.json();

    if (!city || !note) {
      return NextResponse.json(
        { error: "City und Notiz sind erforderlich" },
        { status: 400 }
      );
    }

    const newNote = await Note.create({
      userId,
      city,
      text: note,
      done: false,
    });

    return NextResponse.json({ success: true, note: newNote });
  } catch (err) {
    console.error("NOTES POST ERROR:", err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}

// ⭐ GET – Notizen laden
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json(
        { error: "City ist erforderlich" },
        { status: 400 }
      );
    }

    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ notes: [] });
    }

    const notes = await Note.find({ userId, city }).sort({ createdAt: -1 });

    return NextResponse.json({ notes });
  } catch (err) {
    console.error("NOTES GET ERROR:", err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}

// ⭐ PATCH – Notiz als erledigt markieren
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { id, done } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID fehlt" }, { status: 400 });
    }

    const updated = await Note.findByIdAndUpdate(
      id,
      { done },
      { new: true }
    );

    return NextResponse.json({ success: true, note: updated });
  } catch (err) {
    console.error("NOTES PATCH ERROR:", err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}

// ⭐ DELETE – Notiz löschen
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID fehlt" }, { status: 400 });
    }

    await Note.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("NOTES DELETE ERROR:", err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
