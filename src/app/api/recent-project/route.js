// ✅ /src/app/api/recent-project/route.js
import { connectToDB } from "@/lib/db";
import RecentProject from "@/models/RecentProject";

// ✅ GET: Fetch all recent projects
export async function GET() {
  try {
    await connectToDB();
    const projects = await RecentProject.find().sort({ createdAt: -1 });
    return Response.json(projects);
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
    });
  }
}

// ✅ POST: Add a new recent project
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const created = await RecentProject.create(body);
    return Response.json(created);
  } catch (err) {
    return new Response(JSON.stringify({ error: "Project creation failed" }), {
      status: 500,
    });
  }
}

// ✅ PUT: Update a recent project by ID
export async function PUT(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const updated = await RecentProject.findByIdAndUpdate(body._id, body, {
      new: true,
    });
    return Response.json(updated);
  } catch (err) {
    return new Response(JSON.stringify({ error: "Project update failed" }), {
      status: 500,
    });
  }
}

// ✅ DELETE: Remove a recent project by ID
export async function DELETE(req) {
  try {
    await connectToDB();
    const body = await req.json();
    await RecentProject.findByIdAndDelete(body.id);
    return new Response(JSON.stringify({ message: "Deleted successfully" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Delete failed" }), {
      status: 500,
    });
  }
}

// ✅ PATCH: Duplicate a recent project
export async function PATCH(req) {
  try {
    await connectToDB();
    const { duplicateId } = await req.json();
    const original = await RecentProject.findById(duplicateId);
    if (!original) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
      });
    }

    const { _id, createdAt, updatedAt, ...copyData } = original.toObject();
    copyData.title = `${copyData.title} (Copy)`;

    const newProject = await RecentProject.create(copyData);
    return new Response(JSON.stringify(newProject), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Duplicate failed" }), {
      status: 500,
    });
  }
}
