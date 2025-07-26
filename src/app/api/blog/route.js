import Blog from "@/models/Blog";
import { connectToDB } from "@/lib/db";

// ✅ GET all blogs
export async function GET() {
  try {
    await connectToDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return Response.json(blogs);
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch blogs" }), {
      status: 500,
    });
  }
}

// ✅ POST a new blog
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    const newBlog = new Blog({
      date: body.date,
      adminName: body.adminName,
      category: body.category,
      title: body.title,
      shortDesc: body.shortDesc,
      content: body.content,
      featuredImage: body.featuredImage,
      gallery: body.gallery || [],
    });

    const saved = await newBlog.save();
    return Response.json(saved);
  } catch (err) {
    console.error("❌ POST /api/blog failed:", err);
    return new Response(JSON.stringify({ error: "Blog creation failed" }), {
      status: 500,
    });
  }
}

// ✅ PUT (update blog by ID from request body)
export async function PUT(req) {
  try {
    await connectToDB();
    const body = await req.json();

    const updatedBlog = await Blog.findByIdAndUpdate(body.id, body, {
      new: true,
    });

    return Response.json(updatedBlog);
  } catch (err) {
    console.error("❌ PUT /api/blog failed:", err);
    return new Response(JSON.stringify({ error: "Blog update failed" }), {
      status: 500,
    });
  }
}

// ✅ DELETE (delete blog by ID from request body)
export async function DELETE(req) {
  try {
    await connectToDB();
    const body = await req.json();

    await Blog.findByIdAndDelete(body.id);

    return new Response(
      JSON.stringify({ message: "Blog deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("❌ DELETE /api/blog failed:", err);
    return new Response(JSON.stringify({ error: "Blog delete failed" }), {
      status: 500,
    });
  }
}
