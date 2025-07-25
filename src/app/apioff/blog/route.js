// src/app/api/blog/route.js
import { connectToDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { authenticateRequest } from "@/lib/jwt"; // your helper

export async function POST(req) {
  const user = authenticateRequest(req);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    await connectToDB();
    const data = await req.json();

    const newBlog = new Blog(data);
    await newBlog.save();

    return new Response(JSON.stringify({ success: true, blog: newBlog }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create blog" }), {
      status: 500,
    });
  }
}
