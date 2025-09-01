import { redirect, type RequestHandler } from "@sveltejs/kit";
import { findUserByEmail } from "$lib/server/models/User";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
export const POST: RequestHandler = async ({ request, cookies }) => {
  const { email, password } = await request.json(); // <-- JSON not formData

  const user = await findUserByEmail(email);
  if (!user || user.password !== password) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
  }


  // check password
  // const match = await bcrypt.compare(password, user.password);
  // if (!match) {
  //   return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
  // }

  // issue JWT
  // const token = jwt.sign(
  //   { id: user._id?.toString(), email: user.email },
  //   JWT_SECRET,
  //   { expiresIn: "1h" }
  // );
  
cookies.set("session", user.email, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 60 * 60 * 24
  });

  // ✅ return success JSON (frontend redirects with goto)
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
