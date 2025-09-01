import { getDbClient } from "$lib/server/db";

export interface ResetToken {
  email: string;
  token: string;
  expiresAt: Date;
}

export async function saveResetToken(email: string, token: string) {
  const db = await getDbClient();
  const tokens = db.collection<ResetToken>("reset_tokens");

  await tokens.insertOne({
    email,
    token,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60), // expires in 1h
  });
}

export async function findResetToken(token: string) {
  const db = await getDbClient();
  const tokens = db.collection<ResetToken>("reset_tokens");

  return tokens.findOne({ token, expiresAt: { $gt: new Date() } });
}

export async function deleteResetToken(token: string) {
  const db = await getDbClient();
  const tokens = db.collection<ResetToken>("reset_tokens");

  await tokens.deleteOne({ token });
}
