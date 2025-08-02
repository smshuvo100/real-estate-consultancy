import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o", // or try gpt-3.5-turbo
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that writes blog content.",
          },
          {
            role: "user",
            content:
              prompt || "Write a blog intro about real estate investment.",
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("📦 OpenAI full response:", JSON.stringify(data, null, 2)); // 👈 LOG

    const aiText = data?.choices?.[0]?.message?.content;

    if (!aiText) {
      console.error("❌ Missing content:", data);
      return NextResponse.json(
        { success: false, error: "No content from OpenAI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, content: aiText });
  } catch (err) {
    console.error("❌ Error in API:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
