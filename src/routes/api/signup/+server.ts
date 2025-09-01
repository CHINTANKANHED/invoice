// src/routes/api/signup/+server.ts
import type { RequestHandler } from "@sveltejs/kit";
import { getUserCollection } from "$lib/server/models/User";

export const POST: RequestHandler = async ({ request }) => {
  const { firstName, lastName, email, password } = await request.json();
  const users = await getUserCollection();

  const existing = await users.findOne({ email });
  if (existing) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
  }

  await users.insertOne({
    firstName,
    lastName,
    email,
    password // ⚠️ hash in prod
  });

  // ✅ Just return success (frontend will redirect)
  return new Response(JSON.stringify({ success: true }), { status: 201 });
};
