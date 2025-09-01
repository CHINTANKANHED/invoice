import type { RequestHandler } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ cookies }) => {
  // delete session cookie
  cookies.delete("session", { path: "/" });

  // redirect to signin
  throw redirect(302, "/auth/signin");
};
