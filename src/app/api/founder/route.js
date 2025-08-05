import { connectToDB } from "@/lib/db";
import { Founder } from "@/models/Founder";

// ✅ GET Founder (assumes only one document)
export async function GET() {
  try {
    await connectToDB();
    const founder = await Founder.findOne(); // get first entry
    return Response.json(founder || {});
  } catch (error) {
    return Response.json({ error: "Failed to fetch founder" }, { status: 500 });
  }
}

// ✅ PUT to update or create Founder
export async function PUT(req) {
  try {
    await connectToDB();
    const data = await req.json();

    let founder = await Founder.findOne();

    if (founder) {
      // Update existing
      founder.name = data.name;
      founder.title = data.title;
      founder.description = data.description;
      founder.image = data.image;
      await founder.save();
    } else {
      // Create new
      founder = await Founder.create(data);
    }

    return Response.json({ success: true, founder });
  } catch (error) {
    return Response.json(
      { error: "Failed to update founder" },
      { status: 500 }
    );
  }
}
