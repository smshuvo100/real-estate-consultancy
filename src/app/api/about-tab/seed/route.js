// ✅ /src/app/api/about-tab/seed/route.js
//http://localhost:3000/api/about-tab/seed // api route

import { connectToDB } from "@/lib/db";
import AboutTab from "@/models/AboutTab";

export async function POST() {
  await connectToDB();

  // Check if already seeded
  const count = await AboutTab.countDocuments();
  if (count > 0) {
    return Response.json({ message: "Already seeded." });
  }

  const seedData = [
    {
      title: "Company Profile",
      content:
        "SFK Real Estate Consultancy stands as a distinguished leader in the UAE’s real estate development landscape…",
      counters: [
        { title: "Happy Customers", num: "200+" },
        { title: "Properties For Clients", num: "10k+" },
        { title: "Years of Experience", num: "16+" },
      ],
    },
    {
      title: "Vision",
      content:
        "To transform ambitious ideas into sustainable urban realities that elevate quality of life…",
      counters: [
        { title: "Happy Customers", num: "200+" },
        { title: "Properties For Clients", num: "10k+" },
        { title: "Years of Experience", num: "16+" },
      ],
    },
    {
      title: "Mission",
      content:
        "Deliver enduring value through innovation, integrity and on-time delivery across the full development lifecycle…",
      counters: [
        { title: "Happy Customers", num: "200+" },
        { title: "Properties For Clients", num: "10k+" },
        { title: "Years of Experience", num: "16+" },
      ],
    },
  ];

  const inserted = await AboutTab.insertMany(seedData);
  return Response.json({ success: true, inserted });
}
