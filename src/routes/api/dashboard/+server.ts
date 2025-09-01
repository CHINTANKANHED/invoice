// src/routes/api/me/+server.ts
import type { RequestHandler } from "./$types";
import { findUserByEmail } from "$lib/server/models/User";
import { redirect, json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, "/signin");
  }

  const user = await findUserByEmail(locals.user.email);
  if (!user) {
    throw redirect(302, "/signin");
  }

  return json({ user });
};
