import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { username, email, password, street, zip, city } = await req.json();

    // 1. Full Validation Check
    if (!username || !email || !password || !street || !zip || !city) {
      return NextResponse.json(
        { error: "Protocol Error: Incomplete Data Packet" },
        { status: 400 }
      );
    }

    // 2. Check for Existing Identity Node
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Conflict: Neural Address already registered" },
        { status: 400 }
      );
    }

    // 3. Password Encryption (Cost Factor 10 is perfect)
    const hashed = await bcrypt.hash(password, 10);

    // 4. Create New Node
    const newUser = await User.create({
      username,
      email,
      password: hashed,
      street,
      zip,
      city,
      role: "user", // Default Role für das spätere Admin-Panel
    });

    // 5. Clean Response (Passwort entfernen!)
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(
      { 
        message: "Identity Initialized. Welcome to the Network.", 
        user: userWithoutPassword 
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: "Internal Core Interface Error" },
      { status: 500 }
    );
  }
}