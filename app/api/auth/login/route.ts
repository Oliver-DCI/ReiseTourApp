import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  await connectDB();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  // ⭐ Cookie setzen
  const cookieStore = await cookies();
  cookieStore.set(
    "user",
    JSON.stringify({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
    }),
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 Tage
    }
  );

  return NextResponse.json({
    success: true,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
