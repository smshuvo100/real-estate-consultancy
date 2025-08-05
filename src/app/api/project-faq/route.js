// ✅ 2. API Route: /src/app/api/project-faq/route.js
import { connectToDB } from "@/lib/db";
import ProjectFaq from "@/models/ProjectFaq";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const faqs = await ProjectFaq.find().sort({ createdAt: -1 });
  return NextResponse.json(faqs);
}

export async function POST(req) {
  await connectToDB();
  const body = await req.json();
  const newFaq = await ProjectFaq.create(body);
  return NextResponse.json(newFaq);
}

export async function DELETE(req) {
  await connectToDB();
  const { id } = await req.json();
  await ProjectFaq.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

export async function PUT(req) {
  await connectToDB();
  const { _id, ...rest } = await req.json();
  const updated = await ProjectFaq.findByIdAndUpdate(_id, rest, { new: true });
  return NextResponse.json(updated);
}

export async function PATCH(req) {
  await connectToDB();
  const { duplicateId } = await req.json();
  const original = await ProjectFaq.findById(duplicateId);
  if (!original)
    return NextResponse.json({ error: "FAQ not found" }, { status: 404 });

  const duplicated = await ProjectFaq.create({
    question: original.question + " (copy)",
    answer: original.answer,
  });

  return NextResponse.json(duplicated);
}
