// src/app/api/project/route.js
import { connectToDB } from "@/lib/db";
import Project from "@/models/Project";

// 🛠️ Utility: Generate slug from title
const generateSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// ✅ GET all projects
export async function GET() {
  try {
    await connectToDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return Response.json(projects);
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
      {
        status: 200,
      }
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

    const { _id, createdAt, updatedAt, slug, ...cloneData } =
      original.toObject();
    cloneData.title = `${cloneData.title} (Copy)`;
    cloneData.slug = generateSlug(cloneData.title);

    const newProject = await Project.create(cloneData);

    return new Response(JSON.stringify(newProject), { status: 201 });
  } catch (err) {
    console.error("❌ DUPLICATE /api/project failed:", err);
    return new Response(JSON.stringify({ error: "Project duplicate failed" }), {
      status: 500,
    });
  }
}
