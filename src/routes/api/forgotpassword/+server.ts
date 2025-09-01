import { json } from "@sveltejs/kit";
import { findUserByEmail } from "$lib/server/models/User";
import { saveResetToken } from "$lib/server/resetTokens";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST({ request }) {
  const { email } = await request.json();

  const user = await findUserByEmail(email);
  if (!user) {
    return json({ error: "User not found" }, { status: 404 });
  }

  // Generate secure token
  const token = crypto.randomBytes(32).toString("hex");
  await saveResetToken(email, token);

  // Build reset link (pointing to your frontend reset-password page)
  const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  // Send email (Nodemailer + Gmail example)
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // e.g. your Gmail address
      pass: process.env.EMAIL_PASS, // app password, not real Gmail password
    },
  });

  await transporter.sendMail({
    from: `"MyApp" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset",
    text: `Click this link to reset your password: ${resetLink}`,
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });

  return json({ message: "Password reset link sent to your email" });
}
