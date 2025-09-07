// src/app/api/upload/route.js
export const runtime = "nodejs"; // or "edge" – both work with Blob
export const dynamic = "force-dynamic"; // ensure no static optimization

import { put } from "@vercel/blob";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    // clean filename
    const base = `${Date.now()}-${(file.name || "upload")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "")}`;

    // Upload directly to Vercel Blob (public)
    const blob = await put(`blog/${base}`, file, {
      access: "public",
      addRandomSuffix: false, // keep the name predictable (optional)
      contentType: file.type || "application/octet-stream",
    });

    // blob.url is a public, permanent, CDN URL
    return Response.json({ success: true, url: blob.url }, { status: 200 });
  } catch (e) {
    console.error("Upload error:", e);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
