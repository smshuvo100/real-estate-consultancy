// src/app/api/investor-faq/route.js
import { connectToDB } from "@/lib/db";
import InvestorFaq from "@/models/InvestorFaq";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const faqs = await InvestorFaq.find().sort({ createdAt: -1 });
  return NextResponse.json(faqs);
}

export async function POST(req) {
  await connectToDB();
  const body = await req.json();
  const newFaq = await InvestorFaq.create(body);
  return NextResponse.json(newFaq);
}

export async function DELETE(req) {
  await connectToDB();
  const { id } = await req.json();
  await InvestorFaq.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

export async function PUT(req) {
  await connectToDB();
  const { _id, ...rest } = await req.json();
  const updated = await InvestorFaq.findByIdAndUpdate(_id, rest, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function PATCH(req) {
  await connectToDB();
  const { duplicateId } = await req.json();
  const original = await InvestorFaq.findById(duplicateId);
  if (!original)
    return NextResponse.json({ error: "FAQ not found" }, { status: 404 });

  const duplicated = await InvestorFaq.create({
    question: original.question + " (copy)",
    answer: original.answer,
  });

  return NextResponse.json(duplicated);
}
