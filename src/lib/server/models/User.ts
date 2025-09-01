import { getDbClient } from "$lib/server/db"; // adjust path to your db file

export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

/**
 * Get the "users" collection from MongoDB
 */
export async function getUserCollection() {
  const db = await getDbClient();
  if (!db) throw new Error("Database connection failed");
  return db.collection<User>("users");
}


export async function createUser(user: User) {
  const users = await getUserCollection();
  const result = await users.insertOne(user);
  return result;
}

/**
 * Find a user by email
 */
export async function findUserByEmail(email: string) {
  const users = await getUserCollection();
  return await users.findOne({ email });
}

/**
 * Get all users
 */
export async function getAllUsers() {
  const users = await getUserCollection();
  return await users.find({}).toArray();
}
