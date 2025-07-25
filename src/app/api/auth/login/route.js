// src/app/api/auth/login/route.js
import { connectToDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt"; // 🔑 import JWT helper

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password required." }),
        { status: 400 }
      );
    }

    await connectToDB();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // ✅ Generate JWT Token
    const token = signToken({ id: admin._id, email: admin.email });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        token, // ✅ return token
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
