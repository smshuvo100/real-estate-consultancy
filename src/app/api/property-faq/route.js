// /src/app/api/property-faq/route.js
import { connectToDB } from "@/lib/db";
import PropertyFaq from "@/models/PropertyFaq";

// ✅ GET all FAQs
export async function GET() {
  await connectToDB();
  const faqs = await PropertyFaq.find().sort({ createdAt: -1 });
  return Response.json({ faqs });
}

// ✅ POST - create new FAQ
export async function POST(req) {
  await connectToDB();
  const body = await req.json();
  const created = await PropertyFaq.create(body);
  return Response.json(created);
}

// ✅ PATCH - duplicate FAQ
export async function PATCH(req) {
  await connectToDB();
  const { duplicateId } = await req.json();
  if (!duplicateId)
    return Response.json({ error: "Missing duplicateId" }, { status: 400 });

  const original = await PropertyFaq.findById(duplicateId);
  if (!original)
    return Response.json({ error: "Original not found" }, { status: 404 });

  const duplicated = await PropertyFaq.create({
    question: original.question + " (Copy)",
    answer: original.answer,
  });

  return Response.json(duplicated);
}

// ✅ PUT - update existing FAQ
export async function PUT(req) {
  await connectToDB();
  const body = await req.json();
  const { _id, question, answer } = body;

  if (!_id) return Response.json({ error: "Missing ID" }, { status: 400 });

  const updated = await PropertyFaq.findByIdAndUpdate(
    _id,
    { question, answer },
    { new: true }
  );

  return Response.json(updated);
}

// ✅ DELETE - remove FAQ
export async function DELETE(req) {
  await connectToDB();
  const { id } = await req.json();
  if (!id) return Response.json({ error: "Missing ID" }, { status: 400 });

  await PropertyFaq.findByIdAndDelete(id);
  return Response.json({ success: true });
}
