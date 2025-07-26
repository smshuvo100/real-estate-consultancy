// ✅ /src/app/api/ai-generate/route.js
export async function POST(req) {
  const { prompt } = await req.json();
  return Response.json({
    text: `Generated content for prompt: ${prompt}`,
  });
}
