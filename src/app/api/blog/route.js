import Blog from "@/models/Blog";
import Project from "@/models/Project"; // needed for PATCH
import { connectToDB } from "@/lib/db";

// 🔧 Slug generator
function generateSlug(title = "") {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // space to dash
    .replace(/-+/g, "-") // collapse multiple dashes
    .slice(0, 100); // max 100 chars
}

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
      slug: body.slug?.trim() || generateSlug(body.title),
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

    const updatedData = {
      ...body,
      slug: body.slug?.trim() || generateSlug(body.title),
    };

    const updatedBlog = await Blog.findByIdAndUpdate(body.id, updatedData, {
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

// ✅ DUPLICATE (duplicate a project or blog by ID)
export async function PATCH(req) {
  try {
    await connectToDB();
    const { duplicateId, type } = await req.json();

    if (!duplicateId || !type) {
      return new Response(JSON.stringify({ error: "Missing ID or type" }), {
        status: 400,
      });
    }

    let original;
    if (type === "project") {
      original = await Project.findById(duplicateId);
    } else if (type === "blog") {
      original = await Blog.findById(duplicateId);
    }

    if (!original) {
      return new Response(JSON.stringify({ error: "Item not found" }), {
        status: 404,
      });
    }

    const { _id, createdAt, updatedAt, ...cloneData } = original.toObject();
    cloneData.title = `${cloneData.title} (Copy)`;
    cloneData.slug = generateSlug(cloneData.title);

    const newItem =
      type === "project"
        ? await Project.create(cloneData)
        : await Blog.create(cloneData);

    return new Response(JSON.stringify(newItem), { status: 201 });
  } catch (err) {
    console.error("❌ DUPLICATE /api/blog failed:", err);
    return new Response(JSON.stringify({ error: "Duplicate failed" }), {
      status: 500,
    });
  }
}
