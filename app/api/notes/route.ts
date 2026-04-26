import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import { cookies } from "next/headers";

/**
 * Zieht die User-ID aus dem sicheren Server-Cookie.
 */
async function getUserId() {
  const cookieStore = await cookies();
  return cookieStore.get("userId")?.value || null;
}

// --- POST: Mission Log Initialisierung ---
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "AUTH_REQUIRED: Identity not verified" }, { status: 401 });
    }

    const { city, note } = await req.json();

    if (!city || !note) {
      return NextResponse.json({ error: "DATA_INCOMPLETE: City and Content required" }, { status: 400 });
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
    return NextResponse.json({ error: "INTERNAL_CORE_ERROR" }, { status: 500 });
  }
}

// --- GET: Mission Logs abrufen ---
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json({ error: "TARGET_NODE_MISSING" }, { status: 400 });
    }

    const userId = await getUserId();
    if (!userId) return NextResponse.json({ notes: [] });

    // Nur Logs des aktuellen Users für diesen spezifischen Node (City)
    const notes = await Note.find({ userId, city }).sort({ createdAt: -1 });

    return NextResponse.json({ notes });
  } catch (err) {
    console.error("NOTES GET ERROR:", err);
    return NextResponse.json({ error: "INTERNAL_CORE_ERROR" }, { status: 500 });
  }
}

// --- PATCH: Mission Status Update ---
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const userId = await getUserId();
    const { id, done } = await req.json();

    if (!id || !userId) return NextResponse.json({ error: "ACCESS_DENIED" }, { status: 401 });

    // Sicherheit: Nur updaten, wenn die Note dem User gehört
    const updated = await Note.findOneAndUpdate(
      { _id: id, userId }, 
      { done },
      { new: true }
    );

    if (!updated) return NextResponse.json({ error: "LOG_NOT_FOUND_OR_RESTRICTED" }, { status: 404 });

    return NextResponse.json({ success: true, note: updated });
  } catch (err) {
    console.error("NOTES PATCH ERROR:", err);
    return NextResponse.json({ error: "INTERNAL_CORE_ERROR" }, { status: 500 });
  }
}

// --- DELETE: Mission Log Purge ---
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const userId = await getUserId();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !userId) return NextResponse.json({ error: "ACCESS_DENIED" }, { status: 401 });

    // Sicherheit: Nur löschen, wenn die Note dem User gehört
    const deleted = await Note.findOneAndDelete({ _id: id, userId });

    if (!deleted) return NextResponse.json({ error: "PURGE_FAILED: Log restricted" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("NOTES DELETE ERROR:", err);
    return NextResponse.json({ error: "INTERNAL_CORE_ERROR" }, { status: 500 });
  }
}