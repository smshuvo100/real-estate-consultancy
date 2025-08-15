// src/app/api/amenity/route.js
import { connectToDB } from "@/lib/db";
import Amenity from "@/models/Amenity";

const generateSlug = (name) =>
  name
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const one = await Amenity.findById(id);
      if (!one) {
        return new Response(JSON.stringify({ error: "Amenity not found" }), {
          status: 404,
        });
      }
      return Response.json(one);
    }

    const items = await Amenity.find().sort({ createdAt: -1 });
    return Response.json({ amenities: items });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch amenities" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    if (!body.name) {
      return new Response(JSON.stringify({ error: "Name is required" }), {
        status: 400,
      });
    }
    if (!body.slug) body.slug = generateSlug(body.name);

    const created = await Amenity.create(body);
    return new Response(JSON.stringify(created), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Amenity create failed" }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    await connectToDB();
    const body = await req.json();
    if (!body._id) {
      return new Response(JSON.stringify({ error: "Missing _id" }), {
        status: 400,
      });
    }
    if (body.name && !body.slug) body.slug = generateSlug(body.name);

    const updated = await Amenity.findByIdAndUpdate(body._id, body, {
      new: true,
    });
    return Response.json(updated);
  } catch (e) {
    return new Response(JSON.stringify({ error: "Amenity update failed" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    await connectToDB();
    const { id } = await req.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing id" }), {
        status: 400,
      });
    }
    await Amenity.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "Amenity deleted" }), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Amenity delete failed" }), {
      status: 500,
    });
  }
}
