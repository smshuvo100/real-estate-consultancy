// /src/app/api/auth/seed/route.js
import { connectToDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectToDB();

    const hashedPassword = await bcrypt.hash("web123devs", 10);

    const admin = new Admin({
      email: "waseem.linuxfreakz@gmail.com",
      password: hashedPassword,
    });

    await admin.save();

    return new Response(
      JSON.stringify({ success: true, message: "Admin created!" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to seed admin" }), {
      status: 500,
    });
  }
}
