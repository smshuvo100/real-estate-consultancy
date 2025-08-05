import { connectToDB } from "@/lib/db";
import TeamMember from "@/models/TeamMember";

// Get all team members
export async function GET() {
  await connectToDB();
  const members = await TeamMember.find().sort({ createdAt: -1 });
  return Response.json(members);
}

// Create a new team member
export async function POST(req) {
  await connectToDB();
  const body = await req.json();
  const created = await TeamMember.create(body);
  return Response.json(created);
}

// ✅ Update an existing team member
export async function PUT(req) {
  await connectToDB();
  const body = await req.json();
  const { _id, ...updateFields } = body;

  if (!_id) {
    return Response.json({ error: "Missing _id" }, { status: 400 });
  }

  const updated = await TeamMember.findByIdAndUpdate(_id, updateFields, {
    new: true,
  });

  if (!updated) {
    return Response.json({ error: "Team member not found" }, { status: 404 });
  }

  return Response.json(updated);
}

// Duplicate a team member
export async function PATCH(req) {
  await connectToDB();
  const { duplicateId } = await req.json();
  if (!duplicateId) {
    return Response.json({ error: "Missing duplicateId" }, { status: 400 });
  }

  const original = await TeamMember.findById(duplicateId);
  if (!original) {
    return Response.json({ error: "Original not found" }, { status: 404 });
  }

  const duplicated = await TeamMember.create({
    name: original.name + " (Copy)",
    title: original.title,
    description: original.description,
    image: original.image,
  });

  return Response.json(duplicated);
}

// Delete a team member
export async function DELETE(req) {
  await connectToDB();
  const { id } = await req.json();
  if (!id) return Response.json({ error: "Missing ID" }, { status: 400 });

  await TeamMember.findByIdAndDelete(id);
  return Response.json({ success: true });
}
