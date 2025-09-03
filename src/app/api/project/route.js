// src/app/api/project/route.js
import { connectToDB } from "@/lib/db";
import Project from "@/models/Project";
// Ensure Amenity model is registered for populate
import "@/models/Amenity";

// slug util (unchanged)
const generateSlug = (title) =>
  title
    ?.toLowerCase()
    ?.replace(/[^a-z0-9]+/g, "-")
    ?.replace(/^-+|-+$/g, "");

export async function GET(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const slug = searchParams.get("slug");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "1000", 10);
    const skip = (page - 1) * limit;

    // Optional list-populate toggle:
    // - ?populateAmenities=1
    // - OR ?expand=amenities (can be comma-separated like expand=amenities,other)
    const expand = (searchParams.get("expand") || "").toLowerCase();
    const populateFlag =
      searchParams.get("populateAmenities") === "1" ||
      /(^|,)\s*amenities\s*(,|$)/.test(expand);

    // ✅ SINGLE: return { project } with amenities populated
    if (slug) {
      const project = await Project.findOne({ slug })
        .populate({
          path: "amenities",
          select: "name title image slug isActive", // keep it lean
          match: { isActive: { $ne: false } }, // only active ones
        })
        .lean();

      if (!project) {
        return new Response(JSON.stringify({ error: "Project not found" }), {
          status: 404,
        });
      }

      return Response.json({ project });
    }

    // ✅ LIST: { projects, total } — by default NOT populated (perf/back-compat)
    //          populate only if explicitly requested via the flag above
    let q = Project.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    if (populateFlag) {
      q = q.populate({
        path: "amenities",
        select: "name title image slug isActive",
        match: { isActive: { $ne: false } },
      });
    }
    const projects = await q.lean();
    const total = await Project.countDocuments();

    return Response.json({ projects, total });
  } catch (err) {
    console.error("❌ GET /api/project failed:", err?.message || err);
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    if (!body.slug && body.title) body.slug = generateSlug(body.title);
    const saved = await new Project(body).save();
    return Response.json(saved);
  } catch (err) {
    console.error("❌ POST /api/project failed:", err?.message || err);
    return new Response(JSON.stringify({ error: "Project creation failed" }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    await connectToDB();
    const body = await req.json();
    if (!body?._id) {
      return new Response(JSON.stringify({ error: "Missing _id" }), {
        status: 400,
      });
    }
    if (!body.slug && body.title) body.slug = generateSlug(body.title);
    const updated = await Project.findByIdAndUpdate(body._id, body, {
      new: true,
    });
    return Response.json(updated);
  } catch (err) {
    console.error("❌ PUT /api/project failed:", err?.message || err);
    return new Response(JSON.stringify({ error: "Project update failed" }), {
      status: 500,
    });
  }
}

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
    console.error("❌ DELETE /api/project failed:", err?.message || err);
    return new Response(JSON.stringify({ error: "Project delete failed" }), {
      status: 500,
    });
  }
}

export async function PATCH(req) {
  try {
    await connectToDB();
    const { duplicateId } = await req.json();
    if (!duplicateId)
      return new Response(JSON.stringify({ error: "Missing ID" }), {
        status: 400,
      });

    const original = await Project.findById(duplicateId).lean();
    if (!original)
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
      });

    const { _id, createdAt, updatedAt, slug, title, ...cloneData } = original;
    const newTitle = `${title} (Copy)`;
    const newSlug = (newTitle || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    cloneData.title = newTitle;
    cloneData.slug = newSlug;

    const newProject = await Project.create(cloneData);
    return new Response(JSON.stringify(newProject), { status: 201 });
  } catch (err) {
    console.error("❌ DUPLICATE /api/project failed:", err?.message || err);
    return new Response(JSON.stringify({ error: "Project duplicate failed" }), {
      status: 500,
    });
  }
}
