import { connectToDB } from "@/lib/db";
import EmailRecipient from "@/models/EmailRecipient";
import { NextResponse } from "next/server";

// GET all
export async function GET() {
  await connectToDB();
  const recipients = await EmailRecipient.find().sort({ createdAt: -1 });
  return NextResponse.json(recipients);
}

// POST new
export async function POST(req) {
  await connectToDB();
  const body = await req.json();
  const created = await EmailRecipient.create(body);
  return NextResponse.json(created);
}

// DELETE
export async function DELETE(req) {
  await connectToDB();
  const { id } = await req.json();
  await EmailRecipient.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
