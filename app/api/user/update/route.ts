import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { username, street, zip, city, oldPassword, newPassword } = await req.json();
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { error: "AUTH_REQUIRED: Identity not verified" },
        { status: 401 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "NODE_NOT_FOUND: User does not exist" },
        { status: 404 }
      );
    }

    // 1. Basisdaten aktualisieren
    user.username = username || user.username;
    user.street = street || user.street;
    user.zip = zip || user.zip;
    user.city = city || user.city;

    // 2. Passwort-Verschlüsselungs-Update
    if (newPassword) {
      if (!oldPassword) {
        return NextResponse.json(
          { error: "SECURITY_CHECK: Current key required" },
          { status: 400 }
        );
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { error: "SECURITY_CHECK: Invalid current key" },
          { status: 400 }
        );
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    // 3. User-Daten für Frontend-Cookie vorbereiten (ohne Passwort)
    const userData = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      street: user.street,
      zip: user.zip,
      city: user.city,
      role: user.role || "user",
    };

    // 4. Response mit aktualisiertem Frontend-Cookie
    const response = NextResponse.json(
      { message: "Identity Sync Complete", user: userData },
      { status: 200 }
    );

    // Wir überschreiben das 'user' Cookie, damit der AuthContext im Frontend 
    // sofort die neuen Daten (z.B. den neuen Namen) sieht
    response.cookies.set("user", JSON.stringify(userData), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return NextResponse.json(
      { error: "CORE_SYNC_FAILURE: Process aborted" },
      { status: 500 }
    );
  }
}