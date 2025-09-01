import { json } from "@sveltejs/kit";
import { findResetToken, deleteResetToken } from "$lib/server/resetTokens";
import { getUserCollection } from "$lib/server/models/User";
import bcrypt from "bcryptjs";

export async function POST({ request }) {
  const { token, newPassword } = await request.json();

  const resetToken = await findResetToken(token);
  if (!resetToken) {
    return json({ error: "Invalid or expired token" }, { status: 400 });
  }

  const users = await getUserCollection();
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await users.updateOne(
    { email: resetToken.email },
    { $set: { password: hashedPassword } }
  );

  await deleteResetToken(token);

  return json({ message: "Password reset successful" });
}
