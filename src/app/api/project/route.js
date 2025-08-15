// src/app/api/project/route.js
import { connectToDB } from "@/lib/db";
import Project from "@/models/Project";

// 🛠️ Utility: Generate slug from title
const generateSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// ✅ GET: Fetch All or Single Project by slug
export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "1000");
    const skip = (page - 1) * limit;

    if (slug) {
      const project = await Project.findOne({ slug }).populate("amenities");
      if (!project) {
        return new Response(JSON.stringify({ error: "Project not found" }), {
          status: 404,
        });
      }
      return Response.json({ project });
    }

    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments();

    return Response.json({ projects, total });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
    });
  }
}

// ✅ POST a new project
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    if (!body.slug && body.title) {
      body.slug = generateSlug(body.title);
    }

    // body.amenities should be array of Amenity ObjectIds (strings)
    const newProject = new Project(body);
    const saved = await newProject.save();
    return Response.json(saved);
  } catch (err) {
    console.error("❌ POST /api/project failed:", err);
    return new Response(JSON.stringify({ error: "Project creation failed" }), {
      status: 500,
    });
  }
}

// ✅ PUT (update project by ID)
export async function PUT(req) {
  try {
    await connectToDB();
    const body = await req.json();

    if (!body._id) {
      return new Response(JSON.stringify({ error: "Missing _id" }), {
        status: 400,
      });
    }

    if (!body.slug && body.title) {
      body.slug = generateSlug(body.title);
    }

    const updated = await Project.findByIdAndUpdate(body._id, body, {
      new: true,
    });

    return Response.json(updated);
  } catch (err) {
    console.error("❌ PUT /api/project failed:", err);
    return new Response(JSON.stringify({ error: "Project update failed" }), {
      status: 500,
    });
  }
}

// ✅ DELETE (delete project by ID)
export async function DELETE(req) {
  try {
    await connectToDB();
    const body = await req.json();

    await Project.findByIdAndDelete(body.id);

    return new Response(
      JSON.stringify({ message: "Project deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ DELETE /api/project failed:", err);
    return new Response(JSON.stringify({ error: "Project delete failed" }), {
      status: 500,
    });
  }
}

// ✅ DUPLICATE (duplicate a project by ID)
export async function PATCH(req) {
  try {
    await connectToDB();
    const { duplicateId } = await req.json();

    if (!duplicateId) {
      return new Response(JSON.stringify({ error: "Missing ID" }), {
        status: 400,
      });
    }

    const original = await Project.findById(duplicateId);
    if (!original) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
      });
    }

    const { _id, createdAt, updatedAt, slug, title, ...cloneData } =
      original.toObject();

    const newTitle = `${title} (Copy)`;
    const newSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    cloneData.title = newTitle;
    cloneData.slug = newSlug;

    const newProject = await Project.create(cloneData);

    return new Response(JSON.stringify(newProject), { status: 201 });
  } catch (err) {
    console.error("❌ DUPLICATE /api/project failed:", err);
    return new Response(JSON.stringify({ error: "Project duplicate failed" }), {
      status: 500,
    });
  }
}
