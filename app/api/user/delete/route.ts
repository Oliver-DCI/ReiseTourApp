import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const userId = req.cookies.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { error: "Nicht eingeloggt" },
        { status: 401 }
      );
    }

    await User.findByIdAndDelete(userId);

    // Cookie löschen
    const res = NextResponse.json(
      { message: "Account gelöscht" },
      { status: 200 }
    );

    res.cookies.set("userId", "", { expires: new Date(0) });

    return res;
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json(
      { error: "Serverfehler" },
      { status: 500 }
    );
  }
}
