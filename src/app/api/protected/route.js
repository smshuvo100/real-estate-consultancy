///api/protected
import { authenticateRequest } from "@/lib/jwt";

export async function GET(req) {
  const user = authenticateRequest(req);

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  return new Response(
    JSON.stringify({ success: true, message: "Welcome Admin", user }),
    { status: 200 }
  );
}
