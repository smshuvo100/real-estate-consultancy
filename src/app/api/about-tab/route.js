// ✅ /src/app/api/about-tab/route.js

import { connectToDB } from "@/lib/db";
import AboutTab from "@/models/AboutTab"; // ✅ FIXED

export async function GET() {
  await connectToDB();
  const all = await AboutTab.find().sort({ createdAt: 1 });
  return Response.json(all);
}

export async function PUT(req) {
  await connectToDB();
  const body = await req.json();

  if (!body._id) {
    return Response.json({ error: "Missing ID" }, { status: 400 });
  }

  const updated = await AboutTab.findByIdAndUpdate(body._id, body, {
    new: true,
    runValidators: true,
  });

  return Response.json(updated);
}
