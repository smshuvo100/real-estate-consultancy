// src/middleware/auth.js

import { verifyToken } from "@/lib/jwt";

export function authenticateRequest(req) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) return null;

  return verifyToken(token);
}
