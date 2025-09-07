// src/app/api/upload/route.js
export const runtime = "nodejs"; // Node runtime
export const dynamic = "force-dynamic"; // prevent static optimization
export const maxDuration = 60; // allow larger uploads on Vercel

import path from "path";
import { existsSync } from "fs";
import { writeFile, mkdir } from "fs/promises";
import { put } from "@vercel/blob";

// Helper: sanitize filename
function cleanName(name = "upload.bin") {
  return String(name)
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
}

// Decide mode: prod on Vercel => use Blob; local => filesystem
const IS_VERCEL = !!process.env.VERCEL; // true on Vercel
const USE_BLOB = IS_VERCEL; // prod => Blob
// You can force blob locally by setting: USE_BLOB = true (needs token)

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

    const filename = `${Date.now()}-${cleanName(file.name)}`;

    // ====== PRODUCTION (Vercel) -> Vercel Blob ======
    if (USE_BLOB) {
      // NOTE: On Vercel, add the Blob integration so BLOB_READ_WRITE_TOKEN is auto-provisioned.
      // Locally, create .env.local with BLOB_READ_WRITE_TOKEN (see Step 3 below).
      try {
        const blob = await put(`blog/${filename}`, file, {
          access: "public",
          addRandomSuffix: false,
          contentType: file.type || "application/octet-stream",
        });
        return Response.json({ success: true, url: blob.url }, { status: 200 });
      } catch (err) {
        console.error("Blob upload failed:", err);
        return Response.json(
          {
            success: false,
            message: "Blob upload failed. Check Blob setup / token.",
          },
          { status: 500 }
        );
      }
    }

    // ====== LOCAL DEV -> write to /public/blog ======
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "blog");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return a relative URL that Next.js can serve statically
    return Response.json(
      { success: true, url: `/blog/${filename}` },
      { status: 200 }
    );
  } catch (e) {
    console.error("Upload error:", e);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
