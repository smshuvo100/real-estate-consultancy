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
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are an expert blog writer. You generate long-form, engaging blog posts based on the provided title and introduction.",
          },
          {
            role: "user",
            content:
              prompt ||
              "Write a blog article about real estate investment in Dubai.",
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("📦 OpenAI full response:", JSON.stringify(data, null, 2));

    const aiText = data?.choices?.[0]?.message?.content;

    if (!aiText) {
      return NextResponse.json(
        { success: false, error: "No response from OpenAI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, content: aiText });
  } catch (error) {
    console.error("❌ Error in OpenAI call:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
