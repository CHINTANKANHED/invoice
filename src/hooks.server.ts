import { findUserByEmail } from "$lib/server/models/User";
import { redirect, type Handle } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("auth_token");
  const session = event.cookies.get("session");
  const email = event.cookies.get('session');
   event.locals.user = email
    ? { email, firstName: undefined, lastName: undefined }
    : null;

  if (session) {
    const user = await findUserByEmail(session);
    if (user) {
      event.locals.user = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      };  
    }
  }
   const publicRoutes = ['/auth/signin', '/auth/signup', '/api/signin', '/api/signup'];

  if (!session && !publicRoutes.includes(event.url.pathname)) {
    throw redirect(302, '/auth/signin');
  }

  // if (token) {
  //   try {
  //     const decoded = jwt.verify(token, JWT_SECRET);
  //     if (typeof decoded !== "string" && decoded && "id" in decoded && "email" in decoded) {
  //       event.locals.user = { id: decoded.id as string, email: decoded.email as string };
  //     } else {
  //       event.locals.user = null;
  //     }
  //   } catch {
  //     event.locals.user = null;
  //   }
  // } else {
  //   event.locals.user = null;
  // }

  return resolve(event);
};
