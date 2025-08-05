// ✅ /src/app/api/founder/seed/route.js
// http://localhost:3000/api/founder/seed // api route post to seed founder data

import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Founder } from "@/models/Founder";

export async function GET() {
  try {
    await connectToDB();

    const existing = await Founder.findOne();
    if (existing) {
      return NextResponse.json({
        success: false,
        message: "Founder already exists",
      });
    }

    const founder = await Founder.create({
      name: "John Doe",
      title: "Founder",
      description: `
        <p>Lorem ipsum dolor sit amet consectetur. Fames morbi id ut a. Sodales dignissim eget habitasse massa proin tincidunt a placerat.</p>
        <p>Accumsan neque posuere nulla commodo. Vitae neque sem in vel varius vulputate velit amet feugiat.</p>
      `,
      image: "/images/founder.jpg", // Replace with your actual image path
    });

    return NextResponse.json({ success: true, data: founder });
  } catch (error) {
    console.error("❌ Founder seeding failed:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
